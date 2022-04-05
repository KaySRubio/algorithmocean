





/* longer readline demo
const readline = require("readline"); // import readline module

// create an interface rl to use readline
const rl = readline.createInterface({
    // create an object so it knows what is input/output
    input: process.stdin,
    output: process.stdout
});

const questions = [
    "What is your name? ",
    "Where do you live? ",
    "What are you going to do with node js "
];

// define function that takes an array of questions
// and a callback function to invoke when it's finished
// arrow function just points to the functon's body
const collectAnswers = (questions, done) => {
    const answers = [];
    // destructure array of questions
    const [question1] = questions;

    const questionAnswered = answer => {
        answers.push(answer); // push anser into answer array
        // if there are still more questions, ask the next
        if (answers.length < questions.length) {
            rl.question(questions[answers.length], questionAnswered);
        } else {
            done(answers);
        }
    }

    rl.question(question1, questionAnswer);

    // done(answers); // once we're recieved all the answers
    // send them back to the callback function
}

// function call with parameter answers, and second parameter is
// a callback function to return a list of answers
collectAnswers(questions, answers => {
    console.log("Thank you for answers. ");
    console.log(answers);
    process.exit();
});
*/

/* Readline demo
const readline = require("readline"); // import readline module

// create an interface rl to use readline
const rl = readline.createInterface({
    // create an object so it knows what is input/output
    input: process.stdin,
    output: process.stdout
});

// call the interface's question function
// first argument is a string
// second argument specifies that the answer
// will lead to logging it. It's asynchronous, waits for 
// the user to enter the answer before invoking the callback func
rl.question("How do you like Node ", answer => {
    console.log(`Your answer: ${answer}`);
});
*/


/* 
console.log("hello world");

const path = require("path");
const dirUploads = path.join(__dirname, "www", "files", "uploads");


console.log(process.pid);

console.log(process.versions.node);
console.log(__dirname);
console.log(__filename);

console.log(process.argv);

const questions = [
    "what is your name?",
    "what would you rather be doing?",
    "what programming language do you like?"
];

// print the first question to the screen
const ask = (i = 0) => {
    process.stdout.write(`\n\n\n ${questions[i]}`);
    process.stdout.write(` > `);
};

ask();

// empty array for the answers
const answers = [];
// process.stdin.on is a listener which takes data from the keyboard and puts it in "data"
process.stdin.on("data", data => {
    // This line will push the answer to the answers array
    answers.push(data.toString().trim());

    // ask the next question or exit if there are no more questions
    if(answers.length < questions.length) {
        ask(answers.length);
    } else {
        process.exit();
    }
});

// process.on('exit') is a handler that will run when the process exits
process.on("exit", () => {
    // destructure answers array to get invidiual answers
    const [name, activity, lang] = answers;

    console.log(`Go ${activity} ${name} you can write in ${lang} later.`)
    
});

// create a wait time in ms
const waitTime = 5000;
// log something immediately
console.log(`setting a ${waitTime / 1000} second delay`);
// create a function that will run when teh timer is done

// Create a wait interval. 500 ms is half a second
const waitInterval = 500;
let currentTime = 0;

// print the time they've been waiting
const incTime = () => {
    currentTime += waitInterval;
    const p = Math.floor((currentTime/waitTime) * 100);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`waiting... ${p}%`);
}

// call the method to print the time they'be been waiting every 500ms
// setInterval will call the function over and over every # of seconds specified in second argument
// store the function in a variable so it can be cleared
const interval = setInterval(incTime, waitInterval);

// Create a method for when the 5000 ms timer finished
const timerFinished = () => {
    // when the timer finishes, clear the prior output and log done
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log("Done");
    clearInterval(interval); // clear the interval so it stops running every 500ms
}
// use the setTimeout method to call the function after the wait time is over
setTimeout(timerFinished, waitTime);
*/


