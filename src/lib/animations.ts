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

export function animateChooseUsText() {
    animate('.choose-us-animate', {
        translate: '0px 0px',
        opacity: 1
    }, { duration: 0.5, delay: stagger(0.2) });
}

export function animateChooseUsCard(card: Element) {
    animate(card, {
        background: 'linear-gradient(to bottom right, #282828 0%, black 100%, #282828 0%)'
    })
}

export function reverseChooseUsCardAnimation(card: Element) {
    animate(card, {
        background: 'linear-gradient(to bottom right, #282828 1%, black, #282828)'
    });
}