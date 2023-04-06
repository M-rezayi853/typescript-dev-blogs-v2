/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'upload.wikimedia.org',
      'www.whoa.in',
      'avatars.mds.yandex.net',
      'img.freepik.com',
      'images.all-free-download.com',
    ],
  },
}

module.exports = nextConfig
