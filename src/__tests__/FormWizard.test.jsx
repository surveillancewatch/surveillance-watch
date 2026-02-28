import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import FormWizard from '../FormWizard';
import { CONTACTS_DATA } from '../contactsData';

// Helper: search and select an agency by typing a search term and clicking
// the first result button whose primary label matches `clickText`.
function searchAndSelect(searchTerm, clickText) {
  const searchInput = screen.getByRole('textbox');
  fireEvent.change(searchInput, { target: { value: searchTerm } });
  // Click the first matching button in the results list
  const buttons = screen.getAllByRole('button');
  const match = buttons.find(btn => {
    const label = btn.querySelector('.font-semibold');
    return label && label.textContent === clickText;
  });
  if (!match) throw new Error(`No result button found with label "${clickText}"`);
  fireEvent.click(match);
}

// ---------------------------------------------------------------------------
// Data integrity tests — catch data-level regressions before they ship
// ---------------------------------------------------------------------------
describe('contactsData integrity', () => {
  it('has county-level entries with Notes === "County Public Records"', () => {
    const counties = CONTACTS_DATA.filter(a => a.Notes === 'County Public Records');
    expect(counties.length).toBe(16);
    counties.forEach(c => {
      expect(c.City).toBe('County Office');
      expect(c.County).toBeTruthy();
    });
  });

  it('every entry has required fields', () => {
    CONTACTS_DATA.forEach((entry, i) => {
      expect(entry.County, `entry ${i} missing County`).toBeTruthy();
      expect(entry.City, `entry ${i} missing City`).toBeTruthy();
      expect(entry.Email, `entry ${i} missing Email`).toBeTruthy();
      expect(entry.Notes, `entry ${i} missing Notes`).toBeTruthy();
    });
  });

  it('county entries all have City === "County Office"', () => {
    const counties = CONTACTS_DATA.filter(a => a.Notes === 'County Public Records');
    counties.forEach(c => {
      expect(c.City).toBe('County Office');
    });
  });

  it('tribal entries all have County === "Tribal"', () => {
    const tribal = CONTACTS_DATA.filter(a => a.County === 'Tribal');
    expect(tribal.length).toBeGreaterThan(0);
    tribal.forEach(t => {
      expect(t.Notes).not.toBe('County Public Records');
    });
  });
});

