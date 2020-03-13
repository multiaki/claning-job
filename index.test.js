let index = require('./index');

index.handler().then((err, data) => {
  console.log(err)
  console.log(data)
})
