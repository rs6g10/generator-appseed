// Core
import {Chance} from 'chance';

// Components
import Card from 'components/card/card';

describe('card', () => {

  let card = null;
  let chance = null;
  let componentData = null;

  beforeEach(() => {
    chance = new Chance();
    componentData = { id: chance.natural({ min: 1, max: 99999 }), title: chance.sentence({ words: 3 }) };
    card = new Card(componentData);
  });

  it('should be a valid React Component', () => {
    expect(typeof(card)).toBe('object');
    expect(Object.getOwnPropertyNames(card)).toContain('props');
  });

  it('should be initialised with props', () => {
    expect(card.props).toBe(componentData);
  });

});
