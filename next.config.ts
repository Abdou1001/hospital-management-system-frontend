import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "bqbigzyesvrsymsybxoz.supabase.co",
            },
        ],
    },
    output: "standalone",
    async redirects() {
        return [
            {
                source: "/",
                destination: "/dashboard",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
