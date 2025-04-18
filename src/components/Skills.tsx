'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import resumeData from '../data/resume.json';
import { FaPython, FaJava, FaAws, FaDocker, FaGit, FaReact, FaVuejs, FaNode, FaPhp, FaDatabase, FaCloud, FaTools, FaBrain, FaChartBar, FaChevronDown } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMongodb, SiTensorflow, 
         SiPytorch, SiScikitlearn, SiPandas, SiNumpy,
         SiJupyter, SiFastapi, SiDjango, SiKubernetes,
         SiApachekafka, SiApachespark, SiGooglecloud,
         SiTableau, SiPostgresql, SiMysql,
         SiDatabricks, SiApacheairflow, SiGit } from 'react-icons/si';
import { BsGraphUp } from 'react-icons/bs';
import { AiFillDatabase } from 'react-icons/ai';
import { ReactNode } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip,
  BarChart, Bar, XAxis, YAxis, Legend
} from 'recharts';
import dynamic from 'next/dynamic';

// Dynamically import React Wordcloud to avoid SSR issues
const ReactWordcloud = dynamic(() => import('react-wordcloud'), { ssr: false });

// Interfaces
interface SkillItem {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: ReactNode;
  skills: {
    name: string;
    proficiency: number; // Scale 1-5
    value: number; // Scale 1-10 for visualizations
    icon?: ReactNode;
  }[];
  visualizationType: 'pie' | 'radar' | 'bar' | 'wordcloud';
  color: string;
}

