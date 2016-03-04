var React = require('react');
var ReactDOM = require('react-dom');

var IRC = require('./index.js');

var Client = require('./build/client.js');

ReactDOM.render(
  <Client irc={IRC}/>,
  document.getElementById('client')
);
