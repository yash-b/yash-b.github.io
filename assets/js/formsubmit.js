document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactform");
  const alertBox = document.querySelector(".alert");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      const res = await fetch("https://playground-server-production.up.railway.app/contact-me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      if (!res.ok) throw new Error("Request failed");

      alertBox.textContent = "Your message has been sent!";
      alertBox.style.display = "block";

      form.reset();

      setTimeout(() => {
        alertBox.style.display = "none";
      }, 4000);

    } catch (err) {
      alertBox.textContent = "Something went wrong. Please try again.";
      alertBox.style.display = "block";
    }
  });
});