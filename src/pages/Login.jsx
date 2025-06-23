import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  const [errors, setErrors] = useState({}); // For input field validation errors
  const [loginError, setLoginError] = useState(''); // For overall login failure message
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear specific field error as user types
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
    // Clear general login error when user types
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError(''); // Clear previous login error

    if (validate()) {
      // Retrieve registered user from localStorage
      const storedUserString = localStorage.getItem('registeredUser');
      let registeredUser = null;

      if (storedUserString) {
        try {
          registeredUser = JSON.parse(storedUserString);
        } catch (error) {
          console.error("Error parsing registered user from localStorage:", error);
          registeredUser = null;
        }
      }

      const inputIdentifier = formData.emailOrUsername.toLowerCase(); // Convert input to lowercase for case-insensitivity
      const isIdentifierMatch = registeredUser && (
        inputIdentifier === registeredUser.email ||
        inputIdentifier === registeredUser.username
      );

      // Simulate authentication: Check if a user is registered AND if identifier and password match
      if (
        registeredUser &&
        isIdentifierMatch &&
        registeredUser.password === formData.password
      ) {
        // Successful login
        console.log('Login successful for:', formData.emailOrUsername);
        navigate('/'); // Redirect to the home page
      } else {
        // No registered user, or credentials do not match
        setLoginError('Incorrect email/username or password.');
      }
    } else {
      console.log('Form has validation errors.');
    }
  };

  return (
    <div>
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Login
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Login
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Welcome Back
            </h6>
            <h1 className="mb-5">Login to Your Account</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-6 offset-lg-3 wow fadeInUp" data-wow-delay="0.3s">
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  {/* General login error message */}
                  {loginError && (
                    <div className="col-12 text-center">
                      <div className="alert alert-danger" role="alert">
                        {loginError}
                      </div>
                    </div>
                  )}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={`form-control ${errors.emailOrUsername || loginError ? 'is-invalid' : ''}`}
                        id="emailOrUsername"
                        name="emailOrUsername"
                        placeholder="Your Email or Username"
                        value={formData.emailOrUsername}
                        onChange={handleChange}
                      />
                      <label htmlFor="emailOrUsername">Email or Username</label>
                      {errors.emailOrUsername && <div className="invalid-feedback">{errors.emailOrUsername}</div>}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating position-relative"> {/* Make the container relative */}
                      <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        className={`form-control ${errors.password || loginError ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <label htmlFor="password">Password</label>
                      <button
                        type="button"
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-2"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={{ cursor: 'pointer' }}
                      >
                        {isPasswordVisible ? (
                          <span role="img" aria-label="Hide password">👁️</span>
                        ) : (
                          <span role="img" aria-label="Show password">👁️‍🗨️</span>
                        )}
                      </button>
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Login
                    </button>
                  </div>
                  <div className="col-12 text-center mt-3">
                    <p className="mb-0">
                      Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;