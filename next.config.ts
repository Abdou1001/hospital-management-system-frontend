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
};

export default nextConfig;
