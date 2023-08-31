import { navButtonContainers } from './menu.js'; // Adjust the path

/* THIS ALLOWS USERS ON MOBILE DEVICES TO OPEN AND CLOSE SUBMENUS */
document.addEventListener("click", (e) => {
  const isDropdownButton =
    e.target.matches("button") &&
    e.target.parentElement != null &&
    e.target.parentElement.matches(".nav-button-container");

  let currentDropDown;
  if (isDropdownButton) {
    currentDropDown = e.target.closest(".nav-button-container");
    currentDropDown.classList.toggle("active");
  }

  navButtonContainers.forEach((navButton) => {
    if (navButton != currentDropDown) {
      // HOVER CAN APPEAR ON MOBILE IF THE FINGER IS TOUCHING THE SCREEN FOR A COUPLE OF SECONDS
      navButton.classList.remove("active", "hover");
    }
  });
});
