const getScore = require('./sentimentScore.js');
var prompt = require('prompt');

prompt.start();

prompt.get([{
    name: 'searchTerm',
    required: true
  }], function (err, result) {
    getScore(result.searchTerm);
  });


