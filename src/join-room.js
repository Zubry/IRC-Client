var React = require('react');
var ReactDOM = require('react-dom');

var JoinRoom = React.createClass({
  getInitialState: function() {
    return {
      'room': ''
    };
  },
  handleRoomChange: function(e){
    this.setState({'room': e.target.value});
  },
  handleRoomJoin: function(e) {
    e.preventDefault();

    var room = this.state.room;

    if(room[0] !== '#'){
      room = '#' + room;
    }

    this.setState({'room': ''});
    this.props.onRoomJoin(room);
  },
  render: function() {
    return (
      <form className="roomJoinForm form-inline row" onSubmit={this.handleRoomJoin} style={{marginTop: '1em'}}>
        <div className="input-group col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-3">
          <input type="text" onChange={this.handleRoomChange} className="form-control" value={this.state.room}/>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">Join channel <span className="glyphicon glyphicon-log-in" ariaHidden="true"></span></button>
          </span>
        </div>
      </form>
    );
  }
});


module.exports = JoinRoom;
