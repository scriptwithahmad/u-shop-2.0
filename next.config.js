/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "img.freepik.com"],
  },
  env: {
    MONGO_URI:
      "mongodb+srv://ahmed:ahmed@edify.9anuaq1.mongodb.net/store?retryWrites=true&w=majority",
    NEXTAUTH_SECRET: "wiuroiewmx#$#13213",
    SECURE_URL: "AhmadUShopEComeraceStore",
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
