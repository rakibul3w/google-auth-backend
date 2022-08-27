const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const { OAuth2Client } = require("google-auth-library");

const cilent = new OAuth2Client("668363364374-s3b9e48iu5r1k5p9t66mcjm2g0mjio5u.apps.googleusercontent.com")

const userGoogleAuth = async (req, res) => {
  const { tokenId } = req.body;
//   console.log(tokenId)
  cilent.verifyIdToken({idToken: tokenId, audience: "668363364374-s3b9e48iu5r1k5p9t66mcjm2g0mjio5u.apps.googleusercontent.com"})
    .then(async(response)=>{
        const {name, email, email_verified} = response.payload;
        // console.log(response.payload);
        if(email_verified){
            const userExists = await User.findOne({ email: email });
            if (userExists) {
                res.json({
                    _id: userExists._id,
                    name: userExists.name,
                    email: userExists.email,
                    token: generateToken(userExists._id),
                  });
            }else{
                const user = await User.create({
                    name: response.payload.name,
                    email: response.payload.email
                  });
                  if (user) {
                    res.status(200).json({
                      _id: user._id,
                      name: user.name,
                      email: user.email,
                      token: generateToken(user._id),
                    });
                  } else {
                    res.status(400).json({
                        error: {
                            message: "User not found."
                        }
                    })
                  }
            }
        }else{
            res.status(400).json({
                error: {
                    message: "Can not login."
                }
            })
        }
    })
};


// normal login 
// const userLogin = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email, password });

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid Email or Password");
//   }
// };


module.exports = { userGoogleAuth };