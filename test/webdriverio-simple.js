var client = require('webdriverio').remote({
    user: process.env.SAUCE_USER,
    key: process.env.SAUCE_KEY,
    host: "ondemand.saucelabs.com",
    port: 80,
    logLevel: "silent",
    desiredCapabilities: {  
        browserName: 'chrome',
        platform: 'Windows 7',
        version: '43.0'
    }
});
 
client
    .init()
    .url('http://saucelabs.com/test/guinea-pig')
    .getTitle().then(function (title) {
        console.log("title is: " + title);
    })
    .end();
