import React from 'react';
import log from 'loglevel';
import classnames from 'classnames';
import * as constants from '../../constants';

import './card.scss';

class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  handleTapped() {
    this.props.onTapped(this);
  }

  render() {

    let classNames = classnames('card', { 'card--expanded': this.props.expanded });

    return (
      <div className={ classNames } onClick={ this.handleTapped.bind(this) }>
        <span className='card__id'>{ this.props.id }</span>
        <label className='card__title'>{ this.props.title }</label>
      </div>
    );
  }
}

export default Card;
