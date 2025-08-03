// Utilidades para traducción y formato de texto

// Función para limpiar HTML de las descripciones
export const cleanHTML = (htmlString) => {
  if (!htmlString) return '';
  
  // Crear un elemento temporal para limpiar HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  
  // Extraer solo el texto
  const cleanText = tempDiv.textContent || tempDiv.innerText || '';
  
  return cleanText;
};

// Diccionario básico de traducción para términos comunes de videojuegos
const gameTermsDictionary = {
  // Géneros
  'Action': 'Acción',
  'Adventure': 'Aventura',
  'Role-playing': 'RPG',
  'Role-Playing (RPG)': 'RPG',
  'RPG': 'RPG',
  'Strategy': 'Estrategia',
  'Sports': 'Deportes',
  'Racing': 'Carreras',
  'Shooter': 'Disparos',
  'Fighting': 'Lucha',
  'Puzzle': 'Puzle',
  'Simulation': 'Simulación',
  'Platformer': 'Plataformas',
  'Arcade': 'Arcade',
  'Casual': 'Casual',
  'Indie': 'Independiente',
  'Massively Multiplayer': 'Multijugador masivo',
  'Board Games': 'Juegos de mesa',
  'Educational': 'Educativo',
  'Card': 'Cartas',
  
  // Géneros específicos
  'Action-Adventure': 'Acción-Aventura',
  'First-Person Shooter': 'Disparos en primera persona',
  'Third-Person Shooter': 'Disparos en tercera persona',
  'Real-time strategy': 'Estrategia en tiempo real',
  'Turn-based strategy': 'Estrategia por turnos',
  'MMORPG': 'MMORPG',
  'Battle Royale': 'Battle Royale',
  'Fighting': 'Lucha',
  'Beat \'em up': 'Golpea y vence',
  'Hack and slash': 'Hack and slash',
  'Stealth': 'Sigilo',
  'Survival': 'Supervivencia',
  'Horror': 'Terror',
  'Psychological Horror': 'Terror psicológico',
  'Science Fiction': 'Ciencia ficción',
  'Fantasy': 'Fantasía',
  'Historical': 'Histórico',
  'Western': 'Western',
  'Post-apocalyptic': 'Post-apocalíptico',
  'Cyberpunk': 'Cyberpunk',
  'Medieval': 'Medieval',
  'Modern': 'Moderno',
  'Futuristic': 'Futurista',
  
  // Términos comunes
  'Singleplayer': 'Un jugador',
  'Single-player': 'Un jugador',
  'Multiplayer': 'Multijugador',
  'Multi-player': 'Multijugador',
  'Co-op': 'Cooperativo',
  'Cooperative': 'Cooperativo',
  'Competitive': 'Competitivo',
  'Online': 'En línea',
  'Offline': 'Sin conexión',
  'Campaign': 'Campaña',
  'Story': 'Historia',
  'Open World': 'Mundo abierto',
  'Open-World': 'Mundo abierto',
  'Sandbox': 'Mundo abierto',
  'Linear': 'Lineal',
  'Non-linear': 'No lineal',
  'First-person': 'Primera persona',
  'Third-person': 'Tercera persona',
  'Turn-based': 'Por turnos',
  'Real-time': 'Tiempo real',
  'Level': 'Nivel',
  'Quest': 'Misión',
  'Mission': 'Misión',
  'Achievement': 'Logro',
  'Trophy': 'Trofeo',
  'Boss': 'Jefe',
  'Boss Battle': 'Batalla contra jefe',
  'Enemy': 'Enemigo',
  'Player': 'Jugador',
  'Character': 'Personaje',
  'Protagonist': 'Protagonista',
  'Hero': 'Héroe',
  'Villain': 'Villano',
  'Weapon': 'Arma',
  'Armor': 'Armadura',
  'Equipment': 'Equipamiento',
  'Item': 'Objeto',
  'Inventory': 'Inventario',
  'Health': 'Salud',
  'HP': 'Puntos de vida',
  'Mana': 'Maná',
  'MP': 'Puntos de maná',
  'Experience': 'Experiencia',
  'XP': 'Experiencia',
  'Level Up': 'Subir de nivel',
  'Skills': 'Habilidades',
  'Abilities': 'Habilidades',
  'Magic': 'Magia',
  'Spell': 'Hechizo',
  'Combat': 'Combate',
  'Battle': 'Batalla',
  'Fight': 'Lucha',
  'War': 'Guerra',
  'Conflict': 'Conflicto',
  'Victory': 'Victoria',
  'Defeat': 'Derrota',
  'Win': 'Ganar',
  'Lose': 'Perder',
  'Score': 'Puntuación',
  'Points': 'Puntos',
  'Leaderboard': 'Tabla de clasificación',
  'Ranking': 'Clasificación',
  
  // Plataformas específicas
  'PC': 'PC',
  'Windows': 'Windows',
  'macOS': 'macOS',
  'Linux': 'Linux',
  'PlayStation': 'PlayStation',
  'PlayStation 4': 'PlayStation 4',
  'PlayStation 5': 'PlayStation 5',
  'PS4': 'PS4',
  'PS5': 'PS5',
  'Xbox': 'Xbox',
  'Xbox One': 'Xbox One',
  'Xbox Series X/S': 'Xbox Series X/S',
  'Nintendo Switch': 'Nintendo Switch',
  'Nintendo': 'Nintendo',
  'iOS': 'iOS',
  'Android': 'Android',
  'Mobile': 'Móvil',
  'Web': 'Web',
  'Browser': 'Navegador',
  
  // Elementos de gameplay
  'Exploration': 'Exploración',
  'Discovery': 'Descubrimiento',
  'Collection': 'Colección',
  'Crafting': 'Creación',
  'Building': 'Construcción',
  'Management': 'Gestión',
  'Resource Management': 'Gestión de recursos',
  'Base Building': 'Construcción de base',
  'City Building': 'Construcción de ciudades',
  'Farming': 'Agricultura',
  'Fishing': 'Pesca',
  'Hunting': 'Caza',
  'Trading': 'Comercio',
  'Economy': 'Economía',
  'Diplomacy': 'Diplomacia',
  'Politics': 'Política',
  'War Strategy': 'Estrategia de guerra',
  'Tactics': 'Tácticas',
  'Planning': 'Planificación',
  
  // Aspectos técnicos
  'Graphics': 'Gráficos',
  'Visuals': 'Visuales',
  'Audio': 'Audio',
  'Sound': 'Sonido',
  'Music': 'Música',
  'Voice Acting': 'Actuación de voz',
  'Cutscenes': 'Cinemáticas',
  'Animation': 'Animación',
  'Physics': 'Física',
  'AI': 'Inteligencia artificial',
  'Controls': 'Controles',
  'Interface': 'Interfaz',
  'Menu': 'Menú',
  'Settings': 'Configuración',
  'Options': 'Opciones',
  'Customization': 'Personalización',
  
  // Calificaciones y descriptores
  'Rating': 'Calificación',
  'Review': 'Reseña',
  'Score': 'Puntuación',
  'Metacritic': 'Metacritic',
  'User Score': 'Puntuación de usuarios',
  'Critics': 'Críticos',
  'Professional': 'Profesional',
  'Amateur': 'Aficionado',
  'Recommended': 'Recomendado',
  'Not Recommended': 'No recomendado',
  'Mixed': 'Mixtas',
  'Positive': 'Positivas',
  'Negative': 'Negativas',
  'Overwhelming': 'Abrumadoras',
  'Very Positive': 'Muy positivas',
  'Mostly Positive': 'Mayormente positivas',
  'Very Negative': 'Muy negativas',
  'Mostly Negative': 'Mayormente negativas',
  
  // Contenido y clasificación
  'Violence': 'Violencia',
  'Blood': 'Sangre',
  'Gore': 'Violencia gráfica',
  'Strong Language': 'Lenguaje fuerte',
  'Sexual Content': 'Contenido sexual',
  'Nudity': 'Desnudez',
  'Drug Use': 'Uso de drogas',
  'Alcohol': 'Alcohol',
  'Gambling': 'Juegos de azar',
  'Mature': 'Maduro',
  'Teen': 'Adolescente',
  'Everyone': 'Para todos',
  'Kids': 'Niños',
  'Family': 'Familiar',
  
  // Palabras comunes en inglés
  'and': 'y',
  'or': 'o',
  'the': 'el/la',
  'of': 'de',
  'in': 'en',
  'to': 'a',
  'for': 'para',
  'with': 'con',
  'from': 'desde',
  'by': 'por',
  'as': 'como',
  'is': 'es',
  'are': 'son',
  'was': 'era',
  'were': 'eran',
  'be': 'ser',
  'have': 'tener',
  'has': 'tiene',
  'had': 'tenía',
  'will': 'será',
  'would': 'sería',
  'can': 'puede',
  'could': 'podría',
  'may': 'puede',
  'might': 'podría',
  'must': 'debe',
  'should': 'debería',
  'new': 'nuevo',
  'old': 'viejo',
  'good': 'bueno',
  'bad': 'malo',
  'great': 'genial',
  'amazing': 'increíble',
  'awesome': 'impresionante',
  'fantastic': 'fantástico',
  'excellent': 'excelente',
  'perfect': 'perfecto',
  'best': 'mejor',
  'worst': 'peor',
  'better': 'mejor',
  'worse': 'peor',
  'fun': 'divertido',
  'boring': 'aburrido',
  'interesting': 'interesante',
  'exciting': 'emocionante',
  'thrilling': 'emocionante',
  'challenging': 'desafiante',
  'easy': 'fácil',
  'hard': 'difícil',
  'difficult': 'difícil',
  'simple': 'simple',
  'complex': 'complejo',
  'complicated': 'complicado',
  'fast': 'rápido',
  'slow': 'lento',
  'quick': 'rápido',
  'big': 'grande',
  'large': 'grande',
  'huge': 'enorme',
  'massive': 'masivo',
  'small': 'pequeño',
  'tiny': 'diminuto',
  'high': 'alto',
  'low': 'bajo',
  'long': 'largo',
  'short': 'corto',
  'wide': 'ancho',
  'narrow': 'estrecho',
  'deep': 'profundo',
  'shallow': 'superficial',
  'rich': 'rico',
  'poor': 'pobre',
  'detailed': 'detallado',
  'realistic': 'realista',
  'stylized': 'estilizado',
  'cartoon': 'caricatura',
  'anime': 'anime',
  'comic': 'cómic',
  'retro': 'retro',
  'vintage': 'vintage',
  'classic': 'clásico',
  'modern': 'moderno',
  'contemporary': 'contemporáneo',
  'innovative': 'innovador',
  'creative': 'creativo',
  'original': 'original',
  'unique': 'único',
  'special': 'especial',
  'epic': 'épico',
  'legendary': 'legendario',
  'iconic': 'icónico',
  'popular': 'popular',
  'famous': 'famoso',
  'well-known': 'conocido',
  'unknown': 'desconocido',
  'hidden': 'oculto',
  'secret': 'secreto',
  'mysterious': 'misterioso',
  'dark': 'oscuro',
  'light': 'claro',
  'bright': 'brillante',
  'colorful': 'colorido',
  'beautiful': 'hermoso',
  'ugly': 'feo',
  'strange': 'extraño',
  'weird': 'raro',
  'normal': 'normal',
  'standard': 'estándar',
  'premium': 'premium',
  'deluxe': 'deluxe',
  'ultimate': 'definitivo',
  'complete': 'completo',
  'full': 'completo',
  'partial': 'parcial',
  'limited': 'limitado',
  'unlimited': 'ilimitado',
  'infinite': 'infinito',
  'endless': 'sin fin',
  'final': 'final',
  'first': 'primero',
  'last': 'último',
  'next': 'siguiente',
  'previous': 'anterior',
  'current': 'actual',
  'latest': 'último',
  'recent': 'reciente',
  'upcoming': 'próximo',
  'future': 'futuro',
  'past': 'pasado',
  'present': 'presente',
  'today': 'hoy',
  'yesterday': 'ayer',
  'tomorrow': 'mañana',
  'now': 'ahora',
  'soon': 'pronto',
  'later': 'después',
  'never': 'nunca',
  'always': 'siempre',
  'sometimes': 'a veces',
  'often': 'a menudo',
  'rarely': 'raramente',
  'usually': 'usualmente',
  'frequently': 'frecuentemente',
  'occasionally': 'ocasionalmente'
};

