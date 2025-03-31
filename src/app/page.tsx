'use client'

import PersonalInfo from '@/components/PersonalInfo'
import Skills from '@/components/Skills'
import EducationExperience from '@/components/EducationExperience'
// import SkillVisualizations from '@/components/SkillVisualizations'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <PersonalInfo />
          <Skills />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-8 space-y-8">
          {/* 
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <SkillVisualizations /> 
          </div> 
          */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <EducationExperience />
          </div>
        </main>
      </div>
    </div>
  )
} 