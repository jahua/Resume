'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/useResumeStore'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

// Define the type for a work experience item used in this component
interface WorkExperienceItemFromComponent { 
  id: string;
  position: string;
  company: string;
  period?: string; // Period is optional
  projects?: Array<{ name: string; technologies: string[]; period?: string; }>;
  technicalStack?: string[];
  responsibilities?: string[];
}

export default function Experience() {
  // Select state needed
  const workExperience = useResumeStore((state) => state.workExperience);
  
  // Select actions
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);

  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    const newExperienceData = {
      position: '',
      company: '',
      period: '', // Or undefined if preferred
      // Add other fields as needed for a new entry, e.g., responsibilities: ['']
    };
    addExperience(newExperienceData); // Store generates the ID
    setIsAdding(true);
  };

  // Generic update handler for simple fields
  const handleUpdate = (id: string, field: keyof WorkExperienceItemFromComponent, value: any) => {
    updateExperience(id, { [field]: value });
  };

  // TODO: Add specific handlers if needed for nested arrays like responsibilities or projects
  // (Similar to handleDescriptionChange in Education.tsx)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Experience
        </button>
      </div>

      <AnimatePresence>
        {workExperience.map((exp: WorkExperienceItemFromComponent) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 p-6 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                {/* Position Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleUpdate(exp.id, 'position', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                {/* Company Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                {/* Period Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Period</label>
                  <input
                    type="text"
                    value={exp.period || ''} // Handle optional period
                    onChange={(e) => handleUpdate(exp.id, 'period', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              {/* Remove Button */}
              <button
                onClick={() => removeExperience(exp.id)}
                className="ml-4 text-red-600 hover:text-red-800"
                aria-label="Remove Experience"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            
            {/* TODO: Add rendering and editing UI for responsibilities, projects, technicalStack */}
            {/* Example for responsibilities (if it's an array of strings) */}
            {exp.responsibilities && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
                {/* Add mapping, input fields, add/remove buttons similar to Education description */}
              </div>
            )}

          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
} 