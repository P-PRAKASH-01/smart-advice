document.addEventListener("DOMContentLoaded", () => {
  // NEW: Translations object
  const translations = {
    en: {
      pageTitle: "Smart Crop Advisory System",
      appTitle: "Smart Crop Advisory",
      loginSignup: "Login / Sign Up",
      logout: "Logout",
      hello: "Hello",
      welcomeTitle: "Welcome, Farmer!",
      welcomeSubtitle: "Your personalized crop dashboard is ready.",
      weatherTitle: "Weather Forecast",
      weatherToday: "Today",
      weatherTomorrow: "Tomorrow",
      weatherDayAfter: "Day After",
      humidTip: "High humidity may increase pest risk.",
      sunnyTip: "Ensure irrigation and monitor crops.",
      recommendationsTitle: "Today's Recommendations",
      rec1: "Check soil moisture regularly.",
      rec2: "Look for pest signs after rain.",
      pestTitle: "Pest/Disease Detection",
      scanLeafBtn: "Scan Leaf",
      soilTitle: "Fertilizer & Soil Health",
      startSoilTestBtn: "Start Soil Test",
      marketTitle: "Market Prices",
      feedbackTitle: "Feedback",
      submitFeedbackBtn: "Submit Feedback",
      adminPanel: "Admin Panel",
      addMarketPrice: "Add Market Price",
      cropNamePlaceholder: "Crop Name",
      cropPricePlaceholder: "Price ₹/kg",
      addBtn: "Add",
      userFeedback: "User Feedback",
      pestModalTitle: "Pest & Disease Scan",
      uploadFromGallery: "Upload from Gallery",
      takePhoto: "Take Photo with Camera",
      analyzeImageBtn: "Analyze Image",
      soilModalTitle: "Soil Health Test",
      soilPhPlaceholder: "Soil pH (4-9)",
      sandy: "Sandy",
      loamy: "Loamy",
      clay: "Clay",
      organicMatterPlaceholder: "Organic matter %",
      getRecommendationBtn: "Get Recommendation",
      feedbackModalTitle: "Submit Feedback",
      typeHerePlaceholder: "Type here...",
      submitBtn: "Submit",
      feedbackSuccess: "Thank you for your feedback!",
      login: "Login",
      signUp: "Sign Up",
      mobilePlaceholder: "10-digit number",
      namePlaceholder: "Your Name",
      otpPlaceholder: "Enter OTP (123456)",
      createAccountBtn: "Create Account",
      noFeedback: "No feedback yet"
    },
    ta: {
      pageTitle: "ஸ்மார்ட் பயிர் ஆலோசனை அமைப்பு",
      appTitle: "ஸ்மார்ட் பயிர் ஆலோசனை",
      loginSignup: "உள்நுழை / பதிவுசெய்",
      logout: "வெளியேறு",
      hello: "வணக்கம்",
      welcomeTitle: "வாருங்கள், விவசாயி!",
      welcomeSubtitle: "உங்கள் தனிப்பயனாக்கப்பட்ட பயிர் டாஷ்போர்டு தயாராக உள்ளது.",
      weatherTitle: "வானிலை முன்னறிவிப்பு",
      weatherToday: "இன்று",
      weatherTomorrow: "நாளை",
      weatherDayAfter: "நாளை மறுநாள்",
      humidTip: "அதிக ஈரப்பதம் பூச்சி அபாயத்தை அதிகரிக்கக்கூடும்.",
      sunnyTip: "நீர்ப்பாசனத்தை உறுதிசெய்து பயிர்களைக் கண்காணிக்கவும்.",
      recommendationsTitle: "இன்றைய பரிந்துரைகள்",
      rec1: "மண்ணின் ஈரப்பதத்தை தவறாமல் சரிபார்க்கவும்.",
      rec2: "மழைக்குப் பிறகு பூச்சிகளின் அறிகுறிகளைக் கவனியுங்கள்.",
      pestTitle: "பூச்சி/நோய் கண்டறிதல்",
      scanLeafBtn: "இலையை ஸ்கேன் செய்",
      soilTitle: "உரம் & மண் ஆரோக்கியம்",
      startSoilTestBtn: "மண் பரிசோதனையைத் தொடங்கு",
      marketTitle: "சந்தை விலைகள்",
      feedbackTitle: "பின்னூட்டம்",
      submitFeedbackBtn: "பின்னூட்டம் சமர்ப்பி",
      adminPanel: "நிர்வாகி குழு",
      addMarketPrice: "சந்தை விலையைச் சேர்",
      cropNamePlaceholder: "பயிர் பெயர்",
      cropPricePlaceholder: "விலை ₹/கிலோ",
      addBtn: "சேர்",
      userFeedback: "பயனர் பின்னூட்டம்",
      pestModalTitle: "பூச்சி மற்றும் நோய் ஸ்கேன்",
      uploadFromGallery: "கேலரியில் இருந்து பதிவேற்று",
      takePhoto: "கேமரா மூலம் புகைப்படம் எடு",
      analyzeImageBtn: "படத்தை பகுப்பாய்வு செய்",
      soilModalTitle: "மண் சுகாதார சோதனை",
      soilPhPlaceholder: "மண் pH (4-9)",
      sandy: "மணல்",
      loamy: "வண்டல்",
      clay: "களிமண்",
      organicMatterPlaceholder: "கரிமப் பொருள் %",
      getRecommendationBtn: "பரிந்துரையைப் பெறு",
      feedbackModalTitle: "பின்னூட்டம் சமர்ப்பிக்கவும்",
      typeHerePlaceholder: "இங்கே தட்டச்சு செய்க...",
      submitBtn: "சமர்ப்பி",
      feedbackSuccess: "உங்கள் பின்னூட்டத்திற்கு நன்றி!",
      login: "உள்நுழை",
      signUp: "பதிவுசெய்",
      mobilePlaceholder: "10 இலக்க எண்",
      namePlaceholder: "உங்கள் பெயர்",
      otpPlaceholder: "OTP ஐ உள்ளிடவும் (123456)",
      createAccountBtn: "கணக்கை உருவாக்கு",
      noFeedback: "இன்னும் பின்னூட்டம் இல்லை"
    }
  };

  const authContainer = document.getElementById("auth-container");
  const mainContent = document.getElementById("main-content");
  const adminPanel = document.getElementById("admin-panel");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const languageSelector = document.getElementById("language-selector");

  let currentUser = null;
  let feedbackData = [];
  let marketData = [
    { crop: "Rice", price: 55 },
    { crop: "Groundnut", price: 150 }
  ];

  // NEW: Function to set the language
  function setLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(element => {
      const key = element.dataset.key;
      const translation = translations[lang]?.[key];
      if (translation) {
        element.textContent = translation;
      }
    });
    document.querySelectorAll('[data-key-placeholder]').forEach(element => {
      const key = element.dataset.keyPlaceholder;
      const translation = translations[lang]?.[key];
      if (translation) {
        element.placeholder = translation;
      }
    });
    localStorage.setItem('language', lang);
    // Refresh dynamic content with the new language
    if(currentUser && currentUser.role !== 'admin') {
      updateWeather();
      updateMarketUI();
    }
  }

  // MODIFIED: updateAuthUI to handle translations
  function updateAuthUI() {
    const lang = localStorage.getItem('language') || 'en';
    if (currentUser) {
      authContainer.innerHTML = `
        <div class="flex items-center space-x-2">
          <span class="font-semibold">${translations[lang].hello}, ${currentUser.name}</span>
          <button id="logout-btn" class="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">${translations[lang].logout}</button>
        </div>
      `;
      languageSelector.classList.add('hidden'); // Hide selector when logged in
      document.getElementById("logout-btn").addEventListener("click", () => {
        currentUser = null;
        updateAuthUI();
        adminPanel.classList.add("hidden");
      });
      if (currentUser.role === "admin") {
        showAdminPanel();
      } else {
        mainContent.classList.remove("hidden");
        updateWeather();
        updateMarketUI();
      }
    } else {
      authContainer.innerHTML = `
        <button data-modal-target="auth-modal"
          class="open-modal-btn bg-green-500 text-white px-4 py-2 rounded-lg" data-key="loginSignup">
          ${translations[lang].loginSignup}
        </button>`;
      languageSelector.classList.remove('hidden'); // Show selector when logged out
      mainContent.classList.add("hidden");
      adminPanel.classList.add("hidden");
      document.querySelector(".open-modal-btn[data-modal-target='auth-modal']")
        .addEventListener("click", () => openModal(document.getElementById("auth-modal")));
    }
  }

  // MODIFIED: updateWeather to handle translations
  function updateWeather() {
    const lang = localStorage.getItem('language') || 'en';
    const weatherData = [
      { day: translations[lang].weatherToday, temp: "32°C", condition: "Humid & Cloudy" },
      { day: translations[lang].weatherTomorrow, temp: "34°C", condition: "Sunny" },
      { day: translations[lang].weatherDayAfter, temp: "31°C", condition: "Rainy" }
    ];
    document.getElementById("weather-forecast").innerHTML = weatherData.map(d => `
      <div class="flex justify-between">
        <span>${d.day}</span>
        <span>${d.temp} - ${d.condition}</span>
      </div>
    `).join("");
    document.getElementById("today-tip").textContent =
      weatherData[0].condition.includes("Humid")
        ? translations[lang].humidTip
        : translations[lang].sunnyTip;
  }

  function showAdminPanel() {
    mainContent.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    updateAdminFeedback();
    updateAdminMarket();
  }

  // MODIFIED: updateAdminFeedback to handle translations
  function updateAdminFeedback() {
    const lang = localStorage.getItem('language') || 'en';
    const container = document.getElementById("admin-feedback");
    container.innerHTML = feedbackData.length
      ? feedbackData.map(f => `<p class="p-2 border rounded">${f}</p>`).join("")
      : `<p class='text-gray-500'>${translations[lang].noFeedback}</p>`;
  }

  function updateAdminMarket() {
    const list = document.getElementById("admin-market-list");
    list.innerHTML = marketData.map(m => `<p>${m.crop} – ₹${m.price}/kg</p>`).join("");
  }

  function updateMarketUI() {
    const list = document.getElementById("market-prices-container");
    list.innerHTML = marketData.map(m => `<p>${m.crop} – ₹${m.price}/kg</p>`).join("");
  }

  document.getElementById("login-form").addEventListener("submit", e => {
    e.preventDefault();
    const mobile = document.getElementById("login-mobile").value.trim();
    if (/^\d{10}$/.test(mobile)) {
      if (mobile === "9999999999") {
        currentUser = { name: "Admin", phoneNumber: mobile, role: "admin" };
      } else {
        currentUser = { name: "Farmer " + mobile.slice(-4), phoneNumber: mobile, role: "farmer" };
      }
      updateAuthUI();
      closeModal();
    } else {
      document.getElementById("login-error").textContent = "Invalid number";
      document.getElementById("login-error").classList.remove("hidden");
    }
  });

  document.getElementById("signup-form").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const mobile = document.getElementById("signup-mobile").value.trim();
    const otp = document.getElementById("signup-otp").value.trim();
    const err = document.getElementById("signup-error");
    if (!name || !/^\d{10}$/.test(mobile)) {
      err.textContent = "Enter valid details";
      err.classList.remove("hidden");
      return;
    }
    if (otp === "123456") {
      currentUser = { name, phoneNumber: mobile, role: "farmer" };
      updateAuthUI();
      closeModal();
    } else {
      err.textContent = "Invalid OTP (use 123456)";
      err.classList.remove("hidden");
    }
  });

  document.getElementById("soil-test-form").addEventListener("submit", e => {
    e.preventDefault();
    const ph = parseFloat(document.getElementById("soil-ph").value);
    const texture = document.getElementById("soil-texture").value;
    const organic = parseFloat(document.getElementById("soil-organic").value);
    let msg = "Soil looks good.";
    if (ph < 5.5) msg = "Too acidic, add lime.";
    else if (ph > 8) msg = "Too alkaline, add gypsum.";
    if (organic < 1) msg += " Low organic matter: add compost.";
    if (texture === "sandy") msg += " Sandy soil: add nitrogen fertilizer.";
    document.getElementById("soil-result").textContent = msg;
    document.getElementById("soil-result").classList.remove("hidden");
  });

  function handleLeafInput(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      document.getElementById("leaf-preview").src = ev.target.result;
      document.getElementById("leaf-preview").classList.remove("hidden");
      document.getElementById("analyze-leaf").classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }
  document.getElementById("leaf-upload").addEventListener("change", e => handleLeafInput(e.target.files[0]));
  document.getElementById("leaf-camera").addEventListener("change", e => handleLeafInput(e.target.files[0]));
  document.getElementById("analyze-leaf").addEventListener("click", () => {
    document.getElementById("pest-result").innerHTML =
      "<b>Result:</b> Leaf Spot detected.<br><b>Advice:</b> Apply copper fungicide weekly.";
    document.getElementById("pest-result").classList.remove("hidden");
  });

  document.getElementById("feedback-form").addEventListener("submit", e => {
    e.preventDefault();
    const text = document.getElementById("feedback-text").value.trim();
    if (text) {
      feedbackData.push(text);
      document.getElementById("feedback-success").classList.remove("hidden");
      document.getElementById("feedback-text").value = "";
      if (currentUser && currentUser.role === "admin") updateAdminFeedback();
    }
  });
  
  document.getElementById("market-form").addEventListener("submit", e => {
    e.preventDefault();
    const crop = document.getElementById("crop-name").value.trim();
    const price = parseFloat(document.getElementById("crop-price").value);
    if (crop && price) {
      marketData.push({ crop, price });
      updateAdminMarket();
      updateMarketUI();
      document.getElementById("crop-name").value = "";
      document.getElementById("crop-price").value = "";
    }
  });

  function openModal(modal) {
    modalBackdrop.style.display = "block";
    modal.style.display = "block";
  }
  function closeModal() {
    document.querySelectorAll(".modal").forEach(m => (m.style.display = "none"));
    modalBackdrop.style.display = "none";
  }
  modalBackdrop.addEventListener("click", closeModal);
  document.querySelectorAll(".open-modal-btn").forEach(btn =>
    btn.addEventListener("click", () => openModal(document.getElementById(btn.dataset.modalTarget)))
  );

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => {
        b.classList.remove("border-green-500", "text-green-600");
        b.classList.add("text-gray-500");
      });
      btn.classList.add("border-green-500", "text-green-600");
      document.querySelectorAll(".tab-content").forEach(tc => tc.classList.add("hidden"));
      if (btn.dataset.tab === "login")
        document.getElementById("login-form-container").classList.remove("hidden");
      else
        document.getElementById("signup-form-container").classList.remove("hidden");
    });
  });

  // NEW: Event listener for language selector
  languageSelector.addEventListener('change', (event) => {
    setLanguage(event.target.value);
  });

  // Init: Check for saved language and apply it
  const savedLang = localStorage.getItem('language') || 'en';
  languageSelector.value = savedLang;
  setLanguage(savedLang);
  updateAuthUI(); // Initial UI setup
});
