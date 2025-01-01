import { createContext, useState, useEffect } from 'react';

const VisitContext = createContext();

export const VisitProvider = ({ children }) => {
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem('hasVisited');
    if (visited) {
      setHasVisited(true);
    }
  }, []);

  const markAsVisited = () => {
    setHasVisited(true);
    localStorage.setItem('hasVisited', 'true');
  };

  return (
    <VisitContext.Provider value={{ hasVisited, markAsVisited }}>
      {children}
    </VisitContext.Provider>
  );
};

export default VisitContext;
