document.addEventListener("DOMContentLoaded", () => {
  const authContainer = document.getElementById("auth-container");
  const mainContent = document.getElementById("main-content");
  const adminPanel = document.getElementById("admin-panel");
  const modalBackdrop = document.getElementById("modal-backdrop");

  let currentUser = null;
  let feedbackData = [];
  let marketData = [
    { crop: "Rice", price: 55 },
    { crop: "Groundnut", price: 150 }
  ];

  const weatherData = [
    { day: "Today", temp: "32°C", condition: "Humid & Cloudy" },
    { day: "Tomorrow", temp: "34°C", condition: "Sunny" },
    { day: "Day After", temp: "31°C", condition: "Rainy" }
  ];

  // ---------------- AUTH UI ----------------
  function updateAuthUI() {
    if (currentUser) {
      authContainer.innerHTML = `
        <div class="flex items-center space-x-2">
          <span class="font-semibold">Hello, ${currentUser.name}</span>
          <button id="logout-btn" class="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">Logout</button>
        </div>
      `;
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
          class="open-modal-btn bg-green-500 text-white px-4 py-2 rounded-lg">
          Login / Sign Up
        </button>`;
      mainContent.classList.add("hidden");
      adminPanel.classList.add("hidden");
      document.querySelector(".open-modal-btn[data-modal-target='auth-modal']")
        .addEventListener("click", () => openModal(document.getElementById("auth-modal")));
    }
  }

  // ---------------- WEATHER ----------------
  function updateWeather() {
    document.getElementById("weather-forecast").innerHTML = weatherData.map(d => `
      <div class="flex justify-between">
        <span>${d.day}</span>
        <span>${d.temp} - ${d.condition}</span>
      </div>
    `).join("");
    document.getElementById("today-tip").textContent =
      weatherData[0].condition.includes("Humid")
        ? "High humidity may increase pest risk."
        : "Ensure irrigation and monitor crops.";
  }

  // ---------------- ADMIN ----------------
  function showAdminPanel() {
    mainContent.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    updateAdminFeedback();
    updateAdminMarket();
  }

  function updateAdminFeedback() {
    const container = document.getElementById("admin-feedback");
    container.innerHTML = feedbackData.length
      ? feedbackData.map(f => `<p class="p-2 border rounded">${f}</p>`).join("")
      : "<p class='text-gray-500'>No feedback yet</p>";
  }

  function updateAdminMarket() {
    const list = document.getElementById("admin-market-list");
    list.innerHTML = marketData.map(m => `<p>${m.crop} – ₹${m.price}/kg</p>`).join("");
  }

  function updateMarketUI() {
    const list = document.getElementById("market-prices-container");
    list.innerHTML = marketData.map(m => `<p>${m.crop} – ₹${m.price}/kg</p>`).join("");
  }

  // ---------------- LOGIN ----------------
  document.getElementById("login-form").addEventListener("submit", e => {
    e.preventDefault();
    const mobile = document.getElementById("login-mobile").value.trim();
    if (/^\d{10}$/.test(mobile)) {
      if (mobile === "9999999999") {
        currentUser = { name: "Admin", phoneNumber: mobile, role: "admin" };
        showAdminPanel();
      } else {
        currentUser = { name: "Farmer " + mobile.slice(-4), phoneNumber: mobile, role: "farmer" };
        mainContent.classList.remove("hidden");
        updateWeather();
        updateMarketUI();
      }
      updateAuthUI();
      closeModal();
    } else {
      document.getElementById("login-error").textContent = "Invalid number";
      document.getElementById("login-error").classList.remove("hidden");
    }
  });

  // ---------------- SIGNUP ----------------
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

  // ---------------- SOIL TEST ----------------
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

  // ... (rest of your goods.js file) ...

// ---------------- PEST DETECTION ----------------
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

// ... (rest of your goods.js file) ...

  // ---------------- FEEDBACK ----------------
  document.getElementById("feedback-form").addEventListener("submit", e => {
    e.preventDefault();
    const text = document.getElementById("feedback-text").value.trim();
    if (text) {
      feedbackData.push(text);
      document.getElementById("feedback-success").classList.remove("hidden");
      document.getElementById("feedback-text").value = "";
      if (currentUser.role === "admin") updateAdminFeedback();
    }
  });

  // ---------------- ADMIN: ADD MARKET ----------------
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

  // ---------------- MODALS ----------------
  function openModal(modal) {
    modalBackdrop.style.display = "block";
    modal.style.display = "block";
    document.body.classList.add('modal-open'); // NEW: Prevent background scroll
  }
  function closeModal() {
    document.querySelectorAll(".modal").forEach(m => (m.style.display = "none"));
    modalBackdrop.style.display = "none";
    document.body.classList.remove('modal-open'); // NEW: Allow background scroll again
  }
  modalBackdrop.addEventListener("click", closeModal);
  document.querySelectorAll(".open-modal-btn").forEach(btn =>
    btn.addEventListener("click", () => openModal(document.getElementById(btn.dataset.modalTarget)))
  );

  // Tab switch (Login/Signup)
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

  // Init
  updateAuthUI();
});