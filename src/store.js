//todo: TEMP TEST DATA  actual will be const bookmarks = [];
const bookmarks = [
  {
    id: 'x56w',
    title: 'Title 1',
    rating: 3,
    url: 'http://www.title1.com',
    description: 'lorem ipsum dolor sit',
    expanded: false
  },
  {
    id: '6ffw',
    title: 'Title 2',
    rating: 5,
    url: 'http://www.title2.com',
    description: 'dolorum tempore deserunt',
    expanded: true,
  }, 
  {
    id: '6ff7',
    title: 'Some Title',
    rating: 4,
    url: 'http://www.title3.com',
    description: 'more lorem ipsum',
    expanded: false
  },
  {
    id: 'affw',
    title: 'Another Title',
    rating: 1,
    url: 'http://www.amazon.com',
    description: 'sit dolorum tempore deserunt',
    expanded: false
  },
  {
    id: '651w',
    title: 'Some Title 2: The sequel',
    rating: 2,
    url: 'http://www.github.com',
    description: 'tempore deserunt lorem ipsum',
    expanded: false
  },
];
let adding = false;
let error = null;
let filter = 0;
const MAX_STARS = 5; //really part of store?


export default {
  bookmarks,
  adding,
  error,
  filter,
  MAX_STARS,
};