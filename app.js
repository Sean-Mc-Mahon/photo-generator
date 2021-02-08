const auth = '563492ad6f917000010000018bd170f4c7bd4c3d9e276161cd11ad31';
const gallery = document.querySelector('.gallery');
const searchInp = document.querySelector('.search-input');
const submitButton = document.querySelector('.submit-btn');
let searchValue;


async function curatedPhotos() {
  //fetch curated photos from pexels
  const dataFetch = await fetch('https://api.pexels.com/v1/curated', 
    {
      method: 'GET',
      //specify json format
      headers: {
        Accept: 'application/json',
        //pass in authorization key defined in global
        Authorization: auth
      }
    }
  );
  const data = await dataFetch.json();
  data.photos.forEach(photo => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `<img src= ${photo.src.large}></img>
    <p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  })
}

curatedPhotos();

