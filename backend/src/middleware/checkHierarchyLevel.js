export const checkHierarchyLevel = (allowedLevels) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, no user data" });
      }
  
      const userLevel = Number(req.user.hierarchy_level);
      if (!allowedLevels.includes(userLevel)) {
        return res.status(403).json({ message: "Access denied: insufficient permissions" });
      }
  
      next();
    };
  };