import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({}); // State to hold validation errors
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password must be at least 8 characters long, contain at least one uppercase letter,
    // one lowercase letter, one number, and one special character.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    // Clear error for the current field as user types (optional)
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // If validation passes
      console.log('Registration Data:', formData);

      // --- Store user data (including username) in localStorage for demonstration ---
      const userToStore = {
        username: formData.username.toLowerCase(), // Store username in lowercase for case-insensitive comparison
        email: formData.email.toLowerCase(),     // Store email in lowercase
        password: formData.password              // In a real app, NEVER store plain password! Hash it on a backend!
      };
      // For this simple demo, we'll just store ONE registered user.
      // If you register multiple, it will overwrite the previous one.
      localStorage.setItem('registeredUser', JSON.stringify(userToStore));
      // --- End localStorage storage ---

      alert('User registered successfully! You can now log in with your email or username.'); // You can remove this alert if not needed
      navigate('/login'); // Redirect to login page after successful registration
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
                Register
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
                    Register
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
              Join Us
            </h6>
            <h1 className="mb-5">Register Your Account</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-6 offset-lg-3 wow fadeInUp" data-wow-delay="0.3s">
              <form onSubmit={handleSubmit} noValidate> {/* Add noValidate to prevent browser's default validation */}
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        id="username"
                        name="username"
                        placeholder="Your Username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                      <label htmlFor="username">Username</label>
                      {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label htmlFor="email">Your Email</label>
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating position-relative"> {/* Make the container relative */}
                      <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
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
                    <div className="form-floating position-relative"> {/* Make the container relative */}
                      <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <label htmlFor="confirmPassword">Confirm Password</label>
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
                      {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Register Now
                    </button>
                  </div>
                  <div className="col-12 text-center mt-3">
                    <p className="mb-0">
                      Already have an account? <Link to="/login">Login here</Link>
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

export default Register;