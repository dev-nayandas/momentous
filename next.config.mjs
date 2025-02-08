/** @type {import('next').NextConfig} */
import withPlaiceholder from '@plaiceholder/next';
const nextConfig = {
    images: {
      remotePatterns: [
       
        {
          protocol: 'https',
          hostname: 'i.ibb.co.com'
        },
      ],
    },
  };

  export default nextConfig;
