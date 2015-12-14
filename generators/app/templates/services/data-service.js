class DataService {

  constructor() {

    this._data = {
      cards: [
        { id: 1, title: 'This is a sample card' },
        { id: 2, title: 'This is a sample card' }
      ]
    };
  }

  /**
   * Fetch data from an async source
   * @param  {function} actionCreatorCallback The action creator to call when data is ready
   * @return {function}         Return a function which dispatches an actionCreator call when ready
   */
  fetchData(actionCreatorCallback) {
    return (dispatch) => {
      // simulate async request
      setTimeout(() => {
        dispatch(actionCreatorCallback(this._data.cards));
      }, 1000);
    };
  }

}

export const dataService = new DataService();
