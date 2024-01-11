import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import TextField from '@mui/material/TextField';

const Register = () => {

  const history = useNavigate();

  const [user, setUser] = useState({
    Hospital_Name: "",
      Email_ID: "",
      Address: "",
      Phone_Number: "",
      City: "",
      Hospital_registration_number: "",
      State: "",
      Emergency_Ward_number: "",
      Pincode: "",
      Hospital_Registration_Date: "",
      Number_of_Ambulance_available: "",
      Create_password: "",
      confirmPassword: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const {Hospital_Name, Email_ID ,Address, Phone_Number, City, Hospital_registration_number, State,Emergency_Ward_number, Pincode, Hospital_Registration_Date, Number_of_Ambulance_available, Create_password,confirmPassword} = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        Hospital_Name, Email_ID ,Address, Phone_Number, City, Hospital_registration_number, State,Emergency_Ward_number, Pincode, Hospital_Registration_Date, Number_of_Ambulance_available, Create_password, confirmPassword
      })
    });

    const data = await res.json();

    if(!data){
      window.alert("invalid register");
      console.log("invalid register");
    }
    else{
      window.alert("Registeration successfull");
      console.log("Registration Successfull");

      history("/signin");
    }

  }

  return (
    <div className='register'>
      <form method='POST' className='register-form'>

        <div className='form-group'>
        <input type="text" name="Hospital_Name" placeholder='Hospital Name' autoComplete='off'
            value={user.Hospital_Name}
            onChange={handleInputs}
          />
            <input type="email" name="Email_ID" autoComplete='off'
              value={user.Email_ID}
              onChange={handleInputs}
              placeholder='Email ID'
            />
            <input type="text" name="Address" autoComplete='off'
              value={user.Address}
              onChange={handleInputs}
              placeholder='Address'
            />
            <input type="number" name="Phone_Number" placeholder='Phone Number' autoComplete='off'
              value={user.Phone_Number}
              onChange={handleInputs}
            />
            <input type="text" name="City" placeholder='City' autoComplete='off'
              value={user.City}
              onChange={handleInputs}
            />
            <input type="number" name="Hospital_registration_number" placeholder='Hospital Registration Number' autoComplete='off'
              value={user.Hospital_registration_number}
              onChange={handleInputs}
            />
            <input type="text" name="State" placeholder='State' autoComplete='off'
              value={user.State}
              onChange={handleInputs}
            />
            <input type="text" name="Emergency_Ward_number" placeholder='Emergency-Ward Number' autoComplete='off'
              value={user.Emergency_Ward_number}
              onChange={handleInputs}
            />
            <input type="number" name="Pincode" placeholder='Pincode' autoComplete='off'
              value={user.Pincode}
              onChange={handleInputs}
            />
            {/* <input type="text" name="certificate" placeholder='Registration certificate Upload' autoComplete='off'
              value={user.name}
              onChange={{handleInputs}}
            />
            <button id='choose'>Choose</button> */}
            <input type="text" name="Hospital_Registration_Date" placeholder='Hospital Registration Date' autoComplete='off'
              value={user.Hospital_Registration_Date}
              onChange={handleInputs}
            />
            <input type="number" name="Number_of_Ambulance_available" placeholder='Number of Ambulance Available' autoComplete='off'
              value={user.Number_of_Ambulance_available}
              onChange={handleInputs}
            />
            <input type="password" name="Create_password" placeholder='Create Password' autoComplete='off'
              value={user.Create_password}
              onChange={handleInputs}
            />
            <input type="password" name="confirmPassword" placeholder='Confirm Password' autoComplete='off'
              value={user.confirmPassword}
              onChange={handleInputs}
            />
        </div>
        <div>
          <button id='signup' onClick={PostData}>Sign Up</button>
        </div>

      </form>
    </div>
  )
};

export default Register;
