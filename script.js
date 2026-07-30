const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("quoteForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const city = document.getElementById("city").value.trim();
  const service = document.getElementById("service").value;
  const details = document.getElementById("details").value.trim();

  const subject = encodeURIComponent(`Quote request from ${name} — ${service}`);
  const body = encodeURIComponent(
`Name: ${name}
Phone: ${phone || "Not provided"}
Email: ${email}
City: ${city || "Not provided"}
Service: ${service}

Project details:
${details}`
  );

  status.textContent = "Your email app is opening with the quote request prepared.";
  window.location.href = `mailto:info@gardencitypropertycare.com?subject=${subject}&body=${body}`;
});
