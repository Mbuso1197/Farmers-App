// public/script.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form action

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
        alert('✅ Registration successful!\n' + result);
      } catch (error) {
        console.error('❌ Registration error:', error);
        alert('Something went wrong.');
      }
    });
  }
});