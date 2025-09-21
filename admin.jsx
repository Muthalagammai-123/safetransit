import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Eye, EyeOff, BarChart3, Users, AlertTriangle, CheckCircle, Clock, MapPin, Filter, Search, Download, RefreshCw } from 'lucide-react';
import axios from "axios";



const Dashboard = () => {
  const [currentView, setCurrentView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for charts
  const safetyTrendData = [
    { month: 'Jan', incidents: 45, resolved: 42, pending: 3 },
    { month: 'Feb', incidents: 38, resolved: 35, pending: 3 },
    { month: 'Mar', incidents: 52, resolved: 48, pending: 4 },
    { month: 'Apr', incidents: 41, resolved: 39, pending: 2 },
    { month: 'May', incidents: 35, resolved: 32, pending: 3 },
    { month: 'Jun', incidents: 48, resolved: 44, pending: 4 },
  ];

  const categoryData = [
    { name: 'Vehicle Condition', value: 35, color: '#3B82F6' },
    { name: 'Driver Behavior', value: 28, color: '#EF4444' },
    { name: 'Infrastructure', value: 20, color: '#F59E0B' },
    { name: 'Overcrowding', value: 12, color: '#10B981' },
    { name: 'Other', value: 5, color: '#8B5CF6' },
  ];

  const routeData = [
    { route: 'Route A', incidents: 23, severity: 'High' },
    { route: 'Route B', incidents: 18, severity: 'Medium' },
    { route: 'Route C', incidents: 31, severity: 'High' },
    { route: 'Route D', incidents: 12, severity: 'Low' },
    { route: 'Route E', incidents: 25, severity: 'Medium' },
  ];

  

const [feedbacks, setFeedbacks] = useState([]);
useEffect(() => {
  axios.get("http://localhost:5000/api/feedback/all")

  
    .then(res => {
      const mappedData = res.data.map(fb => ({
        id: fb._id,
        category: fb.transportMode || "General",
        priority: fb.priority || "Medium",
        description: fb.description,
        route: fb.transportMode || "N/A",
        status: "pending",   // default until admin updates
        location: fb.language || "N/A",
        reporter: fb.name || "Anonymous",
        timestamp: new Date(fb.createdAt).toLocaleString(),
      }));
      setFeedbacks(mappedData);
    })
    .catch(err => console.error("Error fetching feedback:", err));
}, []);



  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      setCurrentView('dashboard');
    }
  };
  
const fetchFeedbacks = () => {
  axios.get("http://localhost:5000/api/admin/feedback")
    .then(res => {
      const mappedData = res.data.data.map(fb => ({
        id: fb._id,
        category: fb.transportMode || "General",
        priority: fb.priority || "Medium",
        description: fb.description,
        route: fb.transportMode || "N/A",
        status: fb.status || "pending",
        location: fb.language || "N/A",
        reporter: fb.name || "Anonymous",
        timestamp: new Date(fb.createdAt).toLocaleString(),
      }));
      setFeedbacks(mappedData);
    })
    .catch(err => console.error("Error fetching feedback:", err));
};

  

const filteredFeedback = feedbacks.filter(item => {
  const matchesSearch = 
    (item.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.route || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category || "").toLowerCase().includes(searchTerm.toLowerCase());

  const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
  return matchesSearch && matchesFilter;
});

 const updateFeedbackStatus = (id, newStatus) => {
  axios.put(`http://localhost:5000/api/feedback/${id}`, { status: newStatus })
    .then(res => {
      setFeedbacks(prev =>
        prev.map(fb =>
          fb.id === id ? { ...fb, status: newStatus } : fb
        )
      );
    })
    .catch(err => console.error('Error updating feedback:', err));
};


  if (currentView === 'login') {
    return (
      <>
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
          rel="stylesheet"
        />
        <style>{`
          .gradient-bg {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3730a3 100%);
            min-height: 100vh;
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .icon-circle {
            background: linear-gradient(135deg, #2563eb, #4f46e5);
          }
          .btn-gradient {
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            border: none;
            transition: all 0.2s;
          }
          .btn-gradient:hover {
            background: linear-gradient(135deg, #1d4ed8, #4338ca);
            transform: scale(1.02);
          }
        `}</style>
        
        <div className="gradient-bg d-flex align-items-center justify-content-center p-4">
          <div className="glass-card rounded-4 shadow-lg w-100" style={{maxWidth: '28rem', padding: '2rem'}}>
            <div className="text-center mb-4">
              <div className="icon-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                   style={{width: '4rem', height: '4rem', borderRadius: '50%'}}>
                <BarChart3 className="text-white" size={32} />
              </div>
              <h1 className="h2 fw-bold text-dark mb-2">Safety Dashboard</h1>
              <p className="text-muted">Public Transport Safety Analytics</p>
            </div>
            
            <div>
              <div className="mb-4">
                <label className="form-label fw-medium">Email Address</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="admin@transport.gov"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label fw-medium">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleLogin}
                className="btn btn-gradient btn-lg w-100 text-white fw-medium shadow-sm"
              >
                Sign In to Dashboard
              </button>
            </div>
            
            <div className="text-center mt-4">
              <small className="text-muted">Demo credentials: any email and password</small>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      <style>{`
        .navbar-brand-icon {
          background: linear-gradient(135deg, #2563eb, #4f46e5);
        }
        .nav-active {
          background-color: #dbeafe !important;
          color: #1d4ed8 !important;
        }
        .stat-card {
          border: 1px solid #f3f4f6;
          transition: transform 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-2px);
        }
        .icon-bg-blue { background-color: #dbeafe; color: #2563eb; }
        .icon-bg-orange { background-color: #fed7aa; color: #ea580c; }
        .icon-bg-green { background-color: #dcfce7; color: #16a34a; }
        .icon-bg-red { background-color: #fecaca; color: #dc2626; }
        .priority-high { background-color: #fef2f2; color: #991b1b; }
        .priority-medium { background-color: #fefce8; color: #a16207; }
        .priority-low { background-color: #f0fdf4; color: #166534; }
        .status-pending { background-color: #f9fafb; color: #374151; }
        .status-progress { background-color: #dbeafe; color: #1e40af; }
        .status-resolved { background-color: #f0fdf4; color: #166534; }
      `}</style>

      <div style={{minHeight: '100vh', backgroundColor: '#f9fafb'}}>
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
          <div className="container-fluid">
            <div className="navbar-brand d-flex align-items-center">
              <div className="navbar-brand-icon rounded me-2 p-2">
                <BarChart3 className="text-white" size={20} />
              </div>
              <span className="h5 mb-0 fw-semibold">Transport Safety Dashboard</span>
            </div>
            
            <div className="navbar-nav flex-row gap-2">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`nav-link btn btn-sm rounded-pill px-3 ${
                  currentView === 'dashboard' ? 'nav-active' : 'text-muted'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('feedback')}
                className={`nav-link btn btn-sm rounded-pill px-3 ${
                  currentView === 'feedback' ? 'nav-active' : 'text-muted'
                }`}
              >
                Feedback Management
              </button>
              <button
                onClick={() => setCurrentView('login')}
                className="nav-link btn btn-sm text-muted"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {currentView === 'dashboard' && (
          <div className="container-fluid py-4">
            {/* Stats Cards */}
            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <div className="card stat-card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="card-text small text-muted fw-medium">Total Reports</p>
                        <h2 className="card-title h1 mb-1">1,247</h2>
                        <p className="small text-success mb-0">↑ 12% from last month</p>
                      </div>
                      <div className="icon-bg-blue rounded-circle p-3">
                        <BarChart3 size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card stat-card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="card-text small text-muted fw-medium">Pending Issues</p>
                        <h2 className="card-title h1 mb-1 text-warning">23</h2>
                        <p className="small text-danger mb-0">↑ 3 from yesterday</p>
                      </div>
                      <div className="icon-bg-orange rounded-circle p-3">
                        <Clock size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card stat-card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="card-text small text-muted fw-medium">Resolved</p>
                        <h2 className="card-title h1 mb-1 text-success">1,189</h2>
                        <p className="small text-success mb-0">95.3% resolution rate</p>
                      </div>
                      <div className="icon-bg-green rounded-circle p-3">
                        <CheckCircle size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card stat-card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="card-text small text-muted fw-medium">High Priority</p>
                        <h2 className="card-title h1 mb-1 text-danger">8</h2>
                        <p className="small text-muted mb-0">Requires immediate attention</p>
                      </div>
                      <div className="icon-bg-red rounded-circle p-3">
                        <AlertTriangle size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="row g-4 mb-4">
              {/* Safety Trends */}
              <div className="col-lg-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Safety Incident Trends</h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={safetyTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="incidents" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="resolved" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Issue Categories */}
              <div className="col-lg-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Issue Categories</h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Analysis */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">Route-wise Incident Analysis</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={routeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="route" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="incidents" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {currentView === 'feedback' && (
          <div className="container-fluid py-4">
            {/* Feedback Management Header */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="h3 fw-bold mb-2">Feedback Management</h2>
                    <p className="text-muted mb-0">Monitor and resolve safety issues in real-time</p>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex gap-2 justify-content-md-end mt-3 mt-md-0">
                      <button 
  className="btn btn-primary d-flex align-items-center gap-2"
  onClick={fetchFeedbacks}>
  <RefreshCw size={16} />
  Refresh
</button>

                      <button className="btn btn-success d-flex align-items-center gap-2">
                        <Download size={16} />
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-8">
                    <div className="input-group">
                      <span className="input-group-text border-end-0 bg-white">
                        <Search size={20} className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Search feedback by description, route, or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback List */}
            <div className="row g-4">
              {filteredFeedback.map((feedback) => (
                <div key={feedback.id} className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-9">
                          <div className="d-flex align-items-start justify-content-between mb-3">
                            <div className="d-flex gap-2">
                              <span className={`badge rounded-pill ${
                                feedback.priority === 'High' ? 'priority-high' :
                                feedback.priority === 'Medium' ? 'priority-medium' :
                                'priority-low'
                              }`}>
                                {feedback.priority} Priority
                              </span>
                              <span className={`badge rounded-pill ${
                                feedback.status === 'pending' ? 'status-pending' :
                                feedback.status === 'in-progress' ? 'status-progress' :
                                'status-resolved'
                              }`}>
                                {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1).replace('-', ' ')}
                              </span>
                            </div>
                            <small className="text-muted">#{feedback.id}</small>
                          </div>
                          
                          <h5 className="fw-semibold mb-2">{feedback.route}</h5>
                          <p className="text-muted mb-3">{feedback.description}</p>
                          
                          <div className="row g-2 small text-muted">
                            <div className="col-auto d-flex align-items-center gap-1">
                              <MapPin size={16} />
                              {feedback.location}
                            </div>
                            <div className="col-auto">Category: {feedback.category}</div>
                            <div className="col-auto">Reporter: {feedback.reporter}</div>
                            <div className="col-auto">{feedback.timestamp}</div>
                          </div>
                        </div>
                        
                        <div className="col-lg-3">
                          <div className="d-flex flex-column gap-2">
                            {feedback.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateFeedbackStatus(feedback.id, 'in-progress')}
                                  className="btn btn-primary btn-sm"
                                >
                                  Start Review
                                </button>
                                <button
                                  onClick={() => updateFeedbackStatus(feedback.id, 'resolved')}
                                  className="btn btn-success btn-sm"
                                >
                                  Mark Resolved
                                </button>
                              </>
                            )}
                            {feedback.status === 'in-progress' && (
                              <button
                                onClick={() => updateFeedbackStatus(feedback.id, 'resolved')}
                                className="btn btn-success btn-sm"
                              >
                                Mark Resolved
                              </button>
                            )}
                            {feedback.status === 'resolved' && (
                              <div className="btn btn-outline-secondary btn-sm disabled">
                                Completed ✓
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredFeedback.length === 0 && (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <div className="text-muted">
                    <Search size={64} className="mb-3 opacity-50" />
                    <h5 className="fw-medium">No feedback found</h5>
                    <p>Try adjusting your search or filter criteria</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
