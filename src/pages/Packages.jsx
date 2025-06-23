import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Make sure Link is imported

function Packages() {
  const [selectedType, setSelectedType] = useState("all");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allPackages = [
    {
      location: "Thailand",
      days: "3 Days",
      price: "₹12,500",
      people: "2 Person",
      img: "package-1.jpg",
      type: "international",
      itinerary: [
        "Arrival in Bangkok and city tour",
        "Visit Coral Island and Pattaya Beach",
        "Shopping and departure"
      ]
    },
    {
      location: "Indonesia",
      days: "3 Days",
      price: "₹11,600",
      people: "2 Person",
      img: "package-2.jpg",
      type: "international",
      itinerary: [
        "Arrival in Bali and local sightseeing",
        "Explore beaches and temples",
        "Shopping and cultural show"
      ]
    },
    {
      location: "Malaysia",
      days: "3 Days",
      price: "₹15,800",
      people: "2 Person",
      img: "package-3.jpg",
      type: "international",
      itinerary: [
        "Kuala Lumpur city tour",
        "Genting Highlands visit",
        "Shopping and departure"
      ]
    },
    {
      location: "Paris Couples Tour",
      days: "6 Days",
      price: "₹1,25,000",
      people: "2 Person",
      img: "paris.jpg",
      type: "international",
      itinerary: [
        "Arrival in Paris and Seine river cruise",
        "Eiffel Tower and local exploration",
        "Visit Louvre Museum and Montmartre",
        "Versailles Palace trip",
        "Shopping in Champs-Élysées",
        "Departure"
      ]
    },
    {
      location: "Maldives Honeymoon Tour",
      days: "5 Days",
      price: "₹95,000",
      people: "2 Person",
      img: "maldives.jpg",
      type: "international",
      itinerary: [
        "Arrival and beachside relaxation",
        "Resort activities and snorkeling",
        "Couple's spa and island tour",
        "Water sports day",
        "Departure"
      ]
    },
    {
      location: "Tirupati Temple Tour, India",
      days: "2 Days",
      price: "₹5,000",
      people: "1 Person",
      img: "temple.png",
      type: "domestic",
      itinerary: [
        "Arrival in Tirupati and temple visit",
        "Return and local shopping"
      ]
    },
    {
      location: "Himalayan Family Tour, Manali",
      days: "4 Days",
      price: "₹18,500",
      people: "4 Person",
      img: "family.jpg",
      type: "domestic",
      itinerary: [
        "Arrival and local tour",
        "Solang Valley and snow activities",
        "Naggar Castle visit",
        "Departure"
      ]
    },
    {
      location: "Udaipur Couples Tour, Rajasthan",
      days: "3 Days",
      price: "₹21,000",
      people: "2 Person",
      img: "couple.jpg",
      type: "domestic",
      itinerary: [
        "City Palace and Lake Pichola",
        "Fateh Sagar Lake and cultural events",
        "Shopping and departure"
      ]
    },
    {
      location: "Kashmir Honeymoon Tour",
      days: "5 Days",
      price: "₹32,000",
      people: "2 Person",
      img: "honeymoon.jpg",
      type: "domestic",
      itinerary: [
        "Srinagar arrival and shikara ride",
        "Gulmarg excursion",
        "Pahalgam tour",
        "Local shopping",
        "Departure"
      ]
    },
    {
      location: "Rishikesh Adventure Tour",
      days: "4 Days",
      price: "₹17,000",
      people: "1 Person",
      img: "adventure.jpg",
      type: "domestic",
      itinerary: [
        "Arrival and rafting",
        "Camping and trekking",
        "Yoga session",
        "Departure"
      ]
    }
  ];

  const filteredPackages = allPackages.filter((pkg) => {
    const matchesType = selectedType === "all" || pkg.type === selectedType;
    const matchesSearch = pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      {/* Hero Header */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">Packages</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item text-white active" aria-current="page">
                    Packages
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className="position-relative mx-auto animated slideInDown" style={{ width: '400px', maxWidth: '90%' }}>
        <input
          className="form-control border border-dark rounded-pill w-100 py-3 ps-4 pe-5"
          type="text"
          placeholder="Eg: Thailand"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2"
          style={{ marginTop: 7 }}
        >
          Search
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="container text-center mb-5">
        <button
          className={`btn btn-outline-primary m-2 ${selectedType === "domestic" ? "active" : ""}`}
          onClick={() => setSelectedType("domestic")}
        >
          Domestic Tours
        </button>
        <button
          className={`btn btn-outline-primary m-2 ${selectedType === "international" ? "active" : ""}`}
          onClick={() => setSelectedType("international")}
        >
          International Tours
        </button>
        <button
          className={`btn btn-outline-secondary m-2 ${selectedType === "all" ? "active" : ""}`}
          onClick={() => setSelectedType("all")}
        >
          All Tours
        </button>
      </div>

      {/* Package Cards */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">Packages</h6>
            <h1 className="mb-5">Awesome Packages</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {filteredPackages.map((pkg, index) => (
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay={`0.${index + 1}s`}
                key={index}
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img
                      className="img-fluid"
                      src={`assets/img/${pkg.img}`}
                      alt={pkg.location}
                    />
                  </div>
                  <div className="d-flex border-bottom">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-map-marker-alt text-primary me-2" />
                      {pkg.location}
                    </small>
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-calendar-alt text-primary me-2" />
                      {pkg.days}
                    </small>
                    <small className="flex-fill text-center py-2">
                      <i className="fa fa-user text-primary me-2" />
                      {pkg.people}
                    </small>
                  </div>
                  <div className="text-center p-4">
                    <h3 className="mb-0">{pkg.price}</h3>
                    <div className="mb-3">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <small key={i} className="fa fa-star text-primary" />
                        ))}
                    </div>
                    <p>Explore and enjoy the destination with our curated package.</p>
                    <div className="d-flex justify-content-center mb-2">
                      <button
                        onClick={() => toggleReadMore(index)}
                        className="btn btn-sm btn-primary px-3 border-end"
                        style={{ borderRadius: "30px 0 0 30px" }}
                      >
                        {expandedIndex === index ? "Hide Plan" : "Read More"}
                      </button>
                      <Link
                        to="/booking"
                        state={{ selectedDestination: pkg.location }} // Pass the location here
                        className="btn btn-sm btn-primary px-3"
                        style={{ borderRadius: "0 30px 30px 0" }}
                      >
                        Book Now
                      </Link>
                    </div>
                    {expandedIndex === index && (
                      <div className="text-start mt-3">
                        <h6>Itinerary:</h6>
                        <ul>
                          {pkg.itinerary.map((item, i) => (
                            <li key={i}>{`Day ${i + 1}: ${item}`}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredPackages.length === 0 && (
              <div className="text-center">
                <p>No packages found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Packages;