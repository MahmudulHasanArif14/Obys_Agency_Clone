function locomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locomotiveScroll();

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
    animationName: "anime",
    animationDuration: "5s",
    animationIterationCount: "infinite",
  });

  timeLine.to(".loader", {
    y: -1200,
    opacity: 0,
    duration: 0.5,
    delay: 2,
  });

  timeLine.from(".page1", {
    y: 1600,
    // ease: "power4.inOut",
    delay: 0.1,
    opacity: 0,
  });
  timeLine.to(".loader", {
    display: "none",
    delay: 0.5,
  });

  timeLine.from(".navbar", {
    opacity: 0,
  });

  timeLine.from("#hero1,#hero2,#hero3,#hero4", {
    y: 140,
    stagger: 0.25,
    opacity: 0,
    duration: 0.6,
  });

  timeLine.to(
    "#hero1, #page2",
    {
      opacity: 1,
    },
    "-=1.2",
  );
}

loadingAnimation();

function cursorAnimation() {
  const cursor = document.querySelector(".cursor");
  document.addEventListener("mousemove", function (e) {
    // console.log(e.clientX, e.clientY);

    //     cursor.style.left = (e.clientX - cursor.offsetWidth / 2 )+ "px";
    // cursor.style.top = e.clientY - cursor.offsetHeight / 2 + "px";

    gsap.to(cursor, {
      left: e.clientX - cursor.offsetWidth / 2,
      top: e.clientY - cursor.offsetHeight / 2,
      duration: 0.1,
    });
  });

  Shery.makeMagnet("a", {});

  // video cursor

  var videoContainer = document.querySelector(".video-container");

  var videoContainerVideo = document.querySelector(".video-container video");

  videoContainer.addEventListener("mouseenter", function (e) {
    videoContainer.addEventListener("mousemove", function (dets) {
      gsap.to(".mousefollower", {
        opacity: 0,
      });

      // console.log("dets", dets.x, "dets.y", dets.y);
      gsap.to(".video-cursor", {
        left: dets.x - 700,
        y: dets.y - 200,
      });
    });
  });

  videoContainer.addEventListener("mouseleave", function (e) {
    gsap.to(".mousefollower", {
      opacity: 1,
    });
    gsap.to(".video-cursor", {
      left: "80%",
      y: "-8",
    });
  });

  videoContainerVideo.addEventListener("click", function (e) {
    if (videoContainerVideo.paused) {
      document.querySelector(".video-cursor").innerHTML =
        "<img src='Assets/pause.png' alt='pause' />";

      videoContainerVideo.play();
      videoContainerVideo.style.opacity = 1;
      gsap.to(".video-cursor", {
        scale: 0.5,
      });
    } else {
      document.querySelector(".video-cursor").innerHTML =
        '<i class="ri-play-fill"></i>';
      videoContainerVideo.style.opacity = 0;
      videoContainerVideo.pause();
      gsap.to(".video-cursor", {
        scale: 0.5,
      });
    }
  });
}

cursorAnimation();

Shery.mouseFollower();

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    gooey: true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7241195453907675 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.23, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.5, range: [0, 10] },
      metaball: { value: 0.33, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.01, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
}
sheryAnimation();



function flagAnimation() { 



document.querySelector("#hero3").addEventListener("mouseenter", function (e) {
  gsap.to("#flag", {
    opacity: 1,
  });
});

document.querySelector("#hero3").addEventListener("mouseleave", function (e) {

  document.addEventListener("mousemove", function (e) {
    gsap.to("#flag", {
      left: e.clientX - 15,
      top: e.clientY - 15,
      duration: 0.1,
    });
  });

  gsap.to("#flag", {
    opacity: 0,
  });
});

}

 flagAnimation();









function footerAnimation() {
  const footerText = document.querySelector("#footer-text");
  const h1 = document.querySelector("#footer-text h1");
  const h2 = document.querySelector("#footer-text h2");

  if (!footerText || !h1 || !h2) return;






  // function 
  const wrapLetters = (text) =>
    text.split("").map((ch) => `<span>${ch === " " ? "&nbsp;" : ch}</span>`)
      .join("");


  // calling function
  h1.innerHTML = wrapLetters(h1.textContent);
  h2.innerHTML = wrapLetters(h2.textContent);

  gsap.set("#footer-text h1 span", { opacity: 1 });
  gsap.set("#footer-text h2 span", { opacity: 0 });

  const tl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.35, ease: "power1.out", overwrite: "auto" },
  });

  tl.to(
    "#footer-text h1 span",
    { opacity: 0, stagger: { each: 0.08, from: "start" } },
    0,
  );
  tl.to(
    "#footer-text h2 span",
    { opacity: 1, stagger: { each: 0.08, from: "start" } },
    0.1,
  );

  footerText.addEventListener("mouseenter", () => tl.play());
  footerText.addEventListener("mouseleave", () => tl.reverse());
}


footerAnimation();
