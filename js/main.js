'use strict'

var gBalloons = []
var gCount=0
var countBalloons = 15
var gIntervalId
var gIdNext = 1
function onInit() {
    gBalloons= createBalloons(countBalloons)
    renderBalloons()
}

function createBalloons(countBalloons) {
    for (var i = 0; i < countBalloons; i++) {
        gBalloons.push(createBalloon(gIdNext, 0, 10))
    }
    return gBalloons
}
function createBalloon(id, bottom, speed = 10) {
    return {
        id: gIdNext++,
        bottom: 0,
        speed: getRandomInt(30,80)
    }
}

function onStart() {
    gIntervalId = setInterval(moveBalloons, 500)
    playSoundbackground()
}
function renderBalloons() {
    var strHTML = ''
    for (var i = 0; i < gBalloons.length; i++) {
        var left = 100 * i
        var color = getRandomColor()
        strHTML +=
            `<div style="background-color:${color}; left:${left}px;"
        onclick="pop(this)"class="balloon"></div>`
    }
    var elBalloon = document.querySelector('.sky')
    elBalloon.innerHTML = strHTML
  
}

function speedUp(balloonIdx) {
    var balloon = gBalloons[balloonIdx]
    balloon.speed += 10
}

function moveBalloons() {
    var elBalloons = document.querySelectorAll('.balloon')
    for (var i = 0; i < gBalloons.length; i++) {
        var balloon = gBalloons[i]
        var elBalloon = elBalloons[i]
        balloon.bottom += balloon.speed
        elBalloon.style.bottom = balloon.bottom + 'px'

    }
}
function pop(elBalloon) {
    elBalloon.style.opacity = 0
    playSound()
    gCount++
    var elRes=document.querySelector('h3')
    elRes.innerText='Result:'+gCount ///to check if right !!!!!!!!!!!!!!!!!!!!!!!! 
   // localStorage.setItem('res',elRes.innerText) //how to save this in local storage /

}
function playSound() {
    var sound = new Audio('pop.wav')
    sound.play()
}
function playSoundbackground() {
    var sound = new Audio('bs.wav')
    sound.play()
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }