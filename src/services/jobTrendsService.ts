

export interface JobRole {
  title: string;
  count: number;
  growthRate: number; // percentage growth in the last month
  avgSalary: string;
  companies: string[];
  requiredSkills: {
    name: string;
    demand: number; // 1-10 scale indicating demand
  }[];
  experience: {
    min: number;
    max: number;
    average: number;
  };
  locations: {
    name: string;
    percentage: number;
  }[];
  source: string;
}

export interface TrendData {
  month: string;
  count: number;
}

export interface JobTrend {
  role: string;
  currentMonth: number;
  trends: TrendData[];
}

// This would be replaced with actual API calls to job platforms in production
// For now, we're simulating the data
export async function fetchTopJobRoles(): Promise<JobRole[]> {
  // In a real implementation, this would make API calls to LinkedIn, Naukri, etc.
  // For demo purposes, we're returning mock data
  
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return [
    {
      title: "Full Stack Developer",
      count: 15420,
      growthRate: 12.5,
      avgSalary: "₹10-18 LPA",
      companies: ["Google", "Amazon", "Flipkart", "Razorpay", "Swiggy"],
      requiredSkills: [
        { name: "React", demand: 9 },
        { name: "Node.js", demand: 8 },
        { name: "TypeScript", demand: 7 },
        { name: "MongoDB", demand: 6 },
        { name: "AWS", demand: 7 }
      ],
      experience: {
        min: 2,
        max: 6,
        average: 3.5
      },
      locations: [
        { name: "Bangalore", percentage: 40 },
        { name: "Hyderabad", percentage: 20 },
        { name: "Pune", percentage: 15 },
        { name: "Delhi NCR", percentage: 15 },
        { name: "Mumbai", percentage: 10 }
      ],
      source: "LinkedIn & Naukri"
    },
    {
      title: "Data Scientist",
      count: 8750,
      growthRate: 18.2,
      avgSalary: "₹12-22 LPA",
      companies: ["Microsoft", "Amazon", "Walmart", "Gojek", "PhonePe"],
      requiredSkills: [
        { name: "Python", demand: 10 },
        { name: "Machine Learning", demand: 9 },
        { name: "SQL", demand: 7 },
        { name: "TensorFlow", demand: 8 },
        { name: "Statistics", demand: 8 }
      ],
      experience: {
        min: 2,
        max: 8,
        average: 4.2
      },
      locations: [
        { name: "Bangalore", percentage: 45 },
        { name: "Hyderabad", percentage: 20 },
        { name: "Pune", percentage: 10 },
        { name: "Delhi NCR", percentage: 15 },
        { name: "Chennai", percentage: 10 }
      ],
      source: "LinkedIn & Naukri"
    },
    {
      title: "DevOps Engineer",
      count: 6320,
      growthRate: 15.8,
      avgSalary: "₹12-20 LPA",
      companies: ["Amazon", "Microsoft", "IBM", "Infosys", "Wipro"],
      requiredSkills: [
        { name: "Docker", demand: 9 },
        { name: "Kubernetes", demand: 9 },
        { name: "CI/CD", demand: 8 },
        { name: "AWS", demand: 8 },
        { name: "Linux", demand: 7 }
      ],
      experience: {
        min: 3,
        max: 7,
        average: 4.5
      },
      locations: [
        { name: "Bangalore", percentage: 35 },
        { name: "Hyderabad", percentage: 25 },
        { name: "Pune", percentage: 15 },
        { name: "Delhi NCR", percentage: 15 },
        { name: "Chennai", percentage: 10 }
      ],
      source: "LinkedIn & Naukri"
    },
    {
      title: "Product Manager",
      count: 5480,
      growthRate: 10.2,
      avgSalary: "₹18-35 LPA",
      companies: ["Amazon", "Flipkart", "Google", "Paytm", "Swiggy"],
      requiredSkills: [
        { name: "Product Development", demand: 9 },
        { name: "User Research", demand: 8 },
        { name: "Agile", demand: 7 },
        { name: "Analytics", demand: 8 },
        { name: "Business Strategy", demand: 8 }
      ],
      experience: {
        min: 4,
        max: 10,
        average: 6.5
      },
      locations: [
        { name: "Bangalore", percentage: 50 },
        { name: "Delhi NCR", percentage: 20 },
        { name: "Mumbai", percentage: 15 },
        { name: "Hyderabad", percentage: 10 },
        { name: "Pune", percentage: 5 }
      ],
      source: "LinkedIn & Naukri"
    },
    {
      title: "AI/ML Engineer",
      count: 4980,
      growthRate: 22.4,
      avgSalary: "₹15-30 LPA",
      companies: ["Google", "Amazon", "Microsoft", "Fractal", "Tiger Analytics"],
      requiredSkills: [
        { name: "Python", demand: 9 },
        { name: "Deep Learning", demand: 9 },
        { name: "TensorFlow/PyTorch", demand: 8 },
        { name: "NLP", demand: 7 },
        { name: "Computer Vision", demand: 7 }
      ],
      experience: {
        min: 2,
        max: 8,
        average: 4.2
      },
      locations: [
        { name: "Bangalore", percentage: 50 },
        { name: "Hyderabad", percentage: 15 },
        { name: "Pune", percentage: 10 },
        { name: "Delhi NCR", percentage: 15 },
        { name: "Chennai", percentage: 10 }
      ],
      source: "LinkedIn & Naukri"
    },
    {
      title: "Frontend Developer",
      count: 7850,
      growthRate: 9.6,
      avgSalary: "₹8-16 LPA",
      companies: ["Amazon", "Flipkart", "MakeMyTrip", "Myntra", "Razorpay"],
      requiredSkills: [
        { name: "React", demand: 10 },
        { name: "JavaScript", demand: 9 },
        { name: "TypeScript", demand: 8 },
        { name: "HTML/CSS", demand: 7 },
        { name: "Redux", demand: 7 }
      ],
      experience: {
        min: 1,
        max: 5,
        average: 2.8
      },
      locations: [
        { name: "Bangalore", percentage: 35 },
        { name: "Hyderabad", percentage: 20 },
        { name: "Pune", percentage: 15 },
        { name: "Delhi NCR", percentage: 20 },
        { name: "Chennai", percentage: 10 }
      ],
      source: "LinkedIn & Naukri"
    },
    {
      title: "Backend Developer",
      count: 7240,
      growthRate: 11.2,
      avgSalary: "₹10-18 LPA",
      companies: ["Amazon", "Flipkart", "Swiggy", "Zomato", "PhonePe"],
      requiredSkills: [
        { name: "Java", demand: 8 },
        { name: "Spring Boot", demand: 8 },
        { name: "Node.js", demand: 9 },
        { name: "Python", demand: 7 },
        { name: "Microservices", demand: 8 }
      ],
      experience: {
        min: 2,
        max: 6,
        average: 3.6
      },
      locations: [
        { name: "Bangalore", percentage: 40 },
        { name: "Hyderabad", percentage: 20 },
        { name: "Pune", percentage: 15 },
        { name: "Delhi NCR", percentage: 15 },
        { name: "Chennai", percentage: 10 }
      ],
      source: "LinkedIn & Naukri"
    },
    {
      title: "Cloud Architect",
      count: 3980,
      growthRate: 16.8,
      avgSalary: "₹25-45 LPA",
      companies: ["Amazon", "Microsoft", "Google", "IBM", "Deloitte"],
      requiredSkills: [
        { name: "AWS", demand: 9 },
        { name: "Azure", demand: 8 },
        { name: "GCP", demand: 7 },
        { name: "Infrastructure as Code", demand: 8 },
        { name: "Cloud Security", demand: 8 }
      ],
      experience: {
        min: 5,
        max: 12,
        average: 8.2
      },
      locations: [
        { name: "Bangalore", percentage: 40 },
        { name: "Hyderabad", percentage: 20 },
        { name: "Pune", percentage: 15 },
        { name: "Delhi NCR", percentage: 15 },
        { name: "Mumbai", percentage: 10 }
      ],
      source: "LinkedIn & Naukri"
    },
    {
      title: "UI/UX Designer",
      count: 4280,
      growthRate: 13.5,
      avgSalary: "₹8-18 LPA",
      companies: ["Google", "Microsoft", "Flipkart", "Swiggy", "Zomato"],
      requiredSkills: [
        { name: "Figma", demand: 9 },
        { name: "User Research", demand: 8 },
        { name: "Wireframing", demand: 7 },
        { name: "Prototyping", demand: 8 },
        { name: "Visual Design", demand: 8 }
      ],
      experience: {
        min: 2,
        max: 8,
        average: 4
      },
      locations: [
        { name: "Bangalore", percentage: 45 },
        { name: "Delhi NCR", percentage: 20 },
        { name: "Mumbai", percentage: 15 },
        { name: "Hyderabad", percentage: 10 },
        { name: "Pune", percentage: 10 }
      ],
      source: "LinkedIn & Naukri"
    },
    {
      title: "Cybersecurity Engineer",
      count: 3420,
      growthRate: 19.2,
      avgSalary: "₹15-28 LPA",
      companies: ["IBM", "TCS", "Deloitte", "Wipro", "Infosys"],
      requiredSkills: [
        { name: "Network Security", demand: 9 },
        { name: "Cloud Security", demand: 9 },
        { name: "SIEM", demand: 8 },
        { name: "Penetration Testing", demand: 7 },
        { name: "Security Compliance", demand: 7 }
      ],
      experience: {
        min: 3,
        max: 8,
        average: 5.2
      },
      locations: [
        { name: "Bangalore", percentage: 30 },
        { name: "Hyderabad", percentage: 20 },
        { name: "Pune", percentage: 15 },
        { name: "Delhi NCR", percentage: 20 },
        { name: "Chennai", percentage: 15 }
      ],
      source: "LinkedIn & Naukri"
    }
  ];
}

