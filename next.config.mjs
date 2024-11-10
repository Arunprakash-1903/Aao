/** @type {import('next').NextConfig} */
const nextConfig = {
  // output:'export',
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.sanity.io',},
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      }
  ]},
};

export default nextConfig;
