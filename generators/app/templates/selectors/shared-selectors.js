import { createSelectorCreator, defaultMemoize } from 'reselect';

export const createMemoizingSelector = createSelectorCreator(defaultMemoize, (a, b) => a === b);
export const cardSelector = state => state.cards;
