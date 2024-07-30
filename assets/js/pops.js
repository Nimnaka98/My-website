// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // Show the banner after 3 seconds
    setTimeout(function() {
      document.getElementById('overlay').style.display = 'flex';
    }, 3000);
  
    document.getElementById('yesButton').addEventListener('click', function() {
      // Animate the banner out
      const overlay = document.getElementById('overlay');
      overlay.style.transition = 'all 1s ease';
      overlay.style.transform = 'rotate(45deg) translate(50vw, 50vh)';
      overlay.style.opacity = '0';
  
      setTimeout(function() {
        overlay.style.display = 'none';
        showPopup();
      }, 1000);
    });
  
    document.getElementById('closePopup').addEventListener('click', function() {
      document.getElementById('popup').style.display = 'none';
    });
  
    function showPopup() {
      const popup = document.getElementById('popup');
      popup.style.display = 'flex';
      popup.style.opacity = '0';
      popup.style.transition = 'opacity 1s ease';
      setTimeout(function() {
        popup.style.opacity = '1';
      }, 100);
    }
  });
  