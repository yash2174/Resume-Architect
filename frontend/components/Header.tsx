import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from './common/Icon';
import Logo from './common/Logo';
import { AuthContext } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const isLandingPage = location.pathname === '/';
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (isLandingPage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
        setIsScrolled(true);
    }
  }, [isLandingPage]);

  const headerClasses = isLandingPage && !isScrolled
    ? 'bg-transparent shadow-none'
    : 'bg-white/80 backdrop-blur-md shadow-sm';

  const linkColorClasses = isLandingPage && !isScrolled
    ? 'text-white hover:text-gray-200'
    : 'text-gray-600 hover:text-primary';

  const activeLinkClasses = isLandingPage && !isScrolled
    ? 'bg-white/10'
    : 'text-primary bg-blue-100';
    
  const buttonClasses = isLandingPage && !isScrolled
    ? 'text-white border-white/50 hover:bg-white/10'
    : 'text-primary border-primary/50 hover:bg-blue-50';

  const linkClasses = `transition duration-300 px-3 py-2 rounded-md text-sm font-medium ${linkColorClasses}`;
  const logoColorClass = isLandingPage && !isScrolled ? 'text-white' : 'text-primary';
  const mobileButtonColorClass = isLandingPage && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-400 hover:text-white hover:bg-gray-700';
  
  return (
    <header className={`${headerClasses} fixed w-full top-0 z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to={isAuthenticated ? "/builder" : "/"} className={`flex-shrink-0 flex items-center gap-2 ${logoColorClass}`}>
              <Logo className="h-8 w-8" />
              <span className="text-xl font-bold">AI Resume Architect</span>
            </NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                 <NavLink to="/builder" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Resume Builder</NavLink>
                 <NavLink to="/explore" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Explore</NavLink>
                 <NavLink to="/ats-checker" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>ATS Checker</NavLink>
                 <NavLink to="/resume-analyzer" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>AI Analyzer</NavLink>
                 
                 {user && (
                    <div className="relative" ref={profileRef}>
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isLandingPage && !isScrolled ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}
                            aria-expanded={isProfileOpen}
                            aria-haspopup="true"
                        >
                           {user.email[0].toUpperCase()}
                        </button>

                        {isProfileOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                    <div className="px-4 py-2 text-sm text-gray-500 border-b">
                                        Signed in as
                                        <p className="font-medium text-gray-800 truncate">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsProfileOpen(false);
                                        }}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        <Icon name="logout" className="w-4 h-4 text-gray-500" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                 )}
              </>
            ) : (
                <>
                    <NavLink to="/login" className={linkClasses}>Login</NavLink>
                    <NavLink to="/signup" className={`border text-sm font-medium px-4 py-1.5 rounded-md transition duration-300 ${buttonClasses}`}>
                        Sign Up
                    </NavLink>
                </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${mobileButtonColorClass}`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={`md:hidden ${isLandingPage && !isScrolled ? 'bg-primary/95' : 'bg-white'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {isAuthenticated ? (
              <>
                {user && <span className={`block px-3 py-2 text-sm font-medium ${linkColorClasses} opacity-75`}>{user.email}</span>}
                <NavLink to="/builder" className={({ isActive }) => `block ${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Resume Builder</NavLink>
                <NavLink to="/explore" className={({ isActive }) => `block ${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Explore by Domain</NavLink>
                <NavLink to="/ats-checker" className={({ isActive }) => `block ${linkClasses} ${isActive ? activeLinkClasses : ''}`}>ATS Checker</NavLink>
                <NavLink to="/resume-analyzer" className={({ isActive }) => `block ${linkClasses} ${isActive ? activeLinkClasses : ''}`}>AI Resume Analyzer</NavLink>
                <button onClick={logout} className={`block w-full text-left ${linkClasses}`}>Logout</button>
              </>
             ) : (
                <>
                    <NavLink to="/login" className={`block ${linkClasses}`}>Login</NavLink>
                    <NavLink to="/signup" className={`block ${linkClasses}`}>Sign Up</NavLink>
                </>
             )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;