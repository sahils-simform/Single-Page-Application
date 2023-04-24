/* eslint-disable no-console */
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelector(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnScrollTo = document.querySelector(".view-more");
const sectionDepartment = document.querySelector("#section-2");
const nav = document.querySelector("nav");

// Get In Touch Window

const openModal = (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

const closeModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown" , (e) => {
    if(e.key === "Escape" && !modal.classList.contains("hidden")){
        closeModal();
    }
})

overlay.addEventListener("click", () => {
    if(!modal.classList.contains("hidden")){
      closeModal();
    }
});

// page scrolling to

btnScrollTo.addEventListener("click", (e) => {
    const coords = sectionDepartment.getBoundingClientRect();
    console.log(coords);

    console.log(e.target.getBoundingClientRect());

    // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

    // console.log(
    //     'height/width viewport',
    //     document.documentElement.clientHeight,
    //     document.documentElement.clientWidth
    //   );
    sectionDepartment.scrollIntoView({ behavior: "smooth" });

});


// page navigation

const navLinks = document.querySelector(".nav-links").addEventListener("click", (e) =>{
    e.preventDefault();

    if(e.target.classList.contains("nav-link")){
        const id1 = e.target.getAttribute("href");
        document.querySelector(id1).scrollIntoView({behavior: "smooth"});
    }
});

console.log(navLinks);


// for Sticky Navigation

const header = document.querySelector("header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNavbar = (entries) => {
    const [entry] = entries;
    console.log(entry);

    if(!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNavbar, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
})

headerObserver.observe(header);


// reveal sections
const allSections = document.querySelectorAll('section');
console.log(allSections);
console.log();
const revealSection =  (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});




// slider

    const slider =  () => {
            const slides = document.querySelectorAll('.slide');
            const btnLeft = document.querySelector('.slider-btn--left');
            const btnRight = document.querySelector('.slider-btn--right');
            const sliderElement = document.querySelector(".slider")
            const dotContainer = document.querySelector('.dots');

            let curSlide = 0;
            const maxSlide = slides.length;

            // const goToSlide = (slide) => {
            //     slides.forEach((s, i) => {
            //         // (s.style.transform = `translateX(${50 * (i - slide)}%)`)}
            //         );
            //     };

            const createDots =  () => {
                    slides.forEach( (_, i) => {
                        dotContainer.insertAdjacentHTML(
                        'beforeend',
                        `<button class="dots__dot" data-slide="${i}"></button>`
                        );
                    });
                    };
            createDots();

            const activateDot = (slide) => {
            document
                .querySelectorAll('.dots__dot')
                .forEach(dot => dot.classList.remove('dots__dot--active'));
        
            document
                .querySelector(`.dots__dot[data-slide="${slide}"]`)
                .classList.add('dots__dot--active');
            };

            const goToSlide = (isNext) =>{
                // console.log("Here");
                // console.log(sliderElement);
                // console.log(sliderElement.scrollLeft);
                // console.log(slides[0].clientWidth);
                sliderElement.scrollLeft += isNext ? +slides[0].clientWidth + 15 : -slides[0].clientWidth - 15 ;
            }
                
            const nextSlide =  () =>{
                if (curSlide === maxSlide - 1) {
                    curSlide = 0;
                } else {
                    curSlide+=1;
                }
                //  goToSlide(curSlide);
                 goToSlide(true);
                 activateDot(true);
            }

            const prevSlide = () => {
                    if (curSlide === 0) {
                        curSlide = maxSlide - 1;
                    } else {
                        curSlide-=1;
                    }
                    goToSlide(false);
                    activateDot(false);
                
            };
            
            // const init = () => {
            //         // goToSlide(0);
                
                    
            //         };
            //         init();

                    btnRight.addEventListener('click', nextSlide);
                    btnLeft.addEventListener('click', prevSlide);        
                    dotContainer.addEventListener('click', (e) => {
                            if (e.target.classList.contains('dots__dot')) {
                                const { slide } = e.target.dataset;
                                console.log("here");
                                goToSlide(slide);
                                activateDot(slide);                                                                                
                            }
                            });
    }
    slider();
























// const slider =  () => {
//     const slides = document.querySelectorAll('.slide');
//     const btnLeft = document.querySelector('.slider-btn--left');
//     const btnRight = document.querySelector('.slider-btn--right');
//     const dotContainer = document.querySelector('.dots');

//     let curSlide = 0;
//     const maxSlide = slides.length;

//     // Functions
//     const createDots =  () => {
//     slides.forEach( (_, i) => {
//         dotContainer.insertAdjacentHTML(
//         'beforeend',
//         `<button class="dots__dot" data-slide="${i}"></button>`
//         );
//     });
//     };

//     const activateDot = (slide) => {
//     document
//         .querySelectorAll('.dots__dot')
//         .forEach(dot => dot.classList.remove('dots__dot--active'));

//     document
//         .querySelector(`.dots__dot[data-slide="${slide}"]`)
//         .classList.add('dots__dot--active');
//     };

//     const goToSlide = (slide) => {
//     slides.forEach((s, i) => {
//         (s.style.transform = `translateX(${100 * (i - slide)}%)`)}
//     );
//     };

//     // Next slide
//     const nextSlide =  () =>{
//     if (curSlide === maxSlide - 1) {
//         curSlide = 0;
//     } else {
//         curSlide+=1;
//     }

//     goToSlide(curSlide);
//     activateDot(curSlide);
//     };

//     const prevSlide = () => {
//     if (curSlide === 0) {
//         curSlide = maxSlide - 1;
//     } else {
//         curSlide-=1;
//     }
//     goToSlide(curSlide);
//     activateDot(curSlide);
//     };

//     const init = () => {
//     goToSlide(0);
//     createDots();

//     activateDot(0);
//     };
//     init();

//     // Event handlers
//     btnRight.addEventListener('click', nextSlide);
//     btnLeft.addEventListener('click', prevSlide);

//     document.addEventListener('keydown',  (e) => {
//     if (e.key === 'ArrowLeft') prevSlide();
//     else if (e.key === 'ArrowRight') nextSlide();
//     });

//     dotContainer.addEventListener('click', (e) => {
//     if (e.target.classList.contains('dots__dot')) {
//         const { slide } = e.target.dataset;
//         goToSlide(slide);
//         activateDot(slide);                                                                                
//     }
//     });
// };                                                                                                             
// slider();
    
                                              