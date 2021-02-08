var readMoreBtn = document.querySelectorAll(".readMoreBtn");
var i;

for (i = 0; i < readMoreBtn.length; i++) {
  readMoreBtn[i].addEventListener("click", function () {
    // this.classList.toggle("active");
    var content = this.previousElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      this.textContent = "Read more";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      this.textContent = "Show less";
    }
  });
}
