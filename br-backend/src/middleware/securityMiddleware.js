const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
};

const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    if (typeof obj === 'string') {
      return obj.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/on\w+="[^"]*"/gi, '')
                .replace(/javascript:/gi, '');
    }
    if (Array.isArray(obj)) return obj.map(sanitize);
    if (obj && typeof obj === 'object') {
      const clean = {};
      for (const [key, value] of Object.entries(obj)) {
        clean[key] = sanitize(value);
      }
      return clean;
    }
    return obj;
  };

  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  if (req.params) req.params = sanitize(req.params);
  next();
};

const csrfProtection = (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const origin = req.headers.origin || req.headers.referer;
    const allowedOrigins = (process.env.FRONTEND_URL || '').split(',').filter(Boolean);
    if (allowedOrigins.length > 0 && origin) {
      const isAllowed = allowedOrigins.some((o) => origin.startsWith(o));
      if (!isAllowed && req.method !== 'OPTIONS') {
        return res.status(403).json({ success: false, message: 'Invalid origin' });
      }
    }
  }
  next();
};

module.exports = { securityHeaders, sanitizeInput, csrfProtection };
