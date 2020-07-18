const BASE_URL = 'https://thinkful-list-api.herokuapp.com';
const TARGET = '/jsmith774/bookmarks';

const API_ENDPOINT = `${BASE_URL}${TARGET}`;


function getItems() {
  console.log(`${API_ENDPOINT}`);
  return fetch(`${API_ENDPOINT}`);
}


function createItem(bookmark) {
  console.log("ADDING BOOKMARK", bookmark);
  //bookmark object
  return fetch(`${API_ENDPOINT}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: `${JSON.stringify(bookmark)}`
    });
}


function deleteItem(id) {
  return fetch(`${API_ENDPOINT}/${id}`,
    {
      method: 'DELETE'
    }
  );
}


export default {
  getItems,
  createItem,
  deleteItem,
};  