import cuid from 'cuid';
import store from './store';

const create = function (title, rating, url, description) {
  return {
    id: cuid(),
    title,
    rating,
    url,
    description,
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
/** @todo REMOVE SAMPLE CODE LEFT FOR METHOD EXAMPLES */
// function createCharacter(name, nickname, race, origin, attack, defense ) {
//   return {
//       name,
//       nickname,
//       race,
//       origin,
//       attack,
//       defense,
//       describe: function() {
//           console.log(`${this.name} is a ${this.race} from ${this.origin}`);
//       },
//       evaluateFight: function(character) {
//           let opponentDmg = this.attack - character.defense > 0 ? this.attack - character.defense : 0;
//           let yourDmg = character.attack - this.defense > 0 ? character.attack - this.defense : 0;
//           return `Your opponent takes ${opponentDmg} damage and you receive ${yourDmg} damage`;
//       }
//   };
// }