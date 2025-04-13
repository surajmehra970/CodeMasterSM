'use client';

import React, { useState, useEffect } from 'react';
import { useCareerContext } from '@/app/CareerContext';
import { UserProfile } from '@/types/career';
import { v4 as uuidv4 } from 'uuid';

const skillOptions = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'Go', 'Rust',
  'React', 'Angular', 'Vue', 'Next.js', 'Node.js', 'Express', 'Django', 'Spring',
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform',
  'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'GraphQL', 'REST API',
  'Machine Learning', 'Data Science', 'Data Engineering', 'Deep Learning',
  'DevOps', 'CI/CD', 'Agile', 'Scrum', 'Product Management',
  'UI/UX Design', 'Mobile Development', 'iOS', 'Android', 'Flutter', 'React Native',
  'Blockchain', 'Cybersecurity', 'Network Engineering', 'Game Development'
];

const interestOptions = [
  'Web Development', 'Mobile App Development', 'Game Development', 
  'Data Science', 'Artificial Intelligence', 'Machine Learning',
  'Cloud Computing', 'DevOps', 'Cybersecurity', 'Blockchain',
  'UI/UX Design', 'Product Management', 'Digital Marketing',
  'E-commerce', 'FinTech', 'HealthTech', 'EdTech', 'Enterprise Software',
  'Open Source', 'Startups', 'Research', 'Teaching/Mentoring'
];

