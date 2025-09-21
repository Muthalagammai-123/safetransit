import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Target, 
  Eye, 
  Award, 
  Mail, 
  Linkedin, 
  Twitter, 
  Github,
  Star,
  Trophy,
  Zap,
  Heart,
  Shield,
  Rocket,
  Lightbulb,
  Globe,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Shuffle
} from 'lucide-react';

const AboutPage = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [gameScore, setGameScore] = useState(0);
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedMemoryCards, setFlippedMemoryCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState(new Set());
  const [gameActive, setGameActive] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageSliding, setIsImageSliding] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "10+ years in transportation tech. Former transit authority consultant with a passion for public safety.",
      skills: ["Leadership", "Strategy", "Public Policy"],
      social: { linkedin: "#", twitter: "#", email: "sarah@safetransit.com" },
      quote: "Every journey should be a safe journey."
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Full-stack developer and AI specialist. Previously built safety systems for major transit networks.",
      skills: ["AI/ML", "Backend", "System Architecture"],
      social: { linkedin: "#", github: "#", email: "marcus@safetransit.com" },
      quote: "Technology should bridge the gap between problems and solutions."
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      role: "Head of Safety Research",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      bio: "PhD in Transportation Safety. Published researcher in public transit security and emergency response systems.",
      skills: ["Research", "Data Analysis", "Safety Protocols"],
      social: { linkedin: "#", twitter: "#", email: "emily@safetransit.com" },
      quote: "Data-driven decisions save lives."
    },
    {
      id: 4,
      name: "James Park",
      role: "UX/UI Designer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Award-winning designer focused on accessibility and user-centered design for public services.",
      skills: ["UI/UX", "Accessibility", "User Research"],
      social: { linkedin: "#", twitter: "#", email: "james@safetransit.com" },
      quote: "Good design makes safety accessible to everyone."
    },
    {
      id: 5,
      name: "Aisha Patel",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      bio: "Community building expert with background in public engagement and social advocacy.",
      skills: ["Community Building", "Social Media", "Public Relations"],
      social: { linkedin: "#", twitter: "#", email: "aisha@safetransit.com" },
      quote: "Communities thrive when every voice is heard."
    },
    {
      id: 6,
      name: "David Kim",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=300&h=300&fit=crop&crop=face",
      bio: "Machine learning expert specializing in predictive analytics for transportation safety patterns.",
      skills: ["Machine Learning", "Python", "Statistics"],
      social: { linkedin: "#", github: "#", email: "david@safetransit.com" },
      quote: "Patterns in data reveal paths to safer transit."
    }
  ];

  const companyImages = [
    {
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      title: "Our Modern Office",
      description: "Collaborative workspace designed for innovation"
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      title: "Team Collaboration",
      description: "Working together to solve transport challenges"
    },
    {
      url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
      title: "Technology Hub",
      description: "Cutting-edge tools for safety analysis"
    },
    {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      title: "Community Events",
      description: "Engaging with local communities"
    }
  ];

  const achievements = [
    { icon: <Users size={32} />, number: "50K+", label: "Active Users" },
    { icon: <Shield size={32} />, number: "10K+", label: "Safety Reports" },
    { icon: <CheckCircle size={32} />, number: "95%", label: "Resolution Rate" },
    { icon: <Award size={32} />, number: "25+", label: "Transit Partners" }
  ];

  // Initialize memory game
  const initializeMemoryGame = () => {
    const icons = [Shield, Heart, Star, Trophy, Zap, Rocket, Lightbulb, Globe];
    const gameCards = [];
    
    icons.forEach((Icon, index) => {
      gameCards.push({ id: index * 2, icon: Icon, matched: false });
      gameCards.push({ id: index * 2 + 1, icon: Icon, matched: false });
    });
    
    setMemoryCards(gameCards.sort(() => Math.random() - 0.5));
    setFlippedMemoryCards([]);
    setMatchedCards(new Set());
    setGameScore(0);
    setGameActive(true);
  };

  const handleCardFlip = (cardId) => {
    if (!flippedCards.has(cardId)) {
      setFlippedCards(new Set([...flippedCards, cardId]));
    } else {
      const newFlipped = new Set(flippedCards);
      newFlipped.delete(cardId);
      setFlippedCards(newFlipped);
    }
  };

  const handleMemoryCardClick = (cardId) => {
    if (flippedMemoryCards.length === 2 || flippedMemoryCards.includes(cardId) || matchedCards.has(cardId)) {
      return;
    }

    const newFlipped = [...flippedMemoryCards, cardId];
    setFlippedMemoryCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = memoryCards.find(card => card.id === first);
      const secondCard = memoryCards.find(card => card.id === second);

      if (firstCard.icon === secondCard.icon) {
        setMatchedCards(new Set([...matchedCards, first, second]));
        setGameScore(score => score + 10);
        setFlippedMemoryCards([]);
      } else {
        setTimeout(() => setFlippedMemoryCards([]), 1000);
      }
    }
  };

  const nextImage = () => {
    setIsImageSliding(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % companyImages.length);
      setIsImageSliding(false);
    }, 150);
  };

  const prevImage = () => {
    setIsImageSliding(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + companyImages.length) % companyImages.length);
      setIsImageSliding(false);
    }, 150);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
      
      <style>
        {`
          body { 
            background: linear-gradient(135deg, #e0e7ff 0%, #ffffff 50%, #f3e8ff 100%);
            min-height: 100vh; 
          }
          .hero-gradient {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          }
          .card-flip {
            transition: transform 0.7s;
            transform-style: preserve-3d;
            cursor: pointer;
          }
          .card-flip.flipped {
            transform: rotateY(180deg);
          }
          .card-front, .card-back {
            backface-visibility: hidden;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .card-back {
            transform: rotateY(180deg);
          }
          .card-hover { 
            transition: all 0.3s ease; 
          }
          .card-hover:hover { 
            transform: translateY(-8px); 
            box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important; 
          }
          .image-slide {
            transition: transform 0.3s ease;
          }
          .image-sliding {
            transform: scale(1.1);
          }
          .memory-card {
            aspect-ratio: 1;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .memory-card:hover {
            transform: scale(1.05);
          }
          .fade-in {
            animation: fadeIn 1s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div className="min-vh-100">
        {/* Hero Section */}
        <div className="hero-gradient text-white py-5">
          <div className="container py-5 text-center fade-in">
            <h1 className="display-2 fw-bold mb-4">
              About SafeTransit
            </h1>
            <p className="lead fs-4 text-white-75 mx-auto" style={{ maxWidth: '800px' }}>
              Revolutionizing public transport safety through technology, community engagement, and data-driven insights.
            </p>
          </div>
        </div>

        <div className="container py-5">
          
          {/* Mission, Vision, Values */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card h-100 text-center card-hover shadow">
                <div className="card-body p-4">
                  <Target className="text-primary mb-3 mx-auto" size={48} />
                  <h3 className="card-title h4 mb-3">Our Mission</h3>
                  <p className="card-text text-muted">
                    To create safer, more reliable public transportation through innovative technology and community-driven feedback systems.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 text-center card-hover shadow">
                <div className="card-body p-4">
                  <Eye className="text-secondary mb-3 mx-auto" size={48} />
                  <h3 className="card-title h4 mb-3">Our Vision</h3>
                  <p className="card-text text-muted">
                    A world where every public transport journey is safe, efficient, and accessible to all members of our communities.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 text-center card-hover shadow">
                <div className="card-body p-4">
                  <Heart className="text-danger mb-3 mx-auto" size={48} />
                  <h3 className="card-title h4 mb-3">Our Values</h3>
                  <p className="card-text text-muted">
                    Transparency, community empowerment, data privacy, and continuous improvement in everything we do.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Company Images */}
          <div className="mb-5">
            <h2 className="display-5 fw-bold text-center mb-5">Our Journey</h2>
            <div className="card shadow-lg overflow-hidden">
              <div className="position-relative" style={{ height: '400px' }}>
                <img
                  src={companyImages[currentImageIndex].url}
                  alt={companyImages[currentImageIndex].title}
                  className={`w-100 h-100 object-fit-cover image-slide ${
                    isImageSliding ? 'image-sliding' : ''
                  }`}
                />
                <div className="position-absolute bottom-0 start-0 end-0 bg-gradient-dark text-white p-4">
                  <h3 className="h4 mb-2">{companyImages[currentImageIndex].title}</h3>
                  <p className="mb-0 text-white-75">{companyImages[currentImageIndex].description}</p>
                </div>
                
                <div className="position-absolute top-50 start-0 end-0 d-flex justify-content-between px-3">
                  <button
                    onClick={prevImage}
                    className="btn btn-light btn-sm rounded-circle opacity-75"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="btn btn-light btn-sm rounded-circle opacity-75"
                  >
                    →
                  </button>
                </div>
                
                <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2">
                  <div className="d-flex gap-2">
                    {companyImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`rounded-circle border-0 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white-50'
                        }`}
                        style={{ width: '12px', height: '12px' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-5">
            <h2 className="display-5 fw-bold text-center mb-5">Our Impact</h2>
            <div className="row g-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="col-6 col-lg-3">
                  <div className="card text-center card-hover shadow">
                    <div className="card-body p-4">
                      <div className="text-primary mb-3">{achievement.icon}</div>
                      <div className="display-4 fw-bold text-dark mb-2">{achievement.number}</div>
                      <div className="text-muted">{achievement.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section with Flipping Cards */}
          <div className="mb-5">
            <h2 className="display-5 fw-bold text-center mb-3">Meet Our Team</h2>
            <p className="text-center text-muted mb-5 fs-5 mx-auto" style={{ maxWidth: '600px' }}>
              Passionate professionals dedicated to making public transportation safer for everyone.
            </p>
            
            <div className="row g-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="col-md-6 col-lg-4">
                  <div className="position-relative" style={{ height: '400px' }}>
                    <div
                      className={`card-flip h-100 ${
                        flippedCards.has(member.id) ? 'flipped' : ''
                      }`}
                      onClick={() => handleCardFlip(member.id)}
                    >
                      {/* Front of card */}
                      <div className="card card-front shadow h-100">
                        <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-4">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="rounded-circle mb-3 border border-3 border-primary"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          />
                          <h5 className="card-title mb-2">{member.name}</h5>
                          <p className="text-primary fw-semibold mb-3">{member.role}</p>
                          <p className="card-text text-muted small mb-3">{member.bio}</p>
                          <small className="text-muted">Click to flip</small>
                        </div>
                      </div>

                      {/* Back of card */}
                      <div className="card card-back hero-gradient text-white shadow h-100">
                        <div className="card-body d-flex flex-column justify-content-between p-4">
                          <div>
                            <h5 className="card-title mb-3">{member.name}</h5>
                            <p className="text-white-75 mb-4 fst-italic">"{member.quote}"</p>
                            
                            <div className="mb-4">
                              <h6 className="fw-bold mb-2">Skills:</h6>
                              <div className="d-flex flex-wrap gap-2">
                                {member.skills.map((skill, index) => (
                                  <span key={index} className="badge bg-white bg-opacity-25 text-white">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="d-flex justify-content-center gap-2">
                            {member.social.email && (
                              <button className="btn btn-light btn-sm rounded-circle">
                                <Mail size={16} />
                              </button>
                            )}
                            {member.social.linkedin && (
                              <button className="btn btn-light btn-sm rounded-circle">
                                <Linkedin size={16} />
                              </button>
                            )}
                            {member.social.twitter && (
                              <button className="btn btn-light btn-sm rounded-circle">
                                <Twitter size={16} />
                              </button>
                            )}
                            {member.social.github && (
                              <button className="btn btn-light btn-sm rounded-circle">
                                <Github size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Memory Game */}
          <div className="card shadow-lg mb-5">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h2 className="card-title h3 mb-3">Safety Memory Challenge</h2>
                <p className="text-muted mb-4">Test your memory while learning about safety icons!</p>
                
                <div className="d-flex justify-content-center align-items-center gap-4 mb-4 flex-wrap">
                  <div className="fs-5 fw-semibold">Score: <span className="text-primary">{gameScore}</span></div>
                  <button
                    onClick={initializeMemoryGame}
                    className="btn btn-primary d-flex align-items-center"
                  >
                    <Shuffle className="me-2" size={20} />
                    <span>{gameActive ? 'Reset Game' : 'Start Game'}</span>
                  </button>
                </div>
              </div>

              {gameActive && (
                <div className="row g-3 justify-content-center">
                  {memoryCards.map((card) => {
                    const isFlipped = flippedMemoryCards.includes(card.id) || matchedCards.has(card.id);
                    const IconComponent = card.icon;
                    
                    return (
                      <div key={card.id} className="col-3 col-sm-2">
                        <button
                          onClick={() => handleMemoryCardClick(card.id)}
                          className={`btn w-100 memory-card d-flex align-items-center justify-content-center ${
                            isFlipped
                              ? matchedCards.has(card.id)
                                ? 'btn-success'
                                : 'btn-primary'
                              : 'btn-light'
                          }`}
                          style={{ minHeight: '80px' }}
                        >
                          {isFlipped ? (
                            <IconComponent size={32} />
                          ) : (
                            <div className="bg-secondary rounded" style={{ width: '32px', height: '32px' }}></div>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {matchedCards.size === memoryCards.length && memoryCards.length > 0 && (
                <div className="text-center mt-4">
                  <div className="alert alert-success">
                    <h4 className="alert-heading">Congratulations! 🎉</h4>
                    <p className="mb-0">You completed the memory challenge with {gameScore} points!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="card hero-gradient text-white text-center shadow-lg">
            <div className="card-body p-5">
              <h2 className="card-title h3 mb-3">Join Our Mission</h2>
              <p className="card-text fs-5 text-white-75 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                Ready to make public transportation safer? We're always looking for passionate individuals to join our team.
              </p>
             <button className="btn btn-primary w-100" onClick={() => window.location.href = "/view"} 
  >view details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;