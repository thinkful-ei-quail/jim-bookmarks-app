import store from './store';


const create = function (title, rating, url, desc) {
  return {
    title,
    rating,
    url,
    desc,
    expanded: false,
  };
};


const findById = function (id) {
  return store.bookmarks.find(bookmark => bookmark.id === id);
};


const findIndexById = function (id) {
  return store.bookmarks.findIndex(bookmark => bookmark.id === id);
};


export default {
  create,
  findById,
  findIndexById
};