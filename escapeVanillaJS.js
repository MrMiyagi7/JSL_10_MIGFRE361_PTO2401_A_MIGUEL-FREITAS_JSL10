document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("solveRoom1").addEventListener("click", () => {
    fetch("books.json")
      .then((response) => response.json())
      .then((books) => {
        const mostRecentBook = findMostRecentBook(books);
        document.getElementById(
          "room1Result"
        ).textContent = `The key to the next room is: ${mostRecentBook.title}`;
      });
  });

  document.getElementById("solveRoom2").addEventListener("click", () => {
    const jsConcepts = new Set(["closure", "scope", "hoisting", "async"]);
    const reactConcepts = new Set(["components", "jsx", "hooks", "async"]);

    const commonConcepts = findIntersection(jsConcepts, reactConcepts);
    document.getElementById(
      "room2Result"
    ).textContent = `The code to unlock the door is: ${Array.from(
      commonConcepts
    ).join(", ")}`;
  });

  document.getElementById("solveRoom3").addEventListener("click", () => {
    fetch("directions.json")
      .then((response) => response.json())
      .then((directions) => {
        navigateLabyrinth(directions).then((message) => {
          document.getElementById("room3Result").textContent = message;
        });
      });
  });
});

function findMostRecentBook(books) {
  return books.reduce((mostRecent, book) =>
    new Date(book.published) > new Date(mostRecent.published)
      ? book
      : mostRecent
  );
}

function findIntersection(setA, setB) {
  const intersection = new Set();
  for (const element of setA) {
    if (setB.has(element)) {
      intersection.add(element);
    }
  }
  return intersection;
}

async function navigateLabyrinth(directions) {
  for (let direction of directions) {
    const li = document.createElement("li");
    li.innerHTML = `Navigating: ${direction.step} <span class="loading-circle"></span>`;
    document.getElementById("directions").appendChild(li);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const loadingCircle = li.querySelector(".loading-circle");
    loadingCircle.remove();
    li.innerHTML += `<span class="tick">✔️</span>`;
  }

  return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}
