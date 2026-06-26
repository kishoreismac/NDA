/** @type {import('next').NextConfig} */
// @ts-nocheck

const nextConfig = {
  reactStrictMode: true,
  // Produces a self-contained build under .next/standalone with a tiny
  // server.js — ideal for Azure App Service (Linux, Node) deployments.
  output: "standalone",
};
export default nextConfig;
