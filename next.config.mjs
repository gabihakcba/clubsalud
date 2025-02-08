/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Opcional: Configuración para cargar archivos estáticos desde /public
  async headers() {
    return [
      {
        source: "/blogs/:path*",
        headers: [
          { 
            key: "Cache-Control", 
            value: "public, max-age=31536000, immutable" 
          },
          {
            key: "Access-Control-Allow-Origin", 
            value: "*" 
          }
        ]
      }
    ]
  }
}

export default nextConfig;