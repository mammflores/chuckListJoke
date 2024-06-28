document.addEventListener("DOMContentLoaded", () => {
    const jokeList = document.getElementById("jokeList");
    const fetchJokeBtn = document.getElementById("fetchJoke");

    loadJokesFromStorage();
  
    fetchJokeBtn.addEventListener("click", async () => {
      try {
        const joke = await fetchJoke();
        addJokeToList(joke);
        saveJokesToStorage();
      } catch (error) {
        console.error("errorrrr:", error);
      }
    });
  
    async function fetchJoke() {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();
      return data.value; 
    }

    function addJokeToList(joke) {
      const li = document.createElement("li");
      li.textContent = joke;
      jokeList.appendChild(li);
    }
  
    function saveJokesToStorage() {
      const jokes = Array.from(jokeList.children).map(li => li.textContent);
      localStorage.setItem("chuckNorrisJokes", JSON.stringify(jokes));
    }
  
    function loadJokesFromStorage() {
      const jokes = JSON.parse(localStorage.getItem("chuckNorrisJokes")) || [];
      jokes.forEach(joke => addJokeToList(joke));
    }
  });
  
