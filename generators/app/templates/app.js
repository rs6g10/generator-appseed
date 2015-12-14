import React from 'react';
import log from 'loglevel';
import { connect } from 'react-redux';
import * as constants from './constants';

// Redux
import { initState, cardTapped, addCard, addCards } from 'actions/actions';
import { filteredCardSelector } from 'selectors/filtered-card-selector';
import { createMemoizingSelector } from 'selectors/shared-selectors';
import { windowService } from 'services/window-service';
import { dataService } from 'services/data-service';

// Components
import Card from './components/card/card';

// Styles
import './sass/app.scss';

/**
 * Main entry point to the application
 * App is the only 'smart' component within the application,
 * which means that it is the only view component that can
 * send actions to update the application state
 */
class App extends React.Component {

  /**
   * constructor Main app constructor. Reference callback functions,
   * binding the scope of `this` so that it is not re-evaluated
   * on each update to the application state
   * @param  {object} props App properties
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * React lifecycle method
   * {@link https://facebook.github.io/react/docs/component-specs.html#mounting-componentwillmount}
   * @return {void}
   */
  componentWillMount() {

    this._resizeStream = windowService.listenToStream('resize')
      .subscribe(this.onResize);

    this.props.dispatch(initState());

    // fetch async data
    this.props.dispatch(dataService.fetchData(addCards));
  }

  /**
   * React lifecycle method
   * {@link https://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops}
   * @return {void}
   */
  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps', newProps);
  }

  /**
   * React lifecycle method
   * {@link https://facebook.github.io/react/docs/component-specs.html#unmounting-componentwillunmount}
   * @return {void}
   */
  componentWillUnmount() {
    if (this._resizeStream) {
      this._resizeStream.dispose();
    }
  }

  /**
   * Event handler for when a card is tapped
   * @param  {object} tappedCard The card instance which was tapped
   * @return {void}
   */
  handleCardTapped(tappedCard) {
    let card = _.findWhere(this.props.cards, { id: tappedCard.props.id });
    this.props.dispatch(cardTapped(card));
  }

  /**
   * Get a loading indicator while we wait for data
   * @return {object} JSX for the loading indicator
   */
  getLoadingIndicator() {
    return <div className='loading'>Loading...</div>;
  }

  /**
   * React lifecycle method
   * {@link https://facebook.github.io/react/docs/component-specs.html#render}
   * @return {object} JSX for this component
   */
  render() {

    if (!this.props.cards.length) {
      return this.getLoadingIndicator();
    }

    let cards = this.props.cards.map(p => {
      return (
        <Card
          key={ p.id }
          id={ p.id }
          title={ p.title }
          expanded={ p.expanded }
          onTapped={ this.handleCardTapped.bind(this) }
        />
      );
    });

    return (
      <div className='app'>
        <h1>Cards</h1>
        { cards }
      </div>
    );
  }
}

// Create our app state (ie. this.props used in the render method above)
// Uses redux-reselect to create memoized selectors to filter our cards, eg. filteredCardSelector
let select = createMemoizingSelector(
  [state => state, filteredCardSelector],
  (state, filteredCards) => {
    // using ES7 spread operator to clone state & add filteredCards etc properties.
    // state is built up in appReducer.js
    return {
      ...state,
      filteredCards
    };
  }
);

// Part of react-redux - this wires up our app & state selector & causes the above to fire before each render
/**
 * Main entry point to the application
 * App is the only 'smart' component within the application,
 * which means that it is the only view component that can send actions to update the application state
 *
 * Wrapping App in connect(select) connects the application to redux and to our selectors,
 * which allow the state to be augmented
 */
export const App_ = App;
export default connect(select)(App);
