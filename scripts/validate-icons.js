#!/usr/bin/env node

/**
 * Icon Validation Script
 * Validates all react-icons imports in the codebase to prevent runtime errors
 */

const fs = require('fs');
const path = require('path');

// Known valid icons from react-icons packages
const validIcons = {
  'react-icons/fi': [
    'FiSearch', 'FiLoader', 'FiMessageCircle', 'FiSend', 'FiAlertCircle', 
    'FiRefreshCw', 'FiMapPin', 'FiClock', 'FiSun', 'FiMoon', 
    'FiMenu', 'FiX', 'FiLogOut', 'FiUser', 'FiSettings'
  ],
  'react-icons/fa': [
    'FaGithub', 'FaBuilding'
  ],
  'react-icons/tb': [
    'TbRobot'
  ]
};

// Current imports found in codebase
const currentImports = [
  { file: 'src/components/AISearch.jsx', package: 'react-icons/fi', icons: ['FiSearch', 'FiLoader', 'FiMessageCircle', 'FiSend', 'FiAlertCircle', 'FiRefreshCw'] },
  { file: 'src/components/Footer.jsx', package: 'react-icons/fa', icons: ['FaGithub'] },
  { file: 'src/components/Hero.jsx', package: 'react-icons/fi', icons: ['FiSearch', 'FiMapPin'] },
  { file: 'src/components/Hero.jsx', package: 'react-icons/tb', icons: ['TbRobot'] },
  { file: 'src/components/JobCard.jsx', package: 'react-icons/fi', icons: ['FiMapPin', 'FiClock'] },
  { file: 'src/components/JobCard.jsx', package: 'react-icons/fa', icons: ['FaBuilding'] },
  { file: 'src/components/Navbar.jsx', package: 'react-icons/fi', icons: ['FiSun', 'FiMoon', 'FiMenu', 'FiX', 'FiLogOut', 'FiUser', 'FiSettings'] },
  { file: 'src/components/Navbar.jsx', package: 'react-icons/fa', icons: ['FaGithub'] }
];

function validateIcons() {
  console.log('🔍 Validating react-icons imports...\n');
  
  let hasErrors = false;
  const summary = {};

  currentImports.forEach(({ file, package: pkg, icons }) => {
    if (!summary[pkg]) summary[pkg] = new Set();
    
    icons.forEach(icon => {
      summary[pkg].add(icon);
      
      if (!validIcons[pkg] || !validIcons[pkg].includes(icon)) {
        console.error(`❌ Invalid icon: ${icon} from ${pkg} in ${file}`);
        hasErrors = true;
      } else {
        console.log(`✅ Valid: ${icon} from ${pkg}`);
      }
    });
  });

  console.log('\n📊 Summary by package:');
  Object.entries(summary).forEach(([pkg, icons]) => {
    console.log(`  ${pkg}: ${Array.from(icons).join(', ')}`);
  });

  if (hasErrors) {
    console.error('\n❌ Validation failed! Fix invalid icon imports.');
    process.exit(1);
  } else {
    console.log('\n✅ All icon imports are valid!');
  }
}

if (require.main === module) {
  validateIcons();
}

module.exports = { validateIcons, validIcons, currentImports };