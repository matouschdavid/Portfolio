heroT = document.querySelector("#hero>h1");
windowHeight = window.innerHeight;
upperSection = windowHeight * 0.5;
lowerSection = windowHeight * 1.2;
onscroll = () => {
  if (window.scrollY < upperSection) {
    heroT.style.opacity = 1 - window.scrollY / upperSection;
    heroT.innerHTML = "Hi! I'm David";
  }

  if (window.scrollY > lowerSection) {
    heroT.style.opacity = 0 + (window.scrollY - lowerSection) / upperSection;
    heroT.innerHTML = "Contact me";
  }
};
