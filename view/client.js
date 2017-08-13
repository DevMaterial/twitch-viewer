var users = ['noopkat', 'KingOfLightningGaming', 'ChibiReviews', 'mlg', 'dota2ti', 'tekken', 'StreamerHouse'];
var results = document.querySelector('.results');

var peeps = {};
var newPeeps = {};

users.map(function(user){
 $.ajax({
   type: "GET",
   dataType: "json",
   url: "https://api.twitch.tv/kraken/users/" + user + "?client_id=kt5riua39f8rkrdsny8j1ag9rj3z37",
   async: false,
   success: function(data) {
     peeps[user] = {name: data.display_name, bio: data.bio, link: data._links.self};
   },
   error: function() {
     console.log('An error occured trying to fetch the Twitch API');
   }
 })

 $.ajax({
   type: "GET",
   dataType: "json",
   url: "https://api.twitch.tv/kraken/streams/" + user + "?client_id=kt5riua39f8rkrdsny8j1ag9rj3z37",
   async: false,
   success: function(data) {
     if (data.stream !== null) {
       peeps[user].isStream = [data.stream.stream_type];
     } else {
       peeps[user].isStream = "offline";
     }
   },
   error: function() {
     console.log('An error occured trying to fetch the Twitch API');
   }
 })
 $(results).prepend('<ul>' +
             "<li><h3><a href='https://www.twitch.tv/" + peeps[user].name + "' target='_blank'>" + peeps[user].name + "</a></h3></li>" +
             "<li><p>" + peeps[user].bio + "</p></li>" +
             "<li><h4 class='status'>" + peeps[user].isStream + "</h4></li>" +
          '</ul>');
  peeps[user].isStream[0] === 'live' ? document.querySelector('h4').className += " live" : document.querySelector('h4').className += " notLive";
});

var allUsers = document.querySelector('.all');
var online = document.querySelector('.online');
var offline = document.querySelector('.offline');
var allButtons = document.getElementsByTagName('button');

function color(){
  for(var i = 0; i < 3; i++){
    allButtons[i].style.backgroundColor = '#C5CAE9';
  }
}

allUsers.addEventListener('click', function(){
 color();
 allUsers.style.backgroundColor = '#FFF9C4';
 Object.keys(peeps).filter(function(peep){
   addAllPeeps();
 })
});
online.addEventListener('click', function(){
 color();
 online.style.backgroundColor = '#FFF9C4';
 newPeeps = {};
 Object.keys(peeps).filter(function(peep){
   if(peeps[peep].isStream !== "offline") {
     newPeeps[peep] = peeps[peep];
     addNewPeeps();
   }
 })
});
offline.addEventListener('click', function(){
 color();
 offline.style.backgroundColor = '#FFF9C4';
 newPeeps = {};
 Object.keys(peeps).filter(function(peep){
   if(peeps[peep].isStream === "offline") {
     newPeeps[peep] = peeps[peep];
     addNewPeeps();
   }
 });
});

function addNewPeeps() {
 results.innerHTML = '';
 Object.keys(newPeeps).map(function(peep){
   $(results).prepend('<ul>' +
               "<li><h3><a href='https://www.twitch.tv/" + peeps[user].name + "' target='_blank'/>" + peeps[peep].name + "</a></h3></li>" +
               "<li><p>" + peeps[peep].bio + "</p></li>" +
               "<li><h4 class='status'>" + peeps[peep].isStream + "</h4></li>" +
            '</ul>');
    peeps[peep].isStream[0] === 'live' ? document.querySelector('h4').className += " live" : document.querySelector('h4').className += " notLive";
   });
}

function addAllPeeps() {
 results.innerHTML = '';
 Object.keys(peeps).map(function(peep){
   $(results).prepend('<ul>' +
               "<li><h3><a href='https://www.twitch.tv/" + peeps[user].name + "' target='_blank'/>" + peeps[peep].name + "</a></h3></li>" +
               "<li><p>" + peeps[peep].bio + "</p></li>" +
               "<li><h4 class='status'>" + peeps[peep].isStream + "</h4></li>" +
            '</ul>');
    peeps[peep].isStream[0] === 'live' ? document.querySelector('h4').className += " live" : document.querySelector('h4').className += " notLive";
 });
}
