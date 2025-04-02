document.addEventListener("DOMContentLoaded", () => {
  console.log("Main JS loaded: site-wide scripts initialized.");

  // Load default content (About page)
  loadContent("about");

  // Set up click event listeners for both desktop and mobile navigation tabs.
  const navTabs = document.querySelectorAll(".nav-tabs .tab, .mobile-nav-tabs a");
  navTabs.forEach(tab => {
    tab.addEventListener("click", event => {
      event.preventDefault();
      // Remove "active" class from all tabs and add it to the clicked tab.
      navTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      loadContent(tab.getAttribute("data-page"));
    });
  });
});

/**
 * Loads content dynamically into the #content container.
 * If the loaded page is "about", it calls initCipherChallenge() to initialize the cipher challenge.
 */
function loadContent(page) {
  fetch(`/content/${page}`)
    .then(response => {
      if (!response.ok) throw new Error("Network error: " + response.statusText);
      return response.text();
    })
    .then(html => {
      document.getElementById("content").innerHTML = html;
      if (page === "about" && typeof window.initCipherChallenge === "function") {
        window.initCipherChallenge();
      }
    })
    .catch(error => {
      console.error("Error loading content:", error);
      document.getElementById("content").innerHTML = "<p>Error loading content.</p>";
    });
}