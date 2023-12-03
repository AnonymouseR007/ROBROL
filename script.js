// An array of image URL arrays, each sub-array represents a gallery of images
let imageGalleries = [
  ['https://w-d.ch/wp-content/uploads/2023/02/Scott_Givisiez_1.jpg', 'images/gallery/1.jpg', 'images/gallery/2.jpg', 'images/gallery/3.jpg'],
  ['https://images.squarespace-cdn.com/content/v1/56ba2d3737013b3ea923659c/1626359597603-9Q77VJ5YU5ARQ3RP3F6B/Raumakustik_Schallschutz_Bellton+AG_Echopanel_PET-Recycling_5.jpg?format=750w', 'images/gallery/4.jpg', 'images/gallery/5.jpg', 'images/gallery/6.jpg'],
  ['https://www.aimgmbh.ch/images/Slider/Innenausbau/innenausbau_02.jpg', 'images/gallery/7.jpg', 'images/gallery/8.jpg', 'images/gallery/9.jpg']
];

// Variable to keep track of the current image index
let imageIndex = 0;

// An array to hold the current gallery images
let currentGallery = [];

// Create a new 'div' for lightbox and append it to the body of the document
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

// Create a 'button' to close the lightbox and append it to the lightbox div
const closeBtn = document.createElement('button');
closeBtn.innerHTML = '&times;';
closeBtn.id = 'closeBtn';
closeBtn.onclick = closeLightbox;
lightbox.appendChild(closeBtn);

// Create an 'img' element for the main image in the lightbox and append it to the lightbox div
const mainImage = document.createElement('img');
mainImage.id = 'mainImage';
lightbox.appendChild(mainImage);

// Create a 'div' for the thumbnail container and append it to the lightbox div
const thumbnailContainer = document.createElement('div');
thumbnailContainer.id = 'thumbnailContainer';
lightbox.appendChild(thumbnailContainer);

// Select all the '.service' divs
const serviceDivs = document.querySelectorAll(".service");

// Add an event listener to the 'img' tag inside each '.service' div
// When the image is clicked, it opens the corresponding image gallery in the lightbox
serviceDivs.forEach((serviceDiv, index) => {
  serviceDiv.querySelector('img').addEventListener("click", (e) => {
    e.stopPropagation();
    currentGallery = imageGalleries[index];
    openLightbox();
  });
});

// Function to open the lightbox
function openLightbox() {
  lightbox.style.display = 'flex'; // Show the lightbox by setting display to 'flex'
  changeImage(0); // Display the first image in the gallery

  // Create a 'button' for the left arrow, add a click event handler to it, and append it to the lightbox
  let leftArrow = document.createElement('button');
  leftArrow.id = 'leftArrow';
  leftArrow.innerHTML = '&#10094;';
  leftArrow.addEventListener('click', () => {
    imageIndex = (imageIndex - 1 + currentGallery.length) % currentGallery.length; // Calculate the previous image index
    changeImage(imageIndex); // Display the previous image
  });
  lightbox.appendChild(leftArrow);

  // Create a 'button' for the right arrow, add a click event handler to it, and append it to the lightbox
  let rightArrow = document.createElement('button');
  rightArrow.id = 'rightArrow';
  rightArrow.innerHTML = '&#10095;';
  rightArrow.addEventListener('click', () => {
    imageIndex = (imageIndex + 1) % currentGallery.length; // Calculate the next image index
    changeImage(imageIndex); // Display the next image
  });
  lightbox.appendChild(rightArrow);
}

// Function to close the lightbox
function closeLightbox() {
  lightbox.style.display = 'none'; // Hide the lightbox by setting display to 'none'
  thumbnailContainer.innerHTML = ''; // Clear the thumbnails
}

// Function to change the main image and the thumbnails in the lightbox
function changeImage(index) {
  imageIndex = index; // Update the current image index
  mainImage.src = currentGallery[imageIndex]; // Change the source of the main image
  thumbnailContainer.innerHTML = ''; // Clear the thumbnails
  // Create new thumbnails for each image in the current gallery
  currentGallery.forEach((imgSrc, index) => {
    let thumbnail = document.createElement('img');
    thumbnail.src = imgSrc;
    thumbnail.className = 'thumbnail';
    thumbnail.onclick = () => changeImage(index); // Add a click event handler to change the main image when a thumbnail is clicked
    thumbnailContainer.appendChild(thumbnail); // Append the thumbnail to the thumbnail container
  });
}



// JavaScript pre funkciu scrollToTop()
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// JavaScript pre funkciu scrollToSection()
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: 'smooth'
  });
}

// JavaScript pre funkciu openInstagramPage()
function openInstagramPage() {
  // Pridajte skutočný odkaz na vašu stránku Instagramu
  window.open('https://www.instagram.com/');
}