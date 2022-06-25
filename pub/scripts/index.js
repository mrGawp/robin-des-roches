// main slidehsow
document.querySelectorAll('.slideshowImg_container-absolute').forEach(Element => {
  Element.style.opacity = 0;
})
let slideshow_counter = 0;
let slieshow_class = document.querySelector(".slideshowImg_container");
let slideshowLength = slieshow_class.children.length;
function slideshowAnim() {
  anime ({
    targets: slieshow_class.children[slideshow_counter],
    easing: 'linear',
    duration: 3990,
    loop: false,
    complete: function() {
      slieshow_class.children[slideshow_counter].style.opacity = '0';
      slideshow_counter++
      slideshowAnim();
      slieshow_class.children[slideshow_counter].style.opacity = '0.5';
    }
  })
  if (slideshow_counter >= slideshowLength) {
    slideshow_counter = 0;
  }
}
slideshowAnim();







//page animations page animations page animations page animations page animations

function getScrollPercent() {
    var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 250;
  }
  
  const header = anime.timeline({ autoplay: false });
  
    
  header.add({
    targets: ".headerMainSpan",
    opacity: [
      {value: 0},
      {value: 1}
    ],
    duration: 6000, 
    easing: 'linear'
   });
  
   const headerUnder = anime.timeline({ autoplay: false });
  
    
   headerUnder.add({
    targets: ".headerUnder",
    opacity: [
      {value: 1},
      {value: 0}
    ],
    duration: 6000, 
    easing: 'linear'
   });
   headerUnder.add({
    targets: ".sloganWords",
    opacity: [
      {value: 1},
      {value: 0}
    ],
    duration: 6000, 
    easing: 'linear'
   });

  
  
  
     
  var animateCounter = 1;
  window.addEventListener('scroll', () => {
    let persentage = getScrollPercent();
    let persentageText = getScrollPercent();
    header.seek(header.duration * (persentage * 0.01));
    headerUnder.seek(headerUnder.duration * (persentage * 0.015));
    
    if (persentageText < 5) {
      persentageText = 5;
    }
  
    if(persentage >= 6 && animateCounter == 1) {
      animateCounter = 0;
      anime ({
        targets: ".addMainNav",
        translateX: [
          {value: 9},
          {value: -18},
        ],
        opacity: 0,
        duration: 2000 / persentageText, 
        easing: 'linear',
        delay: 2000 / persentageText
      });
    }
  
  
    if(persentage < 6 && animateCounter == 0) {
      animateCounter = 1;
      anime ({
        targets: ".addMainNav",
        translateX: [
          {value: 9},
          {value: -3},
          {value: 0},
        ],
        opacity: 1,
        duration: 2000 / persentageText, 
        easing: 'linear' 
      });
    }
  });

  // background header ani  background header ani  background header ani  background header ani  
  
  
  const backgroundHeader = document.querySelector(".headerBackground");
  let rockAmount = 18;
  let brickAmount = 3;
  let counter = 0;
  
  function isOdd(i) { return i % 2;}
  
  // background Colors for the raindrop
  const background = [
    "#037971",
    "#0c6e67",
    "#056e67"
  
  ];
  const br = [
    "30% 70% 72% 28% / 30% 30% 70% 70% ",
    "30% 70% 39% 61% / 30% 30% 70% 70% ",
    "69% 31% 39% 61% / 67% 30% 70% 33% ",
    "69% 31% 39% 61% / 67% 78% 22% 33% ",
    "63% 37% 81% 19% / 48% 45% 55% 52% "
  ];
  function playBackgroundAni() {
  let i = 0;
  let k = 0;
  let rock, brick, rockProperties, brickProperties;
  
  while (i < rockAmount) {
    rock = document.createElement("i");
    var widthHeigth = anime.random(0, 1) + "vw";
    rockProperties = {
      width: widthHeigth,
      height: widthHeigth,
      positionX: (100/rockAmount) * i+anime.random(1,2) + "%",
      positionY: anime.random(90, 95)+"%",
      ani_translateX: anime.random(-20, 20)+"px",
      ani_rotate: anime.random(180, 360)+"deg",
      bg: background[Math.floor(Math.random() * background.length)],
      borderRadius: br[Math.floor(Math.random() * br.length)],
      delay: Math.random() * -20 + "s",
      duration: Math.floor(Math.random() * 18.9) + 18.8 + "s",
      opacityBorder: "0."+anime.random(3, 4),
      opacityBackground: "0."+anime.random(2, 3),
    };
    rock.style.width = rockProperties.width;
    rock.style.height = rockProperties.height;
    rock.style.left = rockProperties.positionX;
    rock.style.top = rockProperties.positionY;
    rock.style.setProperty('--translateX', rockProperties.ani_translateX)
    rock.style.setProperty('--rotate', rockProperties.ani_rotate)
    rock.style.animationDelay = rockProperties.delay;
    rock.style.animationDuration = rockProperties.duration;
    rock.style.borderRadius = rockProperties.borderRadius;
  
    rock.classList.add("rock")
    rock.classList.add("backgorundHeaderItem")
  
    if (isOdd(i) == 1) {
      rock.classList.add("rock_p1")
      rock.style.background = rockProperties.bg;
      rock.style.opacity = rockProperties.opacityBackground
    } else {
      rock.classList.add("rock_p2")
      rock.style.opacity = rockProperties.opacityBorder
      rock.style.border = "2px solid"+rockProperties.bg;
    }
  
  
    backgroundHeader.appendChild(rock);
    counter = document.getElementsByClassName("rock").length
    i++;
  }
  
  
  while (k < brickAmount) {
    brick = document.createElement("i");
    brickProperties = {
      width: anime.random(14, 16) + "vw",
      height: anime.random(4, 6) + "vw",
      top: anime.random(3, 40)+"%",
      posX: (50/brickAmount) * k+1 + "%",
      bg: background[Math.floor(Math.random() * background.length)],
      borderRadius: anime.random(6, 9) + "px",
      opacity: "0.0"+anime.random(89,99),
      rotate: anime.random(-25, 25)+"deg",
    }
    brick.style.width = brickProperties.width;
    brick.style.height = brickProperties.height;
    brick.style.borderRadius = brickProperties.borderRadius;
    brick.style.opacity = brickProperties.opacity;
    brick.style.background = brickProperties.bg;
    brick.style.transform = "rotate("+brickProperties.rotate+")";
    brick.style.top = brickProperties.top;
    brick.style.right = brickProperties.posX;
  
    brick.classList.add("brick")
    brick.classList.add("backgorundHeaderItem")
  
    backgroundHeader.appendChild(brick);
    k++;
  }
   if (k == brickAmount) {
    playBricksAni()
   }
  
   
  }
  
  function playBricksAni() {
    brickTl = anime.timeline({
      delay: 0,
    })
    brickTl
       .add ({
        targets: ".brick",
        translateY: function() {
        return anime.random(-18, 18)+"%"
        },
        translateX: function() {
        return anime.random(-18, 18)+"%"
        },
        width: function() {
        return anime.random(14, 16) + "vw"
        },
        height: function() {
        return anime.random(4, 6) + "vw"
        },
        rotate: function() {
        return anime.random(-25, 25)
        },
        loop: false,
        duration: function() {
        return anime.random(2000, 4000)
        },
        delay: anime.stagger(anime.random(0, 5000), {start: anime.random(0, 400)}),
        easing: "easeInOutBack",
    })
  
    .add ({
        targets: ".brick",
        translateY: function() {
        return anime.random(-9, 9)+"%"
        },
        translateX: function() {
        return anime.random(-18, 18)+"%"
        },
        width: function() {
        return anime.random(14, 16) + "vw"
        },
        height: function() {
        return anime.random(4, 6) + "vw"
        },
        rotate: function() {
        return anime.random(-9, 9)
        },
        loop: false,
        duration: function() {
        return anime.random(2000, 4000)
        },
        delay: anime.stagger(anime.random(0, 5000), {start: anime.random(0, 400)}),
        easing: "easeInOutBack",
        complete: playBricksAni
    })
  
  }
  
  function playBlobAni() {
      anime ({
        targets: ".blobBlur",
        loop: false,
        borderRadius: function() {
          return br[Math.floor(Math.random() * br.length)]
        },
        translateY: function() {
        return anime.random(-50, 50)+"%"
        },
        translateX: function() {
        return anime.random(-50, 50)+"%"
        },
        scale: function() {
        return "0."+anime.random(85, 99)
        },
        duration: function() {
        return anime.random(3000, 3500)
        },
        delay: 0,
        easing: "linear",
        delay: anime.stagger(anime.random(0, 300), {start: anime.random(0, 100)}),
        complete: playBlobAni
    })
  }
  
  function mainbrickChanger_aniP1() {
    var changerTl = anime.timeline({
        loop: false,
    })
    changerTl
    .add({
      targets: ".mainAni_changer",
        translateY: 0,
        translateX: 0,
        width: function() {
        return anime.random(22, 24) + "vw"
        },
        height: function() {
        return anime.random(6, 9) + "vw"
        },
        rotate: function() {
        return anime.random(-11, -9)
        },
        scale: 1,
        opacity: 0.1,
        backgroundColor: function() {
        return background[Math.floor(Math.random() * background.length)]
        },
        duration: function() {
        return anime.random(2100, 2300)
        },
        borderRadius: "0.3vw",
        easing: "easeInOutBack"
    })
    .add({
      targets: ".mainAni_changer",
        translateY: function() {
        return anime.random(6, 9)+"%"
        },
        translateX: function() {
        return "-"+anime.random(1, 3)+"%"
        },
        width: function() {
        return anime.random(32, 35) + "vw"
        },
        rotate: function() {
        return anime.random(0, 11)
        },
        duration: function() {
        return anime.random(1400, 1500)
        },
        delay: anime.random(2000, 3500),
        borderRadius: "0.2vw",
        easing: "easeInOutBack"
    })
    .add({
      targets: ".mainAni_changer",
        translateY: function() {
        return "-"+anime.random(6, 9)+"%"
        },
        translateX: function() {
        return anime.random(1, 3)+"%"
        },
        width: function() {
        return anime.random(18, 20) + "vw"
        },
        height: function() {
        return anime.random(12, 14) + "vw"
        },
        duration: function() {
        return anime.random(1800, 1900)
        },
        delay: anime.random(2000, 3500),
        borderRadius: "1vw",
        easing: "easeInOutBack"
    })
    .add({
      targets: ".mainAni_changer",
        keyframes: [
          {
          borderRadius: function() {
          return br[Math.floor(Math.random() * br.length)]
            },
          translateY: function() {
          return "-"+anime.random(6, 9)+"%"
            },
          translateX: function() {
          return "-"+anime.random(1, 3)+"%"
            },
          width: function() {
             return anime.random(18, 20) + "vw"
            },
          height: function() {
             return anime.random(12, 14) + "vw"
          },
          scale: function() {
          return "0."+anime.random(75, 85)
            },
            rotate: 360
          },
          {
          borderRadius: function() {
            return br[Math.floor(Math.random() * br.length)]
            },
          translateY: anime.random(6, 9)+"%",
          translateX: anime.random(1, 3)+"%",
            width: "16vw",
            height: "16vw",
            scale: 1.2
          },
          {
            rotate: 0,
            duration: 0
          }
        ],
        delay: anime.random(2000, 3500),
        duration: function() {
        return anime.random(1600, 6000)
        },
        easing: "easeInOutBack"
    })
    .add({
      targets: ".mainAni_changer",
        borderRadius: function() {
          return br[Math.floor(Math.random() * br.length)]
        },
        rotate: function() {
        return "-"+anime.random(9, 12)
        },
        duration: function() {
        return anime.random(1400, 1500)
        },
        easing: "easeInOutBack",
        delay: anime.random(4000, 6000),
        scale: 1
    })
    .add({
      targets: ".mainAni_changer",
        translateY: function() {
        return "-"+anime.random(50, 55)+"%"
        },
        scale: 0.3,
        borderRadius: function() {
          return br[Math.floor(Math.random() * br.length)]
        },
        rotate: function() {
        return anime.random(3, 6)
        },
        duration: function() {
        return anime.random(2500, 2600)
        },
        easing: "easeInOutBack",
        complete: mainbrickChanger_aniP2
    })
  }
  /*next step --------------------------*/
  let p2counter = 0;
  function mainbrickChanger_aniP2() {
  
    while (p2counter < 9) {
    aniRock = document.createElement("i");
    aniRockProperties = {
      bg: background[Math.floor(Math.random() * background.length)],
      borderRadius: br[Math.floor(Math.random() * br.length)],
      rotate: anime.random(-25, 25)+"deg",
      width: anime.random(50, 100)+"%",
      height: anime.random(50, 100)+"%",
    }
    aniRock.style.width = aniRockProperties.width;
    aniRock.style.height = aniRockProperties.height;
    aniRock.style.borderRadius = aniRockProperties.borderRadius;
  
    if (isOdd(p2counter) == 1) {
      aniRock.classList.add("aniRock_p1")
      aniRock.style.background = aniRockProperties.bg;
    } else {
      aniRock.classList.add("aniRock_p1")
      aniRock.style.border = "18px solid"+aniRockProperties.bg;
    }
  
    aniRock.classList.add("aniRock")
  
    document.querySelector(".mainAni_changer").appendChild(aniRock);
    p2counter++;
    }
  
  
    if (p2counter == 9) {
  
      var nextStepTl1 = anime.timeline({
        loop: false
    })
    nextStepTl1
    .add({
      targets: ".mainAni_changer",
        keyframes: [
          {
            scale: 0,
          },
          {
            scale: 0,
            backgroundColor: "rgba(0,0,0,0)",
          },
          {
            scale: 0.15,
            opacity: 0.1,
            duration: 0
          }
        ],
        duration: 1200,
        easing: "easeInOutBack"
    })
    .add ({
      targets: ".aniRock",
      scale: function() {
        return "0."+anime.random(55, 79);
      },
      translateX: function() {
        return anime.random(-200, 300)+"%"
      },
      translateY: function() {
        return anime.random(-100, 100)+"%"
      },
      delay: anime.stagger(100),
      opacity: 1,
      duration: 300,
      easing: "easeOutBack"
    })
    .add ({
      targets: ".aniRock",
      translateY: 700,
      scale: function() {
        return "0."+anime.random(81, 99);
      },
      delay: anime.stagger(60, {start: -600}),
      duration: 900,
      easing: "easeOutBounce"
    })
    .add ({
      targets: ".aniRock",
      translateY: -800,
      translateX: function() {
        return anime.random(-700, 800)+"%"
      },
      opacity: 0,
      delay: anime.stagger(60, {start: 600}),
      duration: 2000,
      easing: "easeInBounce",
      complete: function() {
        document.querySelectorAll(".aniRock").forEach(Element => {
          Element.remove();
        })
        let aniRockCounter = document.getElementsByClassName("aniRock").length;
        if (aniRockCounter <= 0) {
            p2counter = 0;
            mainbrickChanger_aniP1();
        }
      }
    })
  
  
    }
    
  }
  
  //start of ham nav functions
  
  function hamnav() {
    if (ham_OnFinish == true) {
       ham_OnFinish = false;
       hamNavOk();
    } else if (ham_OnFinish == false) {
       hamchecker.checked = ham_checkAgain;
       hamErr_anim();
    }
   }
   var ham_OnFinish = true;
   var ham_checkAgain = false;
   var hamchecker = document.querySelector('.NavHam_checkInput');
   document.querySelector('.NavHam_checkInput')
   .addEventListener('click', hamnav);
   
   //-----------------------------------------------------------
   function hamNavOk() {
   let hamClass = document.getElementById("hamsvg");
   switch (hamchecker.checked) {
    case true:
     ham_checkAgain = true;
     hamClass.classList.add('ham_active');
     hamnavOn()
     hamPlay_anim();
   break;
    case false:
     ham_checkAgain = false;
     hamClass.classList.remove('ham_active');
     hamnavOff()
     hamPlay_anim();
   break;
    default: 
     console.log('err');
     return hamErr_anim();
    }
   }
   //-----------------------------------------------------------
   function hamPlay_anim() {
       anime ({
        targets: '.ham_container',
        translateX: {value: 0, duration: 0},
        translateY: [
            {value: -6},
            {value: 4},
            {value: 0}
        ],
        scale: [
            {value: 0.8},
            {value: 0.9},
            {value: 1}
        ],
        duration: 300,
        easing: 'easeInOutBack',
        complete: function() {
           ham_OnFinish = true;  
        }
    });
   }
   //-----------------------------------------------------------
   function hamErr_anim() {
       anime ({
            targets: '.ham_container',
            translateX: [
                {value: -2},
                {value: 1},
                {value: -3},
                {value: 3},
                {value: -2},
                {value: 1},
                {value: 0}
            ],
            translateY: {value: 0, duration: 0},
            scale: {value: 1, duration: 0},
            duration: 350,
            easing: 'easeInOutBack'
        })
   }
  
  /*ham nav href's anim*/
  function hamnavOn() {
    anime({
      targets: '.mobile_navContainer',
      keyframes: [
        {translateY: 0, duration: 0},
        {opacity: 1},
      ],
      duration: 250,
      easing: 'linear'
    })
  }
  
  function hamnavOff() {
    anime({
      targets: '.mobile_navContainer',
      keyframes: [
        {opacity: 0},
        {translateY: -200, duration: 0},
      ],
      duration: 250,
      easing: 'linear'
    })
  }
  
  
   //end ham nav
   //-----------------------------------------------------------
   //-----------------------------------------------------------
   //-----------------------------------------------------------
  
   
  mainbrickChanger_aniP1()
  playBlobAni()
  playBackgroundAni();