var React = require('react');
var ReactDOM = require('react-dom');

var Message = React.createClass({
  formatTime: function(time) {
    var _time = new Date(time);
    var hours = _time.getHours() % 12;
    var minutes = _time.getMinutes();
    var seconds = _time.getSeconds();

    if(minutes < 10){
      minutes = "0" + minutes;
    }

    if(seconds < 10){
      seconds = "0" + seconds;
    }

    return hours + ":" + minutes + ":" + seconds;
  },
  render: function() {
    if(this.props.data.type === 'message'){
      return (
        <div className="Message row">
          <div className="col-sm-3 col-xs-4 col-md-2" style={{textAlign: 'right', overflow: 'hidden', 'textOverflow': 'clip'}}>
            <span className="sender" title={this.formatTime(this.props.data.time)}>{this.props.data.from || 'Me'}: </span>
          </div>
          <div className="col-sm-9 col-xs-8 col-md-10" style={{borderLeft: '1px solid #2b2b2b'}}>
           <span className="message-text">{this.props.data.message}</span>
          </div>
        </div>
      );
    }

    if(this.props.data.type === 'server'){
      return (
        <div className="Message row">
          <div className="col-sm-3 col-xs-4 col-md-2" style={{textAlign: 'right', overflow: 'hidden', 'textOverflow': 'clip'}}>
            <span className="sender" style={{fontWeight: 'bold', color: 'orange'}}  title={this.formatTime(this.props.data.time)}>Server&nbsp;message: </span>
          </div>
          <div className="col-sm-9 col-xs-8 col-md-10" style={{borderLeft: '1px solid #2b2b2b'}}>
           <span className="message-text">{this.props.data.message}</span>
          </div>
        </div>
      );
    }

  }
});

module.exports = Message;
