'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/useResumeStore'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

// Get the correct type for EducationItem from the store if exported,
// otherwise redefine or infer. Assuming store exports it or similar.
// import { EducationItem } from '@/store/useResumeStore'; 

interface EducationItemFromComponent { // Temporary type if not exported
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string[];
}

export default function Education() {
  // Select state needed for rendering
  const education = useResumeStore((state) => state.education);
  
  // Get actions directly from the hook (or use Zustand's selector for actions)
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);

  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    // Create data without ID, as the store action will add it
    const newEducationData = {
      institution: '', 
      degree: '', 
      period: '', 
      description: [''] 
    };
    addEducation(newEducationData);
    setIsAdding(true);
  };

  const handleUpdate = (
    id: string,
    field: string,
    value: string | string[]
  ) => {
    // Pass only the fields being updated
    updateEducation(id, { [field]: value });
  };

  const handleDescriptionChange = (id: string, index: number, value: string) => {
    const edu = education.find((e) => e.id === id);
    if (!edu) return;

    const newDescription = [...edu.description];
    newDescription[index] = value;
    handleUpdate(id, 'description', newDescription);
  };

  const addDescription = (id: string) => {
    const edu = education.find((e) => e.id === id);
    if (!edu) return;

    handleUpdate(id, 'description', [...edu.description, '']);
  };

  const removeDescription = (id: string, index: number) => {
    const edu = education.find((e) => e.id === id);
    if (!edu) return;

    const newDescription = edu.description.filter((_, i) => i !== index);
    handleUpdate(id, 'description', newDescription);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Education
        </button>
      </div>

      <AnimatePresence>
        {education.map((edu: EducationItemFromComponent) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 p-6 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      handleUpdate(edu.id, 'institution', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleUpdate(edu.id, 'degree', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Period
                  </label>
                  <input
                    type="text"
                    value={edu.period}
                    onChange={(e) =>
                      handleUpdate(edu.id, 'period', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => removeEducation(edu.id)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              {edu.description.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) =>
                      handleDescriptionChange(edu.id, index, e.target.value)
                    }
                    className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => removeDescription(edu.id, index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addDescription(edu.id)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Description
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
} 