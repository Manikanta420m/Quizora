/**
 * 404 Not Found Middleware
 * Intercepts any request that doesn't match any registered route.
 */
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - Route [${req.method} ${req.originalUrl}] does not exist on this server`,
  });
};

export default notFound;
