# WA Surveillance Watch — Issue Fix Plan

## Overview

8 open issues on GitHub. This document provides an implementation plan for each, grouped by complexity and dependency order.

---

## Quick Wins (Can ship immediately)

### Issue #7 — Add email contact link
**Effort:** Small
**Files:** `src/components/FooterSection.jsx`, `src/components/HeroSection.jsx`

**Plan:**
1. Add a contact email link (`wasurveillancewatch@proton.me`) to the footer section
2. Also add it to the CTA section or footer as a "Contact Us" line
3. Use `mailto:wasurveillancewatch@proton.me` with appropriate link styling
4. Place alongside existing ACLU/AG contact references

---

### Issue #8 — Add "Request a Feature" button
**Effort:** Small
**Files:** `src/components/FooterSection.jsx`

**Plan:**
1. Add a "Request a Feature / Give Feedback" section to the footer
2. Two options presented as buttons or links:
   - **Email:** `mailto:wasurveillancewatch@proton.me?subject=Feature%20Request` — opens user's email client
   - **GitHub:** Link to `https://github.com/jeff-is-working/surveillance-watch/issues/new` — for technical users to file an issue directly
3. Keep styling minimal — small text in the footer, not a prominent UI element

---

## Medium Features (1-2 components each)

### Issue #1 — Direct email button in wizard
**Effort:** Medium
**Files:** `src/FormWizard.jsx`
**Depends on:** None

**Plan:**
1. On Step 5 (Review & Download), add a "Send via Email" button below the existing "Download Your Request" button
2. The button constructs a `mailto:` URL with:
   - **To:** `formData.agencyEmail`
   - **Subject:** `Public Records Request - Surveillance Camera Systems - [Agency Name]`
   - **Body:** The generated request text (plain text version, not HTML/Word)
3. Use `window.location.href = mailtoUrl` or `window.open(mailtoUrl)` to invoke the user's email client
4. Note: `mailto:` body has a ~2000 char URL length limit in some browsers. For long comprehensive templates, the body should include the first portion with a note: "Full request is attached — please attach the downloaded file to this email."
5. Add a helper text: "This will open your email app with the request pre-filled. Attach the downloaded Word document for best results."
6. Only show the button when `formData.agencyEmail` is a valid email (not a portal URL)

**Implementation detail:**
```jsx
const sendViaEmail = () => {
  const subject = encodeURIComponent(`Public Records Request - Surveillance Camera Systems - ${formData.agencyName}`);
  const body = encodeURIComponent(generateRequest().substring(0, 1800) + '\n\n[Full request attached as Word document]');
  window.location.href = `mailto:${formData.agencyEmail}?subject=${subject}&body=${body}`;
};
```

---

### Issue #3 — Action and engagement card
**Effort:** Medium
**Files:** New `src/components/GetInvolvedSection.jsx`, `src/App.jsx`

