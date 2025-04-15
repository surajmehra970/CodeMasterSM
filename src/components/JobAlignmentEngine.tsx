'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useCareerContext } from '@/app/CareerContext';
import { JobListing } from '@/types/career';

const JobAlignmentEngine: React.FC = () => {
  const { userProfile, selectedCareerTrack } = useCareerContext();
  
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillGaps, setSkillGaps] = useState<{ skill: string, frequency: number }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  
  // Calculate skill gaps from job listings
  const calculateSkillGaps = useCallback((listings: JobListing[]) => {
    if (!userProfile) return;
    
    // Count frequency of skills across all job listings
    const skillFrequency: Record<string, number> = {};
    
    listings.forEach(job => {
      [...job.requiredSkills, ...job.niceToHaveSkills].forEach(skill => {
        skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
      });
    });
    
    // Filter out skills the user already has
    const userSkills = new Set([...userProfile?.currentSkills || []]);
    const missingSkills = Object.entries(skillFrequency)
      .filter(([skill]) => !userSkills.has(skill))
      .map(([skill, frequency]) => ({ skill, frequency }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5); // Top 5 missing skills
    
    setSkillGaps(missingSkills);
  }, [userProfile]);
  
  // Fetch job listings
  useEffect(() => {
    if (!selectedCareerTrack) return;
    
    // Simulate API fetch for job listings
    const fetchJobListings = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would call your API
        // For now, we'll use mock data
        setTimeout(() => {
          // Create mock job listings based on selected career track
          const mockListings: JobListing[] = Array.from({ length: 10 }, (_, i) => {
            // Select a random subset of required skills from the career track
            const requiredSkillsCount = Math.floor(Math.random() * 3) + 3; // 3-5 skills
            const shuffledSkills = [...selectedCareerTrack.requiredSkills].sort(() => 0.5 - Math.random());
            const requiredSkills = shuffledSkills.slice(0, requiredSkillsCount);
            
            // Add some skills that might not be in the user's profile
            const additionalSkills = [
              'Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure',
              'GraphQL', 'REST API', 'Microservices', 'Unit Testing',
              'Redux', 'Vue.js', 'Angular', 'Express.js', 'Django'
            ].sort(() => 0.5 - Math.random()).slice(0, 2);
            
            // Create nice-to-have skills (a mix of required and additional)
            const niceToHaveSkillsCount = Math.floor(Math.random() * 3) + 2; // 2-4 skills
            const allPossibleSkills = [...selectedCareerTrack.requiredSkills, ...additionalSkills];
            const niceToHaveSkills = allPossibleSkills
              .filter(skill => !requiredSkills.includes(skill))
              .sort(() => 0.5 - Math.random())
              .slice(0, niceToHaveSkillsCount);
            
            // Generate random locations
            const locations = [
              'Remote', 'New York, NY', 'San Francisco, CA', 'Seattle, WA',
              'Austin, TX', 'Boston, MA', 'Chicago, IL', 'Los Angeles, CA',
              'Denver, CO', 'Atlanta, GA', 'Miami, FL', 'Washington, DC'
            ];
            
            // Generate random companies
            const companies = [
              'TechCorp', 'InnovateSoft', 'DataSystems', 'CloudNine Technologies',
              'Quantum Solutions', 'Apex Digital', 'FusionTech', 'ByteWorks',
              'NextGen IT', 'Velocity Tech', 'PrimeCode', 'EliteWare'
            ];
            
            // Generate random salary ranges
            const salaryRanges = [
              '$80,000 - $100,000', 
              '$90,000 - $110,000',
              '$100,000 - $120,000', 
              '$110,000 - $130,000',
              '$120,000 - $140,000', 
              '$130,000 - $150,000',
              '$140,000 - $160,000'
            ];
            
            // Generate a posted date within the last 30 days
            const postedDate = new Date();
            postedDate.setDate(postedDate.getDate() - Math.floor(Math.random() * 30));
            
            return {
              id: `job-${i}`,
              title: `${selectedCareerTrack.jobTitles[i % selectedCareerTrack.jobTitles.length]}`,
              company: companies[i % companies.length] || 'Unknown Company',
              location: locations[i % locations.length] || 'Remote',
              description: `We are looking for a talented ${selectedCareerTrack.jobTitles[i % selectedCareerTrack.jobTitles.length]} to join our team. You will be responsible for designing, building, and maintaining ${selectedCareerTrack.title.toLowerCase()} solutions. The ideal candidate has experience with ${requiredSkills.join(', ')}.`,
              requiredSkills,
              niceToHaveSkills,
              salaryRange: salaryRanges[i % salaryRanges.length] || 'Competitive',
              postedDate,
              url: '#'
            };
          });
          
          setJobListings(mockListings);
          setFilteredListings(mockListings);
          setIsLoading(false);
          
          // Calculate skill gaps
          calculateSkillGaps(mockListings);
        }, 1000);
      } catch (error) {
        console.error('Error fetching job listings:', error);
        setIsLoading(false);
      }
    };
    
    fetchJobListings();
  }, [selectedCareerTrack, calculateSkillGaps]);
  
  // Filter job listings based on search term and location
  useEffect(() => {
    if (jobListings.length === 0) return;
    
    const filtered = jobListings.filter(job => {
      const matchesSearch = searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        job.niceToHaveSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = selectedLocation === '' || 
        job.location === selectedLocation;
      
      return matchesSearch && matchesLocation;
    });
    
    setFilteredListings(filtered);
  }, [searchTerm, selectedLocation, jobListings]);
  
  // Extract all unique locations from job listings
  const getUniqueLocations = () => {
    const locations = new Set(jobListings.map(job => job.location));
    return Array.from(locations);
  };
  
  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };
  
  // Calculate skills match percentage
  const calculateSkillsMatch = (job: JobListing) => {
    if (!userProfile) return 0;
    
    const userSkills = new Set([...userProfile?.currentSkills || []]);
    const requiredSkillsMatch = job.requiredSkills.filter(skill => userSkills.has(skill)).length;
    const niceToHaveSkillsMatch = job.niceToHaveSkills.filter(skill => userSkills.has(skill)).length;
    
    // Weigh required skills more heavily
    const requiredWeight = 0.7;
    const niceToHaveWeight = 0.3;
    
    const requiredMatchPercentage = requiredSkillsMatch / job.requiredSkills.length * 100 * requiredWeight;
    const niceToHaveMatchPercentage = job.niceToHaveSkills.length > 0 
      ? niceToHaveSkillsMatch / job.niceToHaveSkills.length * 100 * niceToHaveWeight
      : 0;
    
    return Math.round(requiredMatchPercentage + niceToHaveMatchPercentage);
  };
  
  // Get color class based on match percentage
  const getMatchColorClass = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };
  
  if (!selectedCareerTrack) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Job Alignment</h2>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">
            Please select a career track to view relevant job listings.
          </p>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Job Alignment</h2>
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Job Alignment</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          {/* Search & Filters */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-grow">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Search Jobs
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
                >
                  <option value="">All Locations</option>
                  {getUniqueLocations().map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Job Listings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              {filteredListings.length} {filteredListings.length === 1 ? 'Job' : 'Jobs'} Found
            </h3>
            
            <div className="space-y-4">
              {filteredListings.length > 0 ? (
                filteredListings.map(job => {
                  const matchPercentage = calculateSkillsMatch(job);
                  
                  return (
                    <div 
                      key={job.id} 
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="sm:flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-white text-lg">{job.title}</h4>
                          <div className="text-gray-600 dark:text-gray-400 mb-1">{job.company}</div>
                          <div className="text-gray-600 dark:text-gray-400 text-sm">{job.location}</div>
                        </div>
                        <div className="mt-2 sm:mt-0 flex flex-col sm:items-end">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getMatchColorClass(matchPercentage)}`}>
                            {matchPercentage}% Match
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                            Posted {formatRelativeTime(job.postedDate)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">{job.description}</p>
                      
                      <div className="mb-3">
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Required Skills:</h5>
                        <div className="flex flex-wrap gap-1">
                          {job.requiredSkills.map(skill => {
                            const hasSkill = userProfile?.currentSkills.includes(skill);
                            return (
                              <span 
                                key={skill} 
                                className={`px-2 py-0.5 rounded text-xs ${
                                  hasSkill 
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                }`}
                              >
                                {skill}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      
                      {job.niceToHaveSkills && job.niceToHaveSkills.length > 0 && (
                        <div className="mb-3">
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nice to Have:</h5>
                          <div className="flex flex-wrap gap-1">
                            {job.niceToHaveSkills.map(skill => {
                              const hasSkill = userProfile?.currentSkills.includes(skill);
                              return (
                                <span 
                                  key={skill} 
                                  className={`px-2 py-0.5 rounded text-xs ${
                                    hasSkill 
                                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                  }`}
                                >
                                  {skill}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        {job.salaryRange && (
                          <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                            {job.salaryRange}
                          </div>
                        )}
                        <div>
                          <a 
                            href={job.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md inline-block"
                          >
                            View Job
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    No job listings match your search criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Skill Gaps & Recommendations */}
        <div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Skill Gap Analysis</h3>
            
            {skillGaps.length > 0 ? (
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Based on current job market demand, consider learning these skills to improve your job prospects:
                </p>
                <ul className="space-y-2">
                  {skillGaps.map(({ skill, frequency }) => (
                    <li key={skill} className="flex justify-between items-center">
                      <span className="text-gray-800 dark:text-gray-200">{skill}</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, frequency * 10)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {frequency} {frequency === 1 ? 'job' : 'jobs'}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                You already have most of the in-demand skills for this career track. Keep refining your expertise!
              </p>
            )}
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Market Insights</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Popular Locations
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {getUniqueLocations().slice(0, 5).join(', ')}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Salary Range
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedCareerTrack.averageSalary}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Common Job Titles
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedCareerTrack.jobTitles.join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAlignmentEngine; 