/*
	Date Created: 28 November 2020
    Last Change: 28 November 2020
    Author: Ishaan Ohri
    Description: Contains the script for the typewriter effect
*/

var app = document.getElementById('typewriter');

var typewriter = new Typewriter(app, {
    strings : ['Full Stack Developer','DevOps Enthusiast', 'Android App Developer', 'Tech Blogger'],
    autoStart: true,
    loop: true
});