// const { Registerr, Signinn } = require('./../server');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


// const Register = async (req, res) => {
//     try {
//         const { firstName, lastName, Email, mobileNumber,Password,confirmPassword } = req.body;

//         if (!(firstName && lastName && Email && mobileNumber && Password && confirmPassword)) {
//             res.status(400).send({ message: "All inputs required" });
//         }

//         const oldUser = await userModel.findOne({ Email });
//         if (oldUser) {
//             return res.status(409).send({ message: "User Already Exist. Please Login" });
//         }

//         encryptedPassword = await bcrypt.hash(Password, 10);
//         const user = await userModel.create({
//             firstName, lastName, Email: Email.toLowerCase(), mobileNumber, Password: encryptedPassword, confirmPassword: encryptedPassword
//         });

//         const token = jwt.sign(
//             { user_id: user._id, Email },   
//             "securitykeygen",
//             {
//                 expiresIn: "1h",
//             }
//         );
//         user._token = token;
//         user.message="Registered Successfully";
//         res.status(201).json(user);
//     } catch (err) {
//         console.log(err);
//         res.status(400).send({ message: "Invalid Credentials" });
//     }
// }

// const Signin = async (req, res) => {
//     try {
//         const { Email, Password } = req.body;
//         console.log("data "+req.body.Email+"-"+req.body.Password)
//         if (!(Email && Password)) {
//             res.status(400).json({ message: "All inputs required" });
//         }
//         const user = await userModel.findOne({ Email });
// if(user){
//         if (user && (await bcrypt.compare(Password, user.Password))) {
//             const token = jwt.sign(
//                 { _id: user._id, Email },
//                 "securitykeygen",
//                 {
//                     expiresIn: "1h",
//                 }
//             );
//             user._token = token;
//             user.message="Login Success";
//             res.status(200).json(user);
//         } else {
//             res.status(400).json({ message: "password mismatch" });
//         }
//     }
//     else{
//         res.status(400).send({ message: "User not exist please register" });
//     }
//     } catch (err) {
//         console.log(err);
//         res.status(400).send({ message: "invalid credentials" });
//     }
// }


// // const resetpass = async (req, res) => {
// //     try {
// //         const { Email, Password } = req.body;
// //         if (!(Email && Password)) {
 
// //             res.status(400).json({ message: "All inputs required" });
// //         }
// //         const user = await userModel.findOne({ Email });

// //      if(user){
// //         encryptedPassword = await bcrypt.hash(Password, 10);
// //        const rep= await userModel.updateOne({ _id: user._id },
// //             { $set: { Password: encryptedPassword } },
// //             { new: true }
// //           );
 
// //             user.message="Password Updated";
// //             res.status(200).json(user);
// //         } 
// //     } catch (err) {
// //         console.log(err);
// //         res.status(400).send({ message: "User not exist please register" });
// //     }
// // }

// module.exports = {
//     Signin,
//     Register,
//     // resetpass,
// }