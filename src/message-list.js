var React = require('react');
var ReactDOM = require('react-dom');

var Message = require('./message.js');

var MessageList = React.createClass({
  getInitialState: function() {
    return {
      messageList: []
    };
  },
  getMessageList: function() {
    if(this.props.irc.model.connectedTo(this.props.channel)){
      this.setState({
        messageList: this.props.irc.model.messages(this.props.channel)
      });
    }else{
      console.log('You are not connected to ' + this.props.channel);
    }
  },
  componentWillUpdate: function() {
    var node = this.getDOMNode();
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },
  componentDidUpdate: function() {
    if (this.shouldScrollBottom) {
      var node = this.getDOMNode();
      node.scrollTop = node.scrollHeight
    }
  },
  componentDidMount: function() {
    this.getMessageList();
    setInterval(this.getMessageList, 100);
  },
  render: function() {
    const MessageListItemNodes = this.state.messageList.map(function(message){
      return (
        <Message data={message} key={message.id}/>
      );
    });
    return (
      <div className="MessageList" className="col-xs-10 col-sm-11 col-md-11 col-lg-11" style={{
        'height': 'calc(100% - 1.5em)',
        'maxHeight': 'calc(100% - 1.5em)',
        'overflowY': 'scroll',
        'marginTop': '.75em',
        'marginBottom': '.75em'
      }}>
        {MessageListItemNodes}
      </div>
    );
  }
});

module.exports = MessageList
