/**
 * Logger Utility
 * Provides colorized and timestamped logs for development and production.
 * Simple, zero external bloat, and beginner-friendly.
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

const getTimestamp = () => {
  const now = new Date();
  return now.toISOString().replace('T', ' ').substring(0, 19);
};

export const logger = {
  info: (message, ...args) => {
    console.log(
      `${colors.dim}[${getTimestamp()}]${colors.reset} ${colors.blue}[INFO]${colors.reset} ${message}`,
      ...args
    );
  },
  success: (message, ...args) => {
    console.log(
      `${colors.dim}[${getTimestamp()}]${colors.reset} ${colors.green}[SUCCESS]${colors.reset} ${message}`,
      ...args
    );
  },
  warn: (message, ...args) => {
    console.warn(
      `${colors.dim}[${getTimestamp()}]${colors.reset} ${colors.yellow}[WARN]${colors.reset} ${message}`,
      ...args
    );
  },
  error: (message, ...args) => {
    console.error(
      `${colors.dim}[${getTimestamp()}]${colors.reset} ${colors.red}[ERROR]${colors.reset} ${message}`,
      ...args
    );
  },
  debug: (message, ...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `${colors.dim}[${getTimestamp()}]${colors.reset} ${colors.magenta}[DEBUG]${colors.reset} ${message}`,
        ...args
      );
    }
  },
};

export default logger;
