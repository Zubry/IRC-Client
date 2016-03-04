var React = require('react');
var ReactDOM = require('react-dom');

var UserList = require('./user-list.js');
var MessageList = require('./message-list.js');
var SendMessage = require('./send-message.js');

var Channel = React.createClass({
  render: function() {
    return (
      <div className="container-fluid" style={{height: '100%'}}>
        <div className="row" style={{height: 'calc(100% - 4em)'}}>
          <MessageList channel={this.props.channel} irc={this.props.irc}/>
          <UserList channel={this.props.channel} irc={this.props.irc}/>
        </div>
        <div className="row">
          <SendMessage channel={this.props.channel} irc={this.props.irc}/>
        </div>
      </div>
    );
  }
});

module.exports = Channel
