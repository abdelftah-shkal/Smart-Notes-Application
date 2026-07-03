/**
 * Workspace Flow — Environment Configuration
 * @author Abdelfatah
 * Centralizes all environment variable access with defaults and validation.
 */

const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URI: process.env.DATABASE_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
};

const validateEnv = () => {
  const required = ['DATABASE_URI', 'JWT_SECRET'];
  const missing = required.filter((key) => !env[key]);

  if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    console.error('   Please create a .env file based on .env.example');
    process.exit(1);
  }
};

module.exports = { env, validateEnv };
