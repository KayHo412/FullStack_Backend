const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999 },
  { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019 },
];

// Default route - Displays all movies as HTML list
app.get("/", (req, res) => {
  let movieList = "<h1>Movie Collection</h1><ul>";
  movies.forEach((movie) => {
    movieList += `<li>${movie.title} (Director: ${movie.director}, Year: ${movie.year})</li>`;
  });
  movieList += "</ul>";
  res.send(movieList);
});

// GET /movies - List all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

// POST /movies - Add a new movie
app.post("/movies", (req, res) => {
  const newMovie = {
    id: movies.length + 1,
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// GET /movies/:id - Get a movie by its id
app.get("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === movieId);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send("Movie not found");
  }
});

// DELETE /movies/:id - Delete a movie by its id
app.delete("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex !== -1) {
    const deletedMovie = movies.splice(movieIndex, 1);
    res.status(200).json({ message: "Movie deleted", deletedMovie });
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

// PUT /movies/:id - Update a movie by its id
app.put("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex !== -1) {
    movies[movieIndex] = {
      id: movieId,
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
    };
    res
      .status(200)
      .json({ message: "Movie updated", movie: movies[movieIndex] });
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
