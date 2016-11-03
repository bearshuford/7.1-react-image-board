var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/app.jsx').App;

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// DOM Ready
$(function(){
  ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
  );
});
