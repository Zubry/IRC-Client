var React = require('react');
var ReactDOM = require('react-dom');

var Connected = React.createClass({
  getInitialState: function() {
    return {
      connected: false
    };
  },
  getConnectedState: function() {
    this.setState({connected: this.props.irc.model.connected()});
  },
  componentDidMount: function() {
    this.getConnectedState();
    setInterval(this.getConnectedState, 1000);
  },
  render: function() {
    if(this.state.connected){
      return (
        <div className="Connected" style={{position: 'absolute', bottom: '5em', right: '1em'}} title="You are connected to the IRC server">
          <span className="glyphicon glyphicon-signal text-success" ariaHidden="true"></span>
        </div>
      );
    }else{
      return (
        <div className="Connected" style={{position: 'absolute', bottom: '5em', right: '1em'}} title="Connecting to the IRC server...">
          <span>Connecting...</span>
        </div>
      );
    }
    return (

      <div className="Connected">
        {this.state.connected ? 'Connected' : 'Not connected'}
      </div>
    );
  }
});

module.exports = Connected
