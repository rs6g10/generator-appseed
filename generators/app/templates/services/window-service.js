import Rx from 'rx';

class WindowService {

  constructor() {
    this._streams = {};

    this._streamDefinitions = {
      resize: {
        eventName: 'resize',
        eventSource: window,
        map: (e) => {
          return { width: e.target.innerWidth, height: e.target.innerHeight };
        },
        debounceDuration: 500
      }
    };

    this.createStreams();
  }

  /**
   * listenToStream Subscribe to event stream
   * @param  {string}   streamName [description]
   * @return {object}              The handle on the stream callback. Call dispose() on to remove.
   */
  listenToStream(streamName) {
    if (!(streamName in this._streams)) {
      return console.error(`Stream ${streamName} does not exist`);
    }

    // return a handle which conponent can dispose of
    return this._streams[streamName];
  }

  /**
   * triggerStream Trigger the initial event from the stream.
   * Useful for e.g. getting initial window size via resize event
   * @param {string} streamName
   */
  triggerStream(streamName) {
    if (!(streamName in this._streamDefinitions)) {
      return console.error(`Stream ${streamName} does not exist`);
    }

    var def = this._streamDefinitions[streamName];
    // IE 11 needs this instead of new Event
    // http://stackoverflow.com/questions/27643181/ie-11-dispatchevent
    var evt = document.createEvent('CustomEvent');
    evt.initEvent(def.eventName, false, true);
    def.eventSource.dispatchEvent(evt);
  }

  /**
   * Create the observable streams.
   * This should be done just once.
   * @return {void}
   */
  createStreams() {
    for (var key in this._streamDefinitions) {
      var s = this._streamDefinitions[key];
      this._streams[key] = Rx.Observable.fromEvent(s.eventSource, s.eventName)
        .map(s.map)
        .debounce(s.debounceDuration);
    }
  }
}

export const windowService = new WindowService();
