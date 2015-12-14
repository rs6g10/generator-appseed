import log from 'loglevel';
import _ from 'lodash';

import { ADD_CARD, ADD_CARDS, CARD_TAPPED, INIT_STATE } from '../actions/actions';

export function cards(state = [], action) {
  switch (action.type) {

  case INIT_STATE:
    return [];

  case ADD_CARDS:
    let existingCards = state.slice(0);
    return action.cards.concat(existingCards);

  case CARD_TAPPED:

    let cardsArr = state.slice(0);
    let tappedCard = _.find(cardsArr, { id: action.card.id });

    // expanded property might not be in model
    tappedCard.expanded = ('expanded' in tappedCard) ? !tappedCard.expanded : true;

    return cardsArr;

  default:
    return state;
  }
}
