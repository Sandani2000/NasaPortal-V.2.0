const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const authenticateUser = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    const tokenMatches = authorizationHeader.match(/Bearer\s+(\S+)/);

    if (!tokenMatches || tokenMatches.length < 2) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization header format",
      });
    }

    // Extract the token from the match and remove whitespace
    const token = tokenMatches[1].trim();

    const decoded = jwt.verify(token, process.env.jwt_secret);

    if (decoded.userId) {
      req.user = decoded; // Set decoded user information to req.user
      // console.log("Decoded user:", req.user); // Log decoded user information
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const authorizeAdminOrFaculty = async (req, res, next) => {
//   const userId = req.user.userId; // Access userId from req.user

//   try {
//     // Fetch user from the database using userId
//     const user = await User.findById(userId);

//     if (!user || !user.role) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized. User not found or role not specified.",
//       });
//     }

//     if (user.role === "admin" || user.role === "faculty") {
//       next();
//     } else {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized. Only admins and faculty members are allowed.",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

const authorizeAdmin = async (req, res, next) => {
  const userId = req.user.userId; // Access userId from req.user

  try {
    // Fetch user from the database using userId
    const user = await User.findById(userId);

    if (!user || !user.role) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized. User not found or role not specified.",
      });
    }

    if (user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized. Only admins are allowed.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  authenticateUser,
  authorizeAdmin,
};
