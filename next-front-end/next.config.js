/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_HOST: process.env.API_HOST,
    API_PORT: process.env.API_PORT
  }
}

module.exports = nextConfig
