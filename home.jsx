import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Search, User, Menu, X, MessageCircle, Phone, MapPin, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import Fd from "./fd";
import axios from "axios"
const TransportSafetyHomepage = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [signupForm, setSignupForm] = useState({ username: '', email: '', password: '' });
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  
  const recognition = useRef(null);
  const synthesis = useRef(null);

  // Sample data for recent incidents
  const recentIncidents = [
    {
      id: 1,
      title: "Bus Route 42 Safety Concern",
      location: "Central Station",
      time: "2 hours ago",
      status: "pending",
      description: "Reported overcrowding during peak hours",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Metro Platform Issue",
      location: "Downtown Metro",
      time: "4 hours ago", 
      status: "rectified",
      description: "Slippery platform resolved with anti-slip coating",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Bus Stop Lighting",
      location: "Park Avenue Stop",
      time: "1 day ago",
      status: "pending",
      description: "Poor lighting reported at evening hours",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Train Safety Upgrade",
      location: "North Terminal",
      time: "2 days ago",
      status: "rectified",
      description: "Emergency communication system updated",
      image: "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?w=400&h=250&fit=crop"
    }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          handleVoiceCommand(finalTranscript);
        }
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthesis.current = window.speechSynthesis;
    }
  }, []);

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    let response = '';

    if (lowerCommand.includes('search') || lowerCommand.includes('find')) {
      const searchTerm = command.replace(/search|find/gi, '').trim();
      setSearchQuery(searchTerm);
      response = `Searching for ${searchTerm}`;
    } else if (lowerCommand.includes('login')) {
      setShowLogin(true);
      response = 'Opening login form';
    } else if (lowerCommand.includes('signup')) {
      setShowSignup(true);
      response = 'Opening signup form';
    } else if (lowerCommand.includes('incidents') || lowerCommand.includes('reports')) {
      response = `There are ${recentIncidents.length} recent incidents reported. Would you like me to read them?`;
    } else if (lowerCommand.includes('help')) {
      response = 'I can help you search incidents, login, signup, or navigate the website. Just tell me what you need!';
    } else {
      response = 'I heard you say: ' + command + '. How can I help you with transport safety feedback?';
    }

    speak(response);
    
    // Add to chat if chatbot is open
    if (showChatbot) {
      setChatMessages(prev => [...prev, 
        { type: 'user', message: command },
        { type: 'bot', message: response }
      ]);
    }
  };

  const speak = (text) => {
    if (synthesis.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      synthesis.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      setIsListening(false);
      recognition.current.stop();
    }
  };

  // const handleLogin = () => {
  //   // Simple demo login
  //   if (loginForm.username && loginForm.password) {
  //     setIsLoggedIn(true);
  //     setShowLogin(false);
  //     speak('Login successful. Welcome to the transport safety platform!');
  //   }
  // };
  
  // const handleSignup = () => {
  //   // Simple demo signup
  //   if (signupForm.username && signupForm.email && signupForm.password) {
  //     setIsLoggedIn(true);
  //     setShowSignup(false);
  //     speak('Account created successfully. Welcome to the platform!');
  //   }
  // };

  const filteredIncidents = recentIncidents.filter(incident =>
    incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const botResponses = [
  "👋 Welcome! How can I help you explore our website today?",
  "😊 Feel free to ask about our services or latest updates!",
  "📌 You can check the About page to learn more about us.",
  "🚀 Need guidance navigating the site? I’m here to help!"
];

function getContextualResponse(message) {
  const msg = message.toLowerCase();

  // Contextual responses for Home page
  if (msg.includes("home")) return "🏠 You’re on the Home page! Check out our highlights and latest updates here.";
  if (msg.includes("services") || msg.includes("features")) return "✨ Our Home page showcases all the features and services we offer.";

  // Contextual responses for About page
  if (msg.includes("about")) return "ℹ️ The About page tells you more about our team and mission.";
  if (msg.includes("team")) return "👥 Our team is passionate about delivering the best experience for our users!";
  if (msg.includes("mission")) return "🎯 Our mission is to make city navigation and travel safer and easier.";

  // Default random response
  return botResponses[Math.floor(Math.random() * botResponses.length)];
}

const sendChatMessage = () => {
  if (!currentMessage.trim()) return;

  // Add user message
  setChatMessages([...chatMessages, { type: "user", message: currentMessage }]);
  const userMsg = currentMessage;
  setCurrentMessage("");

  // Show typing indicator
  setChatMessages(prev => [...prev, { type: "bot", message: "..." }]);

  setTimeout(() => {
    const botReply = getContextualResponse(userMsg);
    setChatMessages(prev => [...prev.slice(0, -1), { type: "bot", message: botReply }]);
  }, 1000);

  // Optional: Send chat message to backend for logging
  fetch("http://localhost:5000/api/chatlog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMsg, page: window.location.pathname })
  }).catch(err => console.error(err));
};


