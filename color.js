window.addEventListener("DOMContentLoaded", () => {
  // إنشاء الزر ولوحة التحكم تلقائياً
  const settingsBtn = document.createElement("div");
  settingsBtn.className = "settings-btn";
  settingsBtn.id = "settingsBtn";
  settingsBtn.innerHTML = `
    ⚙️
    <div class="moon-toggle" id="modeToggle">🌙</div>
  `;

  const colorPanel = document.createElement("div");
  colorPanel.className = "color-panel";
  colorPanel.id = "colorPanel";
  colorPanel.innerHTML = `
    <div class="color-circle" style="background:#3b82f6"></div>
    <div class="color-circle" style="background:#ef4444"></div>
    <div class="color-circle" style="background:#22c55e"></div>
    <div class="color-circle" style="background:#eab308"></div>
    <div class="color-circle" style="background:#8b5cf6"></div>
  `;

  document.body.appendChild(settingsBtn);
  document.body.appendChild(colorPanel);

  const modeToggle = document.getElementById("modeToggle");
  const colors = document.querySelectorAll(".color-circle");

  // فتح/غلق لوحة الألوان
  settingsBtn.addEventListener("click", (e) => {
    if (e.target === modeToggle) return;
    colorPanel.classList.toggle("active");
  });

  // تبديل الوضع المظلم والفاتح
  modeToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    modeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // تغيير لون العناوين عند اختيار لون
  colors.forEach((circle) => {
    circle.addEventListener("click", () => {
      const chosenColor = circle.style.background;
      document.querySelectorAll("h1, h2, .section-title h2").forEach(el => {
        el.style.color = chosenColor;
      });
      localStorage.setItem("titleColor", chosenColor);
    });
  });

  // استرجاع الإعدادات المحفوظة
  const savedTheme = localStorage.getItem("theme");
  const savedColor = localStorage.getItem("titleColor");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    modeToggle.textContent = "☀️";
  }

  if (savedColor) {
    document.querySelectorAll("h1, h2, .section-title h2").forEach(el => {
      el.style.color = savedColor;
    });
  }
});
