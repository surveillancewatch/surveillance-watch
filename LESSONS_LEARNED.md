# Lessons Learned: Agency Type Filtering Bug

## The Bug

The FormWizard's "Agency Type" dropdown (Police Department, Sheriff's Office, City/Town) had **no functional effect on the contact list** — all 253 entries were always shown regardless of selection. The dropdown only changed the label appended to the agency name in the generated document (e.g., "Olympia Sheriff's Office" instead of "Olympia Police Department").

This caused real user confusion:
- Selecting "Sheriff's Office" showed all 253 entries, but only 16 are county-level sheriff contacts
- Selecting "Police Department" showed county and tribal entries that have no police department
- Small towns without their own PD were listed under Police Department with no guidance
- Generated agency names were wrong: `"County Office Sheriff's Office"` for county entries

## Root Cause

The `filteredAgencies` memo and `handleAgencySelect` function were both too simple:

```javascript
// BEFORE: No type-based filtering at all
const filteredAgencies = useMemo(() => {
  if (!searchTerm) return CONTACTS_DATA;  // <-- returns ALL 253 every time
  ...
}, [searchTerm]);  // <-- missing agencyType dependency

// BEFORE: Naive name construction
agencyName: `${agency.City} ${formData.agencyType}`
// produces "County Office Sheriff's Office" for county entries
```

## Why It Wasn't Caught

1. **No tests existed** — there was no test suite at all; no unit tests, no integration tests, no CI test step
2. **Build-only CI** — the deploy pipeline only ran `npm run build`, which checks for syntax/import errors but not logic bugs
3. **No data-level assertions** — there were no checks that the 253 contacts had expected structure (16 counties, tribal entries, etc.)
4. **Manual-only QA** — the only way to catch this was to open the wizard and manually verify filtering, which is tedious and error-prone

## What We Fixed

### Code Changes (`src/FormWizard.jsx`)
- `filteredAgencies` now filters by `agencyType` before searching
- `handleAgencySelect` generates contextual names (Sheriff → county name, Police → city name, City/Town → "City of" / "Town of")
- `updateFormData` clears selection when agency type changes
- Info banner warns Police Department users about small municipalities
- Small town detection suggests the corresponding county sheriff with a one-click switch

### Test Suite (`src/__tests__/FormWizard.test.jsx`)
19 tests across 5 categories:

| Category | # | What it catches |
|----------|---|-----------------|
| Data integrity | 4 | Missing fields, wrong county count, data structure drift |
| Agency type filtering | 6 | Filtering actually works per type, clears on change |
| Agency name generation | 4 | Correct name format per type (sheriff, police, city/town) |
| Small town suggestion | 3 | Banner shows for small towns, not large cities; switch works |
| Search UX | 2 | Labels and placeholders adapt to mode |

### CI/CD Pipeline (`.github/workflows/`)
- **New `ci.yml`** — runs tests on every push and PR to main
- **Updated `deploy.yml`** — deploy now depends on tests passing; broken logic blocks deploy

## Test Structure for Future Issues

```
src/__tests__/
├── setup.js                    # Jest-DOM matchers
└── FormWizard.test.jsx         # Component + data tests
```

### How to add tests for future features:

1. **Data changes** (adding/removing contacts): Add assertions in `contactsData integrity` section
2. **New agency types**: Add filtering test in `agency type filtering`, name test in `agency name generation`
3. **UI behavior changes**: Add interaction tests using the `searchAndSelect()` helper
4. **Template changes**: Add a new describe block testing `generateRequest()` output

### Running tests locally:
```bash
npm test          # single run
npm run test:watch  # watch mode during development
```

## Principles Going Forward

1. **Every dropdown/filter must have a test proving it actually filters** — UI controls without behavioral tests are decoration
2. **Data-level tests catch silent regressions** — if someone adds a county entry without `Notes: "County Public Records"`, the test fails immediately
3. **Tests must run in CI before deploy** — the deploy pipeline now gates on test success
4. **Test with real data entries** — use actual cities/counties from the dataset, not mocked data, to catch real integration issues
5. **Clear selection on context change** — whenever a filter changes, downstream selections must be invalidated
