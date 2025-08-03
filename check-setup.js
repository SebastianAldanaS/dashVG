#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración del proyecto GameDash...\n');

// Verificar archivo .env
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('your_api_key_here')) {
    console.log('⚠️  Necesitas configurar tu API key en el archivo .env');
    console.log('   Lee las instrucciones en API_SETUP.md\n');
  } else {
    console.log('✅ Archivo .env configurado\n');
  }
} else {
  console.log('⚠️  Archivo .env no encontrado. Crea uno basado en .env.example\n');
}

// Verificar dependencias
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = {
  'react': '✅ React',
  'react-router-dom': '✅ React Router',
  'axios': '✅ Axios',
  'recharts': '✅ Recharts',
  'tailwindcss': '✅ Tailwind CSS'
};

console.log('📦 Verificando dependencias:');
Object.keys(requiredDeps).forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    console.log(`   ${requiredDeps[dep]}`);
  } else {
    console.log(`   ❌ ${dep} no instalado`);
  }
});

console.log('\n🚀 Para iniciar el proyecto:');
console.log('   npm run dev');
console.log('\n📖 Documentación adicional:');
console.log('   - API_SETUP.md: Configuración de API key');
console.log('   - README.md: Documentación completa');
console.log('\n🎮 ¡Disfruta explorando videojuegos!');
