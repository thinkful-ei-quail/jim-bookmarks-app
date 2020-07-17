import store from './store';
import starRating from './starRating';

import imgStarFilled from './images/star-filled.png';

const newBookmark = {
  title: '',
  rating: 0,
  url: '',
  description: '',
};

function getListView() {
  //get data from API and load into store

  const bookmarks = store.bookmarks;
  let viewHtml = '';
  viewHtml += getButtonsSection();
  viewHtml += getBookmarksListSection();
  
  return viewHtml;
}

function getAddView() {
  return `
    <section id="addNew">
      <form id="addNewBookmarkForm">
        <h3>Add New Bookmark</h3>
        <div class="formInput">
          <label for="url">URL:</label>
          <input type="text" name="url" id="url" placeholder="www.example.com" required>
        </div>
        <div class="formInput">
          <label for="title">Title:</label>
          <input type="text" name="title" id="title" placeholder="link title" required>
        </div>
        <div class="formInput">
          <span>Rating</span>
          ${starRating.getRatingInput(store.MAX_STARS, starRatingListener)}
        </div>
        <div class="formInput">
          <label for="description">Description:</label>
          <textarea id="description" name="description" placeholder="site description text and notes" required></textarea>
        </div>
        <div id="buttons">
          <input id="cancelAdd" type="button" value="Cancel"/>
          <input type="submit" id="addBookmark" value="Add Bookmark"/>
        </div>
      </form>
    </section>
  `;
}

//callback method to get selected rating from starRatingInput
function starRatingListener(rating) {
  newBookmark.rating = rating;
  console.log('new bookmark rating =', newBookmark.rating);
  //todo set rating in store

}

export default {
  getListView,
  getAddView
};

function getButtonsSection() {
  let section = `
    <section id="buttons">
      <button id="addView">+ New</button>
      <select name="filter" id="filter" size="1">
        <option class="filterValue" value="0" selected>Filter by...</option>
        <option class="filterValue" value="1"><span class="star">★</span> Min</option>
        <option class="filterValue" value="2"><span class="star">★★</span> Min</option>
        <option class="filterValue" value="3"><span class="star">★★★</span> Min</option>
        <option class="filterValue" value="4"><span class="star">★★★★</span> Min</option>
        <option class="filterValue" value="5"><span class="star">★★★★★</span></option>
      </select>
    </section>
    `;
  return section;
}

function getBookmarksListSection() {
  let section = `
    <section id="bookmarksList">
        ${getBookmarks()}
    </section>    
    `;
  return section;
}

function getBookmarks() {
  let html = '';


  //only display bookmarks with a star rating greater than or equal to that specified in the filter
  let filteredBookmarks = store.bookmarks.filter(bookmark => {
    return bookmark.rating >= store.filter;
  });

  filteredBookmarks.forEach(bookmark => {
    html += getBookmarkDiv(bookmark);
  });
  return html;

}

function getBookmarkDiv(bookmark) {
  return `
          <button id="${bookmark.id}" class="bookmark">
            <div class="title ${bookmark.expanded ? 'expanded':''}">${bookmark.title}</div>
            <div class="rating">
              ${starRating.getRatingDisplay(store.MAX_STARS, bookmark.rating)}
            </div>
            <div class="${bookmark.expanded ? 'visible':'hidden'}">
             <div class="visit-site"><a href="${bookmark.url}" target="_blank">Visit Site</a></div>
              <div class="site-description">${bookmark.description}</div>
            </div>
          </button>
          
    `; 
}