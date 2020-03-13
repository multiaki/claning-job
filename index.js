exports.handler = async event => {
  let data = process.env.TASKS.split(',');
  let divideBy = 3;

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  let result = shuffle(data);

  let family = {
    mommy: result.slice(0, 3),
    fazilat: result.slice(3, 6),
    adolat: result.slice(6, 10)
  };

  var AWS = require("aws-sdk");
  // Set region
  AWS.config.update({ region: "us-east-1" });
    //var credentials = new AWS.SharedIniFileCredentials({profile: 'aki'});
    //AWS.config.credentials = credentials;

  var params = {
    Message: JSON.stringify(family, null, 2),
    TopicArn: "arn:aws:sns:us-east-1:535514343872:CleaningJob"
  };

  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  return publishTextPromise;
};