// ---------------------------------------------------------------------------
// Agency type filtering — the core bug this feature fixes
// ---------------------------------------------------------------------------
describe('FormWizard agency type filtering', () => {
  it('renders with Police Department selected by default', () => {
    render(<FormWizard />);
    const select = screen.getByDisplayValue('Police Department');
    expect(select).toBeInTheDocument();
  });

  it('shows info banner only for Police Department type', () => {
    render(<FormWizard />);
    expect(screen.getByText(/smaller municipalities/i)).toBeInTheDocument();

    // Switch to Sheriff — banner should disappear
    fireEvent.change(screen.getByDisplayValue('Police Department'), {
      target: { value: "Sheriff's Office" },
    });
    expect(screen.queryByText(/smaller municipalities/i)).not.toBeInTheDocument();
  });

  it('Sheriff mode: search results show only county entries', () => {
    render(<FormWizard />);
    fireEvent.change(screen.getByDisplayValue('Police Department'), {
      target: { value: "Sheriff's Office" },
    });

    const searchInput = screen.getByPlaceholderText(/Thurston/i);
    fireEvent.change(searchInput, { target: { value: 'King' } });

    // Should show "King County" not city-level results like "Seattle"
    expect(screen.getByText('King County')).toBeInTheDocument();
    expect(screen.queryByText('Seattle')).not.toBeInTheDocument();
  });

  it('Police mode: search results exclude county-level entries', () => {
    render(<FormWizard />);
    const searchInput = screen.getByPlaceholderText(/Olympia/i);
    fireEvent.change(searchInput, { target: { value: 'County Office' } });

    // "County Office" is the City value for county entries — should not appear
    expect(screen.queryByText('County Office')).not.toBeInTheDocument();
  });

  it('Police mode: search results exclude tribal entries', () => {
    render(<FormWizard />);
    const searchInput = screen.getByPlaceholderText(/Olympia/i);
    fireEvent.change(searchInput, { target: { value: 'Tribal' } });

    expect(screen.getByText(/No agencies found/i)).toBeInTheDocument();
  });

  it('clears selection when agency type changes', () => {
    render(<FormWizard />);

    // Search and select an agency
    searchAndSelect('Centralia', 'Centralia');

    // Should show selection
    expect(screen.getByText(/Selected Agency/i)).toBeInTheDocument();

    // Change type — selection should clear
    fireEvent.change(screen.getByDisplayValue('Police Department'), {
      target: { value: "Sheriff's Office" },
    });
    expect(screen.queryByText(/Selected Agency/i)).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Agency name generation — must match the type selected
// ---------------------------------------------------------------------------
describe('FormWizard agency name generation', () => {
  it('Police Department: generates "{City} Police Department"', () => {
    render(<FormWizard />);
    searchAndSelect('Centralia', 'Centralia');

    expect(screen.getByText('Centralia Police Department')).toBeInTheDocument();
  });

  it('Sheriff: generates "{County} County Sheriff\'s Office"', () => {
    render(<FormWizard />);
    fireEvent.change(screen.getByDisplayValue('Police Department'), {
      target: { value: "Sheriff's Office" },
    });

    searchAndSelect('King', 'King County');

    expect(screen.getByText(/King County Sheriff's Office/i)).toBeInTheDocument();
  });

  it('City/Town: generates "City of {City}" for city entries', () => {
    render(<FormWizard />);
    fireEvent.change(screen.getByDisplayValue('Police Department'), {
      target: { value: 'City/Town' },
    });

    searchAndSelect('Centralia', 'Centralia');

    expect(screen.getByText('City of Centralia')).toBeInTheDocument();
  });

  it('City/Town: generates "Town of {City}" for town entries', () => {
    render(<FormWizard />);
    fireEvent.change(screen.getByDisplayValue('Police Department'), {
      target: { value: 'City/Town' },
    });

    searchAndSelect('Pe Ell', 'Pe Ell');

    // Pe Ell has Notes: "Town Hall" — should generate "Town of Pe Ell"
    expect(screen.getByText('Town of Pe Ell')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Small town suggestion — prevents users from sending PD requests to towns
// without their own police department
// ---------------------------------------------------------------------------
describe('FormWizard small town sheriff suggestion', () => {
  it('shows suggestion when selecting a small town in Police mode', () => {
    render(<FormWizard />);
    // Yacolt has Notes: "Town Clerk" AND Clark County has a county-level entry
    searchAndSelect('Yacolt', 'Yacolt');

    expect(screen.getByText(/Small municipality detected/i)).toBeInTheDocument();
    // Text appears in both the description and the button
    expect(screen.getAllByText(/Clark County Sheriff's Office/i).length).toBeGreaterThanOrEqual(1);
  });

  it('does NOT show suggestion for larger cities', () => {
    render(<FormWizard />);
    searchAndSelect('Centralia', 'Centralia');

    // Centralia has Notes: "City Clerk" — not in small town list
    expect(screen.queryByText(/Small municipality detected/i)).not.toBeInTheDocument();
  });

  it('switch button changes to sheriff mode with correct county entry', () => {
    render(<FormWizard />);
    searchAndSelect('Yacolt', 'Yacolt');

    // Click the switch button
    fireEvent.click(screen.getByText(/Switch to Clark County Sheriff's Office/i));

    // Should now show Sheriff's Office selected with Clark County
    expect(screen.getByDisplayValue("Sheriff's Office")).toBeInTheDocument();
    expect(screen.getByText(/Clark County Sheriff's Office/i)).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Search label and placeholder adapt to mode
// ---------------------------------------------------------------------------
describe('FormWizard search UX adapts to mode', () => {
  it('Sheriff mode shows "Search for Your County" label', () => {
    render(<FormWizard />);
    fireEvent.change(screen.getByDisplayValue('Police Department'), {
      target: { value: "Sheriff's Office" },
    });
    expect(screen.getByText('Search for Your County')).toBeInTheDocument();
  });

  it('Police mode shows "Search for Your City or County" label', () => {
    render(<FormWizard />);
    expect(screen.getByText('Search for Your City or County')).toBeInTheDocument();
  });
});
