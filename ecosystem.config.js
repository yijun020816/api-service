module.exports = {
  apps: [
    {
      name: 'API-Service',
      script: './.output/server/index.mjs',
      exec_mode: 'cluster',
      instances: '1',
      port: 8040,
      env: {
        NODE_ENV: 'production',
        NUXT_PUBLIC_API_URL: process.env.NUXT_PUBLIC_API_URL,
        REDIS_HOST: '',
        REDIS_USER: '',
        NUXT_PORT: 80,
        REDIS_PASSWORD: '',
      },
    },
  ],
}
