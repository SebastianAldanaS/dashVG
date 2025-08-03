import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { getGamesByGenre, getGames } from '../api/games';
import LoadingSpinner from './LoadingSpinner';

const Dashboard = () => {
  const [genreData, setGenreData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Colores para las gráficas
  const COLORS = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6366F1'
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener datos por género
        const genresData = await getGamesByGenre();
        setGenreData(genresData.slice(0, 8)); // Top 8 géneros

        // Obtener juegos populares para análisis de plataformas y ratings
        const gamesData = await getGames({ page_size: 100 });
        
        // Procesar datos de plataformas
        const platformCounts = {};
        gamesData.results.forEach(game => {
          if (game.platforms) {
            game.platforms.forEach(platform => {
              const platformName = platform.platform.name;
              platformCounts[platformName] = (platformCounts[platformName] || 0) + 1;
            });
          }
        });

        const platformArray = Object.entries(platformCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8);
        
        setPlatformData(platformArray);

        // Procesar datos de ratings
        const ratingRanges = {
          '0.0-1.0': 0,
          '1.0-2.0': 0,
          '2.0-3.0': 0,
          '3.0-4.0': 0,
          '4.0-5.0': 0
        };

        gamesData.results.forEach(game => {
          if (game.rating) {
            const rating = game.rating;
            if (rating < 1.0) ratingRanges['0.0-1.0']++;
            else if (rating < 2.0) ratingRanges['1.0-2.0']++;
            else if (rating < 3.0) ratingRanges['2.0-3.0']++;
            else if (rating < 4.0) ratingRanges['3.0-4.0']++;
            else ratingRanges['4.0-5.0']++;
          }
        });

        const ratingArray = Object.entries(ratingRanges).map(([range, count]) => ({
          range,
          count
        }));

        setRatingData(ratingArray);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Error al cargar los datos del dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner size="xl" text="Cargando estadísticas..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
          Error al cargar el dashboard
        </h3>
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header del Dashboard */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard de Videojuegos
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Estadísticas y análisis de videojuegos basados en RAWG API
        </p>
      </div>

      {/* Grid de gráficas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Gráfica de barras - Juegos por Género */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Juegos por Género
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
                fontSize={12}
              />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend />
              <Bar dataKey="count" fill="#3B82F6" name="Cantidad de juegos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de pastel - Distribución de Plataformas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Distribución por Plataformas
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de líneas - Distribución de Ratings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 xl:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Distribución de Calificaciones
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                name="Cantidad de juegos"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Total de Géneros</h4>
          <p className="text-3xl font-bold">{genreData.length}</p>
          <p className="text-blue-100 text-sm">En el top 8</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Plataformas Principales</h4>
          <p className="text-3xl font-bold">{platformData.length}</p>
          <p className="text-green-100 text-sm">Más populares</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Rango de Ratings</h4>
          <p className="text-3xl font-bold">0.0 - 5.0</p>
          <p className="text-purple-100 text-sm">Escala completa</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
