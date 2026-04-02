// Animation Function

function loadingAnimation() {
  let counter = 0;
const element = document.querySelector(".line1-part1 h5");
var timeLine = gsap.timeline();

// Gsap Start

function updateCounter() {
  counter++;
  element.textContent = counter;

  if (counter < 100) {
    requestAnimationFrame(updateCounter);
  }
}

// Gsap Animation
timeLine.from(".line h1", {
  y: 150,
  stagger: 0.25,
  opacity: 0,
  duration: 0.6,
  delay: 0.5,
});
timeLine.from(".line1-part1", {
  opacity: 0,
  onStart: function () {
    updateCounter();
  },
});


timeLine.to(".line h2", {
    opacity: 1,
    animationName:"anime",
    animationDuration: "5s",
    animationIterationCount: "infinite",
});



timeLine.to(".loader",{
    y: -1200,
    opacity: 0,
    duration: 0.5,
    delay: 2,
});


timeLine.from(".page1",{
    y: 1600,
    // ease: "power4.inOut",
    delay: 0.1,
    opacity: 0,
});
timeLine.to(".loader",{
    display: "none",
    delay: 0.5,
});

timeLine.from(".navbar",{
    opacity: 0,
  
  
});

timeLine.from("#hero1,#hero2,#hero3,#hero4",{
    y: 140,
    stagger: 0.25,
    opacity: 0,
    duration: 0.6,
  
});


}

loadingAnimation();





function cursorAnimation() {
 const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", function(e) {
    // console.log(e.clientX, e.clientY);

  //     cursor.style.left = (e.clientX - cursor.offsetWidth / 2 )+ "px";
  // cursor.style.top = e.clientY - cursor.offsetHeight / 2 + "px";

  gsap.to(cursor, {
    left: e.clientX - cursor.offsetWidth / 2,
    top: e.clientY - cursor.offsetHeight / 2,
    duration: 0.1,
  });


  
});



Shery.makeMagnet("a", {

});



}
cursorAnimation();






