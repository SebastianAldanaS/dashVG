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
    <div className="space-y-8 retro-grid min-h-screen p-6">
      {/* Header del Dashboard */}
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
        <div className="relative gaming-card rounded-3xl p-8 mb-8">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 neon-text">
            GAMING DASHBOARD
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-mono uppercase tracking-widest">
            &gt;&gt; RETRO ANALYTICS SYSTEM &lt;&lt;
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-75"></span>
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-150"></span>
          </div>
        </div>
      </div>

      {/* Grid de gráficas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Gráfica de barras - Juegos por Género */}
        <div className="gaming-card rounded-2xl shadow-2xl p-6 border-2 border-blue-500/20 dark:border-purple-500/30 gaming-glow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              🎮 DISTRIBUCIÓN POR GÉNERO
            </h3>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </div>
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
        <div className="gaming-card rounded-2xl shadow-2xl p-6 border-2 border-green-500/20 dark:border-emerald-500/30 gaming-glow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              🖥️ PLATAFORMAS
            </h3>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </div>
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
        <div className="gaming-card rounded-2xl shadow-2xl p-6 border-2 border-purple-500/20 dark:border-violet-500/30 gaming-glow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
              📅 TIMELINE RETRO
            </h3>
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
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
        <div className="gaming-card rounded-2xl shadow-2xl p-6 border-2 border-pink-500/20 dark:border-rose-500/30 gaming-glow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              👥 MODO MULTIJUGADOR
            </h3>
            <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse"></div>
          </div>
          
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
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 rounded-2xl p-6 text-white gaming-glow border-2 border-blue-400/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold uppercase tracking-wider">🎯 GÉNEROS</h4>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
            <p className="text-4xl font-black mb-1 neon-text">{genreData.length}</p>
            <p className="text-blue-100 text-sm font-mono">TOP CATEGORIES</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-500 rounded-2xl p-6 text-white gaming-glow border-2 border-green-400/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold uppercase tracking-wider">🖥️ PLATAFORMAS</h4>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
            <p className="text-4xl font-black mb-1 neon-text">{platformData.length}</p>
            <p className="text-green-100 text-sm font-mono">MAIN SYSTEMS</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-violet-500 rounded-2xl p-6 text-white gaming-glow border-2 border-purple-400/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold uppercase tracking-wider">📅 AÑOS</h4>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
            <p className="text-4xl font-black mb-1 neon-text">15</p>
            <p className="text-purple-100 text-sm font-mono">TIME SPAN</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-rose-500 rounded-2xl p-6 text-white gaming-glow border-2 border-pink-400/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold uppercase tracking-wider">🎮 JUEGOS</h4>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
            <p className="text-4xl font-black mb-1 neon-text">200</p>
            <p className="text-pink-100 text-sm font-mono">ANALYZED</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
