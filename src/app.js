/*** javascript module imports */
import $ from 'jquery';
import store from './store';
import starRating from './starRating';
import bookmark from './bookmark';
import api from './api';

//used for starRating.js callback
let newStarRating = 0;


function render() {
  let html = '';
  if(store.error) {
    //add error message to html
    html += '<section id="error"><h2>ERROR:</h2>An error has occurred. Please try again. If this problem persits contact tech support at 1-800-555-1212</section>';
    //reset error status
    store.error = false;
  }
  
  if(store.adding) {
    console.log('Render Add View');
    html += getAddView();
  } else {
    html += getListView();
  }

  $('main').html(html); 
}


function bindEventListeners() {
  handleBookmarkExpandCollapse();
  handleAddViewClick();
  handleAddBookmarkSubmit();
  handleAddBookmarkCancel();
  handleFilter();
  handleDelete();
}


/**********************************************************
 * 
 *    Event Handlers 
 * 
 **********************************************************/
function handleBookmarkExpandCollapse() {
  $('main').on('click','.bookmark', event => {
    const id = event.currentTarget.id;
    const item = bookmark.findById(id);
    item.expanded = !item.expanded;

    render();
  });
}


function handleAddViewClick() {
  $('main').on('click','#addView', event => {    
    store.adding = true;
    render();
  });
}


function handleAddBookmarkSubmit() {
  $('main').on('submit','#addForm',function (event) {
    event.preventDefault();

    const title = $('#title').val();
    const rating = newStarRating === 0 ? 1 : newStarRating;
    const url = $('#url').val();
    const desc = $('#description').val();

    const newBookmark = bookmark.create(title, rating, url, desc);  

    api.createItem(newBookmark)
      .then (res => {
        if(res.ok){
          return res.json();
        } else {
          throw new Error('Error adding bookmark to API');
        }
      })
      .then((newItem) => {
        store.addItem(newItem);
        store.adding = false;  //TEST w/o to make sure i'm not doing this elsewhere
        render();
      })
      .catch(error => {
        console.log("ERROR:",JSON.stringify(error));
        store.error = true;
        render();
      });
  });
}

function handleDelete() {
  $('main').on('click','.icon', event => {
    const bookmarkId = $(event.currentTarget).closest('.bookmark').data('bookmark-id');
    if(confirm("Do you really want to delete this bookmark?")) {
      api.deleteItem(bookmarkId)
        .then(res => {
          if(res.ok) {
            return res.json();
          } else {
            throw new Error('Error deleting bookmark from API');
          }
        })
        .then(() => {
          store.findAndDelete(bookmarkId);
          render();
        })
        .catch(error => {
          console.log("ERROR:",JSON.stringify(error));
          store.error = true;
          render();
        });
    }
  });
}

function handleAddBookmarkCancel() {
  $('main').on('click','#cancelAdd', event => {
    store.adding = false; //do nothing, but return to list view
    render();
  });
}


function handleFilter() {
  $('main').on('change','#filter', event => {
    const selectElements = $(event.currentTarget).children('.filterValue:selected');
    store.filter=$(selectElements[0]).val();
    render();
  });
}


//callback method to get selected rating from starRatingInput
function starRatingListener(rating) {
  newStarRating = rating;
}




/**********************************************************
 * 
 *    HTML generation/template string functions 
 * 
 **********************************************************/
function getAddView() {
  return `
    <section id="addNew">
      <form id="addForm">
        <h3>Add New Bookmark</h3>
        <div class="formInput">
          <label for="url">URL:</label>
          <input type="url" name="url" id="url" placeholder="http://example.com" required>
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
          <input id="addBookmark" type="submit" value="Add Bookmark"/>
        </div>
      </form>
    </section>
  `;
}


function getListView() {
  const bookmarks = store.bookmarks;
  let viewHtml = '';
  viewHtml += getButtonsSection();
  viewHtml += getBookmarksListSection();
  
  return viewHtml;
}


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
          <button id="${bookmark.id}" class="bookmark" data-bookmark-id="${bookmark.id}">
            <div class="title ${bookmark.expanded ? 'expanded':''}">
            <span>${bookmark.title}<span>
            <span class="icon">Delete 🗑</span>
            </div>
            <div class="rating">
              ${starRating.getRatingDisplay(store.MAX_STARS, bookmark.rating)}
            </div>
            <div class="${bookmark.expanded ? 'visible':'hidden'}">
             <div class="visit-site"><a href="${bookmark.url}" target="_blank">Visit Site</a></div>
              <div class="site-description">${bookmark.desc}</div>
            </div>
          </button>          
    `; 
}




/**********************************************************
 * 
 *    Module export 
 * 
 **********************************************************/
export default {
  getListView,
  getAddView,
  render,
  bindEventListeners,
};
