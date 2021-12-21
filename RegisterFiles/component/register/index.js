import React from "react"
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import "./register.css"

const Register = (props) => {

    // const { handleChange, handleSubmit, values, errors } = useRegister(
    //     submitForm,
    //     validate
    //   );
    const navigate = useNavigate();
    const [values, setValues] = useState({
        cust_first_name: '',
        cust_last_name: '',
        cust_email: '',
        cust_password: '',
        password2: '',
        cust_address: ''
    });

    const [errors, setErrors] = useState({});


    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsExist = validateRegister();

        console.log(errorsExist);
        console.log(values);
        
        if(errorsExist == false){ //If no errors
            axios.post("http://localhost:8080/customers", values)
            .then(resp => 
                {
                    console.log(resp.data);
                    alert("Account Created!");
                    navigate("/login");
                })
            .catch(error => {
                console.error(error);
                alert("Account ot created. This email is taken.");
            })
        }
    };

    const validateRegister = () => {

        let hasErrors = false; //Assume no errors 
        let errors = {};
        
          if (!values.cust_first_name.trim()) {
              hasErrors = true;
            errors.cust_first_name = 'First name required';
          }
          if (!values.cust_last_name.trim()) {
            hasErrors = true;
            errors.cust_last_name = 'Last name required';
          }
          if(!values.cust_address.trim()){
              hasErrors = true;
              errors.cust_address = '';
          }
          if (!values.cust_email) {
            hasErrors = true;
            errors.cust_email = 'Email required';
          } else if (!/\S+@\S+\.\S+/.test(values.cust_email)) {
            hasErrors = true;
            errors.cust_email = 'Email address is invalid';
          }
          if (!values.cust_password) {
            hasErrors = true;
            errors.cust_password = 'Password is required';
          } else if (values.cust_password.length < 6) {
            hasErrors = true;
            errors.cust_password = 'Password needs to be 6 characters or more';
          }
        
          if (!values.password2) {
            hasErrors = true;
            errors.password2 = 'Password is required';
          } else if (values.password2 !== values.cust_password) {
            hasErrors = true;
            errors.password2 = 'Passwords do not match';
          }
         
          setErrors(errors);
          return hasErrors;
        }


    return (

        < div className='form-content-right' >
            <form onSubmit={handleSubmit} className='form' noValidate>
                <h1>
                    Register Today
                </h1>
                <div className='form-inputs'>
                    <label className='form-label'>First Name</label>
                    <input
                        className='form-input'
                        type='text'
                        name='cust_first_name'
                        placeholder='Enter your first name'
                        value={values.cust_first_name}
                        onChange={handleChange}
                    />
                    {errors.cust_first_name && <p>{errors.cust_first_name}</p>}
                </div>
                <div className='form-inputs'>
                    <label className='form-label'>Last Name</label>
                    <input
                        className='form-input'
                        type='text'
                        name='cust_last_name'
                        placeholder='Enter your last name'
                        value={values.cust_last_name}
                        onChange={handleChange}
                    />
                    {errors.cust_last_name && <p>{errors.cust_last_name}</p>}
                </div>
                <div className='form-inputs'>
                    <label className='form-label'>Email</label>
                    <input
                        className='form-input'
                        type='email'
                        name='cust_email'
                        placeholder='Enter your email'
                        value={values.cust_email}
                        onChange={handleChange}
                    />
                    {errors.cust_email && <p>{errors.cust_email}</p>}
                </div>
                <div className='form-inputs'>
                    <label className='form-label'>Password</label>
                    <input
                        className='form-input'
                        type='password'
                        name='cust_password'
                        placeholder='Enter your password'
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.cust_password && <p>{errors.cust_password}</p>}
                </div>
                <div className='form-inputs'>
                    <label className='form-label'>Confirm Password</label>
                    <input
                        className='form-input'
                        type='password'
                        name='password2'
                        placeholder='Confirm your password'
                        value={values.password2}
                        onChange={handleChange}
                    />
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>
                <div className='form-inputs'>
                    <label className='form-label'>Address</label>
                    <input
                        className='form-input'
                        type='text'
                        name='cust_address'
                        placeholder='Enter your address'
                        value={values.cust_address}
                        onChange={handleChange}
                    />
                    {errors.cust_address && <p>{errors.cust_address}</p>}
                </div>
                <button className='form-input-btn' type='submit'>
                    Sign up
                </button>
                <span className='form-input-login'>
                    Already have an account? <Link to='/login'>Login here!</Link>
                </span>
            </form>
        </div >


    );
};

export default Register;