import api from './api';

const bookmarks = [];

let adding = false;
let error = null;
let filter = 0;
const MAX_STARS = 5;

const addItem = function (bookmark) {
  bookmarks.push(bookmark);
};

const findAndDelete = function (id) {
  const index = bookmarks.findIndex(bookmark => bookmark.id === id);
  bookmarks.splice(index, 1);
};

export default {
  bookmarks,
  adding,
  error,
  filter,
  MAX_STARS,
  addItem,
  findAndDelete,
};