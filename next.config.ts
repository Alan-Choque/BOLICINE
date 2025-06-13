// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'novacode-peliculas-cartelera.b-cdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'novacode-portadas.b-cdn.net', // <-- ¡Añade este nuevo objeto para el dominio!
        port: '',
        pathname: '/**',
      },
      // Añade más objetos para otros dominios si los tienes
    ],
  },
  // ... otras configuraciones de tu Next.js
};

module.exports = nextConfig;