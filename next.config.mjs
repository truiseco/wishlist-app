/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    ...(process.env.NODE_ENV === 'production' ? {
        basePath: "/wishlist-app",
        assetPrefix: "/wishlist-app/",
    } : {})
};

export default nextConfig;