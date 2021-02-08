const auth = '563492ad6f917000010000018bd170f4c7bd4c3d9e276161cd11ad31';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink = "";
let currentSearch;

//EVENT LISTENERS
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener('click', loadMore);

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
    <div class='gallery-info'>
    <p>${photo.photographer}</p>
    <a href=${photo.src.original}>Full Size</a>
    </div>
    `;
    gallery.appendChild(galleryImg);
  })
} 

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function searchPhotos(query){
  //empty gallery
  clear();
  //repopulate gallery using search term
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

//empties gallery
function clear() {
  gallery.innerHTML = '';
  searchInput.value = '';
}

async function loadMore() {
  //increase page number
  page++;
  //check to see if there is a current search
  if (currentSearch) {
    //if so, load more search results
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    //if not, load more featured images
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();

