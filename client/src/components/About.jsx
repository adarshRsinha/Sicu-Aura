import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
// import axios from 'axios';
import Navbar from './Navbar';
import '../styles/About.css';

const About = () => {
  
  const history = useNavigate();
  const [useData, setUserData] = useState({});

  // const callAboutPage = async () => {
  //   try{
  //     const res = await fetch('/hospital-registration', {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       credentials: "include"
  //     });

  //     const data = await res.json();
  //     console.log(data);
  //     setUserData(data);

  //   } catch(err){
  //     console.log(err);
  //     // history("/signin");
  //   }
  // }

  useEffect(() => {

  const callAboutPage = async () => {
    try{
      const res = await fetch('/hospital-registration', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

    } catch(err){
      console.log(err);
      history("/signin");
    }
  };

    callAboutPage();
    
  }, []);

  return (
    <div className='container'>
       <Navbar />
      <div className="div-7">
          <div className="div-8">Hospital Registrations</div>
          <div className="div-9">
            <div className="div-10">
              <div className="div-11">Search</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff90ee6a670ceab52526091812e91c564614ca8d99f5e6ddb9d47805b6a802f8?"
                className="img-5"
              />
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c620ab88ada79dc08b1a55111b2078e694966322cd733c5b63bdad5508655ea9?"
              className="img-6"
            />
          </div>
        </div>
        <div className="div-12">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/52a210815f893ea783be5214951109b655eb34e76928f9e36b40ce958465be84?"
            className="img-7"
          />
          <div className="div-13">
          
            <table className="table-fixed"> 
              <thead>                
                <tr>
                  <th>No.</th>
                  <th>Hospital Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone No.</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Pincode</th>
                  <th>Hospital Registration Date</th>
                  <th>Hospital Registration Number</th>
                  <th>Hospital Registration Photo</th>
                  <th>Emergency-Ward Number</th>
                  <th>Number of Ambulance</th>
                </tr>
              </thead>             
              <tbody>

              {/* <tr >
                  <td>1.</td>
                  <td>ABC Hospital...</td>
                  <td>alexrobinson001@gmail.com</td>
                  <td>ABC Road, Park Colony...</td>
                  <td>9876543210</td>
                  <td>Kolkata</td>
                  <td>West Bengal</td>
                  <td>700001</td>
                  <td>12/12/2023</td>
                  <td>2133</td>
                  <td>File</td>
                  <td>101</td>
                  <td>08</td>
                </tr> */}
                
                <tr >
                  <td>{useData.Hospital_Name}</td>
                  <td>{useData.Email_ID}</td>
                  <td>{useData.Address}</td>
                  <td>{useData.Phone_Number}</td>
                  <td>{useData.City}</td>
                  <td>{useData.Hospital_registration_number}</td>
                  <td>{useData.State}</td>
                  <td>{useData.Emergency_Ward_number}</td>
                  <td>{useData.Pincode}</td>
                  <td>{useData.Hospital_Registration_Date}</td>
                  <td>{useData.Number_of_Ambulance_available}</td>
                  </tr>               
                
              </tbody>  
              
            </table>
          </div>
        </div>
    </div>
  )
}

export default About;
