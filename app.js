const express = require('express');
// const dotenv = require("dotenv");
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const app = express();

require('dotenv').config({path: './config.env'})

// dotenv.config({path: './config.env'});

require('./db/conn');
// const User = require('./model/userSchema');

// app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

app.use(require('./router/auth'));

app.use('/images', express.static('uploads'));

const port = process.env.PORT;

// app.post('/capture', (req, res) => {
//     const { imageData } = req.body;
  
//     // Convert base64 image data to binary
//     const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '');
//     const binaryData = Buffer.from(base64Data, 'base64');
  
//     // Generate a unique filename (you may use a more robust method)
//     const filename = `captured_image_${Date.now()}.jpeg`;
  
//     // Write the image data to a file
//     fs.writeFile(filename, binaryData, 'binary', (err) => {
//       if (err) {
//         console.error('Error saving image:', err);
//         res.status(500).json({ error: 'Error saving image' });
//       } else {
//         console.log('Image saved successfully:', filename);
//         res.status(201).json({ message: 'Image saved successfully', filename });
//       }
//     });
//   });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination directory
    },
    filename: function (req, file, cb) {
      cb(null, 'image-' + Date.now() + '.jpeg'); // Define the filename
    }
});
  
  const upload = multer({ storage: storage });

  app.post('/upload', upload.single('image'), (req, res) => {
    // File has been uploaded, handle any further processing here
    res.status(200).send('Image uploaded successfully');
  });

app.get('/login', (req,res) => {
    res.send(`Hello Login World form the server`);
});

app.get('/signup', (req,res) => {
    res.send(`Hello Registration World form the server`);
});

app.listen(port, () => {
    console.log(`server is running`);
});