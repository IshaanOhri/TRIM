/*
	Date Created: 28 November 2020
    Last Change: 28 November 2020
    Author: Ishaan Ohri
    Description: Contains the script for the typewriter effect
*/

var app = document.getElementById('typewriter');

var typewriter = new Typewriter(app, {
    strings : ['Secure','Reliable', 'Easy to use', 'Free'],
    autoStart: true,
    loop: true
});