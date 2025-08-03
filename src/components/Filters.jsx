import { useState, useEffect } from 'react';
import { getGenres, getPlatforms } from '../api/games';

const Filters = ({ onFilterChange, currentFilters = {} }) => {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [genresData, platformsData] = await Promise.all([
          getGenres(),
          getPlatforms()
        ]);
        
        setGenres(genresData.results || []);
        setPlatforms(platformsData.results || []);
      } catch (error) {
        console.error('Error loading filter data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...currentFilters,
      [filterType]: value === '' ? undefined : value
    };
    
    // Remover propiedades undefined
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key] === undefined) {
        delete newFilters[key];
      }
    });
    
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      {/* Header con toggle para móviles */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filtros
        </h3>
        <div className="flex items-center gap-2">
          {Object.keys(currentFilters).length > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              Limpiar filtros
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg
              className={`h-5 w-5 transform transition-transform ${showFilters ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
        {/* Filtro por Género */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Género
          </label>
          <select
            value={currentFilters.genres || ''}
            onChange={(e) => handleFilterChange('genres', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
          >
            <option value="">Todos los géneros</option>
            {genres.slice(0, 20).map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Plataforma */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Plataforma
          </label>
          <select
            value={currentFilters.platforms || ''}
            onChange={(e) => handleFilterChange('platforms', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
          >
            <option value="">Todas las plataformas</option>
            {platforms.slice(0, 20).map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Ordenamiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ordenar por
          </label>
          <select
            value={currentFilters.ordering || '-rating'}
            onChange={(e) => handleFilterChange('ordering', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
          >
            <option value="-rating">Mejor valorados</option>
            <option value="-released">Más recientes</option>
            <option value="released">Más antiguos</option>
            <option value="-added">Más populares</option>
            <option value="name">Nombre (A-Z)</option>
            <option value="-name">Nombre (Z-A)</option>
            <option value="-metacritic">Mejor Metacritic</option>
          </select>
        </div>
      </div>

      {/* Indicador de filtros activos */}
      {Object.keys(currentFilters).length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex flex-wrap gap-2">
            {Object.entries(currentFilters).map(([key, value]) => {
              if (!value) return null;
              
              let label = '';
              if (key === 'genres') {
                const genre = genres.find(g => g.id.toString() === value.toString());
                label = `Género: ${genre?.name || value}`;
              } else if (key === 'platforms') {
                const platform = platforms.find(p => p.id.toString() === value.toString());
                label = `Plataforma: ${platform?.name || value}`;
              } else if (key === 'ordering') {
                const orderingLabels = {
                  '-rating': 'Mejor valorados',
                  '-released': 'Más recientes',
                  'released': 'Más antiguos',
                  '-added': 'Más populares',
                  'name': 'Nombre (A-Z)',
                  '-name': 'Nombre (Z-A)',
                  '-metacritic': 'Mejor Metacritic'
                };
                label = `Orden: ${orderingLabels[value] || value}`;
              }
              
              return (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                >
                  {label}
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
