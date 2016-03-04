var React = require('react');
var ReactDOM = require('react-dom');

var UserListItem = React.createClass({
  render: function() {
    return (
      <div className="UserListItem">
        {this.props.data.mode}{this.props.data.nick}
      </div>
    );
  }
});

module.exports = UserListItem;
