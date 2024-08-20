const requireAdmin = (req, res, next) => {
    if (req.user && req.user.admin) {
      next(); // User is an admin, proceed to the next middleware/route handler
    } else {
      res.status(404).json({ error: 'Access denied. Admins only.' }); // Forbidden
    }
  };
  
  module.exports = requireAdmin;
  