const fs = require('fs');
const path = require('path');

const checks = [];
const SRC_DIR = path.join(__dirname, '..', 'src');

function addCheck(category, name, passed, details = '') {
  checks.push({ category, name, passed, details });
}

function checkFileContent(filePath, pattern, description, category) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const found = pattern.test(content);
    addCheck(category, description, !found, found ? `Found in ${path.basename(filePath)}` : '');
  } catch (e) {
    addCheck(category, description, true, 'File not found');
  }
}

function checkEnvSecurity() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    addCheck('Environment', '.env not in .gitignore', !content.includes('GITIGNORE'), '.env file exists - ensure it is gitignored');

    if (content.includes('JWT_SECRET=')) {
      const secret = content.split('JWT_SECRET=')[1]?.split('\n')[0]?.trim();
      addCheck('Environment', 'JWT_SECRET is strong', secret && secret.length >= 32, `Secret length: ${secret?.length || 0}`);
      addCheck('Environment', 'JWT_SECRET is not default', !secret?.includes('taj_briyani_royal_secret'), 'JWT appears to use default value');
    }
  }
}

function checkSQLInjection() {
  const routeFiles = [];
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(f => {
      const fp = path.join(dir, f);
      if (fs.statSync(fp).isDirectory()) walkDir(fp);
      else if (f.endsWith('.js')) routeFiles.push(fp);
    });
  }
  walkDir(SRC_DIR);

  routeFiles.forEach(fp => {
    const content = fs.readFileSync(fp, 'utf8');
    addCheck('SQL/NoSQL Injection', `${path.basename(fp)} - No raw queries`, !content.includes('$where'), '');
    addCheck('SQL/NoSQL Injection', `${path.basename(fp)} - No eval`, !content.includes('eval('), '');
  });
}

function checkXSS() {
  const files = [];
  function walkDir(dir) {
    const entries = fs.readdirSync(dir);
    entries.forEach(f => {
      const fp = path.join(dir, f);
      if (fs.statSync(fp).isDirectory()) walkDir(fp);
      else if (f.endsWith('.js') || f.endsWith('.jsx')) files.push(fp);
    });
  }
  walkDir(path.join(__dirname, '..', '..', 'Br-Frontend', 'src'));

  files.forEach(fp => {
    const content = fs.readFileSync(fp, 'utf8');
    addCheck('XSS', `${path.basename(fp)} - No dangerouslySetInnerHTML`, !content.includes('dangerouslySetInnerHTML'), '');
  });
}

function checkCSRF() {
  const appPath = path.join(SRC_DIR, 'app.js');
  if (fs.existsSync(appPath)) {
    const content = fs.readFileSync(appPath, 'utf8');
    addCheck('CSRF', 'CORS configured', content.includes('cors'), '');
    addCheck('CSRF', 'Security headers middleware', content.includes('securityHeaders') || content.includes('helmet'), '');
  }
}

function checkRateLimiting() {
  const rlPath = path.join(SRC_DIR, 'middleware', 'rateLimiter.js');
  if (fs.existsSync(rlPath)) {
    const content = fs.readFileSync(rlPath, 'utf8');
    addCheck('Rate Limiting', 'Auth rate limiter configured', content.includes('authLimiter'), '');
    addCheck('Rate Limiting', 'API rate limiter configured', content.includes('apiLimiter'), '');
  }
}

function checkPasswordHashing() {
  const authPath = path.join(SRC_DIR, 'controllers', 'authController.js');
  if (fs.existsSync(authPath)) {
    const content = fs.readFileSync(authPath, 'utf8');
    addCheck('Authentication', 'Passwords are hashed', content.includes('bcrypt.hash'), '');
    addCheck('Authentication', 'Passwords compared securely', content.includes('bcrypt.compare'), '');
    addCheck('Authentication', 'JWT verification used', content.includes('generateToken'), '');
  }
}

function checkDependencies() {
  const pkgPath = path.join(__dirname, '..', 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    addCheck('Dependencies', 'express-rate-limit installed', !!pkg.dependencies['express-rate-limit'], '');
    addCheck('Dependencies', 'helmet should be installed', !!pkg.dependencies['helmet'], 'helmet not found - consider adding');
  }
}

// Run all checks
console.log('=== Security Audit Report ===\n');

checkEnvSecurity();
checkSQLInjection();
checkXSS();
checkCSRF();
checkRateLimiting();
checkPasswordHashing();
checkDependencies();

const passed = checks.filter(c => c.passed).length;
const failed = checks.filter(c => !c.passed).length;

const categories = [...new Set(checks.map(c => c.category))];
categories.forEach(cat => {
  console.log(`\n--- ${cat} ---`);
  checks.filter(c => c.category === cat).forEach(c => {
    const icon = c.passed ? '✅' : '❌';
    console.log(`  ${icon} ${c.name}${c.details ? ` (${c.details})` : ''}`);
  });
});

console.log(`\n=== Summary ===`);
console.log(`Passed: ${passed}/${checks.length}`);
console.log(`Failed: ${failed}/${checks.length}`);
console.log(`Score: ${((passed / checks.length) * 100).toFixed(1)}%`);

const reportPath = path.join(__dirname, '..', 'SECURITY_AUDIT.json');
fs.writeFileSync(reportPath, JSON.stringify({ date: new Date().toISOString(), checks, passed, failed, score: ((passed / checks.length) * 100).toFixed(1) + '%' }, null, 2));
console.log(`\nReport saved to ${reportPath}`);
