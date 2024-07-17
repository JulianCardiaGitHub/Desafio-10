import './style.css';

async function obtenerChiste() {
  try {
    const respuesta = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!respuesta.ok) {
      throw new Error('Error en la solicitud: ' + respuesta.statusText);
    }

    const datos = await respuesta.json();

    document.getElementById('chiste').innerText = datos.joke;
  } catch (error) {
    console.error('Error al obtener el chiste:', error);
    document.getElementById('chiste').innerText =
      'Error al cargar el chiste. Intenta nuevamente.';
  }
}

window.onload = obtenerChiste;


//!-----------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const postList = document.getElementById('post-list');

  fetch('https://jsonplaceholder.typicode.com/posts/')
      .then(response => response.json())
      .then(posts => {
          posts.forEach(post => {
              const listItem = document.createElement('li');
              const title = document.createElement('h2');
              const excerpt = document.createElement('p');

              title.textContent = post.title;
              excerpt.textContent = post.body.substring(0, 100) + '...';

              listItem.appendChild(title);
              listItem.appendChild(excerpt);
              postList.appendChild(listItem);
          });
      })
      .catch(error => {
          console.error('Error fetching posts:', error);
      });
});

//!----------------------------------------------------------------------------------------------



let url = 'http://www.omdbapi.com/'

document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const movieTitle = document.getElementById('movieTitle').value;
  fetchMovies(movieTitle);
});

function fetchMovies(title) {
  
  const armarurl = url + `?s=${title}&apikey=${import.meta.env.VITE_API_KEY2}`;

  fetch(armarurl)
      .then(response => response.json())
      .then(data => {
          if (data.Response === "True") {
              displayResults(data.Search);
          } else {
              displayError(data.Error);
          }
      })
      .catch(error => {
          console.error('Error fetching the movies:', error);
      });
}

function displayResults(movies) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');
      
      const moviePoster = movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg';
      
      movieElement.innerHTML = `
          <img src="${moviePoster}" alt="${movie.Title}">
          <div class="movie-info">
              <h2>${movie.Title}</h2>
              <p>${movie.Year}</p>
          </div>
      `;
      resultsDiv.appendChild(movieElement);
  });
}

function displayError(message) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `<p>${message}</p>`;
}

//!---------------------------------------------------------------------------------------------------------


let url2 = 'https://api.unsplash.com/search/photos/'


document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('search-query').value;
  
  const armourl = url2 + `?s=${query}&apikey=${import.meta.env.VITE_API_KEY1}`;

  fetch(armourl)
      .then(response => response.json())
      .then(data => {
          const resultadoContainer = document.getElementById('results');
          resultadoContainer.innerHTML = '';

          data.results.forEach(photo => {
              const img = document.createElement('img');
              img.src = photo.urls.small;
              img.alt = photo.alt_description || 'Unsplash Image';
              resultadoContainer.appendChild(img);
          });

          if (data.results.length === 0) {
              const errorElement = document.createElement('p');
              errorElement.textContent = 'No se encontraron imágenes.';
              resultadoContainer.appendChild(errorElement);
          }
      })
      .catch(error => {
          console.error('Error fetching images:', error);
      });
});
