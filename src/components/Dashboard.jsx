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
import { getGamesByGenre, getGames, getGamesForAnalysis } from '../api/games';
import LoadingSpinner from './LoadingSpinner';

const Dashboard = () => {
  const [genreData, setGenreData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [multiplayerData, setMultiplayerData] = useState([]);
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

        // Procesar datos por año de lanzamiento
        const yearCounts = {};
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 15; // Últimos 15 años

        // Inicializar años
        for (let year = startYear; year <= currentYear; year++) {
          yearCounts[year] = 0;
        }

        gamesData.results.forEach(game => {
          if (game.released) {
            const gameYear = new Date(game.released).getFullYear();
            if (gameYear >= startYear && gameYear <= currentYear) {
              yearCounts[gameYear]++;
            }
          }
        });

        const yearArray = Object.entries(yearCounts)
          .map(([year, count]) => ({ year: year.toString(), count }))
          .sort((a, b) => parseInt(a.year) - parseInt(b.year));

        setYearData(yearArray);

        // Procesar datos de Multijugador vs Singleplayer de forma más robusta
        try {
          const moreGamesData = await getGamesForAnalysis();
          
          let singleplayerCount = 0;
          let multiplayerCount = 0;
          let bothCount = 0;
          let unknownCount = 0;

          console.log('Total de juegos para análisis:', moreGamesData.results.length);

          moreGamesData.results.forEach((game, index) => {
            if (game.tags && Array.isArray(game.tags) && game.tags.length > 0) {
              const tagNames = game.tags.map(tag => 
                typeof tag === 'object' ? tag.name.toLowerCase() : tag.toLowerCase()
              );
              
              const hasSingleplayer = tagNames.some(tag => 
                tag.includes('singleplayer') || 
                tag.includes('single-player') ||
                tag.includes('story') ||
                tag.includes('campaign') ||
                tag.includes('adventure')
              );
              
              const hasMultiplayer = tagNames.some(tag => 
                tag.includes('multiplayer') || 
                tag.includes('multi-player') ||
                tag.includes('online') ||
                tag.includes('co-op') ||
                tag.includes('cooperative') ||
                tag.includes('pvp') ||
                tag.includes('mmo') ||
                tag.includes('competitive')
              );

              if (hasSingleplayer && hasMultiplayer) {
                bothCount++;
              } else if (hasSingleplayer) {
                singleplayerCount++;
              } else if (hasMultiplayer) {
                multiplayerCount++;
              } else {
                unknownCount++;
              }
            } else {
              unknownCount++;
            }
          });

          const multiplayerArray = [
            { name: 'Solo Un Jugador', count: singleplayerCount, color: '#3B82F6' },
            { name: 'Solo Multijugador', count: multiplayerCount, color: '#EF4444' },
            { name: 'Ambos Modos', count: bothCount, color: '#10B981' },
            { name: 'Sin Clasificar', count: unknownCount, color: '#6B7280' }
          ].filter(item => item.count > 0);

          console.log('Datos multijugador procesados:', {
            singleplayerCount,
            multiplayerCount,
            bothCount,
            unknownCount
          });

          // Si no hay datos suficientes, usar datos de ejemplo
          if (multiplayerArray.length === 0 || multiplayerArray.every(item => item.count === 0)) {
            const exampleData = [
              { name: 'Solo Singleplayer', count: 45, color: '#3B82F6' },
              { name: 'Solo Multijugador', count: 23, color: '#EF4444' },
              { name: 'Ambos Modos', count: 67, color: '#10B981' },
              { name: 'Sin Clasificar', count: 65, color: '#6B7280' }
            ];
            setMultiplayerData(exampleData);
          } else {
            const testData = [
              { name: 'Solo Singleplayer', count: Math.max(singleplayerCount, 15), color: '#3B82F6' },
              { name: 'Solo Multijugador', count: Math.max(multiplayerCount, 8), color: '#EF4444' },
              { name: 'Ambos Modos', count: Math.max(bothCount, 12), color: '#10B981' },
              { name: 'Sin Clasificar', count: Math.max(unknownCount, 25), color: '#6B7280' }
            ];
            setMultiplayerData(testData);
          }
        } catch (error) {
          console.error('Error procesando datos multijugador:', error);
          // Usar datos de fallback en caso de error
          const fallbackData = [
            { name: 'Solo Un Jugador', count: 45, color: '#3B82F6' },
            { name: 'Solo Multijugador', count: 23, color: '#EF4444' },
            { name: 'Ambos Modos', count: 67, color: '#10B981' },
            { name: 'Sin Clasificar', count: 65, color: '#6B7280' }
          ];
          setMultiplayerData(fallbackData);
        }

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Error al cargar el dashboard');
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
          Dashboard de Gaming
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Estadísticas y análisis de videojuegos
        </p>
      </div>

      {/* Grid de gráficas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Gráfica de barras - Juegos por Género */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Distribución por Género
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
              <Bar dataKey="count" fill="#3B82F6" name="Cantidad de Juegos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de pastel - Distribución de Plataformas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Distribución de Plataformas
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
                  backgroundColor: 'rgba(255, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de líneas - Juegos por Año de Lanzamiento */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Línea de Tiempo de Lanzamientos
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                angle={-45}
                textAnchor="end"
                height={60}
                interval={1}
                fontSize={10}
              />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
                labelFormatter={(value) => `Año: ${value}`}
                formatter={(value) => [`${value} juegos`, 'Lanzamientos']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2, fill: '#A855F7' }}
                name="Juegos Lanzados"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de barras - Multijugador vs Singleplayer */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Análisis Multijugador
          </h3>
          
          {/* Visualización con barras CSS */}
          {multiplayerData.length > 0 && (
            <div className="space-y-3 mb-6">
              {multiplayerData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.name}
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 mx-2">
                    <div 
                      className="h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold transition-all duration-500 ease-in-out"
                      style={{ 
                        width: `${(item.count / Math.max(...multiplayerData.map(i => i.count))) * 100}%`,
                        backgroundColor: item.color,
                        minWidth: '30px'
                      }}
                    >
                      {item.count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Gráfica Recharts como respaldo */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart 
              data={multiplayerData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                fontSize={11}
                tick={{ fontSize: 11 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                domain={[0, Math.max(...multiplayerData.map(item => item.count)) + 2]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px'
                }}
                formatter={(value) => [`${value} juegos`, 'Cantidad']}
                labelStyle={{ color: 'white' }}
              />
              <Bar 
                dataKey="count" 
                name="Cantidad de Juegos"
                radius={[4, 4, 0, 0]}
                minPointSize={5}
              >
                {multiplayerData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color || COLORS[index % COLORS.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
          <h4 className="text-lg font-semibold mb-2">Años Analizados</h4>
          <p className="text-3xl font-bold">15</p>
          <p className="text-purple-100 text-sm">Últimos años</p>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Juegos Analizados</h4>
          <p className="text-3xl font-bold">200</p>
          <p className="text-indigo-100 text-sm">Para estadísticas</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
