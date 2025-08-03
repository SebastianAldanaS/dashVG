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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
