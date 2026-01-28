import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    //checking if token is provided or not
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized Access: No Token Provided",
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      return res.status(401).json({
        message: "Unable to decode this token",
        success: false,
      });
    }

    req.user = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.error("Auth Token Error: ", error.message);
    return res.status(401).json({
      message: "Invalid or Expired Token",
      success: false,
    });
  }
};

export default authenticateToken;
