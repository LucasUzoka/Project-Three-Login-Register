import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Register from '../../components/Register';
import RegisterSuccess from '../../components/RegisterSuccess';
import Navbar from '../../components/Navbar';

const RegisterForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <div style={{height: "100vh"}}>
    
      <div className='form-container'>      
        <div className='form-content-left'>
          <img className='form-img' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.misskatecuttables.com%2Fuploads%2Fshopping_cart%2F10600%2Flarge_donut.png&f=1&nofb=1' alt='donut' />
        </div>
        {!isSubmitted ? (
          <Register />
        ) : (
          <RegisterSuccess />
        )}
      </div>
    </div>
  );
};

export default RegisterForm;