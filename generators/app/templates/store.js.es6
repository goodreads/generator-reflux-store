import Reflux from "reflux";
import Freezer from "freezer-js";

import <%= actions.varName %> from "../react_actions/<%= actions.filename %>";

const defaultState = { messages: [] };
const state = new Freezer(defaultState);

let getState = function() {
  return state.get();
};

let resetTo = function(data) {
  getState().reset(_.merge({}, defaultState, data));
};

export default Reflux.createStore({
  listenables: [<%= actions.varName %>],

  initializeWith: function(data) {
    _.each(_.keys(data), (key) => {
      if (!_.has(defaultState, key)) {
        throw new Error("Unexpected key passed to initializeWith. Received " +
                            key + " Expected one of " + _.keys(defaultState));
      }
    });
    resetTo(data);
  },

  getState: getState,
  getInitialState: getState,

  reset: function() {
    resetTo({});
  },

  notifyListeners: function() {
    this.trigger(getState());
  },

  onSendMessage: function(message) {
    getState().messages.push(message);
    this.notifyListeners();
  }
});
