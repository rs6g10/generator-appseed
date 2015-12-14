import _ from 'lodash';
import log from 'loglevel';

import { cardSelector, createMemoizingSelector } from './shared-selectors';

export const filteredCardSelector = createMemoizingSelector(
  [cardSelector],
    (cards) => {
      let filteredCards = cards.length ? [_.first(cards)] : [];
      return filteredCards;
    });
