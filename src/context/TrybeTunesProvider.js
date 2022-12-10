import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import TrybeTunesContext from './TrybeTunesContext';

function TrybeTunesProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const value = useMemo(() => ({
    darkMode,
    setDarkMode,
  }), [darkMode]);

  return (
    <TrybeTunesContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </TrybeTunesContext.Provider>
  );
}

TrybeTunesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrybeTunesProvider;