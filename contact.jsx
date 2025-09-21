import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Phone, Mail, Send, CheckCircle, Shield, BarChart3, Map, Navigation, Users, Activity } from 'lucide-react';

export default function TransportSafetyContact() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  // Mock India transport safety data by states
  const indiaStatesData = [
    { id: 'delhi', name: 'Delhi', risk: 'high', incidents: 245, population: '32M', safetyScore: 65 },
    { id: 'mumbai', name: 'Mumbai', risk: 'high', incidents: 198, population: '20M', safetyScore: 68 },
    { id: 'bangalore', name: 'Bangalore', risk: 'medium', incidents: 156, population: '13M', safetyScore: 72 },
    { id: 'chennai', name: 'Chennai', risk: 'medium', incidents: 134, population: '11M', safetyScore: 74 },
    { id: 'kolkata', name: 'Kolkata', risk: 'high', incidents: 167, population: '15M', safetyScore: 63 },
    { id: 'hyderabad', name: 'Hyderabad', risk: 'medium', incidents: 89, population: '10M', safetyScore: 76 },
    { id: 'pune', name: 'Pune', risk: 'low', incidents: 67, population: '7M', safetyScore: 78 },
    { id: 'ahmedabad', name: 'Ahmedabad', risk: 'medium', incidents: 78, population: '8M', safetyScore: 71 },
    { id: 'jaipur', name: 'Jaipur', risk: 'low', incidents: 45, population: '4M', safetyScore: 82 },
    { id: 'lucknow', name: 'Lucknow', risk: 'medium', incidents: 56, population: '3M', safetyScore: 75 }
  ];

  // Mock risk areas within selected regions
  const riskAreas = [
    { id: 1, name: 'Central Railway Station', risk: 'high', incidents: 23, x: 35, y: 25, city: 'delhi' },
    { id: 2, name: 'ISBT Kashmere Gate', risk: 'high', incidents: 18, x: 55, y: 40, city: 'delhi' },
    { id: 3, name: 'Metro Blue Line', risk: 'medium', incidents: 12, x: 20, y: 60, city: 'delhi' },
    { id: 4, name: 'Connaught Place Metro', risk: 'medium', incidents: 8, x: 75, y: 55, city: 'delhi' },
    { id: 5, name: 'IGI Airport Express', risk: 'low', incidents: 3, x: 15, y: 80, city: 'delhi' },
    { id: 6, name: 'Noida City Center', risk: 'low', incidents: 2, x: 85, y: 30, city: 'delhi' },
    { id: 7, name: 'Gurgaon Rapid Metro', risk: 'medium', incidents: 15, x: 90, y: 70, city: 'delhi' },
    { id: 8, name: 'Chandni Chowk Metro', risk: 'high', incidents: 20, x: 45, y: 75, city: 'delhi' }
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'high': return 'bg-danger border-danger text-white';
      case 'medium': return 'bg-warning border-warning text-dark';
      case 'low': return 'bg-success border-success text-white';
      default: return 'bg-secondary border-secondary text-white';
    }
  };

  const getSafetyGrade = (score) => {
    if (score >= 80) return { grade: 'A', color: 'success' };
    if (score >= 70) return { grade: 'B', color: 'primary' };
    if (score >= 60) return { grade: 'C', color: 'warning' };
    return { grade: 'D', color: 'danger' };
  };

  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet" />
      <style>{`
        body { 
          background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 50%, #f3e5f5 100%); 
          min-height: 100vh;
        }
        .custom-card { 
          border-radius: 20px; 
          border: 1px solid #e9ecef;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .brand-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
          border-radius: 12px;
        }
        .gradient-bg {
          background: linear-gradient(135deg, #6f42c1 0%, #0d6efd 100%);
        }
        .india-map-container {
          height: 500px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%);
          border-radius: 15px;
          border: 1px solid #dee2e6;
          position: relative;
          overflow: hidden;
        }
        .state-marker {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 8px;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: 500;
          border: 2px solid;
        }
        .state-marker:hover {
          transform: translate(-50%, -50%) scale(1.1);
          z-index: 10;
        }
        .map-grid {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          background-image: 
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .risk-marker {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid;
          position: absolute;
          cursor: pointer;
          transform: translate(-50%, -50%);
          transition: all 0.2s;
        }
        .risk-marker:hover {
          transform: translate(-50%, -50%) scale(1.2);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .pulse {
          animation: pulse 2s infinite;
        }
        .india-outline {
          position: absolute;
          inset: 0;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="M200 50 L180 80 L160 85 L140 100 L120 120 L110 140 L105 160 L100 180 L95 200 L90 220 L85 240 L90 260 L95 280 L105 300 L120 315 L140 325 L160 330 L180 335 L200 340 L220 335 L240 330 L260 325 L280 315 L295 300 L305 280 L310 260 L315 240 L310 220 L305 200 L300 180 L295 160 L290 140 L280 120 L260 100 L240 85 L220 80 Z" fill="none" stroke="%23dee2e6" stroke-width="2"/></svg>');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0.3;
        }
      `}</style>
      
      <div className="min-vh-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-bottom">
          <div className="container-fluid py-4">
            <div className="d-flex align-items-center">
              <div className="brand-icon d-flex align-items-center justify-content-center me-3">
                <Shield size={28} className="text-white" />
              </div>
              <div>
                <h1 className="h3 fw-bold text-dark mb-0">SafeTransit India</h1>
                <p className="text-muted mb-0">National Public Transport Safety Monitoring System</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid py-5">
          <div className="row g-4">
            {/* Main Content */}
            <div className="col-lg-8">
              {/* India Map */}
              <div className="bg-white custom-card p-4 mb-4">
                <h2 className="h4 fw-bold text-dark mb-4 d-flex align-items-center">
                  <Map size={28} className="text-primary me-3" />
                  India Transport Safety Map
                </h2>
                
                <div className="bg-light rounded-3 p-4 mb-4">
                  <div className="india-map-container position-relative">
                    <div className="map-grid"></div>
                    <div className="india-outline"></div>
                    
                    {/* Major Cities/States markers */}
                    <div className={`state-marker ${getRiskColor('high')}`} 
                         style={{ left: '25%', top: '20%' }}
                         onClick={() => setSelectedState(indiaStatesData.find(s => s.id === 'delhi'))}>
                      Delhi
                    </div>
                    <div className={`state-marker ${getRiskColor('high')}`} 
                         style={{ left: '15%', top: '45%' }}
                         onClick={() => setSelectedState(indiaStatesData.find(s => s.id === 'mumbai'))}>
                      Mumbai
                    </div>
                    <div className={`state-marker ${getRiskColor('medium')}`} 
                         style={{ left: '25%', top: '65%' }}
                         onClick={() => setSelectedState(indiaStatesData.find(s => s.id === 'bangalore'))}>
                      Bangalore
                    </div>
                    <div className={`state-marker ${getRiskColor('medium')}`} 
                         style={{ left: '35%', top: '75%' }}
                         onClick={() => setSelectedState(indiaStatesData.find(s => s.id === 'chennai'))}>
                      Chennai
                    </div>
                    <div className={`state-marker ${getRiskColor('high')}`} 
                         style={{ left: '60%', top: '40%' }}
                         onClick={() => setSelectedState(indiaStatesData.find(s => s.id === 'kolkata'))}>
                      Kolkata
                    </div>
                    <div className={`state-marker ${getRiskColor('medium')}`} 
                         style={{ left: '35%', top: '55%' }}
                         onClick={() => setSelectedState(indiaStatesData.find(s => s.id === 'hyderabad'))}>
                      Hyderabad
                    </div>
                    <div className={`state-marker ${getRiskColor('low')}`} 
                         style={{ left: '20%', top: '55%' }}
                         onClick={() => setSelectedState(indiaStatesData.find(s => s.id === 'pune'))}>
                      Pune
                    </div>
                    <div className={`state-marker ${getRiskColor('medium')}`} 
                         style={{ left: '12%', top: '35%' }}
                         onClick={() => setSelectedState(indiaStatesData.find(s => s.id === 'ahmedabad'))}>
                      Ahmedabad
                    </div>
                    <div className={`state-marker ${getRiskColor('low')}`} 
                         style={{ left: '18%', top: '25%' }}
                         onClick={() => setSelectedState(indiaStatesData.find(s => s.id === 'jaipur'))}>
                      Jaipur
                    </div>
                    <div className={`state-marker ${getRiskColor('medium')}`} 
                         style={{ left: '40%', top: '25%' }}
                         onClick={() => setSelectedState(indiaStatesData.find(s => s.id === 'lucknow'))}>
                      Lucknow
                    </div>
                    
                    {/* Map legend */}
                    <div className="position-absolute bottom-0 start-0 m-3 bg-white rounded p-3 shadow-sm">
                      <h6 className="fw-semibold small mb-2">Risk Levels</h6>
                      <div className="d-flex flex-column gap-1">
                        <div className="d-flex align-items-center">
                          <div className="bg-danger rounded-circle me-2" style={{width: '12px', height: '12px'}}></div>
                          <span className="small">High Risk (60-69)</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="bg-warning rounded-circle me-2" style={{width: '12px', height: '12px'}}></div>
                          <span className="small">Medium Risk (70-79)</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="bg-success rounded-circle me-2" style={{width: '12px', height: '12px'}}></div>
                          <span className="small">Low Risk (80+)</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* National Statistics */}
                    <div className="position-absolute top-0 end-0 m-3 bg-white rounded p-3 shadow-sm">
                      <h6 className="fw-semibold small mb-2">National Overview</h6>
                      <div className="small">
                        <div>Total Cities: <strong>10</strong></div>
                        <div>High Risk: <strong>3</strong></div>
                        <div>Medium Risk: <strong>5</strong></div>
                        <div>Low Risk: <strong>2</strong></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Selected state info */}
                  {selectedState && (
                    <div className="mt-3 bg-white rounded-3 p-4 border">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <h5 className="fw-bold text-dark mb-2">{selectedState.name}</h5>
                          <div className="d-flex align-items-center gap-3 mb-3">
                            <span className={`badge ${
                              selectedState.risk === 'high' ? 'bg-danger' :
                              selectedState.risk === 'medium' ? 'bg-warning text-dark' :
                              'bg-success'
                            }`}>
                              {selectedState.risk.toUpperCase()} RISK
                            </span>
                            <span className="small text-muted">
                              Population: {selectedState.population}
                            </span>
                          </div>
                          <div className="row g-3">
                            <div className="col-4">
                              <div className="text-center">
                                <div className="display-6 fw-bold text-primary">{selectedState.incidents}</div>
                                <div className="small text-muted">Monthly Incidents</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="text-center">
                                <div className={`display-6 fw-bold text-${getSafetyGrade(selectedState.safetyScore).color}`}>
                                  {getSafetyGrade(selectedState.safetyScore).grade}
                                </div>
                                <div className="small text-muted">Safety Grade</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="text-center">
                                <div className="display-6 fw-bold text-info">{selectedState.safetyScore}</div>
                                <div className="small text-muted">Safety Score</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 text-center">
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => setSelectedArea(selectedState)}
                          >
                            View Detailed Analysis
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Area View */}
              {selectedArea && (
                <div className="bg-white custom-card p-4">
                  <h2 className="h4 fw-bold text-dark mb-4 d-flex align-items-center">
                    <Navigation size={28} className="text-primary me-3" />
                    {selectedArea.name} - Transit Points Analysis
                  </h2>
                  
                  <div className="bg-light rounded-3 p-4">
                    <div className="india-map-container position-relative">
                      <div className="map-grid"></div>
                      
                      {/* Transit point markers for selected city */}
                      {riskAreas.filter(area => area.city === selectedArea.id).map((area) => (
                        <div
                          key={area.id}
                          className={`risk-marker ${getRiskColor(area.risk).replace('text-white', '').replace('text-dark', '')}`}
                          style={{ left: `${area.x}%`, top: `${area.y}%` }}
                          title={`${area.name} - ${area.incidents} incidents`}
                        ></div>
                      ))}
                      
                      {/* Transit points legend */}
                      <div className="position-absolute bottom-0 start-0 m-3 bg-white rounded p-3 shadow-sm">
                        <h6 className="fw-semibold small mb-2">Transit Points</h6>
                        <div className="small">
                          {riskAreas.filter(area => area.city === selectedArea.id).map((area, index) => (
                            <div key={area.id} className="mb-1">
                              <span className={`badge badge-sm ${getRiskColor(area.risk)} me-1`}></span>
                              {area.name} ({area.incidents})
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="d-flex flex-column gap-4">
                {/* Emergency Contact */}
                <div className="bg-white custom-card p-4">
                  <h3 className="h5 fw-bold text-dark mb-3 d-flex align-items-center">
                    <AlertTriangle size={24} className="text-danger me-2" />
                    Emergency Contacts
                  </h3>
                  <div className="bg-danger-subtle border border-danger-subtle rounded-3 p-3 mb-3">
                    <p className="small fw-medium text-danger mb-2">Police Emergency:</p>
                    <p className="display-6 fw-bold text-danger mb-1">100</p>
                    <p className="small text-danger">National Emergency</p>
                  </div>
                  <div className="bg-warning-subtle border border-warning-subtle rounded-3 p-3 mb-3">
                    <p className="small fw-medium text-warning-emphasis mb-1">Railway Helpline:</p>
                    <p className="h5 fw-bold text-warning-emphasis">139</p>
                    <p className="small text-warning-emphasis">Indian Railways</p>
                  </div>
                  <div className="bg-info-subtle border border-info-subtle rounded-3 p-3">
                    <p className="small fw-medium text-info-emphasis mb-1">Metro Helpline:</p>
                    <p className="h5 fw-bold text-info-emphasis">155370</p>
                    <p className="small text-info-emphasis">Delhi Metro (Example)</p>
                  </div>
                </div>

                {/* Top Cities by Safety */}
                <div className="bg-white custom-card p-4">
                  <h3 className="h5 fw-bold text-dark mb-3">Safety Rankings</h3>
                  <div className="d-flex flex-column gap-3">
                    {indiaStatesData
                      .sort((a, b) => b.safetyScore - a.safetyScore)
                      .slice(0, 5)
                      .map((state, index) => (
                      <div key={state.id} className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <div className={`badge ${index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-warning' : 'bg-light text-dark'} rounded-pill`}>
                            #{index + 1}
                          </div>
                          <div>
                            <p className="fw-medium text-dark mb-0">{state.name}</p>
                            <p className="small text-muted mb-0">{state.population} population</p>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className={`fw-bold mb-0 text-${getSafetyGrade(state.safetyScore).color}`}>
                            {state.safetyScore}
                          </p>
                          <span className={`badge bg-${getSafetyGrade(state.safetyScore).color}`}>
                            {getSafetyGrade(state.safetyScore).grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Analytics Dashboard */}
                <div className="gradient-bg custom-card p-4 text-white">
                  <h3 className="h5 fw-bold mb-3 d-flex align-items-center">
                    <BarChart3 size={24} className="me-2" />
                    National Analytics
                  </h3>
                  <div className="d-flex flex-column gap-3">
                    <div className="bg-white bg-opacity-25 rounded-3 p-3">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="small fw-medium">Today's Reports</span>
                        <Activity size={16} />
                      </div>
                      <p className="h4 fw-bold mb-1">1,247</p>
                      <p className="small text-white-50 mb-0">↑ 8% from yesterday</p>
                    </div>
                    
                    <div className="bg-white bg-opacity-25 rounded-3 p-3">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="small fw-medium">Cities Monitored</span>
                        <Map size={16} />
                      </div>
                      <p className="h4 fw-bold mb-1">28</p>
                      <p className="small text-white-50 mb-0">Major urban centers</p>
                    </div>
                    
                    <div className="bg-white bg-opacity-25 rounded-3 p-3">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="small fw-medium">AI Prediction Accuracy</span>
                        <Shield size={16} />
                      </div>
                      <p className="h4 fw-bold mb-1">94.2%</p>
                      <p className="small text-white-50 mb-0">Incident prediction</p>
                    </div>
                    
                    <div className="bg-white bg-opacity-25 rounded-3 p-3">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="small fw-medium">Avg Response Time</span>
                        <Users size={16} />
                      </div>
                      <p className="h4 fw-bold mb-1">18 min</p>
                      <p className="small text-white-50 mb-0">Emergency response</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-top border-white border-opacity-25">
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-success rounded-circle pulse" style={{width: '8px', height: '8px'}}></div>
                      <span className="small text-white-75">Real-time monitoring active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}