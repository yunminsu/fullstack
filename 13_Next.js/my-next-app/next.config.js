/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'msborad.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**'
      },
    ]
  }

}

module.exports = nextConfig
