const auth = '563492ad6f917000010000018bd170f4c7bd4c3d9e276161cd11ad31';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;

//EVENT LISTENERS
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
})

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
      //specify json format
      headers: {
        Accept: 'application/json',
        //pass in authorization key defined in global
        Authorization: auth
      }
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach(photo => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `<img src= ${photo.src.large}></img>
    <p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  })
} 

async function curatedPhotos() {
  const data = await fetchApi('https://api.pexels.com/v1/curated')
  generatePictures(data);
}

async function searchPhotos(query){
  const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`)
  generatePictures(data);
}

curatedPhotos();

