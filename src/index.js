/*** javascript module imports ***/
import $ from 'jquery';
import store from './store';
import app from './app';
import api from './api.js';

/*** css imports */
import './style.css';


function main() {
  api.getItems()
    .then(res => {
      if(res.ok) {
        console.log('Response: ', res);
        return res.json();
      } else {
        console.log('Bad Response: ',res);
        throw new Error('Unable to retrieive data from API');
      }
    })
    .then((jsonData) => {
      console.log(JSON.stringify(jsonData));
      jsonData.forEach(bookmark => store.bookmarks.push(bookmark));
      app.render();
    })
    .catch(error => {
      console.log('ERROR:',JSON.stringify(error));
      store.error = true;
      app.render();
    });

  app.bindEventListeners();
  app.render();
}


$(main);