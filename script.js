// An array of image URL arrays, each sub-array represents a gallery of images
let imageGalleries = [
  ['images/gallery/decken/1.jpg', 'images/gallery/decken/2.jpg', 'images/gallery/decken/5.jpg', 'images/gallery/decken/6.jpg', 'images/gallery/decken/7.jpg', 'images/gallery/decken/8.jpg', 'images/gallery/decken/9.jpg', 'images/gallery/decken/10.jpg', 'images/gallery/decken/11.jpg', 'images/gallery/decken/12.jpg', 'images/gallery/decken/13.jpg', 'images/gallery/decken/14.jpg', 'images/gallery/decken/15.jpg', 'images/gallery/decken/16.jpg', 'images/gallery/decken/17.jpg', 'images/gallery/decken/18.jpg', ],
  ['images/gallery/wand/2.png', 'images/gallery/wand/3.jpg',],
  ['images/gallery/innen/1.jpg', 'images/gallery/innen/2.jpg', 'images/gallery/innen/3.jpg', 'images/gallery/innen/4.jpg', 'images/gallery/innen/5.jpg', 'images/gallery/innen/6.jpg', 'images/gallery/innen/7.jpg', 'images/gallery/innen/8.jpg', ]
];

// Variable to keep track of the current image index
let imageIndex = 0;

// An array to hold the current gallery images
let currentGallery = [];

// Variable to store touch start coordinates
let touchStartX = 0;

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

// Add an event listener to each '.service' div
// When clicked, it opens the corresponding image gallery in the lightbox
serviceDivs.forEach((serviceDiv, index) => {
  const overlayText = serviceDiv.querySelector('.overlay-text');
  const serviceImage = serviceDiv.querySelector('img');
  
  serviceDiv.addEventListener("click", (e) => {
    currentGallery = imageGalleries[index];
    openLightbox();
  });
});

// Function to open the lightbox
function openLightbox() {
  lightbox.style.display = 'flex'; // Show the lightbox by setting display to 'flex'
  changeImage(0); // Display the first image in the gallery

  // Show loading indicator
  showLoadingIndicator();

  // Create a 'button' for the left arrow, add a click event handler to it, and append it to the lightbox
  let leftArrow = document.createElement('button');
  leftArrow.id = 'leftArrow';
  leftArrow.innerHTML = '&#10094;';
  leftArrow.addEventListener('click', () => {
    navigate(-1); // Navigate to previous image
  });
  lightbox.appendChild(leftArrow);

  // Create a 'button' for the right arrow, add a click event handler to it, and append it to the lightbox
  let rightArrow = document.createElement('button');
  rightArrow.id = 'rightArrow';
  rightArrow.innerHTML = '&#10095;';
  rightArrow.addEventListener('click', () => {
    navigate(1); // Navigate to next image
  });
  lightbox.appendChild(rightArrow);

  // Event listener to close lightbox when clicked outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Event listener to close lightbox on ESC key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigate(-1); // Navigate to previous image on left arrow press
    } else if (e.key === 'ArrowRight') {
      navigate(1); // Navigate to next image on right arrow press
    }
  });

  // Event listeners for touch events to handle swipe gestures on mobile devices
  lightbox.addEventListener('touchstart', handleTouchStart, false);
  lightbox.addEventListener('touchmove', handleTouchMove, false);
}

// Function to handle touch start event
function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

// Function to handle touch move event
function handleTouchMove(event) {
  if (!touchStartX) {
    return;
  }

  let touchEndX = event.touches[0].clientX;
  let touchDiff = touchStartX - touchEndX;

  // Threshold for swipe detection
  if (Math.abs(touchDiff) > 50) {
    if (touchDiff > 0) {
      navigate(1); // Swipe left, navigate to next image
    } else {
      navigate(-1); // Swipe right, navigate to previous image
    }
    touchStartX = 0; // Reset touch start position
  }
}

// Function to close the lightbox
function closeLightbox() {
  lightbox.style.display = 'none'; // Hide the lightbox by setting display to 'none'
  thumbnailContainer.innerHTML = ''; // Clear the thumbnails
}

// Function to navigate between images
function navigate(direction) {
  imageIndex = (imageIndex + direction + currentGallery.length) % currentGallery.length;
  changeImage(imageIndex); // Display the new image
}

// Function to show loading indicator
function showLoadingIndicator() {
  // Create a loading indicator element
  const loadingIndicator = document.createElement('div');
  loadingIndicator.id = 'loadingIndicator';
  loadingIndicator.innerHTML = 'Wird geladen...'; // You can customize the loading text here
  lightbox.appendChild(loadingIndicator);
}

// Function to hide loading indicator
function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById('loadingIndicator');
  if (loadingIndicator) {
    loadingIndicator.remove(); // Remove the loading indicator element
  }
}

// Function to change the main image and the thumbnails in the lightbox
function changeImage(index) {
  imageIndex = index; // Update the current image index
  mainImage.src = currentGallery[imageIndex]; // Change the source of the main image

  // When main image is loaded, hide the loading indicator
  mainImage.onload = () => {
    hideLoadingIndicator();
  };

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
  window.open('https://www.instagram.com/robrol_gmbh/');
}