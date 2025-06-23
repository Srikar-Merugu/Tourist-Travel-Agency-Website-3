import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import allPackages from '../data/packagesData'; // Import the centralized data

function Booking() {
  const location = useLocation(); // Initialize useLocation hook

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    datetime: '', // This will store the date & time value
    destination: '',
    message: ''
  });

  const [submissionMessage, setSubmissionMessage] = useState('');
  const [destinations, setDestinations] = useState([]);

  // useEffect to extract unique destinations from allPackages when the component mounts
  useEffect(() => {
    const uniqueDestinations = [...new Set(allPackages.map(pkg => pkg.location))];
    setDestinations(uniqueDestinations);
    // Note: We'll set the default/pre-selected destination in the next useEffect
    // to allow for values coming from location.state to take precedence.
  }, []);

  // New useEffect to handle pre-selecting destination from link state (from Packages page)
  useEffect(() => {
    // This effect runs after destinations are populated
    if (destinations.length > 0) { // Ensure destinations are loaded
      if (location.state && location.state.selectedDestination) {
        const destinationFromPackage = location.state.selectedDestination;
        // Check if the passed destination is a valid option in our list
        if (destinations.includes(destinationFromPackage)) {
          setFormData(prev => ({ ...prev, destination: destinationFromPackage }));
        } else {
          // If the passed destination is not in the list (e.g., a typo or old data),
          // set to default or an empty string. For now, setting to first available.
          console.warn(`Passed destination "${destinationFromPackage}" not found in available destinations.`);
          setFormData(prev => ({ ...prev, destination: destinations[0] }));
        }
      } else {
        // If no destination is passed, set to the first available destination as a default
        setFormData(prev => ({ ...prev, destination: destinations[0] }));
      }
    }
  }, [location.state, destinations]); // Depend on location.state and destinations

  // useEffect for Tempus Dominus Date Picker Initialization and Cleanup
  useEffect(() => {
    let $datetimeInput; // Declare a variable to hold the jQuery object

    // Ensure jQuery and Tempus Dominus are available globally
    if (window.jQuery && window.jQuery.fn.datetimepicker) {
      $datetimeInput = window.jQuery('#datetime');

      // Crucial: Check if the datetimepicker has already been initialized on this element.
      if (!$datetimeInput.data('DateTimePicker')) {
        // Initialize the datetimepicker
        $datetimeInput.datetimepicker({
          format: 'L', // Example format: 'MM/DD/YYYY'
          icons: {
            time: "fa fa-clock",
            date: "fa fa-calendar",
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down",
            previous: "fa fa-chevron-left",
            next: "fa fa-chevron-right",
            today: "fa fa-calendar-check",
            clear: "fa fa-trash",
            close: "fa fa-times"
          },
          // Set minDate to today to prevent selecting past dates
          minDate: new Date()
        });

        // Attach an event listener to update React state when the date/time changes
        // Use a namespace for the event ('change.datetimepicker') to allow specific unbinding
        $datetimeInput.on('change.datetimepicker', function (e) {
          setFormData(prev => ({ ...prev, datetime: e.target.value }));
        });
      }
    }

    // Cleanup function: destroy the datetimepicker instance when the component unmounts
    return () => {
      // Only attempt to destroy if jQuery and the plugin are available,
      // AND the datetimepicker was actually initialized on this element.
      if ($datetimeInput && $datetimeInput.data('DateTimePicker')) {
        $datetimeInput.off('change.datetimepicker'); // Remove event listener
        $datetimeInput.datetimepicker('destroy'); // Destroy the plugin instance
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  // Handler for all form input changes (except datetime, which is handled by Tempus Dominus event)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default browser form submission

    console.log('Booking Form Data Submitted:', formData);

    setSubmissionMessage('Your booking request has been received successfully! We will contact you shortly.');

    // Optionally, clear the form fields after successful submission
    setFormData({
      name: '',
      email: '',
      datetime: '',
      destination: destinations.length > 0 ? destinations[0] : '', // Reset to first destination
      message: ''
    });

    // Clear the message after 5 seconds
    setTimeout(() => {
      setSubmissionMessage('');
    }, 5000);
  };

  return (
    <div>
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">Booking</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Booking
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Process Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Process
            </h6>
            <h1 className="mb-5">3 Easy Steps</h1>
          </div>
          <div className="row gy-5 gx-4 justify-content-center">
            <div
              className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="position-relative border border-primary pt-5 pb-4 px-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{ width: 100, height: 100 }}
                >
                  <i className="fa fa-globe fa-3x text-white" />
                </div>
                <h5 className="mt-4">Choose Your Destination</h5>
                <hr className="w-25 mx-auto bg-primary mb-1" />
                <hr className="w-50 mx-auto bg-primary mt-0" />
                <p className="mb-0">
                  Browse through our exciting tour packages and pick the destination that matches your dream vacation.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="position-relative border border-primary pt-5 pb-4 px-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{ width: 100, height: 100 }}
                >
                  <i className="fa fa-dollar-sign fa-3x text-white" />
                </div>
                <h5 className="mt-4">Make Payment</h5>
                <hr className="w-25 mx-auto bg-primary mb-1" />
                <hr className="w-50 mx-auto bg-primary mt-0" />
                <p className="mb-0">
                  Securely pay online using your preferred method and get instant confirmation with all booking details.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="position-relative border border-primary pt-5 pb-4 px-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{ width: 100, height: 100 }}
                >
                  <i className="fa fa-plane fa-3x text-white" />
                </div>
                <h5 className="mt-4">Fly & Explore</h5>
                <hr className="w-25 mx-auto bg-primary mb-1" />
                <hr className="w-50 mx-auto bg-primary mt-0" />
                <p className="mb-0">
                  Pack your bags, catch your flight, and enjoy a seamless and memorable travel experience with us!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Process End */}

      {/* Booking Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="booking p-5">
            <div className="row g-5 align-items-center">
              {/* Left Text Column */}
              <div className="col-md-6 text-white">
                <h6 className="text-white text-uppercase">Booking</h6>
                <h1 className="text-white mb-4">Online Booking</h1>
                <p className="mb-4">
                  Ready to explore your dream destination? With just a few clicks, you can book your perfect getaway tailored exactly to your needs.
                </p>
                <p className="mb-4">
                  Whether it's a relaxing beach escape, an adventurous mountain trek, or a cultural city tour — we make your travel planning seamless and stress-free.
                </p>
                <a className="btn btn-outline-light py-3 px-5 mt-2" href="/">
                  Read More
                </a>
              </div>

              {/* Right Form Column */}
              <div className="col-md-6">
                <h1 className="text-white mb-4">Book A Tour</h1>
                <form onSubmit={handleSubmit}>
                  {submissionMessage && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      {submissionMessage}
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setSubmissionMessage('')}></button>
                    </div>
                  )}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control bg-transparent text-white"
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control bg-transparent text-white"
                          id="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      {/* Note: The 'datetimepicker-input' class is crucial for Tempus Dominus */}
                      <div
                        className="form-floating date"
                        id="date3" // This ID is used by the jQuery plugin
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control bg-transparent datetimepicker-input text-white"
                          id="datetime" // This ID is used by the jQuery plugin and for state
                          name="datetime"
                          placeholder="Date & Time"
                          data-target="#date3" // Points to the parent div for the plugin to work
                          data-toggle="datetimepicker"
                          value={formData.datetime} // Keep this for React to display the value
                          readOnly={true} // Make it read-only to prevent manual typing and force picker usage
                          required
                        />
                        <label htmlFor="datetime">Date & Time</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select bg-transparent text-white"
                          id="select1"
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a Destination</option>
                          {destinations.map((destination, index) => (
                            <option key={index} value={destination}>
                              {destination}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="select1">Destination</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control bg-transparent text-white"
                          placeholder="Special Request"
                          id="message"
                          name="message"
                          style={{ height: 100 }}
                          value={formData.message}
                          onChange={handleChange}
                        />
                        <label htmlFor="message">Special Request</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-outline-light w-100 py-3"
                        type="submit"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Booking End */}
    </div>
  );
}

export default Booking;