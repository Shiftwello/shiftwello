export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, no user data" });
      }
  
      if (!allowedRoles.includes(req.user.role_id)) {
        return res.status(403).json({ message: "Access denied: insufficient permissions" });
      }
  
      next();
    };
  };