/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI:
    "mongodb+srv://ahmed:ahmed@edify.9anuaq1.mongodb.net/store?retryWrites=true&w=majority",
  },
  reactStrictMode: true,
}

module.exports = nextConfig
