import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  
  const history = useNavigate();
  const [hospitalName, setHospitalName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
      e.preventDefault();

      const res = await fetch('/signin', {
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          hospitalName,
          email,
          password
        })
      });

      const data = res.json();

      if(!data){
        window.alert("Invalid email and password");
      }
      else{
        window.alert("Login Successfull");
        history("/capture");
      }
  }

    return (
      <div className='container'>
              <div className='login-box'>
              <h2>Welcome to Sicu-aura</h2>
              <span>Your one stop safety solutions using innovative technology</span>
            <form method="POST" className='login-form'>
              <div className='input-field'>
                  <input type="text" 
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  placeholder='Hospital Name' />
              </div>
              <div className='input-field'>
                  <input type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email ID' />
              </div>
              <div className='input-field'>
                  <input type="passwo
                  rd" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  placeholder='Create Password' />
              </div>
              {/* <div className='input-field'>
                  <input type="number" placeholder='Special Access Code' />
              </div> */}
              <br/>
              <br />
              <div>
              <button id='login' onClick={loginUser}>Login</button>
              </div>
            </form>
          </div>
      </div>
    )
}

export default Login
