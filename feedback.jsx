import React, { useState, useEffect, useRef } from 'react';
import axios from "axios"; // 👈 add this at top
import { 
  Mic, 
  MicOff, 
  Upload, 
  Camera, 
  Video, 
  MessageCircle, 
  Phone, 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  User, 
  FileText,
  X,
  Play,
  Pause,
  Volume2,
  Image,
  Globe
} from 'lucide-react';

const FeedbackPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const [formData, setFormData] = useState({
    category: '',
    location: '',
    description: '',
    priority: 'medium',
    contactEmail: '',
    contactPhone: '',
    anonymous: false
  });
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const recognition = useRef(null);
  const synthesis = useRef(null);
  const fileInputRef = useRef(null);

  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const translations = {
    en: {
      title: "Safety Feedback Portal",
      secureText: "Secure & Confidential",
      successTitle: "Feedback Submitted Successfully!",
      successMessage: "Thank you for taking the time to improve public transport safety.",
      voiceTitle: "Voice-Enabled Feedback",
      voiceDescription: "Use voice commands to quickly report safety concerns.",
      startVoice: "Start Voice Input",
      stopVoice: "Stop Recording",
      aiResponding: "AI Responding...",
      voiceDetected: "Voice Input Detected:",
      submitTitle: "Submit Safety Feedback",
      submitDescription: "Help us make public transport safer for everyone",
      categoryRequired: "Transport Category *",
      selectCategory: "Select Category",
      priority: "Priority Level",
      locationRequired: "Location *",
      locationPlaceholder: "e.g., Central Station Platform 3",
      descriptionRequired: "Detailed Description *",
      descriptionPlaceholder: "Describe the safety concern in detail",
      supportingMedia: "Supporting Media (Optional)",
      uploadButton: "Upload Images or Videos",
      email: "Email (Optional)",
      emailPlaceholder: "your.email@example.com",
      phone: "Phone (Optional)",
      phonePlaceholder: "+1 (555) 123-4567",
      anonymous: "Submit anonymously",
      submitButton: "Submit Feedback Report",
      emergencyTitle: "Emergency Situations",
      emergencyText: "For immediate safety threats, please contact emergency services.",
      privacyTitle: "Privacy & Security",
      privacyText: "Your feedback is encrypted and handled securely.",
      chatbotTitle: "SafeTransit Assistant",
      chatbotPlaceholder: "Type your question...",
      priorityLow: "Low",
      priorityMedium: "Medium",
      priorityHigh: "High",
      categoryBus: "Bus",
      categoryMetro: "Metro",
      categoryTrain: "Train",
      categoryBusStop: "Bus Stop",
      categoryStation: "Station",
      categoryPlatform: "Platform",
      categoryOther: "Other"
    },
    es: {
      title: "Portal de Comentarios de Seguridad",
      secureText: "Seguro y Confidencial",
      successTitle: "¡Comentarios Enviados Exitosamente!",
      successMessage: "Gracias por tomarte el tiempo de mejorar la seguridad del transporte público.",
      voiceTitle: "Comentarios Habilitados por Voz",
      voiceDescription: "Usa comandos de voz para reportar preocupaciones de seguridad.",
      startVoice: "Iniciar Entrada de Voz",
      stopVoice: "Detener Grabación",
      aiResponding: "IA Respondiendo...",
      voiceDetected: "Entrada de Voz Detectada:",
      submitTitle: "Enviar Comentarios de Seguridad",
      submitDescription: "Ayúdanos a hacer el transporte público más seguro",
      categoryRequired: "Categoría de Transporte *",
      selectCategory: "Seleccionar Categoría",
      priority: "Nivel de Prioridad",
      locationRequired: "Ubicación *",
      locationPlaceholder: "ej., Plataforma 3 de la Estación Central",
      descriptionRequired: "Descripción Detallada *",
      descriptionPlaceholder: "Describe la preocupación de seguridad en detalle",
      supportingMedia: "Medios de Apoyo (Opcional)",
      uploadButton: "Subir Imágenes o Videos",
      email: "Correo (Opcional)",
      emailPlaceholder: "tu.correo@ejemplo.com",
      phone: "Teléfono (Opcional)",
      phonePlaceholder: "+1 (555) 123-4567",
      anonymous: "Enviar de forma anónima",
      submitButton: "Enviar Reporte de Comentarios",
      emergencyTitle: "Situaciones de Emergencia",
      emergencyText: "Para amenazas de seguridad inmediatas, contacta servicios de emergencia.",
      privacyTitle: "Privacidad y Seguridad",
      privacyText: "Tus comentarios están encriptados y manejados de forma segura.",
      chatbotTitle: "Asistente SafeTransit",
      chatbotPlaceholder: "Escribe tu pregunta...",
      priorityLow: "Baja",
      priorityMedium: "Media",
      priorityHigh: "Alta",
      categoryBus: "Autobús",
      categoryMetro: "Metro",
      categoryTrain: "Tren",
      categoryBusStop: "Parada de Autobús",
      categoryStation: "Estación",
      categoryPlatform: "Plataforma",
      categoryOther: "Otro"
    },
    fr: {
      title: "Portail de Commentaires de Sécurité",
      secureText: "Sécurisé et Confidentiel",
      successTitle: "Commentaires Soumis avec Succès !",
      successMessage: "Merci de prendre le temps d'améliorer la sécurité des transports publics.",
      voiceTitle: "Commentaires Activés par Voix",
      voiceDescription: "Utilisez les commandes vocales pour signaler les préoccupations de sécurité.",
      startVoice: "Démarrer l'Entrée Vocale",
      stopVoice: "Arrêter l'Enregistrement",
      aiResponding: "IA Répondant...",
      voiceDetected: "Entrée Vocale Détectée :",
      submitTitle: "Soumettre des Commentaires de Sécurité",
      submitDescription: "Aidez-nous à rendre les transports publics plus sûrs",
      categoryRequired: "Catégorie de Transport *",
      selectCategory: "Sélectionner Catégorie",
      priority: "Niveau de Priorité",
      locationRequired: "Emplacement *",
      locationPlaceholder: "ex., Quai 3 de la Gare Centrale",
      descriptionRequired: "Description Détaillée *",
      descriptionPlaceholder: "Décrivez la préoccupation de sécurité en détail",
      supportingMedia: "Médias de Support (Optionnel)",
      uploadButton: "Télécharger Images ou Vidéos",
      email: "E-mail (Optionnel)",
      emailPlaceholder: "votre.email@exemple.com",
      phone: "Téléphone (Optionnel)",
      phonePlaceholder: "+1 (555) 123-4567",
      anonymous: "Soumettre anonymement",
      submitButton: "Soumettre le Rapport de Commentaires",
      emergencyTitle: "Situations d'Urgence",
      emergencyText: "Pour les menaces de sécurité immédiates, contactez les services d'urgence.",
      privacyTitle: "Confidentialité et Sécurité",
      privacyText: "Vos commentaires sont chiffrés et traités en sécurité.",
      chatbotTitle: "Assistant SafeTransit",
      chatbotPlaceholder: "Tapez votre question...",
      priorityLow: "Faible",
      priorityMedium: "Moyenne",
      priorityHigh: "Élevée",
      categoryBus: "Bus",
      categoryMetro: "Métro",
      categoryTrain: "Train",
      categoryBusStop: "Arrêt de Bus",
      categoryStation: "Gare",
      categoryPlatform: "Quai",
      categoryOther: "Autre"
    },
    ta: {
      title: "பாதுகாப்பு கருத்து போர்ட்டல்",
      secureText: "பாதுகாப்பான மற்றும் ரகசிய",
      successTitle: "கருத்து வெற்றிகரமாக சமர்பிக்கப்பட்டது!",
      successMessage: "பொது போக்குவரத்து பாதுகாப்பை மேம்படுத்த நேரம் ஒதுக்கியதற்கு நன்றி.",
      voiceTitle: "குரல் இயக்கப்பட்ட கருத்து",
      voiceDescription: "பாதுகாப்பு கவலைகளை விரைவாக தெரிவிக்க குரல் கட்டளைகளை பயன்படுத்தவும்.",
      startVoice: "குரல் உள்ளீட்டை தொடங்கு",
      stopVoice: "பதிவை நிறுத்து",
      aiResponding: "AI பதிலளிக்கிறது...",
      voiceDetected: "குரல் உள்ளீடு கண்டறியப்பட்டது:",
      submitTitle: "பாதுகாப்பு கருத்துகளை சமர்பிக்கவும்",
      submitDescription: "அனைவருக்கும் பொது போக்குவரத்தை பாதுகாப்பாக்க எங்களுக்கு உதவுங்கள்",
      categoryRequired: "போக்குவரத்து வகை *",
      selectCategory: "வகையை தேர்ந்தெடுக்கவும்",
      priority: "முன்னுரிமை நிலை",
      locationRequired: "இடம் *",
      locationPlaceholder: "உதா., மத்திய நிலையம் தளம் 3",
      descriptionRequired: "விரிவான விளக்கம் *",
      descriptionPlaceholder: "பாதுகாப்பு கவலையை விரிவாக விவரிக்கவும்",
      supportingMedia: "துணை ஊடகம் (விருப்பம்)",
      uploadButton: "படங்கள் அல்லது வீடியோக்களை பதிவேற்று",
      email: "மின்னஞ்சல் (விருப்பம்)",
      emailPlaceholder: "உங்கள்.மின்னஞ்சல்@உதாரணம்.com",
      phone: "தொலைபேசி (விருப்பம்)",
      phonePlaceholder: "+91 12345 67890",
      anonymous: "அநாமதேயமாக சமர்பிக்கவும்",
      submitButton: "கருத்து அறிக்கையை சமர்பிக்கவும்",
      emergencyTitle: "அவசர சூழ்நிலைகள்",
      emergencyText: "உடனடி பாதுகாப்பு அச்சுறுத்தல்களுக்கு, அவசர சேவைகளை தொடர்பு கொள்ளவும்.",
      privacyTitle: "தனியுரிமை மற்றும் பாதுகாப்பு",
      privacyText: "உங்கள் கருத்துகள் என்க்ரிப்ட் செய்யப்பட்டு பாதுகாப்பாக கையாளப்படுகின்றன.",
      chatbotTitle: "SafeTransit உதவியாளர்",
      chatbotPlaceholder: "உங்கள் கேள்வியை தட்டச்சு செய்யவும்...",
      priorityLow: "குறைவு",
      priorityMedium: "நடுத்தர",
      priorityHigh: "அதிக",
      categoryBus: "பேருந்து",
      categoryMetro: "மெட்ரோ",
      categoryTrain: "ரயில்",
      categoryBusStop: "பேருந்து நிறுத்தம்",
      categoryStation: "நிலையம்",
      categoryPlatform: "தளம்",
      categoryOther: "மற்றவை"
    },
    hi: {
      title: "सुरक्षा फीडबैक पोर्टल",
      secureText: "सुरक्षित और गोपनीय",
      successTitle: "फीडबैक सफलतापूर्वक सबमिट किया गया!",
      successMessage: "सार्वजनिक परिवहन सुरक्षा में सुधार के लिए समय देने के लिए धन्यवाद।",
      voiceTitle: "वॉयस-सक्षम फीडबैक",
      voiceDescription: "सुरक्षा चिंताओं की रिपोर्ट करने के लिए वॉयस कमांड का उपयोग करें।",
      startVoice: "वॉयस इनपुट शुरू करें",
      stopVoice: "रिकॉर्डिंग बंद करें",
      aiResponding: "AI जवाब दे रहा है...",
      voiceDetected: "वॉयस इनपुट का पता चला:",
      submitTitle: "सुरक्षा फीडबैक सबमिट करें",
      submitDescription: "सभी के लिए सार्वजनिक परिवहन को सुरक्षित बनाने में हमारी मदद करें",
      categoryRequired: "परिवहन श्रेणी *",
      selectCategory: "श्रेणी चुनें",
      priority: "प्राथमिकता स्तर",
      locationRequired: "स्थान *",
      locationPlaceholder: "जैसे, केंद्रीय स्टेशन प्लेटफॉर्म 3",
      descriptionRequired: "विस्तृत विवरण *",
      descriptionPlaceholder: "सुरक्षा चिंता का विस्तार से वर्णन करें",
      supportingMedia: "सहायक मीडिया (वैकल्पिक)",
      uploadButton: "छवियां या वीडियो अपलोड करें",
      email: "ईमेल (वैकल्पिक)",
      emailPlaceholder: "आपका.ईमेल@उदाहरण.com",
      phone: "फोन (वैकल्पिक)",
      phonePlaceholder: "+91 12345 67890",
      anonymous: "गुमनाम रूप से सबमिट करें",
      submitButton: "फीडबैक रिपोर्ट सबमिट करें",
      emergencyTitle: "आपातकालीन स्थितियां",
      emergencyText: "तत्काल सुरक्षा खतरों के लिए, आपातकालीन सेवाओं से संपर्क करें।",
      privacyTitle: "गोपनीयता और सुरक्षा",
      privacyText: "आपका फीडबैक एन्क्रिप्टेड है और सुरक्षित रूप से संभाला जाता है।",
      chatbotTitle: "SafeTransit सहायक",
      chatbotPlaceholder: "अपना प्रश्न टाइप करें...",
      priorityLow: "कम",
      priorityMedium: "मध्यम",
      priorityHigh: "उच्च",
      categoryBus: "बस",
      categoryMetro: "मेट्रो",
      categoryTrain: "ट्रेन",
      categoryBusStop: "बस स्टॉप",
      categoryStation: "स्टेशन",
      categoryPlatform: "प्लेटफॉर्म",
      categoryOther: "अन्य"
    },
    ar: {
      title: "بوابة تعليقات الأمان",
      secureText: "آمن وسري",
      successTitle: "تم إرسال التعليقات بنجاح!",
      successMessage: "شكرًا لك على قضاء الوقت في تحسين أمان النقل العام.",
      voiceTitle: "التعليقات المدعومة بالصوت",
      voiceDescription: "استخدم الأوامر الصوتية للإبلاغ عن مخاوف الأمان بسرعة.",
      startVoice: "بدء الإدخال الصوتي",
      stopVoice: "إيقاف التسجيل",
      aiResponding: "الذكاء الاصطناعي يجيب...",
      voiceDetected: "تم اكتشاف الإدخال الصوتي:",
      submitTitle: "إرسال تعليقات الأمان",
      submitDescription: "ساعدنا في جعل النقل العام أكثر أمانًا للجميع",
      categoryRequired: "فئة النقل *",
      selectCategory: "اختر الفئة",
      priority: "مستوى الأولوية",
      locationRequired: "الموقع *",
      locationPlaceholder: "مثال، محطة مركزية منصة 3",
      descriptionRequired: "وصف مفصل *",
      descriptionPlaceholder: "اوصف مخاوف الأمان بالتفصيل",
      supportingMedia: "وسائط الدعم (اختياري)",
      uploadButton: "رفع الصور أو الفيديوهات",
      email: "البريد الإلكتروني (اختياري)",
      emailPlaceholder: "بريدك.الإلكتروني@مثال.com",
      phone: "الهاتف (اختياري)",
      phonePlaceholder: "+966 12345 67890",
      anonymous: "إرسال بشكل مجهول",
      submitButton: "إرسال تقرير التعليقات",
      emergencyTitle: "حالات الطوارئ",
      emergencyText: "للتهديدات الأمنية الفورية، يرجى الاتصال بخدمات الطوارئ.",
      privacyTitle: "الخصوصية والأمان",
      privacyText: "يتم تشفير تعليقاتك والتعامل معها بأمان.",
      chatbotTitle: "مساعد SafeTransit",
      chatbotPlaceholder: "اكتب سؤالك...",
      priorityLow: "منخفض",
      priorityMedium: "متوسط",
      priorityHigh: "عالي",
      categoryBus: "حافلة",
      categoryMetro: "مترو",
      categoryTrain: "قطار",
      categoryBusStop: "محطة الحافلة",
      categoryStation: "محطة",
      categoryPlatform: "منصة",
      categoryOther: "أخرى"
    }
  };

  const t = (key) => {
    return translations[selectedLanguage]?.[key] || translations['en'][key] || key;
  };

  // Initialize speech recognition and synthesis
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
          handleVoiceInput(finalTranscript);
        }
      };
    }

    if ('speechSynthesis' in window) {
      synthesis.current = window.speechSynthesis;
    }
  }, []);

  const handleVoiceInput = (input) => {
    const lowerInput = input.toLowerCase();
    let response = '';
    
    if (lowerInput.includes('report') || lowerInput.includes('incident') || lowerInput.includes('problem')) {
      setFormData(prev => ({ ...prev, description: input }));
      response = 'I\'ve recorded your feedback. Please select a category and location.';
    } else if (lowerInput.includes('bus') || lowerInput.includes('metro') || lowerInput.includes('train')) {
      const category = lowerInput.includes('bus') ? 'Bus' : lowerInput.includes('metro') ? 'Metro' : 'Train';
      setFormData(prev => ({ ...prev, category, description: prev.description || input }));
      response = `I've set the category to ${category}.`;
    } else if (lowerInput.includes('urgent') || lowerInput.includes('emergency')) {
      setFormData(prev => ({ ...prev, priority: 'high' }));
      response = 'I\'ve marked this as high priority.';
    } else if (lowerInput.includes('submit') || lowerInput.includes('send')) {
      if (formData.category && formData.location && formData.description) {
        handleSubmit();
        response = 'Your feedback has been submitted successfully!';
      } else {
        response = 'Please fill in all required fields before submitting.';
      }
    } else {
      setFormData(prev => ({ ...prev, description: input }));
      response = 'I\'ve recorded your feedback. Please specify the transport type and location.';
    }

    speak(response);
    
    if (showChatbot) {
      setChatMessages(prev => [...prev, 
        { type: 'user', message: input },
        { type: 'bot', message: response }
      ]);
    }
  };

  const speak = (text) => {
    if (synthesis.current) {
      synthesis.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      synthesis.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      recognition.current.start();
      const listeningMessage = getVoiceResponse('listening');
      speak(listeningMessage);
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      setIsListening(false);
      recognition.current.stop();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      type: file.type,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  
const botResponses = [
  "✅ Thanks for reporting this, we’ll handle it quickly.",
  "📝 Got your feedback! It’s logged in our system.",
  "🙌 We appreciate your input. This helps improve transport safety.",
  "🚀 Feedback submitted! Authorities will review it soon."
];

function getContextualResponse(message) {
  if (message.toLowerCase().includes("bus")) return "🚌 Bus issues are important! We’ll notify the transport team.";
  if (message.toLowerCase().includes("train")) return "🚆 Train complaints are logged for review.";
  if (message.toLowerCase().includes("metro")) return "🚆 metro will be altered soon";
  if (message.toLowerCase().includes("urgent") || message.toLowerCase().includes("emergency")) return "⚠️ Marked as high priority. Help is on the way!";
  if (message.toLowerCase().includes("thank")) return "😊 You're welcome! Stay safe.";
   if (message.toLowerCase().includes("help")) return "🚆 How can I help you??";



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

  // Optional: Send feedback to backend
  
};


  const categories = [
    { key: 'categoryBus', value: 'Bus' },
    { key: 'categoryMetro', value: 'Metro' },
    { key: 'categoryTrain', value: 'Train' },
    { key: 'categoryBusStop', value: 'Bus Stop' },
    { key: 'categoryStation', value: 'Station' },
    { key: 'categoryPlatform', value: 'Platform' },
    { key: 'categoryOther', value: 'Other' }
  ];

  const priorities = [
    { value: 'low', key: 'priorityLow' },
    { value: 'medium', key: 'priorityMedium' },
    { value: 'high', key: 'priorityHigh' }
  ];

  const handleSubmit = async (e) => {
  if (e) e.preventDefault();

  try {
    const data = new FormData();
    data.append("name", formData.anonymous ? "Anonymous" : formData.contactEmail || "Anonymous");
    data.append("language", "en");  // or detect from UI
    data.append("transportMode", formData.category || "General");  // map category → transportMode
    data.append("priority", formData.priority);
    data.append("description", formData.description);

    // Attach uploaded files
    uploadedFiles.forEach((fileObj) => {
      data.append("files", fileObj.file);
    });

    const res = await axios.post(
      "http://localhost:5000/api/feedback/submit",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("✅ Feedback submitted successfully!");
    console.log(res.data);

    setIsSubmitted(true);
    setFormData({
      category: '',
      location: '',
      description: '',
      priority: 'medium',
      contactEmail: '',
      contactPhone: '',
      anonymous: false
    });
    setUploadedFiles([]);

  } catch (error) {
    console.error("❌ Feedback submit error:", error.response?.data || error.message);
    alert(error.response?.data?.error || "Something went wrong. Please try again later.");
  }
};



  return (
    <div>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
      
      <style>
        {`
          body { 
            background: linear-gradient(135deg, #f8f9ff 0%, #e0e7ff 50%, #f3e8ff 100%);
            min-height: 100vh; 
          }
          .btn-voice-active { 
            animation: pulse 2s infinite; 
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .hero-gradient {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          }
          .card-hover { 
            transition: all 0.3s ease; 
          }
          .card-hover:hover { 
            transform: translateY(-4px); 
            box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important; 
          }
          .chatbot-container { 
            position: fixed; 
            bottom: 24px; 
            right: 24px; 
            z-index: 1060; 
          }
          .file-drop-zone {
            border: 2px dashed #dee2e6;
            transition: border-color 0.3s ease;
          }
          .file-drop-zone:hover {
            border-color: #6f42c1;
          }
          .success-gradient {
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
          }
          .tamil-text {
            font-family: 'Noto Sans Tamil', 'Latha', 'Tamil Sangam MN', sans-serif;
          }
        `}
      </style>

      <div className="min-vh-100">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container py-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className={`display-6 fw-bold text-primary mb-0 ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                  {t('title')}
                </h1>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-md-end justify-content-start mt-3 mt-md-0">
                  {/* Language Selector */}
                  <div className="me-3">
                    <div className="d-flex align-items-center">
                      <Globe className="me-2 text-muted" size={20} />
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="form-select form-select-sm"
                        style={{ minWidth: '140px' }}
                      >
                        {languageOptions.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="d-flex align-items-center text-success">
                    <CheckCircle className="me-2" size={20} />
                    <span className="fw-medium">{t('secureText')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          {/* Success Message */}
          {isSubmitted && (
            <div className="card border-success mb-5 card-hover">
              <div className="card-header success-gradient border-success">
                <div className="d-flex align-items-start">
                  <CheckCircle className="text-success me-3 mt-1" size={32} />
                  <div>
                    <h4 className={`text-success mb-2 ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                      {t('successTitle')}
                    </h4>
                    <p className={`text-success mb-0 ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                      {t('successMessage')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Voice Control Section */}
          <div className="card shadow mb-5">
            <div className="card-body text-center p-5">
              <h2 className={`card-title mb-4 ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                {t('voiceTitle')}
              </h2>
              <p className={`text-muted mb-4 fs-5 ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                {t('voiceDescription')}
              </p>
              
              <div className="d-flex justify-content-center align-items-center mb-4 flex-wrap gap-3">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`btn btn-lg d-flex align-items-center px-4 py-3 ${
                    isListening 
                      ? 'btn-danger btn-voice-active' 
                      : 'btn-success'
                  } ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}
                >
                  {isListening ? <MicOff className="me-2" size={24} /> : <Mic className="me-2" size={24} />}
                  <span>{isListening ? t('stopVoice') : t('startVoice')}</span>
                </button>
                
                {isPlaying && (
                  <div className="d-flex align-items-center text-primary">
                    <Volume2 className="me-2" size={20} />
                    <span className={`fw-medium ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                      {t('aiResponding')}
                    </span>
                  </div>
                )}
              </div>
              
              {transcript && (
                <div className="alert alert-info">
                  <p className={`fw-medium mb-1 ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                    {t('voiceDetected')}
                  </p>
                  <p className="fst-italic mb-0">"{transcript}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Feedback Form */}
          <div className="card shadow-lg">
            <div className="card-header hero-gradient text-white p-4">
              <h2 className={`card-title mb-2 ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                {t('submitTitle')}
              </h2>
              <p className={`text-white-50 mb-0 ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                {t('submitDescription')}
              </p>
            </div>

            <div className="card-body p-4">
              <div className="row mb-4">
                {/* Category Selection */}
                <div className="col-md-6 mb-3">
                  <label className={`form-label fw-bold ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                    {t('categoryRequired')}
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`form-select form-select-lg ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}
                  >
                    <option value="">{t('selectCategory')}</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {t(cat.key)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority Level */}
                <div className="col-md-6 mb-3">
                  <label className={`form-label fw-bold ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                    {t('priority')}
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className={`form-select form-select-lg ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {t(priority.key)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className={`form-label fw-bold ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                  <MapPin className="me-1" size={16} />
                  {t('locationRequired')}
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder={t('locationPlaceholder')}
                  className={`form-control form-control-lg ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className={`form-label fw-bold ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                  <FileText className="me-1" size={16} />
                  {t('descriptionRequired')}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t('descriptionPlaceholder')}
                  rows="5"
                  className={`form-control form-control-lg ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}
                ></textarea>
              </div>

              {/* File Upload Section */}
              <div className="mb-4">
                <label className={`form-label fw-bold ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                  <Camera className="me-1" size={16} />
                  {t('supportingMedia')}
                </label>
                <div className="file-drop-zone p-4 rounded text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="d-none"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`btn btn-primary btn-lg d-flex align-items-center mx-auto ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}
                  >
                    <Upload className="me-2" size={20} />
                    <span>{t('uploadButton')}</span>
                  </button>
                </div>

                {/* Display Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-3">
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="d-flex align-items-center justify-content-between bg-light rounded p-3 mb-2">
                        <div className="d-flex align-items-center">
                          {file.preview ? (
                            <img src={file.preview} alt={file.name} className="rounded me-3" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                          ) : (
                            <Video className="text-secondary me-3" size={40} />
                          )}
                          <div>
                            <div className="fw-medium">{file.name}</div>
                            <small className="text-muted">{file.size}</small>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <label className={`form-label fw-bold ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder={t('emailPlaceholder')}
                    className={`form-control form-control-lg ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className={`form-label fw-bold ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder={t('phonePlaceholder')}
                    className={`form-control form-control-lg ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}
                  />
                </div>
              </div>

              {/* Anonymous Option */}
              <div className="mb-4">
                <div className="form-check form-check-lg">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleInputChange}
                    className="form-check-input"
                    id="anonymousCheck"
                  />
                  <label className={`form-check-label ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`} htmlFor="anonymousCheck">
                    {t('anonymous')}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!formData.category || !formData.location || !formData.description}
                className={`btn btn-primary btn-lg w-100 py-3 ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}
              >
                <Send className="me-2" size={20} />
                {t('submitButton')}
              </button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="row mt-5">
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-primary">
                <div className="card-body">
                  <AlertTriangle className="text-primary mb-3" size={32} />
                  <h5 className={`card-title text-primary ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                    {t('emergencyTitle')}
                  </h5>
                  <p className={`card-text text-muted ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                    {t('emergencyText')}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-success">
                <div className="card-body">
                  <CheckCircle className="text-success mb-3" size={32} />
                  <h5 className={`card-title text-success ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                    {t('privacyTitle')}
                  </h5>
                  <p className={`card-text text-muted ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                    {t('privacyText')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Chatbot */}
        <div className="chatbot-container">
          {showChatbot && (
            <div className="card shadow-lg mb-3" style={{ width: '20rem', height: '24rem' }}>
              <div className="card-header hero-gradient text-white">
                <h6 className={`mb-1 ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                  {t('chatbotTitle')}
                </h6>
              </div>
              <div className="card-body p-3 overflow-auto" style={{ height: '300px' }}>
                {chatMessages.length === 0 ? (
                  <div className="text-center text-muted">
                    <MessageCircle className="mb-2" size={32} />
                    <p className={`small ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}>
                      Hi! I can help you fill out the feedback form using voice or text commands.
                    </p>
                  </div>
                ) : (
                  chatMessages.map((msg, index) => (
                    <div key={index} className={`mb-3 ${msg.type === 'user' ? 'text-end' : 'text-start'}`}>
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
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder={t('chatbotPlaceholder')}
                    className={`form-control ${selectedLanguage === 'ta' ? 'tamil-text' : ''}`}
                  />
                  <button
                    onClick={sendChatMessage}
                    className="btn btn-primary"
                  >
                    <Send size={14} />
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
              onClick={() => window.open('https://wa.me/?text=Hi! I need help submitting safety feedback for public transport.', '_blank')}
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

export default FeedbackPage;