**Plan:**
1. Create a new section placed between Resources and FAQ (or between CTA and Footer)
2. Section title: "Get Involved" or "Take It Further"
3. Content organized as a grid of action cards:

   **Card 1: Contact Your Elected Officials**
   - Brief explanation of why contacting reps matters
   - Link to 5calls.org for finding reps and making calls
   - Mention that call scripts are available (ties to Issue #5)

   **Card 2: Make Public Comment**
   - Explain how to attend city council / county commission meetings
   - Tips for effective public comment (keep it brief, cite facts, reference the court ruling)
   - Downloadable talking points (ties to Issue #5)

   **Card 3: Spread the Word**
   - Share buttons: reuse existing `shareThisCampaign` function
   - Suggested social media post text
   - Link to the site itself for sharing

   **Card 4: File a Records Request**
   - Brief CTA linking back to the Take Action section / wizard
   - "Every request increases transparency"

4. Use the existing card grid pattern (bg-slate-800/900, Lucide icons, consistent styling)
5. Pass `shareThisCampaign` and `scrollToSection` as props from App.jsx

---

### Issue #5 — Advocacy call scripts
**Effort:** Medium
**Files:** New markdown/docx files in `public/Template_download/`, `src/components/GetInvolvedSection.jsx` or new `src/components/AdvocacyScriptsSection.jsx`, data updates

**Plan:**
1. Create 3-4 call/meeting script documents:
   - **Phone Call Script** — For calling elected officials (state legislators, city council members)
   - **Email to Elected Officials** — Template for writing to reps about surveillance oversight
   - **Public Meeting Comment** — Structured talking points for city council / county commission meetings
   - **In-Person Meeting Guide** — Tips and script for scheduled meetings with officials

2. Each script should cover:
   - Introduction and who you are (constituent)
   - The issue: pervasive surveillance without oversight
   - Specific ask: support surveillance oversight legislation / audit local surveillance contracts / pass a local privacy ordinance
   - Reference to the Rodriguez v. Sedro Woolley ruling
   - Reference to UW Human Rights report findings
   - Closing and follow-up

3. Create as both `.docx` (editable scripts) and `.pdf` (reference talking points)
4. Convert using pandoc (already installed)
5. Add download links in the Get Involved section (Issue #3) and/or a new "Advocacy Scripts" tab in Take Action
6. Mention 5calls.org as a tool for finding your reps and making calls efficiently

---

### Issue #7 + #8 combined implementation
These two are small enough to implement together in the footer. See individual plans above.

---

## Larger Features (Multiple components, new templates)

### Issue #2 — Create more templates
**Effort:** Large
**Files:** New files in `public/Template_download/`, updates to `src/App.jsx` (toolkitFiles), `src/components/TakeActionSection.jsx`

**Plan:**
1. Create new public records request templates covering additional surveillance technologies:

   **New Templates:**
   - **Facial Recognition Records Request** — Contracts with Clearview AI, NEC, etc.; policies; accuracy audits; use logs
   - **Cell-Site Simulator Records Request** — Stingray/IMSI catcher use; warrant documentation; NDA agreements with vendors
   - **Data Broker & Third-Party Surveillance Request** — Contracts with Palantir, Babel Street, Thomson Reuters CLEAR, Fog Data Science; data purchased; access logs
   - **Social Media Monitoring Records Request** — Contracts with monitoring firms; policies; accounts monitored; targeting criteria
   - **Comprehensive Surveillance Technology Request** — Omnibus template covering ALL surveillance technologies in one request (ALPR + facial recognition + cell-site simulators + data brokers + social media monitoring + predictive policing)

2. Each template follows the existing structure:
   - Header with RCW 42.56 citation
   - Placeholder fields for user info and agency info
   - Specific records requested organized by category
   - Response requirements section
   - Legal support section referencing the court ruling

3. Generate both `.docx` (editable) and `.md` (source) versions
4. Add to `toolkitFiles` array in App.jsx
5. Update the Templates tab in TakeActionSection to organize templates by category:
   - **ALPR/Camera Templates** (existing simplified + comprehensive)
   - **Technology-Specific Templates** (new individual tech templates)
   - **Comprehensive Template** (new omnibus template)
6. Update the Download Modal to include new files

---

### Issue #4 — Data Privacy law advocacy template for wizard
**Effort:** Large
**Files:** `src/FormWizard.jsx` or new `src/PrivacyWizard.jsx`, new template content

**Plan:**
1. Create a new wizard mode or extend the existing wizard with a "Request Type" selection on Step 1:
   - **Option A:** Surveillance Records Request (existing functionality)
   - **Option B:** Data Privacy Law Advocacy Letter (new)

2. The privacy advocacy letter wizard generates a letter to elected officials requesting:
   - Federal data privacy legislation (cite lack of comprehensive federal privacy law)
   - State-level privacy protections (reference WA's existing laws like SB 6280 for facial recognition, and gaps)
   - Local surveillance oversight ordinances

3. Wizard steps for advocacy letter:
   - **Step 1:** Select target (Federal rep / State legislator / Local council member)
   - **Step 2:** Your information
   - **Step 3:** Select privacy concerns (data brokers, facial recognition, location tracking, etc.)
   - **Step 4:** Review and customize
   - **Step 5:** Download / Email

4. Generated letter includes:
   - Constituent information
   - Specific privacy concerns selected
   - Reference to surveillance technologies documented on the site
   - Specific legislative asks appropriate to the level of government
   - The Rodriguez ruling as evidence of the need for oversight

5. **Alternative simpler approach:** Rather than a full wizard, create downloadable template letters (like Issue #5 scripts) and add them to the existing toolkit. This is faster to implement and still serves the purpose.

**Recommendation:** Start with the simpler approach (downloadable templates) and add the wizard mode as a v2 enhancement.

---

### Issue #6 — Investigate 5calls.org integration
**Effort:** Research + Medium implementation
**Files:** Potentially new component

**Plan:**

**Research phase:**
1. Check if 5calls.org has a public API: visit https://5calls.org and https://github.com/5calls
2. The 5calls project is open source: https://github.com/5calls/5calls — check their API docs
3. Determine if they have:
   - An endpoint to look up representatives by address/zip
   - A way to deep-link to a specific issue or call action
   - Any embed or widget functionality

**Implementation options based on research:**

**Option A: Deep linking (simplest)**
- If 5calls.org supports URL parameters, link directly to relevant issues
- Button: "Find Your Representatives on 5Calls" → `https://5calls.org/`
- No API integration needed

**Option B: API integration**
- If API exists, build a component that:
  1. Takes user's zip code or address
  2. Fetches their representatives
  3. Shows phone numbers with a "Call" button (`tel:` link for mobile)
  4. Displays the appropriate call script (from Issue #5)
- This would be a new `src/components/CallYourReps.jsx` component

**Option C: Embed their widget**
- If 5calls provides an embeddable widget, integrate it directly

**Recommendation:** Start with Option A (deep linking) as it requires no API dependency. Research the API for a potential v2 with direct integration.

---

## Suggested Implementation Order

### Phase 1 — Quick wins (ship today)
1. **Issue #7** — Add contact email (15 min)
2. **Issue #8** — Add feature request button (15 min)

### Phase 2 — Wizard enhancement + engagement
3. **Issue #1** — Direct email button in wizard (30 min)
4. **Issue #3** — Get Involved section (new component, 1-2 hrs)

### Phase 3 — Content creation
5. **Issue #5** — Advocacy call scripts (content writing + file creation)
6. **Issue #2** — Additional surveillance tech templates (content writing + file creation)
7. **Issue #6** — 5calls.org research and basic linking

### Phase 4 — Advanced features
8. **Issue #4** — Privacy law advocacy wizard/templates

---

## Dependencies Between Issues

```
Issue #7 (email) ──────────── standalone
Issue #8 (feature btn) ────── standalone (uses #7 email)
Issue #1 (wizard email) ───── standalone
Issue #3 (get involved) ───── benefits from #5 (scripts) and #6 (5calls)
Issue #5 (call scripts) ───── content feeds into #3
Issue #6 (5calls) ─────────── research feeds into #3 and #5
Issue #2 (more templates) ─── standalone but large content effort
Issue #4 (privacy wizard) ─── can reuse patterns from #1, benefits from #2
```

---

## Notes

- All new downloadable content should follow the established format: `.docx` for editable documents, `.pdf` for reference material
- The FormWizard `.doc` output (Word-compatible HTML) pattern established in the current codebase should be reused for any new wizard outputs
- All new sections should follow existing Tailwind styling patterns (bg-slate-800/900, Lucide icons, responsive grid)
- Content accuracy is critical — all legal references and legislative citations should be verified before publishing
- Test all changes locally (`npm run dev`) and in production build (`npm run build && npm run preview`) before pushing
