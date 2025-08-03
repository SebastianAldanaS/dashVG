import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import DashboardPage from './pages/DashboardPage';
import ApiKeyMissing from './components/ApiKeyMissing';

function App() {
  // Verificar si existe la API key
  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  
  // Si no hay API key, mostrar mensaje de configuración
  if (!apiKey || apiKey === 'your_api_key_here') {
    return <ApiKeyMissing />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 retro-grid">
        <Navbar />
        <div className="relative">
          {/* Gaming background effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/5 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-pink-500/5 dark:bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
