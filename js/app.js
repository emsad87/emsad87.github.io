window.addEventListener("load", () => {
  let body = document.querySelector("body");

  // GET ALL NAVBAR ELEMENTS
  let navBtn = document.getElementById("navBtn");
  let navIcon = document.getElementById("navIcon");
  let navPanel = document.getElementById("navPanel");
  let topBtn = document.getElementById("topBtn");

  // GET ALL ELEMENTS WITH CLASS "observe"
  let sections = document.querySelectorAll(".observe");

  // let introSection = document.getElementById("intro");
  // let portfolioSection = document.getElementById("portfolio");
  // let experienceSection = document.getElementById("experience");
  // let educationSection = document.getElementById("education");
  // let skillsSection = document.getElementById("skills");
  // let aboutSection = document.getElementById("about");
  // let contactSection = document.getElementById("contact");

  // REMOVE LOADING CLASS FROM BODY - SHOW NAVBAR BUTTON
  body.classList.remove("loading");
  navBtn.classList.add("showNavBtn");

  // IF BUTTON "toTop" IS CLICKED SCROLL TO TOP
  topBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  document.addEventListener("click", (evt) => {
    let clickedElement = evt.target; // clicked element
    if (navPanel.classList.contains("showNav")) {
      navToggle();
    } else {
      do {
        if (clickedElement == navBtn) {
          navToggle();
          return;
        }
        // Go up the DOM
        clickedElement = clickedElement.parentNode;
      } while (clickedElement);
    }
  });

  function navToggle() {
    navPanel.classList.toggle("showNav");
    navIcon.classList.toggle("hideNavIcon");
  }

  // ACTIVE NAVBAR LINK - INTERSECTION
  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      // GET INTERSECTED ELEMENTS ID
      let sectionId = entry.target.id;

      // GET "navLink" WITH INTERSECTED ID IN HREF
      let navLink = document.querySelector(
        "#navPanel a[href*=" + sectionId + "]"
      );

      // IF ELEMENT IS INTESECTING ADD "active" CLASS TO navLink ELEMENT WITH SAME ID IN HREF
      if (entry.isIntersecting) {
        navLink.classList.add("active");

        // IF INTESECTED ELEMENT IS NOT "intro" SHOW toTop BUTTON
        if (sectionId != "intro") {
          topBtn.classList.add("topBtnShow");
        } else {
          topBtn.classList.remove("topBtnShow");
        }
      } else {
        navLink.classList.remove("active");
      }
    });
  };

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  let observer = new IntersectionObserver(callback, options);

  // OBSERVE ALL ELEMENTS WITH CLASS "observe"
  sections.forEach((item) => {
    observer.observe(item);
  });

  // observer.observe(introSection);
  // observer.observe(portfolioSection);
  // observer.observe(experienceSection);
  // observer.observe(educationSection);
  // observer.observe(skillsSection);
  // observer.observe(aboutSection);
  // observer.observe(contactSection);
});
