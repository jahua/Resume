'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import { useState } from 'react';
import resumeData from '../data/resume.json';
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiPhone,
  FiCopy,
  FiCheck
} from 'react-icons/fi';

interface Profile {
  network: string;
  url: string;
}

export default function PersonalInfo() {
  const [imgError, setImgError] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { name, title, address, email, phone, github, linkedIn, website } = resumeData.personalInfo;
  const profileSummary = resumeData.profileSummary;

  // Create profiles array for consistent mapping
  const profiles: Profile[] = [
    { network: 'GitHub', url: github },
    { network: 'LinkedIn', url: linkedIn }
  ].filter(profile => profile.url);

  const handleImageError = () => {
    setImgError(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1500);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <motion.div 
      className="bg-white p-8 rounded-3xl shadow-xl text-center relative overflow-hidden border border-gray-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-100 to-white z-0"></div>
      
      {/* Profile Image */}
      <motion.div 
        className="relative w-32 h-32 mx-auto mb-6 z-10 border-4 border-white rounded-full shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src={imgError ? "/images/default-profile.png" : "/images/profile.jpg"}
          alt={`${name} - Profile Picture`}
          fill
          sizes="128px"
          className="rounded-full object-cover"
          onError={handleImageError}
          priority
        />
      </motion.div>

      {/* Name and Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">{name}</h1>
      <p className="text-lg text-blue-600 font-medium mb-4">{title}</p>
      
      {/* Email and Phone (Displayed as Text) - Moved Before Address */}
      <div className="space-y-2 mb-4 text-gray-600 text-sm">
        {/* Email Row */}
        <div className="flex items-center justify-center space-x-2 group">
          <FiMail className="text-gray-400" />
          <a href={`mailto:${email}`} className="hover:text-blue-600 transition-colors">
            {email}
          </a>
          <button 
            onClick={() => copyToClipboard(email)}
            className="opacity-50 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-gray-200"
            aria-label="Copy Email"
          >
            {copiedEmail ? <FiCheck size={14} className="text-green-500" /> : <FiCopy size={14} />}
          </button>
        </div>
        {/* Phone Row */}
        {phone && (
          <div className="flex items-center justify-center space-x-2">
            <FiPhone className="text-gray-400" />
            <a href={`tel:${phone}`} className="hover:text-blue-600 transition-colors">
              {phone}
            </a>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="flex items-center justify-center text-gray-600 mb-6 text-sm">
        <FaMapMarkerAlt className="h-4 w-4 mr-1.5 text-gray-400" />
        {address}
      </div>

      {/* Social & Website Icons */}
      <div className="flex justify-center space-x-5 mb-8 text-gray-500">
        {/* GitHub */}
        {github && (
          <a 
            href={github}
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors tooltip"
            data-tip="GitHub Profile"
          >
            <FiGithub size={20} />
          </a>
        )}
        {/* LinkedIn */}
        {linkedIn && (
          <a 
            href={linkedIn}
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors tooltip"
            data-tip="LinkedIn Profile"
          >
            <FiLinkedin size={20} />
          </a>
        )}
        {/* Website */}
        {website && (
          <a 
            href={website}
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors tooltip"
            data-tip="Personal Website"
          >
            <FiExternalLink size={20} />
          </a>
        )}
      </div>

      {/* Bio / Profile Summary */}
      <p className="text-gray-700 text-base leading-relaxed max-w-xl mx-auto">
        {profileSummary}
      </p>
    </motion.div>
  );
} 