var React = require('react');
var ReactDOM = require('react-dom');

var UserListItem = require('./user-list-item.js');

var UserList = React.createClass({
  getInitialState: function() {
    return {
      userList: []
    };
  },
  getUserList: function() {
    if(this.props.irc.model.connectedTo(this.props.channel)){
      this.setState({
        userList: this.props.irc.model.names(this.props.channel)
      });
    }else{
      console.log('You are not connected to ' + this.props.channel);
    }
  },
  componentDidMount: function() {
    this.getUserList();
    setInterval(this.getUserList, 1000);
  },
  render: function() {
    const UserListItemNodes = this.state.userList.map(function(userList){
      return (
        <UserListItem data={userList} key={userList.nick}/>
      );
    });
    return (
      <div className="UserList" className="col-xs-2 col-md-1 col-sm-1 col-lg-1" style={{height: 'calc(100% - 1.5em)', 'marginTop': '.75em', 'marginBottom': '.75em', 'borderLeft': '1px solid #e8e8e8'}}>
        {UserListItemNodes}
      </div>
    );
  }
});

module.exports = UserList
