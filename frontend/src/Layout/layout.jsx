import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Deznav from "./deznav";
import Header from "./header";
import NavHeader from "./navHeader";
import Preloader from "./preloader";
import { Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from '../api';

const Layout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(null);
    
  useEffect(() => {
    // Only load script once
    const existingScript = document.querySelector(`script[src="/js/styleSwitcher.js"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "/js/styleSwitcher.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // ⚠️ Don't remove it on cleanup, keep it persistent
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to fetch current user:', err.message);
      }
    };

    fetchUser();
  }, []);


  useEffect(() => {
    if (window.$ && window.$.fn.selectpicker) {
      window.$(".default-select").selectpicker();
    }
  }, []);

  useEffect(() => {
    if (window.$ && window.$.fn.selectpicker) {
      window.$(".default-select").selectpicker("refresh");
    }
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading && <Preloader />}
      <div id="main-wrapper">
        <NavHeader />
        <Header user={user}/>
        <Deznav user={user}/>
        <div className="content-body">
          <Outlet context={{ user }}/>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;