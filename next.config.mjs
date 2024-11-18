/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    ...(process.env.NODE_ENV === 'production' ? {
        basePath: "/wishlist-app",
        assetPrefix: "/wishlist-app/",
    } : {})
};

export default nextConfig;