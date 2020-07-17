import $ from 'jquery';
import store from './store';
import starRating from './starRating';
import appViews from './appViews';
import bookmark from './bookmark.js';

import './style.css';

import imgStarFilled from './images/star-filled.png';
import imgStarEmpty from './images/star-empty.png';

function main() {
  handleBookmarkExpandCollapse();
  handleAddViewClick();
  handleAddBookmarkSubmit();
  handleAddBookmarkCancel();
  handleFilter();

  render(); 
}

function render() {
  let html = '';
  
  if(store.adding) {
    console.log('Render Add View');
    html = appViews.getAddView();
  } else {
    html = appViews.getListView();
  }

  $('main').html(html); 
}


/**
 * event handlers
 */
function handleBookmarkExpandCollapse() {
  $('main').on('click','.bookmark', event => {
    console.log('FIRING handleBookmarkExpandCollapse()');
    console.log(event.currentTarget.id);
    const id = event.currentTarget.id;
    const item = bookmark.findById(id);
    item.expanded = !item.expanded;

    render();
  });
}

function handleAddViewClick() {
  $('main').on('click','#addView', event => {
    console.log('FIRING handleAddViewClick()');    
    store.adding = true;
    render();
  });
}

function handleAddBookmarkSubmit() {
  $('main').on('click','#addBookmark', event => {
    
    console.log('FIRING handleAddBookmarkSubmit()');
    //@TODO remove console log, add via api and add to store.bookmarks if successful otherwise handle errors
    //success
    store.adding = false; //return to list view upon successful add
    event.preventDefault;
    render();
  });
}

function handleAddBookmarkCancel() {
  $('main').on('click','#cancelAdd', event => {
    console.log('FIRING handleAddBookmarkCancel()');
    store.adding = false; //do nothing, but return to list view
    render();
  });
}

function handleFilter() {
  $('main').on('change','#filter', event => {
    console.log('FIRING handleFilter()');
    const selectElements = $(event.currentTarget).children('.filterValue:selected');
    store.filter=$(selectElements[0]).val();
    render();
  });
}




// function handleClickRating() {
//   $('body').on('click','.star-button', event => {
//     event.preventDefault;
//     console.log("FIRING handleClickRating(listener) FROM index.js");
//     let currentStar = event.currentTarget;
//     let clickedRating = currentStar.id;

//     //adjust rating from 0-based array index to 1-based human count
//     const currentRating = parseInt(clickedRating) + 1;
//     //store.set = true;
//     //store.currentRating = currentRating;

//     let allStars = $('.star-button');
    
//     //clear stars in case lower rating (ie clicked 4 changed to 3)
//     //?TODO? why didn't this work? allStars.forEach(star => star.src = imgStarEmpty);
//     for(let i=0; i < allStars.length; i++) {
//       allStars[i].src = imgStarEmpty;
//     }
    
//     //fill selected star and prior stars
//     currentStar.src = imgStarFilled;
//     for(let i=0; i < clickedRating; i++) {
//       allStars[i].src = imgStarFilled;
//     }
//   });
//}

$(main);