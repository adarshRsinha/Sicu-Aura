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

// Route to store image
// router.post('/capture', async (req, res) => {
//   const { imageData } = req.body;

//   // Create a new image document and save it to the database
//   try {
    // const newImage = new Image({ imageData });
//     await newImage.save();
//     res.status(201).json({ message: 'Image saved successfully' });
//   } catch (error) {
//     console.error('Error saving image:', error);
//     res.status(500).json({ error: 'Error saving image' });
//   }
// });

// router.get('/capture/:id', async (req, res) => {
//   const imageId = req.params.id;

//   try {
//     // Retrieve the image from the database
//     const image = await Image.findById(imageId);

//     if (!image) {
//       return res.status(404).json({ error: 'Image not found' });
//     }

//     // Send the image data as a response
//     res.set('Content-Type', 'image/jpeg');
//     res.send(image.imageData);
//   } catch (error) {
//     console.error('Error fetching image:', error);
//     res.status(500).json({ error: 'Error fetching image' });
//   }
// });

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