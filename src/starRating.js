import $ from 'jquery';
import imgStarFilled from './images/star-filled.png';
import imgStarEmpty from './images/star-empty.png';

const FILLED_STAR_ALT = 'Filled Rating Star';
const EMPTY_STAR_ALT = 'Empty Rating Star';

const store = {
  currentRating: 0,
};

/**
 * Displays a read only star rating
 * 
 * @param {number} maxStars The number of stars in the rating system 
 * @param {number} rating The current star rating
 * 
 * @returns A series of html <span> elements of star images with @rating filled in and empty stars for the remainder up to @maxStars
 */
function getRatingDisplay(maxStars, rating) {
  let starRating = '';  // let starRating = '<div .starRatingContainer>' include div wrapper or let caller wrap as desired?
  for(let i=0; i < maxStars; i++) {
    let starImg = imgStarEmpty;
    let starAlt = EMPTY_STAR_ALT;
    if(i < rating) {
      starImg = imgStarFilled;
      starAlt = FILLED_STAR_ALT;
    }
    starRating += `<span><img src="${starImg}" alt="${starAlt}" width="25px"></span>`;
  }
  return starRating; // append other closing div (or other container) if needed
}


/**
 * Produces an input control for users to specify a star rating.
 * 
 * @param {number} maxStars The number of stars in the rating system
 * @param {function} listener Callback function to allow client to process selected rating. Signature of callback: func(rating)
 * 
 * @returns HTML div block with empty stars and event handler
 */
function getRatingInput(maxStars, listener) {
//function getRatingInput(maxStars) {
  let starRating = '<span id="star-rating-input" class="star-rating-input">';  // let starRating = '<div .starRatingContainer>' include div wrapper or let caller wrap as desired?  
  for(let i=0; i < maxStars; i++)
  {
    starRating += `<span><input id=${i} class="star-button" type="image" src="${imgStarEmpty}" alt="${EMPTY_STAR_ALT}" onclick="return false" width="25px"></span>`;
  }
  starRating += '</span>';

  handleClickRating(listener);

  return starRating;  
}



const handleClickRating = function (listener) {
  $('body').on('click','.star-button', event => {
    event.preventDefault;
    console.log("FIRING handleClickRating(listener)");
    let currentStar = event.currentTarget;
    let clickedRating = currentStar.id;

    //adjust rating from 0-based array index to 1-based human count
    const currentRating = parseInt(clickedRating) + 1;
    store.set = true;
    store.currentRating = currentRating;

    let allStars = $('.star-button');
    
    //clear stars in case lower rating (ie clicked 4 changed to 3)
    //?TODO? why didn't this work? allStars.forEach(star => star.src = imgStarEmpty);
    for(let i=0; i < allStars.length; i++) {
      allStars[i].src = imgStarEmpty;
    }
    
    //fill selected star and prior stars
    currentStar.src = imgStarFilled;
    for(let i=0; i < clickedRating; i++) {
      allStars[i].src = imgStarFilled;
    }

    listener(store.currentRating);

  });
};

export default {
  getRatingDisplay,
  getRatingInput,
};