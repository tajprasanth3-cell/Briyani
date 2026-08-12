const fs = require('fs');
const path = require('path');
const componentsDir = 'c:/Users/HPADMIN/Desktop/br/Br-Frontend/src/components';
const imagesDir = path.join(componentsDir, 'Images');
const files = fs.readdirSync(imagesDir);

const checkFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const importRegex = /from\s+[\"']\.\/Images\/([^\"']+)[\"']/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importedName = match[1];
    if (!files.includes(importedName)) {
      const correctFile = files.find(f => f.toLowerCase() === importedName.toLowerCase());
      if (correctFile) {
        console.log('Case mismatch in ' + path.basename(filePath) + ': ' + importedName + ' should be ' + correctFile);
      } else {
        console.log('File not found in ' + path.basename(filePath) + ': ' + importedName);
      }
    }
  }
};

checkFile(path.join(componentsDir, 'Menu.jsx'));
checkFile(path.join(componentsDir, 'Briyani.jsx'));
checkFile(path.join(componentsDir, 'Login.jsx'));
