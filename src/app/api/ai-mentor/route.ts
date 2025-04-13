import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

// Set to true to use the real HuggingFace model
// Set to false to use the simulated responses
const USE_REAL_MODEL = true;

export async function POST(req: NextRequest) {
  try {
    const { userProfile, query } = await req.json();
    
    let response;
    if (USE_REAL_MODEL) {
      // Use real HuggingFace model
      response = await getHuggingFaceResponse(userProfile, query);
    } else {
      // Use simulated responses for development/demo
      response = generateMentorResponse(userProfile, query);
    }
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('AI Mentor error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}

/**
 * Get response from HuggingFace inference API using lightweight models
 * We use DistilGPT2 which is a smaller, faster version of GPT-2
 */
async function getHuggingFaceResponse(userProfile: any, query: string): Promise<string> {
  // Create a new inference instance with API key
  const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || undefined);
  
  // Format context from user profile
  const context = `
    User skills: ${userProfile.currentSkills?.join(', ') || 'None provided'}
    Skills to learn: ${userProfile.desiredSkills?.join(', ') || 'None provided'}
    Career goals: ${userProfile.careerGoals?.join(', ') || 'None provided'}
    Experience level: ${userProfile.experience || 0} years
    Learning style: ${userProfile.preferredLearningStyle || 'Mixed'}
    ${userProfile.focusedCareerTrack ? `Focused career track: ${userProfile.focusedCareerTrack}` : ''}
    ${userProfile.requiredSkills ? `Required skills for track: ${userProfile.requiredSkills.join(', ')}` : ''}
  `;
  
  try {
    // Use a lightweight text generation model (DistilGPT2)
    // This is inspired by DistilBERT's approach of being a lighter, faster alternative
    const response = await hf.textGeneration({
      model: 'distilgpt2',  // Lightweight model similar to DistilBERT but for generation
      inputs: `${context}\n\nUser question: ${query}\n\nAI Career Mentor:`,
      parameters: {
        max_length: 300,
        temperature: 0.7,
        top_p: 0.9,
        repetition_penalty: 1.2
      }
    });
    
    // Clean up the response - sometimes the model generates additional dialogue
    let generatedText = response.generated_text || '';
    
    // Extract just the AI response part (after "AI Career Mentor:")
    const mentorPrefix = "AI Career Mentor:";
    const mentorResponseStart = generatedText.indexOf(mentorPrefix);
    
    if (mentorResponseStart !== -1) {
      generatedText = generatedText.substring(mentorResponseStart + mentorPrefix.length).trim();
    }
    
    // If the response is too short or doesn't make sense, fall back to rule-based
    if (generatedText.length < 20) {
      return generateMentorResponse(userProfile, query);
    }
    
    return generatedText;
  } catch (error) {
    console.error('HuggingFace API error:', error);
    // Fall back to the rule-based response if the API call fails
    return generateMentorResponse(userProfile, query);
  }
}

/**
 * Simulates a model response based on the user profile and query
 * This is a fallback for when the real model is not available
 */
function generateMentorResponse(userProfile: any, query: string): string {
  // Extract key elements from user profile
  const skills = userProfile.currentSkills || [];
  const desiredSkills = userProfile.desiredSkills || [];
  const careerGoals = userProfile.careerGoals || [];
  const experience = userProfile.experience || 0;
  const learningStyle = userProfile.preferredLearningStyle || 'Mixed';
  
  // Dictionary of predefined responses based on query keywords
  const responses: Record<string, string> = {
    'learning path': `Based on your ${experience} years of experience and current skills in ${skills.slice(0, 3).join(', ')}, I recommend focusing on ${desiredSkills.slice(0, 2).join(' and ')} first. This aligns with your goal to ${careerGoals[0] || 'advance your career'}.`,
    
    'recommend': `Looking at your profile, I'd recommend exploring ${desiredSkills[0] || 'new technologies'} through ${learningStyle === 'Visual' ? 'video tutorials' : learningStyle === 'Reading/Writing' ? 'documentation' : 'interactive exercises'}. This would complement your experience with ${skills[0] || 'your current skills'}.`,
    
    'best practice': `Best practices for ${skills[0] || 'your field'} include continuous learning and project-based experience. With your goals related to ${careerGoals[0] || 'career advancement'}, I suggest focusing on real-world applications of ${desiredSkills[0] || 'your desired skills'}.`,
    
    'course': `For someone with your background in ${skills.slice(0, 2).join(' and ')}, I'd recommend courses that focus on ${desiredSkills[0] || 'your areas of interest'}. Given your ${learningStyle} learning style, look for ${learningStyle === 'Visual' ? 'video-based' : learningStyle === 'Auditory' ? 'lecture-based' : learningStyle === 'Kinesthetic' ? 'hands-on' : 'comprehensive'} courses.`,
    
    'project idea': `Consider building a project that combines ${skills[0] || 'your strongest skill'} with ${desiredSkills[0] || 'what you want to learn'}. This could be a ${skills.includes('React') ? 'web application' : skills.includes('Python') ? 'data analysis tool' : 'portfolio project'} that showcases your abilities while learning new skills.`,
    
    'career advice': `With ${experience} years of experience and skills in ${skills.slice(0, 3).join(', ')}, you're positioned to pursue roles as a ${experience > 5 ? 'Senior Developer or Team Lead' : experience > 2 ? 'Mid-level Developer' : 'Junior Developer'}. Focus on ${desiredSkills[0]} to accelerate toward your goal of ${careerGoals[0] || 'advancement'}.`,
    
    'time management': `Based on your ${userProfile.timeAvailability} hours/week availability, I recommend breaking down learning ${desiredSkills[0] || 'new skills'} into ${Math.ceil(userProfile.timeAvailability/3)} sessions of 2-3 hours each. This structured approach works well with your ${learningStyle} learning style.`,
    
    'help': `I'm your AI Career Mentor! I can help with learning paths, course recommendations, project ideas, career advice, and more. Just ask me about topics related to your tech career and I'll provide personalized guidance based on your profile.`
  };
  
  // Lowercase query for matching
  const queryLower = query.toLowerCase();
  
  // Find matching response or generate a default one
  for (const [keyword, response] of Object.entries(responses)) {
    if (queryLower.includes(keyword)) {
      return response;
    }
  }
  
  // Default response if no keywords match
  return `Based on your profile with ${skills.length} skills and interest in ${desiredSkills.slice(0, 2).join(', ')}, I'd recommend focusing on projects and courses that align with your ${careerGoals[0] || 'career goals'}. Could you ask me something more specific about your learning path or career development?`;
} 