// Signup
const handleSignup = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupForm), // { username, email, password }
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful!");
      setShowSignup(false);
    } else {
      console.error("❌ Signup failed:", data);
      alert(`Signup failed: ${data.message || data.error}`);
    }
  } catch (err) {
    console.error("❌ Network Error:", err);
    alert("Signup failed: Network error");
  }
};


// Login
const handleLogin = async () => {
  try {
    if (loginForm.email && loginForm.password) {  // ✅ email instead of username
      const res = await axios.post("http://localhost:5000/api/login", loginForm);

      console.log("Login Success:", res.data);
      localStorage.setItem("token", res.data.token); // ✅ store token
      setIsLoggedIn(true);
      setShowLogin(false);
      speak("Login successful. Welcome back!");
    } else {
      alert("Please enter email and password");
    }
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Login failed");
  }
};




  return (
    <div>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
      
      <style>
        {`
          body { background: linear-gradient(135deg, #f8f9ff 0%, #e0e7ff 100%); min-height: 100vh; }
          .navbar-brand { font-size: 1.75rem; font-weight: bold; color: #4f46e5 !important; }
          .btn-voice-active { animation: pulse 2s infinite; }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .card-hover { transition: all 0.3s ease; }
          .card-hover:hover { transform: translateY(-8px); box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important; }
          .hero-section { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); }
          .search-wrapper { position: relative; }
          .search-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #6b7280; }
          .search-input { padding-left: 45px; }
          .modal-backdrop { z-index: 1040; }
          .modal { z-index: 1050; }
          .chatbot-container { position: fixed; bottom: 24px; right: 24px; z-index: 1060; }
          .status-badge-pending { background-color: #fef3c7; color: #92400e; }
          .status-badge-resolved { background-color: #dcfce7; color: #166534; }
        `}
      </style>

      <div className="min-vh-100">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"></a>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
             
              
              <div className="d-flex align-items-center">
  <div className="search-wrapper me-3 position-relative">
  <input
    type="text"
    className="form-control search-input"
    placeholder="Search incidents..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    onKeyPress={(e) => {
      if (e.key === 'Enter') {
        console.log('Searching for:', searchQuery);
      }
    }}
  />
  <Search className="search-icon" size={16} />
  {searchQuery && (
    <button
      className="btn btn-light btn-sm position-absolute end-0 top-0 mt-1 me-1"
      onClick={() => setSearchQuery('')}
    >
      ✕
    </button>
  )}
