'use client'

import PersonalInfo from '@/components/PersonalInfo'
import Skills from '@/components/Skills'
import EducationExperience from '@/components/EducationExperience'

export default function Home() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <PersonalInfo />
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6" >
            <Skills />
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <EducationExperience />
          </div>
        </main>
      </div>
    </div>
  )
} 