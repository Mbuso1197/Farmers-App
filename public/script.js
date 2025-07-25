function selectRole(role) {
  if (role === 'farmer') {
    window.location.href = "signup-farmer.html";
  } else if (role === 'buyer') {
    window.location.href = "signup-buyer.html";
  }
}