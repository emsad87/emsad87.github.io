window.addEventListener("load", () => {
  let body = document.querySelector("body");

  // GET ALL NAVBAR ELEMENTS
  let navBtn = document.getElementById("navBtn");
  let navIcon = document.getElementById("navIcon");
  let navPanel = document.getElementById("navPanel");
  let topBtn = document.getElementById("topBtn");

  // GET ALL ELEMENTS WITH CLASS "observe"
  let sections = document.querySelectorAll(".observe");

  let animElem = document.querySelectorAll(".animate");

  // REMOVE LOADING CLASS FROM BODY - SHOW NAVBAR BUTTON
  document.querySelector(".loadingScreen").style.opacity = "0";
  window.setTimeout(() => {
    body.classList.remove("loading");
  }, 500);
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
      if (!entry.target.classList.contains("animate")) {
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
      } else {
        if (
          entry.isIntersecting &&
          entry.target.classList.contains("animate")
        ) {
          entry.target.classList.add("animation");
        }
      }
    });
  };

  let options = {
    root: null,
    rootMargin: "-50%",
    threshold: 0,
  };

  let observer = new IntersectionObserver(callback, options);

  // OBSERVE ALL ELEMENTS WITH CLASS "observe"
  sections.forEach((item) => {
    observer.observe(item);
  });
  animElem.forEach((item) => {
    observer.observe(item);
  });
});
