const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req,res) => {
    res.send(`Hello World form the server`);
});

router.post('/register', (req, res) => {
    const {
      Hospital_Name,
      Email_ID,
      Address,
      Phone_Number,
      City,
      Hospital_registration_number,
      State,
      Emergency_Ward_number,
      Pincode,
      Hospital_Registration_Date,
      Number_of_Ambulance_available,
      Create_password,
      confirmPassword,
    } = req.body;
  
    if (!Hospital_Name || !Email_ID || !Address || !Phone_Number || !City || !Hospital_registration_number || !State || !Emergency_Ward_number || !Pincode || !Hospital_Registration_Date || !Number_of_Ambulance_available || !Create_password || !confirmPassword) {
      return res.json({ error: 'Please fill the field properly' });
    }
  
    // Check if the email already exists in the database
    User.findOne({ Email_ID: Email_ID })
      .then((userExist) => {
        if (userExist) {
          return res.json({ error: 'Email already exists' });
        }
  
        // Create a new User instance and save it to the database
        const user = new User({
          Hospital_Name,
          Email_ID,
          Address,
          Phone_Number,
          City,
          Hospital_registration_number,
          State,
          Emergency_Ward_number,
          Pincode,
          Hospital_Registration_Date,
          Number_of_Ambulance_available,
          Create_password,
          confirmPassword,
        });
  
        user.save()
          .then(() => {
            res.json({ message: 'User registered successfully' });
          })
          .catch((err) => res.json({ error: 'Failed to register' }));
      })
      .catch((err) => {
        console.log(err);
        res.json({ error: 'Database error' });
      });
    
});

//login route
// router.post('./signin', (req,res) => {
//     const { Email_ID, Create_password } = req.body;

//   // Check if Email_ID and Create_password are provided
//   if (!Email_ID || !Create_password) {
//     return res.json({ error: "Email and password are required" });
//   }

//   // Check the credentials against the database
//   User.findOne({ Email_ID: Email_ID }, (err, user) => {
//     // if (err) {
//     //   return res.json({ error: "Server error" });
//     // }

//     // if (!user) {
//     //   return res.json({ error: "User not found" });
//     // }

//     // Check if the provided password matches the stored password
//     if (user.Create_password !== Create_password) {
//       return res.json({ error: "Incorrect password" });
//     }

//     // res.json({message: "User Signin successfull"})
    
// });

router.post('/signin', async (req,res) => {
    try {
        let token;
        const { Email_ID, Create_password } = req.body;

        if (!Email_ID || !Create_password) {
            return res.json({ error: "Email and password are required" });
        }

        const userLogin = await User.findOne({Email_ID: Email_ID});

        console.log(userLogin);

        if(userLogin){

            token = await userLogin.generateAuthToken();
            console.log(token);

            if(!userLogin){
                res.json({error: "User error"});
            }
            else{
                res.json({message: "user signin successfully"});
            }
        }

    }
    catch(err) {
        console.log(err);
    }
});

router.get('/hospital-registration', async (req,res) => {
  try{
    const allUser = await User.find({});
    res.send({data: allUser});
  }
  catch(err){
    console.log(err);
  }
});

module.exports = router;