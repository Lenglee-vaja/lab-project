import jwt from "jsonwebtoken"
import CryptoJS from "crypto-js";
import { statusMessage, tokenSet } from "../config/index.js"

//MEAN: Generate Access Token and Refresh Token
export const GenerateToken = (data) => {
  const payload = {
    _id: EnCrypt(data._id.toString()),
    role: EnCrypt(data.role)
  };
  const accessToken = jwt.sign(payload, tokenSet.JWT_SECRET_KEY, { expiresIn: tokenSet.TOKEN_EXPIRE_TIME });
  const refrehToken = jwt.sign(payload, tokenSet.JWT_REFRSHTOKEN_SECRET_KEY, { expiresIn: tokenSet.REFRSHTOKEN_EXPIRE_TIME });
  return { accessToken, refrehToken };
};


export const VerifyToken = (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    return res.status(403).json({ msg: 'Request token is missing' });
  }

  // Extract token from the authorization header
  const token = authorization.split(' ')[1]; // Extract the token part after 'Bearer '

  try {
    jwt.verify(token, tokenSet.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: statusMessage.TOKEN_IS_NOT_VALID });
      }
      // Decoding the token payload
      const payload = {
        _id: DeCrypt(decoded._id),
        role: DeCrypt(decoded.role)
      };

      // Attach the decoded payload to the request object
      req.payload = payload;
      return next();
    });
  } catch (error) {
    console.log({error});
    return res.status(401).json({ msg: statusMessage.TOKEN_IS_EXPIRED });
  }
};


// //MEAN: Verify RefreshToken 
// export const RegenerateToken = async (req, res, next) => {
//   const refreshToken = req.body.refreshToken
//   if (!refreshToken) {
//     return res.status(403).json({ msg: statusMessage.BAD_REQUEST });
//   }
//   try {
//     jwt.verify(refreshToken, tokenSet.JWT_REFRSHTOKEN_SECRET_KEY, (err, data) => {
//       if (err) {
//         return res.status(403).json({ msg: statusMessage.TOKEN_IS_NOT_VALID });
//       }
//       const payload = {
//         _id: data._id,
//         role: data.role
//       }
//       const accessToken = jwt.sign(payload, tokenSet.JWT_SECRET_KEY, { expiresIn: tokenSet.TOKEN_EXPIRE_TIME })
//       const refrehToken = jwt.sign(payload, tokenSet.JWT_REFRSHTOKEN_SECRET_KEY, { expiresIn: tokenSet.REFRSHTOKEN_EXPIRE_TIME });
//       return res.json({ accessToken, refrehToken });
//     });
//   } catch (error) {
//     return res.status(401).json({ msg: statusMessage.TOKEN_IS_EXPIRED });
//   }
// };


export const RegenerateToken = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({ msg: statusMessage.BAD_REQUEST });
  }
  try {
    jwt.verify(refreshToken, tokenSet.JWT_REFRSHTOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ msg: statusMessage.TOKEN_IS_NOT_VALID });
      }

      // Decrypt the decoded payload
      const payload = {
        _id: DeCrypt(decoded._id),
        role: DeCrypt(decoded.role)
      };

      // Encrypt the payload before generating a new access token
      const encryptedPayload = {
        _id: EnCrypt(payload._id),
        role: EnCrypt(payload.role)
      };

      // Generate a new access token using the encrypted payload
      const accessToken = jwt.sign(encryptedPayload, tokenSet.JWT_SECRET_KEY, { expiresIn: tokenSet.TOKEN_EXPIRE_TIME });
      const refrehToken = jwt.sign(encryptedPayload, tokenSet.JWT_REFRSHTOKEN_SECRET_KEY, { expiresIn: tokenSet.REFRSHTOKEN_EXPIRE_TIME });
      return res.json({ accessToken, refrehToken });
    });
  } catch (error) {
    return res.status(401).json({ msg: statusMessage.TOKEN_IS_EXPIRED });
  }
};


//MEAN: Verify Token is a Admin
export const VerifyTokenAndAdmin = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.payload.role === "ADMIN") {
      return next();
    } else {
      return res.status(400).json({ msg: statusMessage.PERMISSION_DENIED });
    }
  });
};

//MEAN: Verify Token is a Admin or staff
export const VerifyTokenAndAdminOrStaff = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.payload.role === "ADMIN" || req.payload.role === "STAFF") {
      return next();
    } else {
      return res.status(400).json({ msg: statusMessage.PERMISSION_DENIED });
    }
  });
};




//======================================Helper===================================================




export const EnCrypt = (plaintext) => {
  // console.log(plaintext);
  const chipertext = CryptoJS.AES.encrypt(plaintext.toString(), tokenSet.SECRET_KEY).toString();
  return chipertext
}

export const DeCrypt = (chipertext) => {
  const decoded = CryptoJS.AES.decrypt(chipertext, tokenSet.SECRET_KEY).toString(CryptoJS.enc.Utf8);
  return decoded
}
