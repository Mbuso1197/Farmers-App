// script.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Stop the form from reloading the page

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.text();
        alert('✅ Registered successfully!\n' + result);
      } catch (error) {
        console.error('❌ Registration failed:', error);
        alert('Something went wrong. Please try again.');
      }
    });
  }
});