</div>

                {!isLoggedIn ? (
                  <button
                    onClick={() => setShowLogin(true)}
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                ) : (
                  <div className="d-flex align-items-center">
                    <User className="text-primary me-2" size={20} />
                    <span>Welcome!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="hero-section text-white py-5">
          <div className="container py-4">
            <div className="text-center mb-5">
              <h1 className="display-3 fw-bold mb-4">
                Real-Time Public Transport
                <span className="d-block">Safety Analysis</span>
              </h1>
              <p className="lead mb-4 fs-4">
                Your voice matters in making public transportation safer for everyone. 
                Report incidents, track improvements, and stay informed about safety measures.
              </p>
              
              {/* Voice Control Button */}
              <div className="d-flex justify-content-center align-items-center mb-4">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`btn btn-lg me-3 d-flex align-items-center ${
                    isListening 
                      ? 'btn-danger btn-voice-active' 
                      : 'btn-success'
                  }`}
                >
                  {isListening ? <MicOff className="me-2" size={20} /> : <Mic className="me-2" size={20} />}
                  <span>{isListening ? 'Stop Listening' : 'Voice Commands'}</span>
                </button>
                {transcript && (
                  <div className="bg-white text-dark px-3 py-2 rounded shadow">
                    <small>Heard: "{transcript}"</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        

        <div className="container py-5">
          {/* Login/Signup Section for Non-logged Users */}
          {!isLoggedIn && (
            <div className="card shadow-lg mb-5">
              <div className="card-body text-center py-5">
                <h2 className="card-title mb-4">Join Our Safety Community</h2>
                <div className="d-flex justify-content-center gap-3">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="btn btn-primary btn-lg px-4"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="btn btn-outline-primary btn-lg px-4"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Welcome Message for Logged Users */}
          {isLoggedIn && (
            <div className="alert alert-success d-flex align-items-center mb-5" role="alert">
              <CheckCircle className="me-3" size={32} />
              <div>
                <h4 className="alert-heading mb-1">Welcome Back!</h4>
                <p className="mb-0">You can now report incidents and track safety improvements.</p>
              </div>
            </div>
          )}

          {/* Recent Incidents Section */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="display-5 fw-bold">Recent Safety Updates</h2>
              <div className="d-flex align-items-center text-muted">
                <Clock className="me-2" size={20} />
                <span>Live Updates</span>
              </div>
            </div>

            {filteredIncidents.length === 0 ? (
              <div className="card text-center py-5">
                <div className="card-body">
                  <Search className="text-muted mb-3" size={48} />
                  <h3 className="text-muted mb-2">No Results Found</h3>
                  <p className="text-muted">Try adjusting your search terms or browse all incidents.</p>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {filteredIncidents.map((incident) => (
                  <div key={incident.id} className="col-md-6">
                    <div className="card h-100 card-hover shadow">
                      <div className="position-relative">
                        <img 
                          src={incident.image} 
                          alt={incident.title}
                          className="card-img-top"
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <span className={`position-absolute top-0 end-0 m-3 badge fs-6 ${
                          incident.status === 'rectified' 
                            ? 'status-badge-resolved' 
                            : 'status-badge-pending'
                        }`}>
                          {incident.status === 'rectified' ? 'Resolved' : 'Pending'}
                        </span>
                      </div>
                      
                      <div className="card-body">
                        <div className="d-flex align-items-start justify-content-between mb-3">
                          <h5 className="card-title">{incident.title}</h5>
                          {incident.status === 'rectified' ? 
                            <CheckCircle className="text-success" size={24} /> : 
                            <AlertTriangle className="text-warning" size={24} />
                          }
                        </div>
                        
                        <div className="d-flex align-items-center text-muted mb-3 flex-wrap">
                          <MapPin className="me-2" size={16} />
                          <span className="me-3">{incident.location}</span>
                          <Calendar className="me-2" size={16} />
                          <span>{incident.time}</span>
                        </div>
                        
                        <p className="card-text text-muted mb-4">{incident.description}</p>
                        
                        
                       
                        <button className="btn btn-outline-primary w-100" onClick={() => window.location.href = "/fd"} 
  >view details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="row g-4 mb-5">
            <div className="col-md-3 col-6">
              <div className="card text-center shadow">
                <div className="card-body">
                  <div className="display-4 fw-bold text-primary mb-2">24</div>
                  <div className="text-muted">Reports This Week</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card text-center shadow">
                <div className="card-body">
                  <div className="display-4 fw-bold text-success mb-2">18</div>
                  <div className="text-muted">Issues Resolved</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card text-center shadow">
                <div className="card-body">
                  <div className="display-4 fw-bold text-warning mb-2">6</div>
                  <div className="text-muted">Under Review</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card text-center shadow">
                <div className="card-body">
                  <div className="display-4 fw-bold text-info mb-2">92%</div>
                  <div className="text-muted">Resolution Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Modal */}
{showLogin && (
  <div
    className="modal fade show d-block"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Login to SafeTransit</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowLogin(false)}
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={loginForm.email || ""}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={loginForm.password || ""}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleLogin} className="btn btn-primary">
            Login
          </button>
          <button
            onClick={() => setShowLogin(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

       {/* Signup Modal */}
{showSignup && (
  <div
    className="modal fade show d-block"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create a SafeTransit Account</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowSignup(false)}
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={signupForm.username || ""}
              onChange={(e) =>
                setSignupForm({ ...signupForm, username: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={signupForm.email || ""}
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={signupForm.password || ""}
              onChange={(e) =>
                setSignupForm({ ...signupForm, password: e.target.value })
              }
            />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleSignup} className="btn btn-success">
            Sign Up
          </button>
          <button
            onClick={() => setShowSignup(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        AI Chatbot
        <div className="chatbot-container">
          {showChatbot && (
            <div className="card mb-3 shadow-lg" style={{ width: '20rem', height: '24rem' }}>
              <div className="card-header bg-primary text-white">
                <h6 className="mb-0">SafeTransit AI Assistant</h6>
              </div>
              <div className="card-body p-3 overflow-auto" style={{ height: '300px' }}>
                {chatMessages.length === 0 ? (
                  <p className="text-muted small">Hi! I can help you navigate the platform using voice or text. Try asking me to search for incidents or help you login!</p>
                ) : (
                  chatMessages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.type === 'user' ? 'text-end' : 'text-start'}`}>
                      <div className={`d-inline-block p-2 rounded small ${
                        msg.type === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-light text-dark'
                      }`} style={{ maxWidth: '80%' }}>
                        {msg.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="card-footer p-2">
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Type or use voice..."
                  />
                  <button
                    onClick={sendChatMessage}
                    className="btn btn-primary"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="d-flex gap-2">
            <button
              onClick={() => setShowChatbot(!showChatbot)}
              className="btn btn-primary btn-lg rounded-circle p-3 shadow-lg"
            >
              <MessageCircle size={24} />
            </button>
            
            <button
              onClick={() => window.open('https://wa.me/?text=Hi! I need help with public transport safety feedback.', '_blank')}
              className="btn btn-success btn-lg rounded-circle p-3 shadow-lg"
            >
              <Phone size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportSafetyHomepage;