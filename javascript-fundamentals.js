
"use strict";

// 1. Arrow function with default parameters
const add = (a = 0, b = 0) => a + b;

// 2. Arrow function with a default name
const greet = (name = "Guest") => `Hello, ${name}!`;

// 3. Multiply two numbers
const multiply = (a, b) => a * b;

// 4. Find the square of a number
const square = number => number * number;

// 5. Rest operator: accept any number of values
const sumAll = (...numbers) =>
    numbers.reduce((total, number) => total + number, 0);

// 6. Rest operator: find the largest number
const findLargest = (...numbers) =>
    numbers.length ? Math.max(...numbers) : null;

// 7. Spread operator: combine arrays
const combineArrays = (first, second) => [...first, ...second];

// 8. Spread operator: copy and update an object
const updateUser = (user, changes) => ({ ...user, ...changes });

// 9. Format a user's name
const formatName = (first = "Unknown", last = "") =>
    `${first} ${last}`.trim();

// 10. Check whether a number is even
const isEven = number => number % 2 === 0;


// Display results from all 10 functions
document.querySelector("#run-functions").addEventListener("click", () => {
    const results = [
        `1. Add: ${add(10, 20)}`,
        `2. Greeting: ${greet("Nivetha")}`,
        `3. Multiply: ${multiply(4, 5)}`,
        `4. Square: ${square(6)}`,
        `5. Sum all: ${sumAll(1, 2, 3, 4, 5)}`,
        `6. Largest number: ${findLargest(12, 45, 7, 30)}`,
        `7. Combined arrays: ${JSON.stringify(
            combineArrays([1, 2], [3, 4])
        )}`,
        `8. Updated user: ${JSON.stringify(
            updateUser({ name: "Sam", age: 20 }, { age: 21 })
        )}`,
        `9. Full name: ${formatName("Nivetha", "S")}`,
        `10. Is 8 even? ${isEven(8)}`
    ];

    document.querySelector("#function-output").textContent =
        results.join("\n");
});


// Promise example using .then() and .catch()
document.querySelector("#promise-button").addEventListener("click", () => {
    const output = document.querySelector("#promise-output");
    output.textContent = "Loading user...";

    fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(user => {
            output.textContent =
                `Name: ${user.name}\nEmail: ${user.email}`;
        })
        .catch(error => {
            output.textContent = `Error: ${error.message}`;
            output.classList.add("error");
        });
});


// Async/await example using try/catch
document.querySelector("#async-button").addEventListener("click", async () => {
    const output = document.querySelector("#posts-output");
    output.textContent = "Loading posts...";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const posts = await response.json();
        output.replaceChildren();

        posts.forEach(post => {
            const article = document.createElement("article");
            article.className = "post";

            const heading = document.createElement("h3");
            heading.textContent = post.title;

            const paragraph = document.createElement("p");
            paragraph.textContent = post.body;

            article.append(heading, paragraph);
            output.appendChild(article);
        });
    } catch (error) {
        output.textContent =
            `Unable to load posts. Please try again. (${error.message})`;
        output.classList.add("error");
    }
});
