/**
 * Role-Based Access Control (RBAC) Middleware
 * Restricts route access to users with matching roles (student, teacher, admin).
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User authentication required',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Role [${req.user.role}] is not authorized to perform this action. Required: [${roles.join(', ')}]`,
      });
    }

    next();
  };
};

export default authorizeRoles;
