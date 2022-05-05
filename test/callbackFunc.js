/* 
Callback function
A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

Here is a quick example:

*/

function greeting(name) {
    console.log('Hello ' + name);
  }
  
  function processUserInput(callback) {
    var name = console.log('Please enter your name.');
    callback(name);
  }
  
  processUserInput(greeting);