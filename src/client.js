var React = require('react');
var ReactDOM = require('react-dom');

var Connected = require('./connected.js');
var Channel = require('./channel.js');
var JoinRoom = require('./join-room.js');

var Client = React.createClass({
  getInitialState: function() {
    return {
      rooms: []
    };
  },
  onRoomJoin: function(room) {
    rooms = this.state.rooms.slice();
    rooms.push(room);

    this.setState({'rooms': rooms});
    this.props.irc.model.addChannel(room);

    this.props.irc.client.join(room, function(){
      this.props.irc.model.joinChannel(room);
    }.bind(this));
  },
  render: function() {
    console.log('render', this.state);
    var channels = this.state.rooms.map(function(room, i){
      return <Channel channel={room} irc={this.props.irc} key={i}/>;
    }.bind(this));
    return (
      <div style={{height: '100%'}}>
        <div className="container-fluid" style={{height: '10%'}}>
          <JoinRoom onRoomJoin={this.onRoomJoin} irc={this.props.irc}/>
          <Connected irc={this.props.irc}/>
        </div>
        <div className="container-fluid" style={{height: '90%'}}>
          {channels}
        </div>
      </div>
    );
  }
});

module.exports = Client;
