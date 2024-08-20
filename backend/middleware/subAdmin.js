const requireSubAdmin = (req, res, next) => {
    if (req.user && req.user.subAdmin) {
      next(); // User is a sub-admin, proceed to the next middleware/route handler
    } else {
      res.status(404).json({ error: 'Access denied. Sub-admins only.' }); // Forbidden
    }
  };
  
  module.exports = requireSubAdmin;
  