import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Cargar tema desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Función para verificar si una ruta está activa
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Enlaces de navegación
  const navLinks = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-blue-200 dark:border-purple-500/30 sticky top-0 z-50 transition-all duration-300 gaming-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 gaming-glow shadow-lg">
              <span className="text-white font-bold text-2xl animate-pulse">🎮</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 neon-text">
                GameDash
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                RETRO GAMING
              </span>
            </div>
          </Link>

          {/* Enlaces de navegación - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 border-2 ${
                  isActiveRoute(link.path)
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 border-blue-500 dark:border-purple-400 gaming-glow neon-text'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 border-transparent hover:border-blue-500/30 dark:hover:border-purple-500/30'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Controles del lado derecho */}
          <div className="flex items-center space-x-4">
            
            {/* Toggle de modo oscuro */}
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30 dark:border-purple-500/30 text-blue-600 dark:text-purple-400 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 gaming-glow group"
              title="Cambiar tema"
            >
              {darkMode ? (
                <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Botón de menú móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30 dark:border-purple-500/30 text-blue-600 dark:text-purple-400 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 gaming-glow"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActiveRoute(link.path)
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
