const config = Object.freeze({
  allowedOrigins:
    process.env.STAGE === 'production' ? 'https://binhrobles.com' : '*',
});

export default config;
