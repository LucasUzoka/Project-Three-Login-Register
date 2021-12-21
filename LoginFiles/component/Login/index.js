import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const Login = (props) => {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        cust_email: '',
        cust_password: ''
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };


    const setSubmitted = () => {
        props.setSub();
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsExist = validateLogin();
        console.log(errorsExist);
        console.log(values);

        if (errorsExist === false) { //If no errors
            axios.post(`http://localhost:8080/customers/login/${values.cust_email}/${values.cust_password}`, values)
                .then(resp => {
                    console.log(resp)
                    if (resp.data !== "") { // "" means the customer is null
                        dispatch({
                            type: "LogIn",
                            cust_details: resp.data
                        });
                        navigate("/products");
                        setSubmitted();
                        
                    }
                })
                .catch(error => console.error(error))
        }
    }

    const validateLogin = () => {
        let hasErrors = false;
        let errors = {};

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

        setErrors(errors);
        return hasErrors;
    }


    return (

        < div className='form-content-right' >
            <form method='post' onSubmit={handleSubmit} className='form' noValidate>
                <h1>
                    Login
                </h1>

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
                        value={values.cust_password}
                        onChange={handleChange}
                    />
                    {errors.cust_password && <p>{errors.cust_password}</p>}
                </div>

                <button className='form-input-btn' type='submit'>
                    Login
                </button>
                <span className='form-input-login'>
                    Not yet Signed up?<Link to="/register"> Register</Link>
                </span>
            </form>
        </div >


    );
};

export default Login;