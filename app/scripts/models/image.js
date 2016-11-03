var Backbone = require('backbone');

var Image = Backbone.Model.extend({
  idAttribute: '_id'
});

var ImageCollection = Backbone.Collection.extend({
  model: Image,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/bear-image'
});

module.exports = {
  Image: Image,
  ImageCollection: ImageCollection
};
