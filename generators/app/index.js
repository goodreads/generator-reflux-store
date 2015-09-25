'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.generators.NamedBase.extend({
  writing: {
    writeJs: function () {
      var fileExtension = ".js.es6";
      var storeName = this.name + "Store";
      var filenameBase = _.snakeCase(storeName);
      var store = {
        varName: storeName,
        filename: filenameBase
      };
      var actions = {
        varName: this.name + "Actions",
        filename: filenameBase + "_actions"
      };
      var spec = {
        filename: store.filename + "_spec"
      }
      this.fs.copyTpl(
        this.templatePath('store.js.es6'),
        this.destinationPath('app/gulp/javascripts/react_stores/' + store.filename + fileExtension),
        {
          actions: actions
        }
      );
      this.fs.copyTpl(
        this.templatePath('store_spec.js.es6'),
        this.destinationPath('test/javascripts/unit/react_stores/' + spec.filename + fileExtension),
        {
          store: store
        }
      );
      this.fs.copyTpl(
        this.templatePath('actions.js.es6'),
        this.destinationPath('app/gulp/javascripts/react_actions/' + actions.filename + fileExtension),
        {
          
        }
      );
    }
  }
});
