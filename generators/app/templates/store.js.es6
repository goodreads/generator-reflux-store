import Reflux from "reflux";
import Freezer from "freezer-js";

import <%= actions.varName %> from "../react_actions/<%= actions.filename %>";

const defaultState = { messages: [] };
const state = new Freezer(defaultState);

let getState = function() {
  return state.get();
};

let reset = function(data) {
  getState.reset(_.merge({}, defaultState, data));
}

export default Reflux.createStore({
  listenables: [<%= actions.varName %>],

  initializeWith: function(data) {
    reset(data);
  },

  getState: getState,
  getInitialState: getState,

  reset: function() {
    reset();
  },

  notifyListeners: function() {
    this.trigger(getState());
  },

  onSendMessage: function(message) {
    getState().messages.push(message);
    this.notifyListeners();
  }
});
