/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    const redirects = [
      {
        source: '/',
        destination: '/dashboard',
      },
    ]
    return redirects.map((item) => ({ ...item, basePath: false, permanent: false }))
  },
}

module.exports = nextConfig
