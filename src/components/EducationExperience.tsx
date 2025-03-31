'use client'

import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'
import { motion } from 'framer-motion'
import resumeData from '../data/resume.json';

interface Project {
  name: string;
  technologies: string[];
  period: string;
}

interface TimelineItemProps {
  title: string
  subtitle: string
  date: string
  description?: string
  highlights?: string[]
  technologies?: string[]
  projects?: Project[]
  type: 'work' | 'education'
  index: number
}

function TimelineItem({ title, subtitle, date, description, highlights, technologies, projects, type, index }: TimelineItemProps) {
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.2 
      }
    }
  };

  const techBadgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="relative pl-8 pb-12 last:pb-0 group"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Timeline line with gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-green-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Timeline dot with hover effect */}
      <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full 
        ${type === 'work' 
          ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
          : 'bg-gradient-to-r from-green-400 to-green-600'
        } 
        flex items-center justify-center transform transition-transform duration-300 hover:scale-125 hover:shadow-lg`}
      >
        {type === 'work' ? (
          <FaBriefcase className="w-2 h-2 text-white" />
        ) : (
          <FaGraduationCap className="w-2 h-2 text-white" />
        )}
      </div>

      {/* Content with hover effects */}
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-4 mb-3">
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {title}
          </h3>
          <span className="text-sm text-gray-500 font-medium px-3 py-1 bg-gray-100 rounded-full">
            {date}
          </span>
        </div>
        <p className="text-gray-600 font-medium mb-4 text-lg">{subtitle}</p>
        {description && <p className="text-gray-600 text-sm mb-4">{description}</p>}
        
        {/* Projects with enhanced styling */}
        {projects && projects.length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="text-md font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-6 h-px bg-gray-300"></span>
              Projects
              <span className="w-6 h-px bg-gray-300"></span>
            </h4>
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                className="pl-4 border-l-2 border-blue-100 hover:border-blue-500 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-bold text-gray-800">{project.name}</h5>
                  {project.period && (
                    <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                      {project.period}
                    </span>
                  )}
                </div>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.technologies.map((tech, techIdx) => (
                      <motion.span 
                        key={techIdx}
                        variants={techBadgeVariants}
                        className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full
                          hover:bg-blue-100 transition-colors duration-200 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Highlights/Responsibilities with enhanced styling */}
        {highlights && highlights.length > 0 && (
          <div className="mt-6">
            <ul className="space-y-3">
              {highlights.map((highlight, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-sm text-gray-600 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 group-hover:scale-125 transition-transform duration-200" />
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies with enhanced styling */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {technologies.map((tech, index) => (
              <motion.span 
                key={index}
                variants={techBadgeVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 
                  text-gray-700 text-xs rounded-full font-medium
                  hover:from-blue-50 hover:to-blue-100 hover:text-blue-600
                  transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function EducationExperience() {
  const workExperience = resumeData.workExperience.map(exp => ({
    title: exp.position,
    subtitle: exp.company,
    date: exp.period || 'Present',
    highlights: exp.responsibilities || [],
    technologies: exp.technicalStack || [],
    projects: exp.projects || [],
    type: 'work' as const
  }));

  const education = resumeData.education.map(edu => ({
    title: edu.degree,
    subtitle: edu.institution,
    date: edu.period || 'Present',
    type: 'education' as const
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <section>
        <motion.h2 
          className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Experience
        </motion.h2>
        <div className="space-y-6">
          {workExperience.map((item, index) => (
            <TimelineItem key={index} {...item} index={index} />
          ))}
        </div>
      </section>

      <section>
        <motion.h2 
          className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Education
        </motion.h2>
        <div className="space-y-6">
          {education.map((item, index) => (
            <TimelineItem key={index} {...item} index={index} />
          ))}
        </div>
      </section>
    </motion.div>
  )
} 