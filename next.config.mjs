/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // evita Module-not-found per dialetti che non usi
      config.externals.push(
        'oracledb',
        '@azure/app-configuration',
        '@azure/identity',
        '@azure/keyvault-secrets'
      );
    }
    return config;
  },
};

export default nextConfig;

