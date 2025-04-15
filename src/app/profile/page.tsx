'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCareerContext } from '@/app/CareerContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import AIMentor from '@/app/profile/AIMentor';
import { 
  EducationEntry, 
  ExperienceEntry, 
  ProjectEntry, 
  Certification 
} from '@/types/career';

// Helper function to safely get the length of possibly undefined arrays
const safeArrayLength = <T,>(arr: T[] | undefined | null): number => {
  return arr?.length ?? 0;
};

const ProfilePage = () => {
  const { userProfile, setUserProfile, isLoading, isSaving } = useCareerContext();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Refs to track if updates are from user actions
  const userActionRef = useRef({
    education: false,
    experience: false,
    projects: false,
    certifications: false,
    careerGoals: false,
    profileInfo: false
  });
  
  // Skills editing
  const [editingCurrentSkills, setEditingCurrentSkills] = useState(false);
  const [editingDesiredSkills, setEditingDesiredSkills] = useState(false);
  const [updatedCurrentSkills, setUpdatedCurrentSkills] = useState<string[]>([]);
  const [updatedDesiredSkills, setUpdatedDesiredSkills] = useState<string[]>([]);
  const [skillSearch, setSkillSearch] = useState('');
  
  // Career goals editing
  const [editingGoals, setEditingGoals] = useState(false);
  const [updatedGoals, setUpdatedGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState('');
  
  // Interests editing
  const [editingInterests, setEditingInterests] = useState(false);
  const [updatedInterests, setUpdatedInterests] = useState<string[]>([]);
  const [interestSearch, setInterestSearch] = useState('');
  
  // Education data and management
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([]);
  
  const [educationForm, setEducationForm] = useState({
    degree: '',
    institution: '',
    startYear: new Date().getFullYear().toString(),
    endYear: new Date().getFullYear().toString(),
    isFullTime: true
  });
  
  // Experience data and management
  const [experienceEntries, setExperienceEntries] = useState<ExperienceEntry[]>([]);
  
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  
  const [experienceForm, setExperienceForm] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    skills: [] as string[]
  });
  
  // State for skills to learn - these are currently unused but will be used in future features
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [skillsToLearn, setSkillsToLearn] = useState<string[]>([]);
  const [isEditingSkillsToLearn, setIsEditingSkillsToLearn] = useState(false);
  const [skillToLearnSearch, setSkillToLearnSearch] = useState('');
  /* eslint-enable @typescript-eslint/no-unused-vars */
  
  // State for certifications
  const [isAddingCertification, setIsAddingCertification] = useState(false);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  
  const [certificationForm, setCertificationForm] = useState({
    name: '',
    issuer: '',
    year: new Date().getFullYear().toString()
  });
  
  // State for projects
  const [projectEntries, setProjectEntries] = useState<ProjectEntry[]>([]);
  
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: [] as string[],
    link: '',
    image: ''
  });
  
  const skillOptions = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'Go', 'Rust',
    'React', 'Angular', 'Vue', 'Next.js', 'Node.js', 'Express', 'Django', 'Spring',
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform',
    'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'GraphQL', 'REST API'
  ];
  
  const interestOptions = [
    'Web Development', 'Mobile App Development', 'Game Development', 
    'Data Science', 'Artificial Intelligence', 'Machine Learning',
    'Cloud Computing', 'DevOps', 'Cybersecurity', 'Blockchain',
    'UI/UX Design', 'Product Management', 'Digital Marketing',
    'E-commerce', 'FinTech', 'HealthTech', 'EdTech', 'Enterprise Software'
  ];
  
  const [goalSearch, setGoalSearch] = useState('');
  
  const careerGoalOptions = [
    'Become a Senior Developer', 'Transition to Management', 'Start a Tech Company', 
    'Learn AI/ML', 'Specialize in Cloud Architecture', 'Become a Technical Lead',
    'Become a Solutions Architect', 'Get Promoted to Tech Director', 'Master DevOps Practices',
    'Develop Expertise in Cybersecurity', 'Transition to Product Management', 'Work at a FAANG Company',
    'Build a Successful Side Project', 'Become a Full-Stack Developer', 'Become a Mobile App Developer',
    'Transition to Data Science', 'Speak at Industry Conferences', 'Contribute to Open Source',
    'Earn Advanced Technical Certifications', 'Develop Leadership Skills', 'Work on Enterprise-Scale Projects'
  ];
  
  // Filter career goals based on search
  const filteredGoals = careerGoalOptions.filter(
    goal => goal.toLowerCase().includes(goalSearch.toLowerCase())
  );
  
  // Add states for editing personal info
  const [editingPersonalInfo, setEditingPersonalInfo] = useState(false);
  const [personalInfoForm, setPersonalInfoForm] = useState({
    experience: 0,
    education: 'High School' as 'High School' | 'Associate' | 'Bachelor' | 'Master' | 'PhD' | 'Self-Taught',
    preferredLearningStyle: 'Visual' as 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic' | 'Mixed',
    timeAvailability: 10
  });
  
  // Initialize empty profile if none exists
  useEffect(() => {
    if (!userProfile) {
      const emptyProfile = {
        id: session?.user?.email || 'temp-user',
        userId: session?.user?.email || 'temp-user',
        currentSkills: [],
        desiredSkills: [],
        experience: 0,
        education: 'High School' as 'High School' | 'Associate' | 'Bachelor' | 'Master' | 'PhD' | 'Self-Taught',
        interests: [],
        preferredLearningStyle: 'Visual' as 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic' | 'Mixed',
        timeAvailability: 5,
        careerGoals: [],
        educationEntries: [],
        experienceEntries: [],
        projectEntries: [],
        certifications: []
      };
      setUserProfile(emptyProfile);
    }
  }, [userProfile, session, setUserProfile]);
  
  // Initialize updated skills, goals, and interests when user profile changes
  useEffect(() => {
    if (userProfile) {
      setUpdatedCurrentSkills(userProfile?.currentSkills || []);
      setUpdatedDesiredSkills(userProfile?.desiredSkills || []);
      setUpdatedGoals(userProfile?.careerGoals || []);
      setUpdatedInterests(userProfile?.interests || []);
      
      setEducationEntries(userProfile?.educationEntries || []);
      setExperienceEntries(userProfile?.experienceEntries || []);
      setProjectEntries(userProfile?.projectEntries || []);
      setCertifications(userProfile?.certifications || []);
      
      // Set the personal info form
      setPersonalInfoForm({
        experience: userProfile?.experience || 0,
        education: userProfile?.education || 'High School',
        preferredLearningStyle: userProfile?.preferredLearningStyle || 'Mixed',
        timeAvailability: userProfile?.timeAvailability || 10
      });
    }
  }, [userProfile]);
  
  // Save education entries to localStorage when they change
  useEffect(() => {
    localStorage.setItem('educationEntries', JSON.stringify(educationEntries));
    
    // Only update userProfile if the change was from user action
    if (userActionRef.current.education && userProfile) {
      userActionRef.current.education = false;
      const updatedProfile = {
        ...userProfile,
        educationEntries
      };
      setUserProfile(updatedProfile);
    }
  }, [educationEntries, userProfile, setUserProfile]);
  
  // Save experience entries to localStorage when they change
  useEffect(() => {
    localStorage.setItem('experienceEntries', JSON.stringify(experienceEntries));
    
    // Only update userProfile if the change was from user action
    if (userActionRef.current.experience && userProfile) {
      userActionRef.current.experience = false;
      const updatedProfile = {
        ...userProfile,
        experienceEntries
      };
      setUserProfile(updatedProfile);
    }
  }, [experienceEntries, userProfile, setUserProfile]);
  
  // Save project entries to localStorage when they change
  useEffect(() => {
    localStorage.setItem('projectEntries', JSON.stringify(projectEntries));
    
    // Only update userProfile if the change was from user action
    if (userActionRef.current.projects && userProfile) {
      userActionRef.current.projects = false;
      const updatedProfile = {
        ...userProfile,
        projectEntries
      };
      setUserProfile(updatedProfile);
    }
  }, [projectEntries, userProfile, setUserProfile]);
  
  // Save certifications to localStorage when they change
  useEffect(() => {
    localStorage.setItem('certifications', JSON.stringify(certifications));
    
    // Only update userProfile if the change was from user action
    if (userActionRef.current.certifications && userProfile) {
      userActionRef.current.certifications = false;
      const updatedProfile = {
        ...userProfile,
        certifications
      };
      setUserProfile(updatedProfile);
    }
  }, [certifications, userProfile, setUserProfile]);
  
  // Filter skills based on search
  const filteredSkills = skillOptions.filter(
    skill => skill.toLowerCase().includes(skillSearch.toLowerCase())
  );
  
  // Filter interests based on search
  const filteredInterests = interestOptions.filter(
    interest => interest.toLowerCase().includes(interestSearch.toLowerCase())
  );
  
  // Toggle a skill selection
  const toggleSkill = (type: 'current' | 'desired', skill: string) => {
    if (type === 'current') {
      setUpdatedCurrentSkills((prev: string[]) => 
        prev.includes(skill)
          ? prev.filter((s: string) => s !== skill)
          : [...prev, skill]
      );
    } else {
      setUpdatedDesiredSkills((prev: string[]) => 
        prev.includes(skill)
          ? prev.filter((s: string) => s !== skill)
          : [...prev, skill]
      );
    }
  };
  
  // Toggle an interest selection
  const toggleInterest = (interest: string) => {
    setUpdatedInterests((prev: string[]) => 
      prev.includes(interest)
        ? prev.filter((i: string) => i !== interest)
        : [...prev, interest]
    );
  };
  
  // Toggle a career goal selection
  const toggleGoal = (goal: string) => {
    userActionRef.current.careerGoals = true;
    setUpdatedGoals((prev: string[]) => 
      prev.includes(goal)
        ? prev.filter((g: string) => g !== goal)
        : [...prev, goal]
    );
  };
  
  // Add a new goal
  const addGoal = () => {
    if (newGoal.trim()) {
      userActionRef.current.careerGoals = true;
      setUpdatedGoals((prev: string[]) => [...prev, newGoal.trim()]);
      setNewGoal('');
    }
  };
  
  // Remove a goal
  const removeGoal = (index: number) => {
    userActionRef.current.careerGoals = true;
    setUpdatedGoals((prev: string[]) => prev.filter((_: string, i: number) => i !== index));
  };
  
  // Save skills to user profile
  const saveSkills = () => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        currentSkills: updatedCurrentSkills,
        desiredSkills: updatedDesiredSkills
      });
      setEditingCurrentSkills(false);
      setEditingDesiredSkills(false);
    }
  };
  
  // Save interests to user profile
  const saveInterests = () => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        interests: updatedInterests
      });
      setEditingInterests(false);
    }
  };
  
  // Save goals to user profile
  const saveGoals = () => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        careerGoals: updatedGoals
      });
      setEditingGoals(false);
    }
  };
  
  // Handle education form input changes
  const handleEducationFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setEducationForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  // Add education entry
  const addEducation = () => {
    if (educationForm.degree.trim() && educationForm.institution.trim()) {
      userActionRef.current.education = true;
      setEducationEntries((prev: EducationEntry[]) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...educationForm
        }
      ]);
      
      setIsAddingEducation(false);
      
      // Reset form
      setEducationForm({
        degree: '',
        institution: '',
        startYear: new Date().getFullYear().toString(),
        endYear: new Date().getFullYear().toString(),
        isFullTime: true
      });
    }
  };
  
  // Delete education entry
  const deleteEducation = (id: string) => {
    userActionRef.current.education = true;
    setEducationEntries((prev: EducationEntry[]) => prev.filter((entry: EducationEntry) => entry.id !== id));
  };
  
  // Function to handle input changes for experience form
  const handleExperienceFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExperienceForm({
      ...experienceForm,
      [name]: value
    });
  };

  // Function to add a new skill to experience form
  const handleAddSkillToExperience = (skill: string) => {
    if (skill.trim() && !experienceForm.skills.includes(skill.trim())) {
      setExperienceForm({
        ...experienceForm,
        skills: [...experienceForm.skills, skill.trim()]
      });
    }
  };

  // Function to remove a skill from experience form
  const handleRemoveSkillFromExperience = (skillToRemove: string) => {
    setExperienceForm({
      ...experienceForm,
      skills: experienceForm.skills.filter((skill: string) => skill !== skillToRemove)
    });
  };

  // Function to handle submit for adding a new experience
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (experienceForm.title && experienceForm.company && experienceForm.startDate) {
      userActionRef.current.experience = true;
      const newExperience = {
        id: Date.now().toString(),
        ...experienceForm
      };
      setExperienceEntries([...experienceEntries, newExperience]);
      setExperienceForm({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        skills: [] as string[]
      });
      setIsAddingExperience(false);
    }
  };

  // Function to delete an experience entry
  const handleDeleteExperience = (id: string) => {
    userActionRef.current.experience = true;
    setExperienceEntries(experienceEntries.filter((entry: ExperienceEntry) => entry.id !== id));
  };

  // Function to handle input changes for project form
  const handleProjectFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectForm({
      ...projectForm,
      [name]: value
    });
  };

  // Function to add a new technology to project form
  const handleAddTechToProject = (tech: string) => {
    if (tech.trim() && !projectForm.technologies.includes(tech.trim())) {
      setProjectForm({
        ...projectForm,
        technologies: [...projectForm.technologies, tech.trim()]
      });
    }
  };

  // Function to remove a technology from project form
  const handleRemoveTechFromProject = (techToRemove: string) => {
    setProjectForm({
      ...projectForm,
      technologies: projectForm.technologies.filter((tech: string) => tech !== techToRemove)
    });
  };

  // Function to handle submit for adding a new project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectForm.title && projectForm.description) {
      userActionRef.current.projects = true;
      const newProject = {
        id: Date.now().toString(),
        ...projectForm
      };
      setProjectEntries([...projectEntries, newProject]);
      setProjectForm({
        title: '',
        description: '',
        technologies: [] as string[],
        link: '',
        image: ''
      });
      setIsAddingProject(false);
    }
  };

  // Function to delete a project entry
  const handleDeleteProject = (id: string) => {
    userActionRef.current.projects = true;
    setProjectEntries(projectEntries.filter((entry: ProjectEntry) => entry.id !== id));
  };

  // Function to handle certification form input changes
  const handleCertificationFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCertificationForm({
      ...certificationForm,
      [name]: value
    });
  };

  // Function to add a certification
  const addCertification = () => {
    if (certificationForm.name.trim() && certificationForm.issuer.trim()) {
      userActionRef.current.certifications = true;
      setCertifications((prev: Certification[]) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...certificationForm
        }
      ]);
      
      setIsAddingCertification(false);
      
      // Reset form
      setCertificationForm({
        name: '',
        issuer: '',
        year: new Date().getFullYear().toString()
      });
    }
  };

  // Function to delete a certification
  const deleteCertification = (id: string) => {
    userActionRef.current.certifications = true;
    setCertifications((prev: Certification[]) => prev.filter((cert: Certification) => cert.id !== id));
  };
  
  // Save career goals to localStorage and update user profile when they change
  useEffect(() => {
    localStorage.setItem('careerGoals', JSON.stringify(updatedGoals));
    
    // Only update userProfile if the change was from user action
    if (userActionRef.current.careerGoals && userProfile) {
      userActionRef.current.careerGoals = false;
      const updatedProfile = {
        ...userProfile,
        careerGoals: updatedGoals
      };
      setUserProfile(updatedProfile);
    }
  }, [updatedGoals, userProfile, setUserProfile]);

  // Handle personal info form changes
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalInfoForm((prev) => ({
      ...prev,
      [name]: name === 'experience' || name === 'timeAvailability' ? Number(value) : value
    }));
  };

  // Save personal info changes
  const savePersonalInfo = () => {
    if (!userProfile) return;
    
    userActionRef.current.profileInfo = true;
    setUserProfile({
      ...userProfile,
      ...personalInfoForm
    });
    setEditingPersonalInfo(false);
  };

  // Initialize userProfile with empty values if it doesn't exist
  useEffect(() => {
    if (!userProfile && session?.user?.email) {
      const emptyProfile = {
        id: session.user.email,
        userId: session.user.email,
        currentSkills: [],
        desiredSkills: [],
        interests: [],
        careerGoals: [],
        education: 'High School' as 'High School' | 'Associate' | 'Bachelor' | 'Master' | 'PhD' | 'Self-Taught',
        preferredLearningStyle: 'Visual' as 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic' | 'Mixed',
        timeAvailability: 5,
        experience: 0,
        educationEntries: [],
        experienceEntries: [],
        projectEntries: [],
        certifications: []
      };
      setUserProfile(emptyProfile);
    }
  }, [userProfile, session, setUserProfile]);

  // Calculate the completion percentage
  const totalFields = 8; // total number of fields in profile
  let completedFields = 0;
  if ((userProfile?.currentSkills?.length ?? 0) > 0) completedFields++;
  if ((userProfile?.desiredSkills?.length ?? 0) > 0) completedFields++;
  if ((userProfile?.interests?.length ?? 0) > 0) completedFields++;
  if ((userProfile?.careerGoals?.length ?? 0) > 0) completedFields++;
  if (userProfile?.education) completedFields++;
  if (userProfile?.preferredLearningStyle) completedFields++;
  if ((userProfile?.timeAvailability ?? 0) > 0) completedFields++;
  if ((userProfile?.experience ?? 0) >= 0) completedFields++;
  
  // This will be used in a future feature
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const completionPercentage = Math.round((completedFields / totalFields) * 100);

  // Add loading indicator component
  const LoadingIndicator = () => (
    <div className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center">
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {isSaving ? 'Saving...' : 'Loading...'}
    </div>
  );

  return (
    <div className="pt-24 pb-12 px-4">
      {(isLoading || isSaving) && <LoadingIndicator />}
      
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-16">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700 shadow-lg">
                {session?.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt="Profile" 
                    width={128} 
                    height={128} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <span className="text-4xl font-bold text-gray-500 dark:text-gray-400">
                      {session?.user?.name?.charAt(0) || userProfile?.userId?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4 md:mt-0 md:mb-2 flex-grow">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                  {session?.user?.name || 'User'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {userProfile?.education || 'No education listed'} • {userProfile?.experience || 0} {userProfile?.experience === 1 ? 'year' : 'years'} of experience
                </p>
              </div>
            </div>
          </div>

          {/* Profile Navigation */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-6">
            <nav className="flex overflow-x-auto">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'overview' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('skills')}
                className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'skills' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Skills
              </button>
              <button 
                onClick={() => setActiveTab('education')}
                className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'education' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Education
              </button>
              <button 
                onClick={() => setActiveTab('experience')}
                className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'experience' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Experience
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'projects' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Projects
              </button>
              <button 
                onClick={() => setActiveTab('certifications')}
                className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'certifications' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Certifications
              </button>
              <button 
                onClick={() => setActiveTab('career-goals')}
                className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'career-goals' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Career Goals
              </button>
              <button 
                onClick={() => setActiveTab('interests')}
                className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'interests' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Interests
              </button>
            </nav>
          </div>
        </div>

        {/* Profile Content */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Personal Info</h2>
                <button 
                  onClick={() => setEditingPersonalInfo(!editingPersonalInfo)}
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  {editingPersonalInfo ? 'Cancel' : 'Edit'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                  <p className="text-gray-800 dark:text-white">{session?.user?.email || 'Not provided'}</p>
                </div>
                
                {editingPersonalInfo ? (
                  <>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Experience (years)</h3>
                      <input
                        type="number"
                        name="experience"
                        min="0"
                        max="50"
                        value={personalInfoForm.experience}
                        onChange={handlePersonalInfoChange}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Education</h3>
                      <select
                        name="education"
                        value={personalInfoForm.education}
                        onChange={handlePersonalInfoChange}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      >
                        <option value="High School">High School</option>
                        <option value="Associate">Associate</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                        <option value="PhD">PhD</option>
                        <option value="Self-Taught">Self-Taught</option>
                      </select>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Preferred Learning Style</h3>
                      <select
                        name="preferredLearningStyle"
                        value={personalInfoForm.preferredLearningStyle}
                        onChange={handlePersonalInfoChange}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      >
                        <option value="Visual">Visual</option>
                        <option value="Auditory">Auditory</option>
                        <option value="Reading/Writing">Reading/Writing</option>
                        <option value="Kinesthetic">Kinesthetic</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Time Availability (hours/week)</h3>
                      <input
                        type="number"
                        name="timeAvailability"
                        min="1"
                        max="168"
                        value={personalInfoForm.timeAvailability}
                        onChange={handlePersonalInfoChange}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>
                    
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={savePersonalInfo}
                        className="btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Experience</h3>
                      <p className="text-gray-800 dark:text-white">{userProfile?.experience} {userProfile?.experience === 1 ? 'year' : 'years'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Education</h3>
                      <p className="text-gray-800 dark:text-white">{userProfile?.education}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Preferred Learning Style</h3>
                      <p className="text-gray-800 dark:text-white">{userProfile?.preferredLearningStyle}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Availability</h3>
                      <p className="text-gray-800 dark:text-white">{userProfile?.timeAvailability} hours/week</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* AI Mentor Component */}
            <div className="mt-6">
              <AIMentor />
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Profile Summary</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Education & Experience Summary */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">Education</h3>
                        {educationEntries.length > 0 ? (
                          <>
                            <p className="text-gray-600 dark:text-gray-400 flex justify-between">
                              <span>{educationEntries[0]?.degree}</span>
                              <span className="text-sm">{educationEntries[0]?.startYear}-{educationEntries[0]?.endYear}</span>
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{educationEntries[0]?.institution}</p>
                          </>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">No education entries yet</p>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">Experience</h3>
                        {experienceEntries.length > 0 ? (
                          <>
                            <p className="text-gray-600 dark:text-gray-400 flex justify-between">
                              <span>{experienceEntries[0]?.title}</span>
                              <span className="text-sm">{experienceEntries[0]?.startDate} - {experienceEntries[0]?.endDate || 'Present'}</span>
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{experienceEntries[0]?.company}</p>
                          </>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">No experience entries yet</p>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">Learning Preferences</h3>
                        <p className="text-gray-600 dark:text-gray-400">Style: {userProfile?.preferredLearningStyle || 'Not specified'}</p>
                        <p className="text-gray-600 dark:text-gray-400">Time Available: {userProfile?.timeAvailability || 0} hours/week</p>
                      </div>
                    </div>
                    
                    {/* Skills & Projects Summary */}
                    <div>
                      <div className="mb-4">
                        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">Top Skills</h3>
                        <div className="flex flex-wrap gap-1">
                          {userProfile?.currentSkills?.slice(0, 5).map((skill) => (
                            <span 
                              key={skill} 
                              className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                          {safeArrayLength(userProfile?.currentSkills) > 5 && (
                            <button 
                              onClick={() => setActiveTab('skills')}
                              className="text-xs text-primary hover:text-primary-dark"
                            >
                              +{safeArrayLength(userProfile?.currentSkills) - 5} more
                            </button>
                          )}
                          {safeArrayLength(userProfile?.currentSkills) === 0 && (
                            <p className="text-gray-500 dark:text-gray-400 text-sm">No skills added yet</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">Projects</h3>
                        {projectEntries.length > 0 ? (
                          <>
                            <p className="text-gray-600 dark:text-gray-400">
                              {projectEntries.slice(0, 2).map(project => project.title).join(', ')}
                              {projectEntries.length > 2 && ` +${projectEntries.length - 2} more`}
                            </p>
                            <button 
                              onClick={() => setActiveTab('projects')}
                              className="text-xs text-primary hover:text-primary-dark"
                            >
                              View details
                            </button>
                          </>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">No projects added yet</p>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">Certifications</h3>
                        {certifications.length > 0 ? (
                          <>
                            <p className="text-gray-600 dark:text-gray-400">
                              {certifications.slice(0, 2).map(cert => cert.name).join(', ')}
                              {certifications.length > 2 && ` +${certifications.length - 2} more`}
                            </p>
                            <button 
                              onClick={() => setActiveTab('certifications')}
                              className="text-xs text-primary hover:text-primary-dark"
                            >
                              View details
                            </button>
                          </>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">No certifications added yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Skills Summary</h2>
                    <button 
                      onClick={() => setActiveTab('skills')} 
                      className="text-sm text-primary hover:text-primary-dark font-medium"
                    >
                      See all
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Current Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile?.currentSkills?.slice(0, 8).map((skill) => (
                          <span 
                            key={skill} 
                            className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                        {(userProfile?.currentSkills && userProfile.currentSkills.length > 8) && (
                          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                            +{userProfile.currentSkills.length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Skills to Learn</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile?.desiredSkills?.slice(0, 8).map((skill) => (
                          <span 
                            key={skill} 
                            className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                        {(userProfile?.desiredSkills && userProfile.desiredSkills.length > 8) && (
                          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                            +{userProfile.desiredSkills.length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Career Goals</h2>
                  {userProfile?.careerGoals && userProfile.careerGoals.length > 0 ? (
                    <ul className="space-y-2">
                      {userProfile?.careerGoals?.map((goal, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-white text-xs">{index + 1}</span>
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No career goals specified yet.</p>
                  )}
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Interests</h2>
                    <button 
                      onClick={() => setActiveTab('interests')} 
                      className="text-sm text-primary hover:text-primary-dark font-medium"
                    >
                      See all
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {userProfile?.interests?.slice(0, 8).map((interest) => (
                      <span 
                        key={interest} 
                        className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-lg text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                    {(userProfile?.interests && userProfile.interests.length > 8) && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        +{userProfile.interests.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'skills' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Skills</h2>
                
                <div className="space-y-8">
                  {/* Current Skills Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">Current Skills</h3>
                      <button 
                        onClick={() => setEditingCurrentSkills(!editingCurrentSkills)}
                        className="text-primary hover:text-primary-dark text-sm font-medium"
                      >
                        {editingCurrentSkills ? 'Cancel' : 'Edit'}
                      </button>
                    </div>
                    
                    {editingCurrentSkills ? (
                      <div className="mb-4">
                        <div className="mb-2">
                          <input
                            type="text"
                            placeholder="Search skills to add..."
                            value={skillSearch}
                            onChange={(e) => setSkillSearch(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                          {filteredSkills.map((skill) => (
                            <div 
                              key={`current-${skill}`}
                              onClick={() => toggleSkill('current', skill)}
                              className={`p-2.5 rounded-md cursor-pointer text-sm ${
                                updatedCurrentSkills.includes(skill)
                                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                              }`}
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                        
                        {updatedCurrentSkills.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Skills:</h3>
                            <div className="flex flex-wrap gap-2">
                              {updatedCurrentSkills.map(skill => (
                                <span 
                                  key={`selected-${skill}`}
                                  className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm flex items-center"
                                >
                                  {skill}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSkill('current', skill);
                                    }}
                                    className="ml-2 text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {userProfile?.currentSkills?.map((skill) => (
                          <span 
                            key={skill} 
                            className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                        {(userProfile?.currentSkills && userProfile.currentSkills.length === 0) && (
                          <p className="text-gray-500 dark:text-gray-400 text-sm">No skills added yet.</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Desired Skills Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">Skills to Learn</h3>
                      <button 
                        onClick={() => setEditingDesiredSkills(!editingDesiredSkills)}
                        className="text-primary hover:text-primary-dark text-sm font-medium"
                      >
                        {editingDesiredSkills ? 'Cancel' : 'Edit'}
                      </button>
                    </div>
                    
                    {editingDesiredSkills ? (
                      <div className="mb-4">
                        <div className="mb-2">
                          <input
                            type="text"
                            placeholder="Search skills to learn..."
                            value={skillSearch}
                            onChange={(e) => setSkillSearch(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                          {filteredSkills.map((skill) => (
                            <div 
                              key={`desired-${skill}`}
                              onClick={() => toggleSkill('desired', skill)}
                              className={`p-2.5 rounded-md cursor-pointer text-sm ${
                                updatedDesiredSkills.includes(skill)
                                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-700'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                              }`}
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                        
                        {updatedDesiredSkills.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills to Learn:</h3>
                            <div className="flex flex-wrap gap-2">
                              {updatedDesiredSkills.map(skill => (
                                <span 
                                  key={`selected-desired-${skill}`}
                                  className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm flex items-center"
                                >
                                  {skill}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSkill('desired', skill);
                                    }}
                                    className="ml-2 text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-200"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {userProfile?.desiredSkills?.map((skill) => (
                          <span 
                            key={skill} 
                            className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                        {(userProfile?.desiredSkills && userProfile.desiredSkills.length === 0) && (
                          <p className="text-gray-500 dark:text-gray-400 text-sm">No skills to learn added yet.</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Save Button */}
                  {(editingCurrentSkills || editingDesiredSkills) && (
                    <div className="flex justify-end">
                      <button
                        onClick={saveSkills}
                        className="btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'career-goals' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Career Goals</h2>
                  <button 
                    onClick={() => setEditingGoals(!editingGoals)}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    {editingGoals ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                
                {editingGoals ? (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Search career goals or type new goal..."
                        value={goalSearch}
                        onChange={(e) => setGoalSearch(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                      {filteredGoals.map(goal => (
                        <div 
                          key={goal} 
                          onClick={() => toggleGoal(goal)}
                          className={`p-2 rounded-md cursor-pointer text-sm ${
                            updatedGoals.includes(goal)
                              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                          }`}
                        >
                          {goal}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add a custom career goal"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        className="flex-grow px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                      />
                      <button
                        onClick={addGoal}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700"
                      >
                        Add
                      </button>
                    </div>
                    
                    {updatedGoals.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Career Goals:</h3>
                        <div className="flex flex-wrap gap-2">
                          {updatedGoals.map(goal => (
                            <span 
                              key={goal}
                              className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-lg text-sm font-medium flex items-center"
                            >
                              {goal}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeGoal(updatedGoals.indexOf(goal));
                                }}
                                className="ml-2 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={saveGoals}
                        className="btn-primary"
                      >
                        Save Goals
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-3">
                      {userProfile?.careerGoals?.map((goal) => (
                        <span 
                          key={goal} 
                          className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          {goal}
                        </span>
                      ))}
                    </div>
                    
                    {(userProfile?.careerGoals && userProfile.careerGoals.length === 0) && (
                      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6 text-center">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">No career goals specified yet.</p>
                        <button 
                          onClick={() => setEditingGoals(true)}
                          className="btn-primary"
                        >
                          Add Career Goals
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            
            {activeTab === 'interests' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Interests</h2>
                  <button 
                    onClick={() => setEditingInterests(!editingInterests)}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    {editingInterests ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                
                {editingInterests ? (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Search interests..."
                        value={interestSearch}
                        onChange={(e) => setInterestSearch(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                      {filteredInterests.map(interest => (
                        <div 
                          key={interest} 
                          onClick={() => toggleInterest(interest)}
                          className={`p-2 rounded-md cursor-pointer text-sm ${
                            updatedInterests.includes(interest)
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                          }`}
                        >
                          {interest}
                        </div>
                      ))}
                    </div>
                    
                    {updatedInterests.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Interests:</h3>
                        <div className="flex flex-wrap gap-2">
                          {updatedInterests.map(interest => (
                            <span 
                              key={interest}
                              className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-lg text-sm font-medium flex items-center"
                            >
                              {interest}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleInterest(interest);
                                }}
                                className="ml-2 text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-200"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={saveInterests}
                        className="btn-primary"
                      >
                        Save Interests
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-3">
                      {userProfile?.interests?.map((interest) => (
                        <span 
                          key={interest} 
                          className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                    
                    {(userProfile?.interests && userProfile.interests.length === 0) && (
                      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6 text-center">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">No interests specified yet.</p>
                        <button 
                          onClick={() => setEditingInterests(true)}
                          className="btn-primary"
                        >
                          Add Interests
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            
            {activeTab === 'projects' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Projects</h2>
                  <button 
                    onClick={() => setIsAddingProject(!isAddingProject)}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    {isAddingProject ? 'Cancel' : 'Add Project'}
                  </button>
                </div>
                
                {isAddingProject && (
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Add New Project</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Title</label>
                        <input
                          type="text"
                          name="title"
                          placeholder="E.g., E-commerce Platform, Task Manager"
                          value={projectForm.title}
                          onChange={handleProjectFormChange}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                          name="description"
                          rows={3}
                          placeholder="Describe your project"
                          value={projectForm.description}
                          onChange={handleProjectFormChange}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies Used</label>
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            type="text"
                            placeholder="Add a technology and press Enter"
                            className="flex-grow px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddTechToProject(e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                        </div>
                        
                        {projectForm.technologies.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {projectForm.technologies.map((tech) => (
                              <span 
                                key={tech}
                                className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs flex items-center"
                              >
                                {tech}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTechFromProject(tech)}
                                  className="ml-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Link (Optional)</label>
                        <input
                          type="text"
                          name="link"
                          placeholder="E.g., https://github.com/username/project"
                          value={projectForm.link}
                          onChange={handleProjectFormChange}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <button
                          onClick={handleAddProject}
                          className="btn-primary"
                        >
                          Add Project
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-5">
                  {projectEntries.length > 0 ? (
                    projectEntries.map((entry) => (
                      <div key={entry.id} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white">{entry.title}</h3>
                          <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs">SELF WORK (Other)</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                          {entry.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {entry.technologies.map((tech) => (
                            <span key={tech} className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">{tech}</span>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          {entry.link && (
                            <a 
                              href={entry.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary-dark text-sm font-medium inline-flex items-center"
                            >
                              View Project
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                          <button
                            onClick={() => handleDeleteProject(entry.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">No projects added yet.</p>
                      <button
                        onClick={() => setIsAddingProject(true)}
                        className="btn-primary"
                      >
                        Add Your First Project
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'education' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Education</h2>
                  <button 
                    onClick={() => setIsAddingEducation(!isAddingEducation)}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    {isAddingEducation ? 'Cancel' : 'Add Education'}
                  </button>
                </div>
                
                {isAddingEducation ? (
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Add New Education</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Degree/Qualification</label>
                        <input
                          type="text"
                          name="degree"
                          placeholder="E.g., B.Tech E.E., MBA, Ph.D in Computer Science"
                          value={educationForm.degree}
                          onChange={handleEducationFormChange}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Institution</label>
                        <input
                          type="text"
                          name="institution"
                          placeholder="School/University name"
                          value={educationForm.institution}
                          onChange={handleEducationFormChange}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Year</label>
                          <input
                            type="text"
                            name="startYear"
                            value={educationForm.startYear}
                            onChange={handleEducationFormChange}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Year</label>
                          <input
                            type="text"
                            name="endYear"
                            value={educationForm.endYear}
                            onChange={handleEducationFormChange}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isFullTime"
                          name="isFullTime"
                          checked={educationForm.isFullTime}
                          onChange={handleEducationFormChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isFullTime" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Full Time
                        </label>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <button
                          onClick={addEducation}
                          className="btn-primary"
                        >
                          Add Education
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                
                <div className="space-y-5">
                  {educationEntries.map((entry) => (
                    <div key={entry.id} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">{entry.degree}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{entry.startYear} - {entry.endYear}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">
                        {entry.institution}
                      </p>
                      <button
                        onClick={() => deleteEducation(entry.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'experience' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Work Experience</h2>
                  <button 
                    onClick={() => setIsAddingExperience(!isAddingExperience)}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    {isAddingExperience ? 'Cancel' : 'Add Experience'}
                  </button>
                </div>
                
                {isAddingExperience && (
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Add New Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                        <input
                          type="text"
                          name="title"
                          placeholder="E.g., Software Engineer, Project Manager"
                          value={experienceForm.title}
                          onChange={handleExperienceFormChange}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                        <input
                          type="text"
                          name="company"
                          placeholder="Company name"
                          value={experienceForm.company}
                          onChange={handleExperienceFormChange}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                          <input
                            type="text"
                            name="startDate"
                            placeholder="E.g., Jan 2020"
                            value={experienceForm.startDate}
                            onChange={handleExperienceFormChange}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                          <input
                            type="text"
                            name="endDate"
                            placeholder="E.g., Present, May 2022"
                            value={experienceForm.endDate}
                            onChange={handleExperienceFormChange}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                          name="description"
                          rows={3}
                          placeholder="Describe your responsibilities and achievements"
                          value={experienceForm.description}
                          onChange={handleExperienceFormChange}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Skills Used</label>
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            type="text"
                            placeholder="Add a skill and press Enter"
                            className="flex-grow px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddSkillToExperience(e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                        </div>
                        
                        {experienceForm.skills.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {experienceForm.skills.map((skill) => (
                              <span 
                                key={skill}
                                className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs flex items-center"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSkillFromExperience(skill)}
                                  className="ml-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <button
                          onClick={handleAddExperience}
                          className="btn-primary"
                        >
                          Add Experience
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  {experienceEntries.length > 0 ? (
                    experienceEntries.map((entry) => (
                      <div key={entry.id} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white">{entry.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{entry.company}</p>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{entry.startDate} to {entry.endDate}</span>
                        </div>
                        
                        {entry.description && (
                          <p className="text-gray-600 dark:text-gray-300 mb-3">{entry.description}</p>
                        )}
                        
                        {entry.skills.length > 0 && (
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            Key skills:
                            <div className="flex flex-wrap gap-2 mt-1">
                              {entry.skills.map((skill) => (
                                <span key={skill} className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <button
                          onClick={() => handleDeleteExperience(entry.id)}
                          className="text-red-500 hover:text-red-700 text-sm mt-3 block"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">No work experience added yet.</p>
                      <button
                        onClick={() => setIsAddingExperience(true)}
                        className="btn-primary"
                      >
                        Add Your First Experience
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'certifications' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Certifications</h2>
                  <button 
                    onClick={() => setIsAddingCertification(!isAddingCertification)}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    {isAddingCertification ? 'Cancel' : 'Add Certification'}
                  </button>
                </div>
                
                {isAddingCertification && (
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Add New Certification</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Certification Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="E.g., Azure Developer Associate"
                          value={certificationForm.name}
                          onChange={handleCertificationFormChange}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issuing Organization</label>
                        <input
                          type="text"
                          name="issuer"
                          placeholder="E.g., Microsoft, Udemy"
                          value={certificationForm.issuer}
                          onChange={handleCertificationFormChange}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                        <input
                          type="text"
                          name="year"
                          placeholder="Year of certification"
                          value={certificationForm.year}
                          onChange={handleCertificationFormChange}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <button
                          onClick={addCertification}
                          className="btn-primary"
                        >
                          Add Certification
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {certifications.length > 0 ? (
                    certifications.map((cert) => (
                      <div key={cert.id} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                            {cert.name}
                          </h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{cert.year}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {cert.issuer}
                        </p>
                        <button
                          onClick={() => deleteCertification(cert.id)}
                          className="text-red-500 hover:text-red-700 text-sm mt-3 block"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">No certifications added yet.</p>
                      <button
                        onClick={() => setIsAddingCertification(true)}
                        className="btn-primary"
                      >
                        Add Your First Certification
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 