/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://mrhyupewycpsrbqffyng.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaHl1cGV3eWNwc3JicWZmeW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5OTQwOTcsImV4cCI6MjAwNjU3MDA5N30.TEKu9-aGGgpdnw5uEQlnSwmg9qKoVL11ClOyI48vQtY",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
