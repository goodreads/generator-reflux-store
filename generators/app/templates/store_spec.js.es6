import <%= store.varName %> from "../../../src/react_stores/<%= store.filename %>";

describe("<%= store.varName %>", () => {

  it("onSendMessage stores the supplied message and notifies listeners", (done) => {
    let unsubscribe = <%= store.varName %>.listen((newState) => {
      newState.messages.should.eql(["Awooga"]);
      unsubscribe();
      done();
    });
    <%= store.varName %>.onSendMessage("Awooga");
    <%= store.varName %>.getState().messages.should.eql(["Awooga"]);
  });

  afterEach(() => {
    <%= store.varName %>.reset();
  });

});
