import React, { useState } from 'react';
import { filteroption } from '../admin';

const Filter = ({ onApplyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    brand: [],
  });
  const [isClicked, setIsClicked] = useState(false);

  const handleApplyFilters = () => {
    console.log('Applying filters:', selectedFilters);

    if (onApplyFilters) {
      onApplyFilters(selectedFilters);
    }

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);
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
        <button
          style={{
            ...styles.filterButton,
            ...(isClicked ? styles.filterButtonClicked : {}),
          }}
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
        <br />
        <br />
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
    padding: '10px 18px',
    backgroundColor: '#111111', // 🖤 black background
    color: '#ffffff',           // white text
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)', // subtle shadow for depth
  },


  sidebar: {
    width: '230px',
    maxHeight: 'calc(100vh - 40px)',
    padding: '28px 22px',
    background: '#ffffff',
    color: '#000000',
    borderRight: '1px solid #ddd',
    position: 'fixed',
    top: '20px',
    left: 0,
    overflowY: 'auto',
    fontFamily: "'Poppins', sans-serif",
    boxShadow: '2px 0 16px rgba(0,0,0,0.12)',
    zIndex: 100,
  },

  browseStyles: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '20px',
    fontWeight: '600',
    color: '#000000',
    cursor: 'pointer',
    userSelect: 'none',
    fontFamily: `'Poppins', sans-serif`,
    margin: 0,
  },

  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    color: '#333',
  },

  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    cursor: 'pointer',
    fontSize: '15px',
    color: '#222',
    padding: '5px 5px',
    borderRadius: '6px',
  },

  result: {
    marginTop: '8px', // reduced from 32px
    fontSize: '15px',
    color: '#000',
    lineHeight: '1.6',
  },


  resultTitle: {
    display: 'block',
    marginBottom: '12px',
    color: '#000',
    fontSize: '17px',
    fontWeight: 600,
  },

  resultLabel: {
    fontWeight: 500,
    color: '#e67e22',
    fontSize: '15px'
  },

  divider: {
    border: 'none',
    height: '1px',
    backgroundColor: '#ddd',
    margin: '16px 0',
  },
};

export default Filter;
