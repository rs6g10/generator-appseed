export const INIT_STATE = 'INIT_STATE';
export const CARD_TAPPED = 'CARD_TAPPED';
export const ADD_CARD = 'ADD_CARD';
export const ADD_CARDS = 'ADD_CARDS';

export function initState(data) {
  return { type: INIT_STATE, data };
}

export function cardTapped(card) {
  return { type: CARD_TAPPED, card };
}

export function addCard(card) {
  return { type: ADD_CARD, card };
}

export function addCards(cards) {
  console.log('addCards', cards);
  return { type: ADD_CARDS, cards };
}
