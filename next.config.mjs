/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: "/wishlist-app",
    assetPrefix: "/wishlist-app/",
};

export default nextConfig;