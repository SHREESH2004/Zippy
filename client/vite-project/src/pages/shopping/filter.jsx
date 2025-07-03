import React, { useState } from 'react';
import { filteroption } from '../admin';
import { Store } from 'lucide-react';

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    brand: [],
  });
  const [isClicked, setIsClicked] = useState(false);


  const handleApplyFilters = () => {
    console.log('Applying filters:', selectedFilters);
    // You can pass filters to a parent component or trigger a fetch here
  };

  const handleCheckboxChange = (filterType, id) => {
    const currentValues = selectedFilters[filterType];
    const isChecked = currentValues.includes(id);

    const updatedValues = isChecked
      ? currentValues.filter((value) => value !== id)
      : [...currentValues, id];

    setSelectedFilters({
      ...selectedFilters,
      [filterType]: updatedValues,
    });
  };

  return (
    <aside style={styles.sidebar}>
      <br />
      <br />
      <br />
      <br />

      <h6 style={styles.browseStyles}>
        <Store />Browse
      </h6>

      <div style={styles.divider} />

      {Object.entries(filteroption).map(([filterType, options]) => (
        <div key={filterType} style={styles.section}>
          <p style={styles.sectionTitle}>
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </p>

          {options.map((option) => (
            <label key={option.id} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedFilters[filterType].includes(option.id)}
                onChange={() => handleCheckboxChange(filterType, option.id)}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>{option.label}</span>
            </label>
          ))}

          <div style={styles.divider} />
        </div>
      ))}

      <div style={styles.result}>
        <strong style={styles.resultTitle}>Selected Filters:</strong>
        {Object.entries(selectedFilters).map(([filterType, selectedIds]) => {
          if (selectedIds.length === 0) return null;

          const label = filterType.charAt(0).toUpperCase() + filterType.slice(1);
          const selectedLabels = selectedIds
            .map((id) => {
              const match = filteroption[filterType].find((option) => option.id === id);
              return match?.label || id;
            })
            .join(', ');

          return (
            <div key={filterType} style={{ marginBottom: '8px' }}>
              <span style={styles.resultLabel}>{label}:</span> {selectedLabels}
            </div>
          );
        })}
        <button
          style={{
            ...styles.filterButton,
            ...(isClicked ? styles.filterButtonClicked : {}),
          }}
          onClick={() => {
            setIsClicked(true);
            handleApplyFilters();
            setTimeout(() => setIsClicked(false), 150); // Reset after 150ms
          }}
        >
          Apply Filters
        </button>

      </div>

    </aside>
  );
};

const styles = {
  filterButtonClicked: {
    transform: 'scale(0.96)',
    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.25)',
  },

filterButton: {
  marginTop: '12px',
  padding: '8px 14px',              // Smaller padding
  backgroundColor: '#28a745',       // Green background
  color: '#ffffff',                 // White text
  border: 'none',
  borderRadius: '6px',
  fontWeight: '600',
  fontSize: '13px',                 // Slightly smaller font
  cursor: 'pointer',
  fontFamily: "'Poppins', sans-serif",
  transition: 'background-color 0.3s ease',
  boxShadow: '0 3px 8px rgba(40, 167, 69, 0.25)',
},



  filterButtonHover: {
    backgroundColor: '#e67e22',
  },

  browseStyles: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#ffffff',
    cursor: 'pointer',
    userSelect: 'none',
    fontFamily: `'Poppins', sans-serif`,
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
    margin: 0,
  },
  sidebar: {
    width: '240px',
    minHeight: '100vh',
    padding: '24px 18px',
    background: 'linear-gradient(to bottom, #0d0d0d, #111)',
    color: '#fff',
    borderRight: '1px solid #1f1f1f',
    position: 'fixed',
    top: 0,
    left: 0,
    overflowY: 'auto',
    fontFamily: "'Poppins', sans-serif",
    boxShadow: '2px 0 12px rgba(0,0,0,0.5)',
    zIndex: 100,
  },

  title: {
    fontSize: '15px',
    fontWeight: 500,
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#f5f5f5',
    opacity: 0.9,
    display: 'flex',
    alignItems: 'center',
  },

  section: {
    marginBottom: '18px',
  },

  sectionTitle: {
    fontSize: '12.5px',
    fontWeight: 600,
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    color: '#eaeaea',
    opacity: 0.85,
  },

  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#cfcfcf',
    transition: 'all 0.2s ease',
    padding: '4px 4px',
    borderRadius: '5px',
  },

  checkbox: {
    marginRight: '10px',
    accentColor: '#f39c12',
    transform: 'scale(1.1)',
    cursor: 'pointer',
  },

  checkboxText: {
    transition: 'color 0.2s ease',
  },

  divider: {
    border: 'none',
    height: '1px',
    backgroundColor: '#2b2b2b',
    margin: '14px 0',
    opacity: 0.5,
  },

  result: {
    marginTop: '28px',
    fontSize: '12.5px',
    color: '#ccc',
    lineHeight: '1.6',
  },

  resultTitle: {
    display: 'block',
    marginBottom: '10px',
    color: '#fff',
    fontSize: '13.5px',
    fontWeight: 600,
  },

  resultLabel: {
    fontWeight: 500,
    color: '#f39c12',
  },
};


export default Filter;
