const config = Object.freeze({
  allowedOrigins:
    process.env.STAGE === 'production' ? 'https://ghosts.binhrobles.com' : '*',
});

export default config;
