import jwt from "jsonwebtoken";

const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("🔹 Received Token:", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check if the required role matches the user's role
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }

      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired. Please refresh your token." });
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
    }
  };
};

export default authMiddleware;
