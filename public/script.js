document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

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

        if (response.ok) {
          // ✅ Redirect after successful registration
          window.location.href = "/dashboard.html";
        } else {
          alert('❌ Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('❌ Error:', error);
        alert('Something went wrong.');
      }
    });
  }
});
