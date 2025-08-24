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
        backgroundColor: 'rgb(0,0,0)',
        // borderColor: '#696969',
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
    animate('.carfront-fill', {
        top: -20,
        width: '10px',
        height: '10px'
    }, { duration: 0.8 })
}

export function reverseTrustedIcon() {
    animate('.carfront-fill', {
        top: 80,
        width: '40px',
        height: '40px'
    }, { duration: 0 })
}