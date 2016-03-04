'use strict';

const irc = require('irc');
const model = require('./irc.js');

// This will obviously need to change, but it works for now until I get the time to implement the interface for selecting a server
const client = new irc.Client('localhost', 'Zubry');

client.addListener('error', function(message){
  console.log(message);
});

client.addListener('registered', function(message){
  model.connect();
});

client.addListener('names', function(channel, nicks){
  console.log(channel, nicks);
  nicks = Object.keys(nicks).map(function(nick){
    if(['@', '+'].indexOf(nick[0]) > -1){
      return {
        'nick': nick.slice(1),
        'mode': nick[0]
      };
    }else{
      return {
        'nick': nick,
        'mode': ''
      };
    }
  });

  model.addNames(channel, nicks);
});

client.addListener('topic', function(channel, topic, nick, message){
  model.setTopic(channel, topic, nick);
  model.addMessage(null, channel, nick + ' has changed the channel topic', 'server');
});

client.addListener('join', function(channel, nick){
  model.addMessage(null, channel, nick + ' has joined the channel', 'server');
});

client.addListener('part', function(channel, nick, reason, message){
  model.addMessage(null, channel, nick + ' has left the channel', 'server');
});

client.addListener('kick', function(channel, nick, by, reason, message){
  model.addMessage(null, channel, nick + ' was kicked by ' + by + ' for ' + reason, 'server');
});

client.addListener('quit', function(nick, reason, channels, message){
  channels.forEach(function(channel){
    model.addMessage(null, channel, nick + ' has quit the channel', 'server');
  });
});

client.addListener('message', function(from, to, message){
  model.addMessage(from, to, message, 'message');
});

client.addListener('selfMessage', function(to, message){
  model.addMessage('', to, message, 'message');
});

client.addListener('notice', function(from, to, message){
  model.addMessage(from, to, message, 'notice');
});

client.addListener('pm', function(nick, text){
  model.addMessage(from, null, text, 'pm');
});

client.addListener('nick', function(oldnick, newnick, channels){
  channels.forEach(function(channel){
    model.addMessage(null, channel, oldnick + ' has changed their name to ' + newnick, 'server');
  });
});

client.addListener('action', function(from, to, text){
  model.addMessage(from, to, text, 'action');
});


module.exports = {
  'client': client,
  'model': model
};