// Función para traducir un término individual
export const translateTerm = (term) => {
  if (!term) return term;
  
  // Buscar traducción exacta primero
  const exactMatch = gameTermsDictionary[term];
  if (exactMatch) return exactMatch;
  
  // Buscar traducción insensible a mayúsculas/minúsculas
  const lowerTerm = term.toLowerCase();
  const foundKey = Object.keys(gameTermsDictionary).find(
    key => key.toLowerCase() === lowerTerm
  );
  
  if (foundKey) {
    return gameTermsDictionary[foundKey];
  }
  
  // Si no se encuentra traducción, devolver el término original
  return term;
};

// Función para traducir términos básicos
export const translateGameTerms = (text) => {
  if (!text) return '';
  
  let translatedText = text;
  
  // Crear una expresión regular para cada término (insensible a mayúsculas/minúsculas)
  Object.entries(gameTermsDictionary).forEach(([english, spanish]) => {
    const regex = new RegExp(`\\b${english}\\b`, 'gi');
    translatedText = translatedText.replace(regex, spanish);
  });
  
  return translatedText;
};

// Función combinada para limpiar y traducir
export const processGameDescription = (description) => {
  if (!description) return '';
  
  // Primero limpiar HTML
  const cleanText = cleanHTML(description);
  
  // Luego traducir términos básicos
  const translatedText = translateGameTerms(cleanText);
  
  // Limitar a una longitud razonable si es muy largo
  if (translatedText.length > 1000) {
    return translatedText.substring(0, 997) + '...';
  }
  
  return translatedText;
};

// Función para formatear fechas en español
export const formatDateInSpanish = (dateString) => {
  if (!dateString) return 'Fecha no disponible';
  
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Función para traducir ratings/calificaciones
export const translateRating = (rating) => {
  if (!rating) return 'Sin calificación';
  
  if (rating >= 4.5) return 'Excelente';
  if (rating >= 4.0) return 'Muy bueno';
  if (rating >= 3.5) return 'Bueno';
  if (rating >= 3.0) return 'Regular';
  if (rating >= 2.0) return 'Malo';
  return 'Muy malo';
};
