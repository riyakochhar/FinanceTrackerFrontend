import React, { useCallback, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createContext, useState } from "react";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";

export const AppContext = createContext();

function App() {
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState(null);

  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);
    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }
      return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
  };
  const isBreakpoint = useMediaQuery(768);

  useEffect(() => {
    const storedUser = localStorage?.getItem("user");
    if (storedUser) {
      setUser(JSON?.parse(storedUser));
    }
  }, []);

  let value = {
    reload,
    setReload,
    user,
    setUser,
    isBreakpoint,
    isMobile: isBreakpoint,
  };

  return (
    <Router>
      <div className="row">
        <AppContext.Provider value={value}>
          <AppRoutes />
        </AppContext.Provider>
      </div>
    </Router>
  );
}

export default App;
