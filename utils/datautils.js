/**
 * Utility functions for handling data in the resume portfolio
 */

import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

/**
 * Load JSON data from a file
 * @param {string} filename - The name of the JSON file to load (without extension)
 * @returns {Object} The parsed JSON data
 */
export function loadJsonData(filename) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', `${filename}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading JSON data from ${filename}.json:`, error);
    return null;
  }
}

/**
 * Load CSV data from a file
 * @param {string} filename - The name of the CSV file to load (without extension)
 * @returns {Array} The parsed CSV data as an array of objects
 */
export function loadCsvData(filename) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', `${filename}.csv`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    const results = Papa.parse(fileContents, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    });
    
    return results.data;
  } catch (error) {
    console.error(`Error loading CSV data from ${filename}.csv:`, error);
    return [];
  }
}

/**
 * Format a date string to a readable format
 * @param {string} dateString - The date string to format (YYYY-MM-DD)
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} The formatted date string
 */
export function formatDate(dateString, options = { year: 'numeric', month: 'long' }) {
  if (!dateString) return '';
  if (dateString === 'Present') return 'Present';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.error(`Error formatting date ${dateString}:`, error);
    return dateString;
  }
}

/**
 * Generate a slug from a string
 * @param {string} text - The string to convert to a slug
 * @returns {string} The slugified string
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}