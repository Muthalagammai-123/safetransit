import React from 'react';
import { Bus, Train, Plane, MapPin, Calendar, Users } from 'lucide-react';

const Book: React.FC = () => {
  const handleRedBusClick = () => {
    window.open('https://www.redbus.in/', '_blank');
  };

  const handleIRCTCClick = () => {
    window.open('https://www.irctc.co.in/', '_blank');
  };

  const handleFlightClick = () => {
    window.open('https://www.makemytrip.com/flights/', '_blank');
  };

  return (
    <div className="container-fluid min-vh-100 py-5" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header Section */}
            <div className="text-center text-white mb-5">
              <h1 className="display-4 fw-bold mb-3">
                <MapPin className="me-3" size={48} />
                Travel Booking Hub
              </h1>
              <p className="lead fs-5">Your one-stop destination for all travel bookings</p>
            </div>

            {/* Booking Cards */}
            <div className="row g-4">
              {/* Bus Booking Card */}
              <div className="col-md-4">
                <div className="card h-100 shadow-lg border-0 booking-card">
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                        <Bus size={40} className="text-danger" />
                      </div>
                      <h4 className="fw-bold text-dark">Bus Tickets</h4>
                      <p className="text-muted">Book comfortable bus journeys across India</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-muted">Routes Available</small>
                        <small className="fw-bold">5000+</small>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-muted">Bus Operators</small>
                        <small className="fw-bold">2500+</small>
                      </div>
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">Cities Connected</small>
                        <small className="fw-bold">1000+</small>
                      </div>
                    </div>

                    <button 
                      className="btn btn-danger btn-lg w-100 py-3 fw-bold"
                      onClick={handleRedBusClick}
                      style={{
                        background: 'linear-gradient(45deg, #dc3545, #e74c3c)',
                        border: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Book on RedBus
                      <Bus className="ms-2" size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Train Booking Card */}
              <div className="col-md-4">
                <div className="card h-100 shadow-lg border-0 booking-card">
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                        <Train size={40} className="text-primary" />
                      </div>
                      <h4 className="fw-bold text-dark">Train Tickets</h4>
                      <p className="text-muted">Book confirmed train tickets with IRCTC</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-muted">Railway Stations</small>
                        <small className="fw-bold">7000+</small>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-muted">Daily Trains</small>
                        <small className="fw-bold">13000+</small>
                      </div>
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">Routes</small>
                        <small className="fw-bold">8000+</small>
                      </div>
                    </div>

                    <button 
                      className="btn btn-primary btn-lg w-100 py-3 fw-bold"
                      onClick={handleIRCTCClick}
                      style={{
                        background: 'linear-gradient(45deg, #0d6efd, #3b82f6)',
                        border: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Book on IRCTC
                      <Train className="ms-2" size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Flight Booking Card */}
              <div className="col-md-4">
                <div className="card h-100 shadow-lg border-0 booking-card">
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                        <Plane size={40} className="text-success" />
                      </div>
                      <h4 className="fw-bold text-dark">Flight Tickets</h4>
                      <p className="text-muted">Find the best flight deals and offers</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-muted">Airports</small>
                        <small className="fw-bold">500+</small>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-muted">Airlines</small>
                        <small className="fw-bold">100+</small>
                      </div>
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">Destinations</small>
                        <small className="fw-bold">2000+</small>
                      </div>
                    </div>

                    <button 
                      className="btn btn-success btn-lg w-100 py-3 fw-bold"
                      onClick={handleFlightClick}
                      style={{
                        background: 'linear-gradient(45deg, #198754, #10b981)',
                        border: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Book Flights
                      <Plane className="ms-2" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="row mt-5">
              <div className="col-12">
                <div className="card border-0 shadow-lg bg-white bg-opacity-95">
                  <div className="card-body p-5">
                    <h3 className="text-center fw-bold mb-4 text-dark">Why Choose Our Platform?</h3>
                    <div className="row g-4">
                      <div className="col-md-4 text-center">
                        <Calendar size={48} className="text-primary mb-3" />
                        <h5 className="fw-bold">Easy Booking</h5>
                        <p className="text-muted">Simple and quick booking process with instant confirmation</p>
                      </div>
                      <div className="col-md-4 text-center">
                        <Users size={48} className="text-success mb-3" />
                        <h5 className="fw-bold">24/7 Support</h5>
                        <p className="text-muted">Round-the-clock customer support for all your queries</p>
                      </div>
                      <div className="col-md-4 text-center">
                        <MapPin size={48} className="text-danger mb-3" />
                        <h5 className="fw-bold">Best Prices</h5>
                        <p className="text-muted">Competitive prices and exclusive deals on all bookings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;