(() => {
    const movieBox = document.querySelector("#movie-box");
    const reviewTemplate = document.querySelector("#review-template");
    const reviewCon = document.querySelector("#review-con");
    const baseURL = "https://swapi.dev/api/";

    // Function
    function getMovies() {
        fetch(`${baseURL}people/`)
            .then(response => response.json())
            .then(function (response) {
                const characters = response.results.slice(0, 10);  // Fetch first 10 characters
                const ul = document.createElement("ul");

                characters.forEach((character) => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.textContent = character.name;  
                    a.dataset.review = JSON.stringify(character.films);  
                    li.appendChild(a);
                    ul.appendChild(li);
                });

                movieBox.appendChild(ul);
            })
            .then(function () {

                const links = document.querySelectorAll("#movie-box li a");
                links.forEach(function (link) {
                    link.addEventListener("click", getReview);
                });
            })
            .catch(function (err) {
                console.error("Error fetching movies:", err);
            });
    }

    function getReview(e) {
        e.preventDefault();  
        const movieURLs = JSON.parse(e.currentTarget.dataset.review);

        if (movieURLs.length > 0) {
            fetch(movieURLs[0])  
                .then(response => response.json())
                .then(function (movie) {
                    reviewCon.innerHTML = "";  

                    const clone = reviewTemplate.content.cloneNode(true);
                    const reviewHeading = clone.querySelector(".review-heading");
                    const reviewDescription = clone.querySelector(".review-description");

                    
                    reviewHeading.textContent = movie.title;  
                    reviewDescription.textContent = movie.opening_crawl;  

                    
                    const posterMap = {
                        "A New Hope": "images/a-new-hope.jpg",
                        "The Empire Strikes Back": "images/empire-strikes-back.jpg",
                        "Return of the Jedi": "images/return-of-the-jedi.jpg",
                        "The Phantom Menace": "images/the-phantom-menace.jpg",
                        "Attack of the Clones": "images/attack-of-the-clones.jpg",
                        "Revenge of the Sith": "images/revenge-of-the-sith.jpg",
                        "The Force Awakens": "images/the-force-awakens.jpg"
                    };

                    const moviePoster = clone.querySelector(".movie-poster");
                    moviePoster.src = posterMap[movie.title] || "images/default-poster.jpg";

                    reviewCon.appendChild(clone);
                })
                .catch(function (err) {
                    reviewCon.innerHTML = "<p>Unable to load review details.</p>";
                    console.error("Error fetching review details:", err);
                });
        } else {
            reviewCon.innerHTML = "<p>No reviews available for this movie.</p>";
        }
    }

    // Initialize movie fetch
    getMovies();
})();
