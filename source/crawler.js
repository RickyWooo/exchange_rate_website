const fs = require('fs');

fs.readFile('index.htm', function (err, data) {
    if (err) throw err;
    htmlObject = (data.toString());
    console.log(htmlObject)
});

