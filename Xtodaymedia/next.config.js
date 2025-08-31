/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.automagg.com',
      'img.youtube.com',
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'graph.facebook.com',
      'platform-lookaside.fbsbx.com',
      'pbs.twimg.com',
      'abs.twimg.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'placehold.co',
      'placehold.jp',
      'placehold.it',
      'placekitten.com',
      'picsum.photos',
      'source.unsplash.com',
      'images.pexels.com',
      'cdn.pixabay.com',
      'stocksnap.io',
      'burst.shopify.com',
      'images.freeimages.com',
      'www.gravatar.com',
      'secure.gravatar.com',
      'www.libravatar.org',
      'secure.libravatar.org',
      'ui-avatars.com',
      'api.dicebear.com',
      'avatars.dicebear.com',
      'robohash.org',
      'api.multiavatar.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ]
  }
}

module.exports = nextConfig 