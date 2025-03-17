/** @type {import('next').NextConfig} */
// import autoCert from "anchor-pki/auto-cert/integrations/next";
// const withAutoCert = autoCert({
//   enabledEnv: "development",
// });
const nextConfig = {
  // output:'export
  // experimental:{
  //   serverComponentsExternalPackages: ['bcrypt'],
  // },
  //serverComponentsExternalPackages: ['bcrypt'],
  // webpack: (config) => {
  //      config.externals = [...config.externals, 'bcrypt'];
  //      return config;
  //   },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.sanity.io',},
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'education.architecture-academics.online',
      },

  ]},
};
export default nextConfig;
