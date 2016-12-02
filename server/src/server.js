
var bodyParser = require('body-parser');

// Imports the express Node module.
var reverseMod = require('./util');
var reverseString = reverseMod.reverseString;
var read = require('./database')
var readDocument = read.readDocument;

/**
* Resolves a feed item. Internal to the server, since it's synchronous.
*/
function getFeedItemSync(feedItemId) {
var feedItem = readDocument('feedItems', feedItemId);
// Resolve 'like' counter.
feedItem.likeCounter = feedItem.likeCounter.map((id) =>
readDocument('users', id));
// Assuming a StatusUpdate. If we had other types of
// FeedItems in the DB, we would
// need to check the type and have logic for each type.
feedItem.contents.author = readDocument('users',
feedItem.contents.author);
// Resolve comment author.
feedItem.comments.forEach((comment) => {
comment.author = readDocument('users', comment.author);
});
return feedItem;
}
/**
* Get the feed data for a particular user.
*/
var xhr = new XMLHttpRequest();
xhr.open('GET', '/user/4/feed');
xhr.setRequestHeader('Authorization', 'Bearer eyJpZCI6NH0=');
xhr.addEventListener('load', function() {
// Call the callback with the data.
cb(JSON.parse(xhr.responseText));
});
xhr.send();

var express = require('express');
// Creates an Express server.
var app = express();
// You run the server from `server`, so `../client/build` is `server/../client/build`.
// '..' means "go up one directory", so this translates into `client/build`!
app.use(express.static('../client/build'));
app.use(bodyParser.text());
// Handle POST /reverse [data]
// app.post('/reverse', function (req, res) {
// // If the request came with text, then the text() middleware handled it
// // and made `req.body` a string.
// // Check that req.body is a string.
// if (typeof(req.body) === 'string') {
// var reversed = reverseString(req.body);
// res.send(reversed);
// } else {
// // POST did not contain a string. Send an error code back!
// res.status(400).end()
// }
// });



// Defines what happens when it receives the `GET /` request
// app.get('/', function (req, res) {
// res.send('Hello World!');
// });
// Starts the server on port 3000!
/**
* Get the feed data for a particular user.
*/
/**
* Get the user ID from a token. Returns -1 (an invalid ID)
* if it fails.
*/
function getUserIdFromToken(authorizationLine) {
try {
// Cut off "Bearer " from the header value.

var token = authorizationLine.slice(7);
// Convert the base64 string to a UTF-8 string.
var regularString = new Buffer(token, 'base64').toString('utf8');
// Convert the UTF-8 string into a JavaScript object.
var tokenObj = JSON.parse(regularString);
var id = tokenObj['id'];
// Check that id is a number.
if (typeof id === 'number') {
return id;
} else {
// Not a number. Return -1, an invalid ID.
return -1;
}
} catch (e) {
// Return an invalid ID.
return -1;
}
}
/**
* Get the feed data for a particular user.
*/
app.get('/user/:userid/feed', function(req, res) {
var userid = req.params.userid;
var fromUser = getUserIdFromToken(req.get('Authorization'));
// userid is a string. We need it to be a number.
// Parameters are always strings.
var useridNumber = parseInt(userid, 10);
if (fromUser === useridNumber) {
// Send response.
res.send(getFeedData(userid));
} else {
// 401: Unauthorized request.
res.status(401).end();
}
});


app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});
