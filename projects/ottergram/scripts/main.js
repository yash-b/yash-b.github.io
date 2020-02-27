var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var ESC_KEY = 27;
var preButton = document.querySelector("#previous-button");
var nextButton = document.querySelector("#next-button");
var currentIndex = 0;
var thumbLength;  

function setDetails(imageUrl, titleText) {
  'use strict';

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail){
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail){
  'use strict';
  var title = thumbnail.getAttribute('data-image-title');
  console.log(title);  // show log in console to check if it work
  return title;
  // return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail){
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb, index){
  'use strict';
  thumb.addEventListener('click', function (event){
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
    currentIndex = index;
    console.log('Current index: ' + currentIndex);
  });
}

function getThumbnailsArray(){
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailsArray = [].slice.call(thumbnails);
  return thumbnailsArray;
}

// use the classList.add DOM method to manipulate the class name
function hiddenDetails(){
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

// keyCode is an integer, like 13 for Return, 32 for the space bar, and 38 for the up arrow.
function addKeyPressHandler(){
  'use strict';
  document.body.addEventListener('keyup', function (event){
    event.preventDefault();
    console.log(event.keyCode);
    if(event.keyCode === ESC_KEY){
      hiddenDetails();
    }
  });
}

function showDetails(){
  'use strict';
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
}

function preButtonClick(thumbnails){
  'use strict';
  preButton.addEventListener("click", function(event){
    event.preventDefault();
    if(currentIndex === 0){
      currentIndex = thumbLength - 1;
    }
    else {
      currentIndex--;
    }
    setDetailsFromThumb(thumbnails[currentIndex]);
  });
}

// cycle forth through thumbnails
function nextButtonClick(thumbnails){
  'use strict';
  nextButton.addEventListener("click", function(event){
    event.preventDefault();
    if(currentIndex === thumbLength - 1){
      currentIndex = 0;
    }
    else {
      currentIndex++;
    }
    setDetailsFromThumb(thumbnails[currentIndex]);
  });
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbLength = thumbnails.length; // get thumnails length
  thumbnails.forEach(addThumbClickHandler); //addThumbClickHandler(thumbnails[1]);
  addKeyPressHandler();
  preButtonClick(thumbnails);
  nextButtonClick(thumbnails);
}

initializeEvents();