/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
    // Ensure static files are handled correctly
    webpack(config) {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      });
      return config;
    },
    // Change output to 'export' for static site generation
    output: 'standalone'
  };
  
  module.exports = nextConfig;