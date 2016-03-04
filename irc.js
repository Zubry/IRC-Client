'use strict';

const irc = require('irc');
const clone = require('clone');

const IRC = (function(server, nick){
  let isConnected = false;
  const channels = [];

  const connected = function(){
    return isConnected;
  };

  const connectedTo = function(name){
    let channel = channels[name];
    return channel && channel.connected;
  };

  const connect = function(){
    isConnected = true;
  };

  const messages = function(name){
    let channel = channels[name];
    if(connectedTo(name)){
      return clone(channel.messages);
    }else{
      return [];
    }
  };

  const addMessage = function(from, to, message, type){
    let channel = channels[to];

    if(!isConnected){
      throw 'You are not connected to the IRC server';
    }

    if(!channel){
      throw "Channel " + to + " has not been added";
    }

    if(!channel.connected && from){
      throw "You are not connected to this channel";
    }

    channel.messages.push({
      'from': from,
      'to': to,
      'message': message,
      'type': type,
      'id': channel.messages.length,
      'time': Date.now()
    });
  };

  const addChannel = function(name){
    if(!isConnected){
      throw 'You are not connected to the IRC server';
    }

    if(!channels[name]){
      channels[name] = {
        'connected': false,
        'messages': [],
        'topic': '',
        'users': []
      };
    }
  };

  const setTopic = function(channel, topic){
    if(!isConnected){
      throw 'You are not connected to the IRC server';
    }

    if(channels[channel]){
      channels[channel].topic = topic;
    }
  }

  const addNames = function(channel, names){
    if(!isConnected){
      throw 'You are not connected to the IRC server';
    }

    if(channels[channel]){
      channels[channel].users = names;
    }
  }

  const joinChannel = function(name){
    if(!isConnected){
      throw 'You are not connected to the IRC server';
    }

    if(!channels[name]){
      throw "Channel " + name + " has not been added";
    }

    if(channels[name].connected){
      throw "You are already connected to this channel";
    }

    channels[name].connected = true;
  }

  const leaveChannel = function(name){
    let channel = channels[name];
    channel.connected = false;
  };

  const leave = function(){
    channels = channels.map(function(channel){
      channel.connected = false;
    });

    isConnected = false;
  };

  const names = function(channel){
    if(!isConnected){
      throw 'You are not connected to the IRC server';
    }

    if(!channels[channel]){
      throw 'You are not connected to this channel';
    }

    return [].concat(channels[channel].users);
  };

  const getChannels = function(){
    return clone(channels);
  }

  return {
    'connect': connect,
    'connected': connected,
    'connectedTo': connectedTo,
    'messages': messages,
    'addMessage': addMessage,
    'addChannel': addChannel,
    'joinChannel': joinChannel,
    'leaveChannel': leaveChannel,
    'leave': leave,
    'connect': connect,
    'setTopic': setTopic,
    'addNames': addNames,
    'names': names,
    'getChannels': getChannels
  };
})();

module.exports = IRC;
