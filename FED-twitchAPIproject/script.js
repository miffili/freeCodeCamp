var channels = ["gamesdonequick", "freecodecamp", "gamej06", "twitch", "drozdowsky", "grandpoobear", "360chrism", "fleischie28", "ESL_SC2"];

var endpoint;
var streamData = {};
var channelData = {};

function fetchData() {
  for(let i = 0; i < channels.length; i++){
    fetchStreamData(channels[i]);
    fetchChannelData(channels[i]);
  }
}

function fetchChannelData(el){
  endpoint = `https://wind-bow.glitch.me/twitch-api/channels/${el}`;

  $.getJSON(endpoint, function(data) {
    channelData[el] = (el, data);
    $(`#${el}-box .user-name`).html(`${channelData[el].display_name}`);
    $(`#${el}-box .user-link`).attr("href", `${channelData[el].url}`);
    $(`#${el}-box .channel-logo`).attr("src", `${channelData[el].logo}`);
    $(`#${el}-box .channel-logo`).html(`${channelData[el].display_name}`);
  });
}

function fetchStreamData(el){
  endpoint = `https://wind-bow.glitch.me/twitch-api/streams/${el}`;

  $.getJSON(endpoint, function(data) {
    streamData[el] = (el, data);
    if(streamData[el].stream !== null){
      $(`#${el} .stream-status`).addClass("online");
      $(`#${el} .stream-info`).addClass("online");
      $(`#${el}`).css("background-image", `url(${streamData[el].stream.preview.large})`);
      if(streamData[el].stream.channel.status.length > 40){
        var streamChannelStatus = streamData[el].stream.channel.status.substring(0, 40);
        streamChannelStatus += "...";
      }
      $(`#${el} .stream-info`).html(`<a href="${streamData[el].stream.channel.url}">${streamChannelStatus}</a>`);
    }
  });
}

fetchData();