export async function fetchJobTrends(): Promise<JobTrend[]> {
  // In a real implementation, this would make API calls to get historical data
  // For demo purposes, we're returning mock data
  
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const roles = [
    "Full Stack Developer", 
    "Data Scientist", 
    "DevOps Engineer",
    "Product Manager",
    "AI/ML Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Cloud Architect",
    "UI/UX Designer",
    "Cybersecurity Engineer"
  ];
  
  // Generate 12 months of trend data for each role
  return roles.map(role => {
    const baseValue = Math.floor(Math.random() * 5000) + 3000;
    const trends: TrendData[] = [];
    
    // Generate last 12 months of data
    const today = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      
      // Create some realistic fluctuation
      let multiplier = 1;
      
      // Seasonal trends
      if (date.getMonth() === 0 || date.getMonth() === 6) {
        // January and July show more job postings
        multiplier = 1.2;
      } else if (date.getMonth() === 11) {
        // December shows fewer job postings
        multiplier = 0.8;
      }
      
      // Add a general upward trend
      multiplier += i * 0.03;
      
      // Add some randomness
      multiplier += (Math.random() * 0.2) - 0.1;
      
      const count = Math.round(baseValue * multiplier);
      
      trends.push({
        month: `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`,
        count
      });
    }
    
    return {
      role,
      currentMonth: trends[trends.length - 1].count,
      trends
    };
  });
}

export async function fetchSkillDemandData(): Promise<{skill: string, demand: number}[]> {
  // In a real implementation, this would fetch the most in-demand skills across all jobs
  // For demo purposes, we're returning mock data
  
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { skill: "React", demand: 1240 },
    { skill: "Python", demand: 1180 },
    { skill: "AWS", demand: 980 },
    { skill: "Java", demand: 920 },
    { skill: "JavaScript", demand: 890 },
    { skill: "DevOps", demand: 760 },
    { skill: "Cloud", demand: 720 },
    { skill: "Node.js", demand: 680 },
    { skill: "SQL", demand: 650 },
    { skill: "Machine Learning", demand: 620 },
    { skill: "Docker", demand: 590 },
    { skill: "Kubernetes", demand: 560 },
    { skill: "TypeScript", demand: 540 },
    { skill: "Angular", demand: 510 },
    { skill: "Data Science", demand: 490 }
  ];
} 