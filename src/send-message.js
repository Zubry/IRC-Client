var React = require('react');
var ReactDOM = require('react-dom');

var SendMessage = React.createClass({
  getInitialState: function() {
    return {
      'message': ''
    };
  },
  handleMessageChange: function(e){
    this.setState({'message': e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.irc.client.say(this.props.channel, this.state.message);
    this.setState({'message': ''});
    return false;
  },
  render: function() {
    return (
      <form className="messageForm form-group" onSubmit={this.handleSubmit}>
        <input className="form-control" type="text" placeholder="Send a message" onChange={this.handleMessageChange} value={this.state.message}/>
      </form>
    );
  }
});


module.exports = SendMessage;
