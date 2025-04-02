document.addEventListener("DOMContentLoaded", function () {
  const contentContainer = document.getElementById("content");
  const desktopTabs = document.querySelectorAll(".nav-tabs .tab");
  const mobileTabs = document.querySelectorAll(".mobile-nav-tabs a");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileCloseBtn = document.getElementById("mobile-close-btn");

  // Function to load content asynchronously
  function loadContent(page) {
    fetch(`/content/${page}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then(html => {
        contentContainer.innerHTML = html;
      })
      .catch(error => {
        contentContainer.innerHTML = `<p>Error loading content: ${error}</p>`;
      });
  }

  // Load initial content (About page)
  loadContent("about");

  // Desktop tabs event listeners
  desktopTabs.forEach(tab => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      desktopTabs.forEach(t => t.classList.remove("active"));
      mobileTabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      loadContent(this.getAttribute("data-page"));
    });
  });

  // Mobile tabs event listeners
  mobileTabs.forEach(tab => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      mobileTabs.forEach(t => t.classList.remove("active"));
      desktopTabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      loadContent(this.getAttribute("data-page"));
      mobileNav.classList.remove("open");
    });
  });

  // Hamburger menu button
  mobileMenuBtn.addEventListener("click", function () {
    mobileNav.classList.add("open");
  });

  // Mobile close button
  mobileCloseBtn.addEventListener("click", function () {
    mobileNav.classList.remove("open");
  });
});