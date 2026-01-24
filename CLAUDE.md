# WA Surveillance Watch - Claude Project Guide

## ⚠️ CRITICAL: LIVE PRODUCTION SITE

**URL**: [https://www.wasurveillancewatch.org/](https://www.wasurveillancewatch.org/)

**STATUS**: ACTIVE PRODUCTION - PUBLIC FACING

This is a **live production website** serving Washington State residents with critical information about public records requests for surveillance transparency. All changes require thorough testing and validation before deployment.

## Project Overview

### Purpose

WA Surveillance Watch is a campaign website that empowers Washington State residents to:
- Demand transparency about law enforcement surveillance cameras
- File public records requests under RCW 42.56
- Access downloadable templates and guides
- Learn about landmark court rulings and federal access issues

### Mission Critical Nature

This site serves:
- **Civil rights activists** exercising transparency rights
- **Concerned residents** investigating surveillance in their communities
- **Journalists** researching surveillance stories
- **Legal advocates** supporting public records requests

**Downtime or errors directly impact public transparency efforts.**

## Development Workflow

### ⚠️ MANDATORY TESTING PROTOCOL

**NEVER** push changes to `main` branch without completing ALL steps below:

#### 1. Local Development Testing

```bash
# Install/update dependencies
npm install

# Start development server
npm run dev
# Test at http://localhost:5173

# Verify ALL functionality:
# - Page loads correctly
# - All sections render properly
# - Navigation works
# - Download buttons work for ALL templates
# - Links to external resources work
# - Responsive design on mobile/tablet/desktop
# - No console errors (F12)
```

#### 2. Production Build Testing

```bash
# Build for production
npm run build

# Preview production build
npm run preview
# Test at http://localhost:4173

# Verify production build:
# - All assets load correctly
# - Base path is correct (/surveillance-watch/)
# - All downloads work
# - No 404 errors
# - Performance is acceptable
```

#### 3. Validation Checklist

Before committing, verify:

- [ ] **Code Quality**
  - [ ] No syntax errors
  - [ ] No console errors or warnings
  - [ ] Proper React component structure
  - [ ] Tailwind classes applied correctly

- [ ] **Functionality**
  - [ ] All 8 download buttons work
  - [ ] External links open in new tabs
  - [ ] Email links work correctly
  - [ ] Phone number links work on mobile
  - [ ] All sections expand/collapse properly

- [ ] **Content Accuracy**
  - [ ] Legal information is correct
  - [ ] Contact information is current
  - [ ] Links to resources are valid
  - [ ] No typos or grammatical errors

- [ ] **Responsive Design**
  - [ ] Mobile view (< 640px)
  - [ ] Tablet view (640px - 1024px)
  - [ ] Desktop view (> 1024px)
  - [ ] Download buttons accessible on all sizes

- [ ] **Accessibility**
  - [ ] Proper heading hierarchy
  - [ ] Alt text for images (if any)
  - [ ] Keyboard navigation works
  - [ ] Color contrast meets WCAG standards

- [ ] **Performance**
  - [ ] Build completes without warnings
  - [ ] Bundle size is reasonable
  - [ ] Page loads quickly

#### 4. Git Commit Standards

```bash
# Use descriptive commit messages
git add .
git commit -m "type: brief description

Detailed explanation of changes
- What was changed
- Why it was changed
- Testing performed"

# Commit types:
# - feat: New feature
# - fix: Bug fix
# - docs: Documentation update
# - style: CSS/styling changes
# - content: Content updates (text, templates)
# - chore: Maintenance tasks
# - security: Security fixes
```

#### 5. Pre-Push Verification

```bash
# Final checks before pushing
npm run build  # Ensure build succeeds
git status     # Verify correct files staged
git log -1     # Review commit message

# Only then push
git push origin main
```

#### 6. Post-Deployment Monitoring

After pushing to `main`:

1. **Monitor GitHub Actions**
   - Go to Actions tab immediately
   - Watch deployment workflow
   - Verify green checkmark (success)

2. **Verify Live Site** (wait 2-5 minutes)
   - Visit https://www.wasurveillancewatch.org/
   - Test ALL changed functionality
   - Verify downloads still work
   - Check for any errors

3. **Rollback if Needed**
   ```bash
   # If deployment breaks site:
   git revert HEAD
   git push origin main
   # This creates a new commit that undoes changes
   ```

## Project Structure

```
surveillance-watch/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions auto-deployment
├── public/
│   └── Template_download/          # 8 downloadable templates
│       ├── flock_camera_records_request_SIMPLIFIED.md
│       ├── flock_camera_records_request_template.md
│       ├── HOW_TO_GUIDE_public_records_requests.md
│       ├── QUICK_START_one_page_guide.md
│       ├── LEGAL_CONTEXT_surveillance_cameras.md
│       ├── EMAIL_TEMPLATES_all_scenarios.md
│       ├── QUICK_REFERENCE_surveillance_requests.md
│       └── TOOLKIT_INDEX_master_guide.md
├── src/
│   ├── App.jsx                     # Main campaign website component
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Tailwind CSS base styles
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration (base path!)
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS for Tailwind
├── README.md                       # User-facing documentation
├── DEPLOYMENT_GUIDE.md             # Deployment instructions
├── SETUP_SUMMARY.md                # Quick setup reference
├── QUICK_START_CARD.md             # One-page quick start
└── CLAUDE.md                       # This file (AI assistant guide)
```

## Key Files and Components

### Critical Configuration Files

**vite.config.js** - MUST match repository name
```javascript
base: '/surveillance-watch/',  // Must match GitHub repo name
```
⚠️ Incorrect base path = broken site (blank page or 404s)

**package.json** - Dependencies
- React 18.3.1
- Vite 6.0.7
- Tailwind CSS 3.4.17
- Lucide React 0.468.0 (icons)

### Main Application Component

**src/App.jsx** - Contains entire website
- Campaign hero section
- Information about surveillance issues
- Court ruling details
- Download toolkit section (8 templates)
- Local contacts (Thurston County focus)
- Resources and advocacy organizations
- Call to action

### Download System

Templates in `public/Template_download/` are served via:
```javascript
const toolkitFiles = [
  { name: 'Display Name', path: '/Template_download/file.md', filename: 'Downloaded_Name.md' }
]
```

**Critical**: Path must match actual file location (case-sensitive on GitHub Pages)

## Content Guidelines

### Legal Accuracy

This site provides legal information about Washington State Public Records Act (RCW 42.56):

- **Based on**: Rodriguez v. City of Sedro Woolley (Skagit County, Nov 2025)
- **Authority**: UW Center for Human Rights Report (Oct 2025)
- **Always include disclaimer**: "This is not legal advice. Consult an attorney."

**Before changing legal content**:
1. Verify facts with authoritative sources
2. Maintain neutral, informative tone
3. Do not make definitive legal claims
4. Update "Last Updated" date

### Contact Information

**Currently featured**: Thurston County agencies

When updating contacts:
- Verify phone numbers and emails work
- Test email links (`mailto:`)
- Confirm agency still handles public records requests
- Maintain consistent formatting

### External Links

Always verify external links are:
- Current and active (not 404)
- From authoritative sources (ACLU, government sites)
- Using HTTPS where possible
- Relevant to WA State surveillance issues

## Technology Stack

### Core Technologies

**Frontend Framework**
- **React 18** - UI components and state management
- **JSX** - Component syntax

**Build Tool**
- **Vite** - Fast development and optimized builds
- **Hot Module Replacement (HMR)** for instant feedback

**Styling**
- **Tailwind CSS 3** - Utility-first CSS framework
- **Responsive design** using Tailwind breakpoints
- **Custom color scheme** - Defined in tailwind.config.js

**Icons**
- **Lucide React** - Shield, Download, AlertTriangle, FileText, etc.

**Hosting**
- **GitHub Pages** - Free static site hosting
- **Custom domain** - wasurveillancewatch.org
- **HTTPS** - Enforced via GitHub Pages

### Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:5173)
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview production build (http://localhost:4173)
npm run preview

# Check for dependency updates
npm outdated

# Update dependencies (test thoroughly after!)
npm update
```

### Deployment Pipeline

**Trigger**: Push to `main` branch

**GitHub Actions Workflow** (.github/workflows/deploy.yml):
1. Checkout code
2. Setup Node.js 20
3. Install dependencies (`npm ci`)
4. Build site (`npm run build`)
5. Upload artifact
6. Deploy to GitHub Pages
7. Site live at wasurveillancewatch.org

**Typical deployment time**: 2-5 minutes

## Common Tasks

### Adding a New Template

1. **Create template file**:
   ```bash
   # Add file to public/Template_download/
   nano public/Template_download/new_template.md
   ```

2. **Update App.jsx**:
   ```javascript
   // Add to toolkitFiles array in App.jsx
   {
     name: 'New Template Name',
     path: '/Template_download/new_template.md',
     filename: 'Downloaded_Name.md'
   }
   ```

3. **Test locally**:
   ```bash
   npm run dev
   # Click download button and verify file downloads correctly
   ```

4. **Test production build**:
   ```bash
   npm run build
   npm run preview
   # Verify download works in production build
   ```

5. **Commit and deploy**:
   ```bash
   git add public/Template_download/new_template.md src/App.jsx
   git commit -m "feat: add new template for [purpose]"
   git push origin main
   ```

6. **Verify live site** after deployment

### Updating Contact Information

1. **Locate contacts** in `src/App.jsx`:
   ```javascript
   // Search for "Local Contacts" section
   ```

2. **Update information**:
   - Verify new contact details are correct
   - Test phone/email links
   - Update any related text

3. **Follow full testing protocol** before pushing

### Changing Styling

1. **Use Tailwind utilities** when possible:
   ```jsx
   <div className="bg-blue-50 p-6 rounded-lg shadow-md">
   ```

2. **For custom styles**, add to `src/index.css`:
   ```css
   @layer components {
     .custom-class {
       /* custom CSS */
     }
   }
   ```

3. **Test responsive breakpoints**:
   - `sm:` (640px+)
   - `md:` (768px+)
   - `lg:` (1024px+)
   - `xl:` (1280px+)

### Emergency Content Updates

For urgent fixes (broken links, incorrect info):

1. **Make minimal change** to fix issue
2. **Test locally** (`npm run dev`)
3. **Test production build** (`npm run build && npm run preview`)
4. **Commit with clear message**:
   ```bash
   git commit -m "fix: correct [specific issue]"
   ```
5. **Push immediately**
6. **Monitor deployment closely**

## Troubleshooting

### Site Shows Blank Page After Deployment

**Cause**: Base path mismatch in vite.config.js

**Fix**:
```javascript
// vite.config.js - ensure this matches repo name
base: '/surveillance-watch/',
```
```bash
git add vite.config.js
git commit -m "fix: correct base path"
git push origin main
```

### Download Buttons Don't Work

**Causes**:
1. File path incorrect (case-sensitive!)
2. File not in `public/` directory
3. Filename mismatch in toolkitFiles array

**Fix**:
```bash
# Verify file exists
ls -la public/Template_download/

# Check case matches exactly in App.jsx
# Rebuild and test
npm run build
npm run preview
```

### Console Errors on Live Site

1. Open browser console (F12)
2. Note exact error message
3. Test locally to reproduce
4. Fix error
5. Deploy fix following full testing protocol

### GitHub Actions Deployment Fails

1. Go to Actions tab
2. Click failed workflow
3. Expand failed step
4. Read error logs
5. Common issues:
   - Build errors: Fix code, push again
   - Node version: Workflow uses Node 20
   - Dependencies: Verify package.json

### 404 on Custom Domain

1. Verify CNAME file in `public/` directory contains: `www.wasurveillancewatch.org`
2. Check DNS settings with domain provider
3. Verify Pages settings: Settings > Pages > Custom domain
4. Wait for DNS propagation (up to 24 hours)

## Security Considerations

### Content Security

- **No PII**: Never include personal information of requesters
- **Public information only**: All content should be public-facing
- **Source verification**: Cite authoritative sources
- **Legal accuracy**: Verify all legal claims

### Dependency Security

```bash
# Regular security audits
npm audit

# Fix vulnerabilities
npm audit fix

# Review and test after updates
npm run build
npm run preview
```

### Repository Security

- **No secrets in code**: No API keys, passwords, etc.
- **Public repository**: All code is public (as intended)
- **Branch protection**: Consider requiring PR reviews

## Backup and Recovery

### Rollback Procedure

If deployment breaks production:

```bash
# Method 1: Revert last commit
git revert HEAD
git push origin main
# Creates new commit that undoes changes

# Method 2: Reset to previous working commit
git log  # Find last working commit SHA
git reset --hard <commit-sha>
git push origin main --force  # USE WITH EXTREME CAUTION

# Method 3: Emergency fix
# Make minimal fix directly
git add .
git commit -m "hotfix: restore functionality"
git push origin main
```

### Manual Recovery

If git is unavailable:
1. Go to GitHub repository
2. Click on file to edit
3. Edit directly in browser
4. Commit changes
5. Wait for auto-deployment

## Performance Optimization

### Build Size

Monitor bundle size:
```bash
npm run build
# Check dist/ folder size
du -sh dist/
```

**Target**: < 1MB total

### Optimization Tips

1. **Lazy load images** if adding many images
2. **Tree-shake unused Tailwind classes** (automatic)
3. **Minimize external dependencies**
4. **Optimize template files** (already markdown - efficient)

## Analytics and Monitoring

### Recommended Monitoring

Consider adding:
1. **Google Analytics** - Track visitor metrics
2. **Uptime monitoring** - Get alerts if site goes down
3. **Error tracking** - Capture JavaScript errors

### Privacy Considerations

If adding analytics:
- Use privacy-respecting tools
- Disclose in privacy policy
- Consider GDPR compliance
- Respect Do Not Track

## Contribution Guidelines

### For External Contributors

1. **Fork repository**
2. **Create feature branch**: `git checkout -b feature/improvement`
3. **Make changes and test thoroughly**
4. **Submit Pull Request** with:
   - Clear description of changes
   - Why changes are needed
   - Testing performed
5. **Respond to review feedback**

### Code Review Checklist

When reviewing PRs:
- [ ] Changes serve mission (transparency/surveillance awareness)
- [ ] All tests passed (manual testing protocol)
- [ ] No security issues
- [ ] Legal information accurate
- [ ] Code quality maintained
- [ ] Documentation updated if needed

## Support and Resources

### Getting Help

**Technical Issues**:
- Check this CLAUDE.md file
- Review [README.md](README.md)
- Review [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- Search GitHub Issues
- Open new issue if needed

**Content Questions**:
- **ACLU of Washington**: (206) 624-2184
- **WA Attorney General Public Records**: (360) 753-6200
- **UW Center for Human Rights**: jsis.washington.edu/humanrights

**Legal Guidance**:
- Consult attorney for legal advice
- Not provided by this project

### Useful Documentation

- **React Docs**: [react.dev](https://react.dev)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)
- **Lucide Icons**: [lucide.dev](https://lucide.dev)

## Version History

- **Version 1.0.0** (November 2025): Initial launch
- **Last Updated**: January 2026

## Critical Reminders for AI Assistants

### Before Making ANY Changes

1. ✅ This is a LIVE PRODUCTION SITE
2. ✅ Real people depend on this for civil rights work
3. ✅ Always complete FULL testing protocol
4. ✅ Never push without local AND production build testing
5. ✅ Monitor deployment and verify live site after pushing
6. ✅ Be prepared to rollback if issues arise
7. ✅ Verify legal accuracy of any content changes
8. ✅ Test ALL download buttons after any changes
9. ✅ Check responsive design on all screen sizes
10. ✅ Keep mission in mind: transparency and accountability

### Development Priorities

1. **Reliability** - Site must work consistently
2. **Accuracy** - Legal information must be correct
3. **Accessibility** - Available to all users
4. **Performance** - Fast load times
5. **Maintainability** - Clean, documented code

## Emergency Contacts

**Site Down**:
- Check GitHub Actions status
- Check GitHub Pages status: [www.githubstatus.com](https://www.githubstatus.com)
- Attempt rollback procedure

**Content Issues**:
- Correct immediately if legal information is wrong
- Update if contact information no longer works
- Fix broken external links promptly

**Security Issues**:
- Address dependency vulnerabilities quickly
- Never commit secrets or sensitive data
- Report security issues privately

---

## Final Checklist Before Every Commit

- [ ] Changes tested in development mode (`npm run dev`)
- [ ] Changes tested in production build (`npm run build && npm run preview`)
- [ ] All download buttons work
- [ ] No console errors or warnings
- [ ] Responsive on mobile/tablet/desktop
- [ ] External links work
- [ ] Commit message is clear and descriptive
- [ ] Ready to monitor deployment after push
- [ ] Know how to rollback if needed

---

**Remember**: This site helps Washington State residents exercise their rights to government transparency. Treat every change with the care and responsibility it deserves.

**Mission**: Transparency. Accountability. Civil Rights.

---

**Last Updated**: 2026-01-24
**Maintained by**: Circle 6 Consulting
**Repository**: github.com/[username]/surveillance-watch
**Live Site**: https://www.wasurveillancewatch.org/
