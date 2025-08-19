import { animate } from "motion/react";

const transition = {
        duration: 0.3,
        bounce: 0
    }

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
        backgroundColor: '#f5060a'
    })
}