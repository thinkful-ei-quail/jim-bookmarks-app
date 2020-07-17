# jim-bookmarks-app



appViews.js: provides html values to be rendered inside of main
    getListView();  //expanded
    getAddView();
    //error?

starRating.js: contains star rating functionality
        getRatingDisplay(maxStars, rating) - returns <span> elements read-only rating view
        getRatingInput(maxStars, listener) - returns <div> with input control so user can provide rating

store.js: contains application data store
