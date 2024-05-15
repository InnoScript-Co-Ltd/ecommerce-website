/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    distDir: 'build',
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/storage/images/**',
            },
            {
                protocol: 'https',
                hostname: 'api.winykhin.com',
                port: '',
                pathname: '/storage/images/**',
            }
        ]
    }
};

export default nextConfig;
