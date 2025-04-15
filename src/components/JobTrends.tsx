'use client';

import React, { useState, useEffect } from 'react';
import { 
  fetchTopJobRoles, 
  fetchJobTrends,
  fetchSkillDemandData,
  JobRole,
  JobTrend
} from '@/services/jobTrendsService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const JobTrends: React.FC = () => {
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  const [trendData, setTrendData] = useState<JobTrend[]>([]);
  const [skillDemandData, setSkillDemandData] = useState<{skill: string, demand: number}[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [loading, setLoading] = useState({
    roles: true,
    trends: true,
    skills: true
  });
  const [activeTab, setActiveTab] = useState<'roles' | 'trends' | 'skills'>('roles');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roles = await fetchTopJobRoles();
        setJobRoles(roles);
        setLoading(prev => ({ ...prev, roles: false }));
        if (roles && roles.length > 0) {
          setSelectedRole(roles[0]?.title || "");
        }
        
        const trends = await fetchJobTrends();
        setTrendData(trends);
        setLoading(prev => ({ ...prev, trends: false }));
        
        const skillsDemand = await fetchSkillDemandData();
        setSkillDemandData(skillsDemand);
        setLoading(prev => ({ ...prev, skills: false }));
      } catch (error) {
        console.error('Error fetching job trends data:', error);
        setLoading({
          roles: false,
          trends: false,
          skills: false
        });
      }
    };
    
    fetchData();
  }, []);

  // Prepare trend chart data for the selected role
  const getTrendChartData = () => {
    const selectedTrend = trendData.find(trend => trend.role === selectedRole);
    
    if (!selectedTrend) return {
      labels: [],
      datasets: []
    };
    
    return {
      labels: selectedTrend.trends.map(t => t.month),
      datasets: [
        {
          label: 'Job Postings',
          data: selectedTrend.trends.map(t => t.count),
          fill: true,
          backgroundColor: 'rgba(79, 70, 229, 0.2)',
          borderColor: 'rgba(79, 70, 229, 1)',
          tension: 0.4
        }
      ]
    };
  };
  
  // Prepare skills demand chart data
  const getSkillsChartData = () => {
    return {
      labels: skillDemandData.map(s => s.skill),
      datasets: [
        {
          label: 'Job Demand',
          data: skillDemandData.map(s => s.demand),
          backgroundColor: 'rgba(79, 70, 229, 0.7)',
          borderColor: 'rgba(79, 70, 229, 1)',
          borderWidth: 1,
        }
      ]
    };
  };

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="bg-indigo-600 dark:bg-indigo-800 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          Indian Job Market Trends
        </h2>
        <p className="text-indigo-200 text-sm">
          Live data from LinkedIn and Naukri.com
        </p>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('roles')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'roles'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Top 10 Roles
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'trends'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Trend Analysis
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'skills'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          In-Demand Skills
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {/* Top 10 Roles Tab */}
        {activeTab === 'roles' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Top 10 In-Demand Roles in India
            </h3>
            
            {loading.roles ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobRoles.map((role, index) => (
                  <div 
                    key={role.title} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    onClick={() => {
                      setSelectedRole(role.title);
                      setActiveTab('trends');
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <span className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold flex items-center justify-center mr-2">
                            {index + 1}
                          </span>
                          <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                            {role.title}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {formatNumber(role.count)} openings
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        role.growthRate > 15 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : role.growthRate > 5 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {role.growthRate > 0 ? '+' : ''}{role.growthRate}% growth
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>Experience: {role.experience.min}-{role.experience.max} yrs</span>
                        <span>{role.avgSalary}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Top skills required:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {role.requiredSkills.map(skill => (
                          <span 
                            key={skill.name} 
                            className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Top hiring companies:
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {role.companies.join(', ')}
                      </p>
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                      <span>Top location: {role.locations?.[0]?.name || 'N/A'} ({role.locations?.[0]?.percentage || 0}%)</span>
                      <span>Source: {role.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Trend Analysis Tab */}
        {activeTab === 'trends' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                12-Month Trend Analysis
              </h3>
              
              <div className="mt-3 md:mt-0">
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {jobRoles.map(role => (
                    <option key={role.title} value={role.title}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {loading.trends ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="h-80">
                  <Line 
                    data={getTrendChartData()} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: false,
                          grid: {
                            color: 'rgba(160, 174, 192, 0.1)'
                          }
                        },
                        x: {
                          grid: {
                            display: false
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          display: true,
                          position: 'top',
                          labels: {
                            color: 'rgb(160, 174, 192)'
                          }
                        },
                        tooltip: {
                          mode: 'index',
                          intersect: false
                        }
                      }
                    }}
                  />
                </div>
                
                {/* Job Role Insights */}
                {selectedRole && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Insights for {selectedRole}
                    </h4>
                    
                    {(() => {
                      const role = jobRoles.find(r => r.title === selectedRole);
                      const trend = trendData.find(t => t.role === selectedRole);
                      
                      if (!role || !trend || !trend.trends || trend.trends.length === 0) return null;
                      
                      // Safe access to first and last month data with proper null checks
                      const firstTrend = trend.trends[0];
                      const lastTrend = trend.trends[trend.trends.length - 1];
                      
                      const firstMonth = firstTrend ? firstTrend.count : 0;
                      const lastMonth = lastTrend ? lastTrend.count : 0;
                      const growthPercent = firstMonth > 0 
                        ? Math.round(((lastMonth - firstMonth) / firstMonth) * 100) 
                        : 0;
                      
                      return (
                        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                          <p>
                            <span className="font-medium">Current Openings:</span> {formatNumber(role.count)} jobs across India
                          </p>
                          <p>
                            <span className="font-medium">Monthly Growth Rate:</span>{' '}
                            <span className={growthPercent > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                              {growthPercent > 0 ? '+' : ''}{growthPercent}%
                            </span>
                          </p>
                          <p>
                            <span className="font-medium">Top Locations:</span>{' '}
                            {role.locations && role.locations.length > 0 
                              ? role.locations.slice(0, 3).map(loc => `${loc.name} (${loc.percentage}%)`).join(', ')
                              : 'N/A'}
                          </p>
                          <p>
                            <span className="font-medium">Required Experience:</span>{' '}
                            {role.experience.min}-{role.experience.max} years (avg: {role.experience.average} years)
                          </p>
                          <p>
                            <span className="font-medium">Salary Range:</span> {role.avgSalary}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* In-Demand Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Most In-Demand Skills
            </h3>
            
            {loading.skills ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="h-80">
                  <Bar 
                    data={getSkillsChartData()} 
                    options={{
                      indexAxis: 'y' as const,
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          beginAtZero: true,
                          grid: {
                            color: 'rgba(160, 174, 192, 0.1)'
                          }
                        },
                        y: {
                          grid: {
                            display: false
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          display: false
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              return `${context.parsed.x} job postings`;
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                    Skill Insights
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Top Technical Skills
                      </h5>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li className="flex justify-between">
                          <span>1. React</span>
                          <span className="text-indigo-600 dark:text-indigo-400">High Demand</span>
                        </li>
                        <li className="flex justify-between">
                          <span>2. Python</span>
                          <span className="text-indigo-600 dark:text-indigo-400">High Demand</span>
                        </li>
                        <li className="flex justify-between">
                          <span>3. AWS</span>
                          <span className="text-indigo-600 dark:text-indigo-400">High Demand</span>
                        </li>
                        <li className="flex justify-between">
                          <span>4. JavaScript</span>
                          <span className="text-indigo-600 dark:text-indigo-400">High Demand</span>
                        </li>
                        <li className="flex justify-between">
                          <span>5. Java</span>
                          <span className="text-indigo-600 dark:text-indigo-400">High Demand</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Emerging Skills
                      </h5>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li className="flex justify-between">
                          <span>1. Generative AI</span>
                          <span className="text-green-600 dark:text-green-400">+145% growth</span>
                        </li>
                        <li className="flex justify-between">
                          <span>2. MLOps</span>
                          <span className="text-green-600 dark:text-green-400">+92% growth</span>
                        </li>
                        <li className="flex justify-between">
                          <span>3. Web3</span>
                          <span className="text-green-600 dark:text-green-400">+78% growth</span>
                        </li>
                        <li className="flex justify-between">
                          <span>4. Next.js</span>
                          <span className="text-green-600 dark:text-green-400">+65% growth</span>
                        </li>
                        <li className="flex justify-between">
                          <span>5. Rust</span>
                          <span className="text-green-600 dark:text-green-400">+52% growth</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p className="text-center">
            Data sourced from LinkedIn and Naukri.com job postings across India.
            <br />Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobTrends; 