export default function Skills() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getSkillIcon = (skillName: string): React.ReactNode | null => {
    const iconMap: Record<string, React.ReactNode> = {
      // Languages
      'Python': <FaPython className="text-blue-500" />,
      'TypeScript': <SiTypescript className="text-blue-600" />,
      'C#': <FaTools className="text-purple-500" />,
      'PHP': <FaPhp className="text-indigo-500" />,
      // Frameworks
      '.NET Framework': <FaTools className="text-purple-600" />,
      'Vue.js': <FaVuejs className="text-emerald-500" />,
      'React': <FaReact className="text-cyan-400" />,
      // Cloud & Data Engineering
      'Azure Data Factory': <AiFillDatabase className="text-blue-500" />,
      'Databricks': <SiDatabricks className="text-red-500" />,
      'Delta Lake': <FaDatabase className="text-blue-400" />,
      'Apache Spark': <SiApachespark className="text-orange-500" />,
      'Airflow': <SiApacheairflow className="text-teal-500" />,
      'Apache Kafka': <SiApachekafka className="text-black" />,
      'AWS': <FaAws className="text-orange-400" />,
      'Azure Fabric': <FaCloud className="text-blue-500" />,
      'Azure UI Search API': <FaCloud className="text-blue-500" />,
      'Google Cloud': <SiGooglecloud className="text-blue-500" />,
      'BigQuery': <FaDatabase className="text-blue-400" />,
      // DevOps
      'Git': <SiGit className="text-red-500" />,
      'Docker': <FaDocker className="text-blue-500" />,
      'MLOps': <FaBrain className="text-purple-500" />,
      'CI/CD': <FaTools className="text-gray-600" />,
      // ML & Data
      'PyTorch': <SiPytorch className="text-red-500" />,
      'TensorFlow': <SiTensorflow className="text-orange-500" />,
      'Scikit-learn': <SiScikitlearn className="text-orange-400" />,
      'NumPy': <SiNumpy className="text-blue-400" />,
      'Pandas': <SiPandas className="text-blue-600" />,
      // Databases & Analytics
      'PostgreSQL': <SiPostgresql className="text-blue-400" />,
      'MySQL': <SiMysql className="text-blue-500" />,
      'MongoDB': <SiMongodb className="text-green-500" />,
      'Power BI': <BsGraphUp className="text-blue-500" />,
      'Tableau': <SiTableau className="text-blue-600" />
    };
    return iconMap[skillName] || <FaTools className="text-gray-400" />; // Fallback icon
  };

  const getProficiencyLabel = (level: number): string => {
    const labels = ['Beginner', 'Familiar', 'Proficient', 'Advanced', 'Expert'];
    return labels[level - 1] || 'Familiar';
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const skillCategories: SkillCategory[] = [
    {
      title: "Cloud & Data Engineering",
      icon: <FaCloud className="text-blue-500" />,
      skills: resumeData.skills.dataEngineeringCloud.map(skill => ({
        name: skill.name,
        proficiency: Math.round(skill.level / 2), // Convert 1-10 to 1-5
        value: skill.level,
        icon: getSkillIcon(skill.name)
      })),
      visualizationType: "radar",
      color: "#0088FE"
    },
    {
      title: "Programming Languages",
      icon: <FaTools className="text-gray-600" />,
      skills: resumeData.skills.languagesFrameworks[0].languages.map(skill => ({
        name: skill.name,
        proficiency: Math.round(skill.level / 2),
        value: skill.level,
        icon: getSkillIcon(skill.name)
      })),
      visualizationType: "pie",
      color: "#00C49F"
    },
    {
      title: "Frameworks",
      icon: <FaReact className="text-cyan-500" />,
      skills: resumeData.skills.languagesFrameworks[0].frameworks.map(skill => ({
        name: skill.name,
        proficiency: Math.round(skill.level / 2),
        value: skill.level,
        icon: getSkillIcon(skill.name)
      })),
      visualizationType: "wordcloud",
      color: "#FFBB28"
    },
    {
      title: "DevOps",
      icon: <FaTools className="text-gray-600" />,
      skills: resumeData.skills.languagesFrameworks[0].devOps.map(skill => ({
        name: skill.name,
        proficiency: Math.round(skill.level / 2),
        value: skill.level,
        icon: getSkillIcon(skill.name)
      })),
      visualizationType: "bar",
      color: "#FF8042"
    },
    {
      title: "ML Frameworks",
      icon: <FaBrain className="text-purple-500" />,
      skills: resumeData.skills.MachineLearning[0].frameworks.map(skill => ({
        name: skill.name,
        proficiency: Math.round(skill.level / 2),
        value: skill.level,
        icon: getSkillIcon(skill.name)
      })),
      visualizationType: "radar",
      color: "#8884d8"
    },
    {
      title: "ML Applications",
      icon: <FaBrain className="text-purple-500" />,
      skills: resumeData.skills.MachineLearning[0].applications.map(skill => ({
        name: skill.name,
        proficiency: Math.round(skill.level / 2),
        value: skill.level,
        icon: getSkillIcon(skill.name)
      })),
      visualizationType: "wordcloud",
      color: "#82ca9d"
    },
    {
      title: "ML Tools",
      icon: <FaTools className="text-purple-500" />,
      skills: resumeData.skills.MachineLearning[0].tools.map(skill => ({
        name: skill.name,
        proficiency: Math.round(skill.level / 2),
        value: skill.level,
        icon: getSkillIcon(skill.name)
      })),
      visualizationType: "pie",
      color: "#8dd1e1"
    },
    {
      title: "Databases",
      icon: <FaDatabase className="text-blue-500" />,
      skills: resumeData.skills.databasesAnalytics[0].databases.map(skill => ({
        name: skill.name,
        proficiency: Math.round(skill.level / 2),
        value: skill.level,
        icon: getSkillIcon(skill.name)
      })),
      visualizationType: "bar",
      color: "#a4de6c"
    },
    {
      title: "Data Visualization",
      icon: <FaChartBar className="text-green-500" />,
      skills: resumeData.skills.databasesAnalytics[0].visualization.map(skill => ({
        name: skill.name,
        proficiency: Math.round(skill.level / 2),
        value: skill.level,
        icon: getSkillIcon(skill.name)
      })),
      visualizationType: "radar",
      color: "#d0ed57"
    },
    {
      title: "Business Intelligence",
      icon: <BsGraphUp className="text-blue-500" />,
      skills: resumeData.skills.databasesAnalytics[0].businessIntelligence.map(skill => ({
        name: skill.name,
        proficiency: Math.round(skill.level / 2),
        value: skill.level,
        icon: getSkillIcon(skill.name)
      })),
      visualizationType: "wordcloud",
      color: "#ffc658"
    }
  ];

  const renderVisualization = (category: SkillCategory) => {
    if (!isClient || category.skills.length === 0) return null;

    switch (category.visualizationType) {
      case 'pie':
        return (
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={category.skills}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {category.skills.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'radar':
        return (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={category.skills}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar 
                  name={category.title} 
                  dataKey="value" 
                  stroke={category.color} 
                  fill={category.color} 
                  fillOpacity={0.6} 
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'bar':
        return (
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={category.skills}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="value" fill={category.color} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'wordcloud':
        const words = category.skills.map((skill: any) => ({
          text: skill.name,
          value: skill.value * 5 // Scale up for better visualization
        }));
        
        return (
          <div className="h-60 w-full">
            {isClient && (
              <ReactWordcloud
                words={words}
                options={{
                  colors: [category.color, COLORS[0], COLORS[1], COLORS[2]],
                  fontSizes: [20, 60],
                  rotations: 0,
                  fontFamily: 'Inter',
                  fontWeight: 'bold',
                }}
              />
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="section-container font-['Inter'] bg-transparent text-gray-900">
      <motion.h2 
        className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#2563EB] to-[#6366F1] bg-clip-text text-transparent tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Technical Skills
      </motion.h2>
      
      <div className="space-y-4"> 
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-xl"
          >
            <motion.div
              className="flex items-center justify-between cursor-pointer mb-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl text-[#2563EB]">{category.icon}</span>
                <h3 className="text-lg font-semibold text-[#111827] tracking-tight">{category.title}</h3>
              </div>
              <FaChevronDown 
                className={`text-[#6B7280] transition-transform duration-300 ${expandedCategory === category.title ? 'transform rotate-180' : ''}`} 
              />
            </motion.div>

            <AnimatePresence>
              {expandedCategory === category.title && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden pl-3 pr-3 pb-3"
                >
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    {renderVisualization(category)}
                  </div>
                  
                  <div className="grid gap-2.5">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIdx * 0.05 }}
                        className="flex items-center justify-between group hover:bg-white p-2.5 rounded-lg transition-all duration-200 hover:shadow-sm border border-transparent hover:border-[#E5E7EB] bg-white"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg text-[#6366F1] group-hover:text-[#2563EB] transition-colors duration-200">
                            {skill.icon}
                          </span>
                          <span className="text-sm font-medium text-[#374151] group-hover:text-[#111827] transition-colors duration-200">
                            {skill.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#6B7280] font-medium hidden sm:inline-block group-hover:inline-block transition-all duration-200">
                            {getProficiencyLabel(skill.proficiency)}
                          </span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((dot) => (
                              <div
                                key={dot}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                  dot <= skill.proficiency
                                    ? 'bg-[#2563EB] group-hover:bg-[#3B82F6]'
                                    : 'bg-[#E5E7EB]'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}