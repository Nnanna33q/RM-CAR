import { animate, stagger } from "motion/react";

export function animateBars() {
    animate('.bar-1', {
        rotateZ: 45,
        y: '6px'
    })
    animate('.bar-2', {
        width: '25px',
        rotateZ: -45,
        y: '-5px',
        backgroundColor: '#ededed'
    })
}

export function resetBars() {
    animate('.bar-1', {
        rotateZ: 0,
        y: 0
    })
    animate('.bar-2', {
        width: '15px',
        rotateZ: 0,
        y: 0,
        backgroundColor: '#920101'
    })
}


// Too redundant, refactor later!

export function animateHero() {
    animate('.hero-animate', {
        translate: '0px 0px',
        opacity: 1
    }, { duration: 0.5, delay: stagger(0.2) });
}

export function animateChooseUsText() {
    animate('.choose-us-animate', {
        translate: '0px 0px',
        opacity: 1
    }, { duration: 0.5, delay: stagger(0.2) });
}

export function animateChooseUsCard(card: Element) {
    animate(card, {
        backgroundColor: 'rgb(0,0,0)',
        borderColor: 'none',
        boxShadow: '0px 11px 5px -1px rgba(0,0,0,0.59)'
    }, { duration: 0.3 })
}

export function reverseChooseUsCardAnimation(card: Element) {
    animate(card, {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: '#2F2F2F',
        boxShadow: 'none'
    }, { duration: 0.3 });
}

export function animateTrustedIcon() {
    const animationControls = animate('.carfront-fill', {
        top: -20,
        width: '10px',
        height: '10px'
    }, { duration: 0.8 })
    return animationControls;
}

export function reverseTrustedIcon() {
    animate('.carfront-fill', {
        top: 80,
        width: '40px',
        height: '40px'
    }, { duration: 0 })
}

export function animateCompetitiveIcon() {
    animate('.dollar-icon', {
        opacity: 1,
        top: 0
    }, { type: 'spring', bounce: 0.5, duration: 0.5 })
}

export function animateCertifiedIcon() {
    animate('.wrench-icon', {
        rotateZ: -90
    }, { duration: 0.5, type: 'spring', bounce: 0.3 })
}
export function animateExceptionalIcon() {
    const elem = document.querySelector('.conversation-icon')?.children[1];
    if (elem) {
        animate(elem, { x: 0 })
    }
}

export function animateTestimonialsText() {
    animate('.what-they-say-animate', {
        translate: '0px 0px',
        opacity: 1
    }, { duration: 0.5, delay: stagger(0.2) });
}

export function animateStars(card: Element, starCount: number) {
    const starsToAnimate = card.querySelectorAll('.testimonial-star');
    Array.from(starsToAnimate).slice(0, starCount).forEach((star, index) => {
        setTimeout(() => {
            animate(star, { color: '#920101' });
            star.classList.add('animate-pulse')
        }, index * 100)
    })
}

export function animateFaqText() {
    animate('.faq-text-animate', {
        translate: '0px 0px',
        opacity: 1
    }, { duration: 0.5, delay: stagger(0.2) });
}

export function animateFeaturedText() {
    animate('.featured-text-animate', {
        translate: '0px 0px',
        opacity: 1
    }, { duration: 0.5, delay: stagger(0.2) });
}

export function animateCarsCarousel() {
    animate('.cars-carousel-container', {
        translate: '0',
    }, { duration: 0.75 });
}

export function animateLocationText() {
    animate('.location-text-animate', {
        translate: '0px 0px',
        opacity: 1
    }, { duration: 0.5, delay: stagger(0.2) });
}

export function animateAboutUsText() {
    animate('.about-us-text-animate', {
        translate: '0px 0px',
        opacity: 1
    }, { duration: 0.5, delay: stagger(0.2) });
}

export function animateSwingByText() {
    animate('.swing-by-text-animate', {
        translate: '0px 0px',
        opacity: 1
    }, { duration: 0.5, delay: stagger(0.2) });
}

export function animateContactUsText() {
    animate('.contact-us-text-animate', {
        translate: '0px 0px',
        opacity: 1
    }, { duration: 0.5, delay: stagger(0.2) });
}