const CareerProfileForm: React.FC<{ initialSection?: string | null }> = ({ initialSection }) => {
  const { userProfile, setUserProfile } = useCareerContext();
  
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    currentSkills: [],
    desiredSkills: [],
    experience: 0,
    education: 'Bachelor',
    interests: [],
    preferredLearningStyle: 'Mixed',
    timeAvailability: 10,
    careerGoals: [],
  });

  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  const [interestSearchTerm, setInterestSearchTerm] = useState('');

  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);

  // Add effect to scroll to the initial section if provided
  useEffect(() => {
    if (initialSection) {
      const sectionElement = document.getElementById(`profile-section-${initialSection}`);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Add a highlight class to the section
        sectionElement.classList.add('highlight-section');
        // Remove the highlight class after a delay
        setTimeout(() => {
          sectionElement.classList.remove('highlight-section');
        }, 2000);
      }
    }
  }, [initialSection]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: 'currentSkills' | 'desiredSkills' | 'interests', value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] || [];
      if (currentArray.includes(value)) {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...currentArray, value] };
      }
    });
  };

  const handleCareerGoalAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      e.preventDefault();
      const newGoal = e.currentTarget.value.trim();
      
      setFormData(prev => ({
        ...prev,
        careerGoals: [...(prev.careerGoals || []), newGoal]
      }));
      
      e.currentTarget.value = '';
    }
  };

  const removeCareerGoal = (index: number) => {
    setFormData(prev => ({
      ...prev,
      careerGoals: prev.careerGoals?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProfile: UserProfile = {
      id: userProfile?.id || uuidv4(),
      userId: userProfile?.userId || 'temp-user-id', // This would normally come from auth
      ...formData
    } as UserProfile;
    
    setUserProfile(newProfile);
  };

  // Filter skills based on search term
  const filteredSkills = skillOptions.filter(skill => 
    skill.toLowerCase().includes(skillSearchTerm.toLowerCase())
  );

  // Filter interests based on search term
  const filteredInterests = interestOptions.filter(interest => 
    interest.toLowerCase().includes(interestSearchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Career Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Skills Section */}
        <div id="profile-section-skills" className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Skills & Expertise</h3>
          
          {/* Current Skills */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Skills
            </label>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Search skills..."
                value={skillSearchTerm}
                onChange={(e) => setSkillSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm mb-2"
              />
            </div>
            <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {filteredSkills.map(skill => (
                  <div key={`current-${skill}`} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`current-${skill}`}
                      checked={formData.currentSkills?.includes(skill) || false}
                      onChange={() => handleCheckboxChange('currentSkills', skill)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`current-${skill}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300 truncate">
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {formData.currentSkills && formData.currentSkills.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Selected Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {formData.currentSkills.map(skill => (
                    <span 
                      key={`selected-${skill}`} 
                      className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded text-xs flex items-center"
                    >
                      {skill}
                      <button 
                        type="button" 
                        onClick={() => handleCheckboxChange('currentSkills', skill)}
                        className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desired Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Skills You Want to Learn
            </label>
            <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {filteredSkills.map(skill => (
                  <div key={`desired-${skill}`} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`desired-${skill}`}
                      checked={formData.desiredSkills?.includes(skill) || false}
                      onChange={() => handleCheckboxChange('desiredSkills', skill)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`desired-${skill}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300 truncate">
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {formData.desiredSkills && formData.desiredSkills.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills to Learn:</p>
                <div className="flex flex-wrap gap-1">
                  {formData.desiredSkills.map(skill => (
                    <span 
                      key={`selected-desired-${skill}`} 
                      className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded text-xs flex items-center"
                    >
                      {skill}
                      <button 
                        type="button" 
                        onClick={() => handleCheckboxChange('desiredSkills', skill)}
                        className="ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Background & Experience Section */}
        <div id="profile-section-experience" className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Background & Experience</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Years of Experience
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  name="experience"
                  min="0"
                  max="20"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-3 text-gray-700 dark:text-gray-300 min-w-[2rem] text-center">
                  {formData.experience}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Beginner</span>
                <span>Experienced</span>
              </div>
            </div>

            {/* Education */}
            <div id="profile-section-education" className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Education Level
              </label>
              <select
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="High School">High School</option>
                <option value="Associate">Associate Degree</option>
                <option value="Bachelor">Bachelor's Degree</option>
                <option value="Master">Master's Degree</option>
                <option value="PhD">PhD</option>
                <option value="Self-Taught">Self-Taught</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interests & Preferences Section */}
        <div id="profile-section-interests" className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Interests & Preferences</h3>
          
          {/* Interests */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interests
            </label>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Search interests..."
                value={interestSearchTerm}
                onChange={(e) => setInterestSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm mb-2"
              />
            </div>
            <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {filteredInterests.map(interest => (
                  <div key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`interest-${interest}`}
                      checked={formData.interests?.includes(interest) || false}
                      onChange={() => handleCheckboxChange('interests', interest)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`interest-${interest}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300 truncate">
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {formData.interests && formData.interests.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Selected Interests:</p>
                <div className="flex flex-wrap gap-1">
                  {formData.interests.map(interest => (
                    <span 
                      key={`selected-interest-${interest}`} 
                      className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded text-xs flex items-center"
                    >
                      {interest}
                      <button 
                        type="button" 
                        onClick={() => handleCheckboxChange('interests', interest)}
                        className="ml-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Learning Style & Time Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Learning Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Learning Style
              </label>
              <div className="space-y-2">
                {['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic', 'Mixed'].map((style) => (
                  <div key={style} className="flex items-center">
                    <input
                      type="radio"
                      id={`learning-style-${style}`}
                      name="preferredLearningStyle"
                      value={style}
                      checked={formData.preferredLearningStyle === style}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor={`learning-style-${style}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {style === 'Kinesthetic' ? 'Kinesthetic (Hands-on)' : style}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hours Available for Learning per Week: <span className="font-bold">{formData.timeAvailability}</span>
              </label>
              <input
                type="range"
                name="timeAvailability"
                min="1"
                max="40"
                value={formData.timeAvailability}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1 hour</span>
                <span>20 hours</span>
                <span>40 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Career Goals Section */}
        <div id="profile-section-career-goals" className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Career Goals
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.careerGoals?.map((goal, index) => (
              <div key={index} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full flex items-center">
                <span className="mr-1">{goal}</span>
                <button
                  type="button"
                  onClick={() => removeCareerGoal(index)}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 focus:outline-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type a goal and press Enter"
              onKeyDown={handleCareerGoalAdd}
              className="flex-grow px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            <button
              type="button"
              onClick={(e) => {
                const input = e.currentTarget.previousSibling as HTMLInputElement;
                if (input.value.trim()) {
                  setFormData(prev => ({
                    ...prev,
                    careerGoals: [...(prev.careerGoals || []), input.value.trim()]
                  }));
                  input.value = '';
                }
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-md"
            >
              Add
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            E.g., "Become a full-stack developer", "Get a job at a tech startup"
          </p>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default CareerProfileForm; 