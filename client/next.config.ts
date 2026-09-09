import type { NextConfig } from 'next'

import { routes } from '@/constants/routes'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: routes.signIn,
        permanent: true,
      },
    ]
  },
}

export default nextConfig
