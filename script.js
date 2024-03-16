function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,

    // for tablet smooth
    tablet: { smooth: true },

    // for mobile
    smartphone: { smooth: true },
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

 
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

//data scroll speed used in html tags for smooth scrolling
function loadingAnimation() {
  let tl = gsap.timeline();

  tl.from(".line h1", {
    y: 180,
    stagger: 0.2,
    duration: 0.6,
    delay: 0.5,
  });

  tl.from("#line-1-part-1, .line h2", {
    opacity: 0,
    onStart: function () {
      let counter = document.querySelector(".line h5");

      let count = 0;

      setInterval(() => {
        if (count < 100) {
          counter.textContent = count++;
        } else {
          counter.textContent = count;
        }
      }, 25);
    },
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 3, //set here for loader to run fast
  });

  tl.from("#page1", {
    y: 1600,
    opacity: 0,
    ease: Power4,
  });

  tl.to("#loader", {
    display: "none",
  });

  tl.from("#nav", {
    opacity: 0,
  });

  // tl.from(".line2 h1", {
  //   y: 120,
  //   stagger: 0.2,
  // });
}
function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".cursor", {
      left: dets.x,
      top: dets.y,
    });
  });

  Shery.makeMagnet("#nav-part2 h4", {});

  let video = document.querySelector("#video-container video");
  let image = document.querySelector("#video-container img");
  let videocursor = document.querySelector("#video-cursor");

  let videoContainer = document.querySelector("#video-container");
  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (dets) {
      document.querySelector(".cursor").style.opacity = 0;

      gsap.to("#video-cursor", {
        left: dets.x - 500,
        top: dets.y - 400,
      });
    });

    videoContainer.addEventListener("mouseleave", function () {
      document.querySelector(".cursor").style.opacity = 1;

      gsap.to("#video-cursor", {
        left: "80%",
        top: "-10%",
      });
    });
  });

  let flag = 0;

  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      videocursor.innerHTML = `
      <i class="ri-pause-mini-line"></i>`;
      gsap.to("#video-cursor", {
        scale: 0.5,
      });

      image.style.display = "none";
      video.play();
      video.style.opacity = "1";
      flag = 1;
    } else {
      videocursor.innerHTML = `<i class="ri-play-line"></i>`;
      gsap.to("#video-cursor", {
        scale: 1,
      });
      image.style.display = "block";
      video.pause();
      video.style.opacity = "0";
      flag = 0;
    }
  });
}

//shery js used for images animation  debug: true; and gooey: true ; done while animating
// images to be kept one after the other for animating the background img must be kept at second place
function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    //this config data  came from using debug tool in web browser  while animating our image.
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7272749932567818 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.24, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.32, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },

    gooey: true,
  });
}
loadingAnimation();
cursorAnimation();
locomotiveAnimation();
sheryAnimation();
