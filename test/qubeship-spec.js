var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    SauceLabs = require("saucelabs"),
    username = process.env.SAUCE_USERNAME,
    accessKey = process.env.SAUCE_ACCESS_KEY,
    saucelabs = new SauceLabs({
      username: username,
      password: accessKey
    });

test.describe('Qubeship landingpage', function() {
  this.timeout(60000);

  var driver;

  test.beforeEach(function() {
    var browser = process.env.BROWSER,
        version = process.env.VERSION,
        platform = process.env.PLATFORM,
        server = "http://" + username + ":" + accessKey + 
                  "@ondemand.saucelabs.com:80/wd/hub"; 

    driver = new webdriver.Builder().
      withCapabilities({
        'browserName': browser,
        'platform': platform,
        'version': version,
        'username': username,
        'accessKey': accessKey
      }).
      usingServer(server).
      build();

    driver.getSession().then(function (sessionid){
      driver.sessionID = sessionid.id_;
    });

  });

  test.afterEach(function(done) {
    var title = this.currentTest.title,
        passed = (this.currentTest.state === 'passed') ? true : false;

    driver.quit();

    saucelabs.updateJob(driver.sessionID, {
      name: title,
      passed: passed
    }, done);
  })

  test.it('Qubeship landingpage test', function() {
    driver.get('https://qubeship.io');
    driver.getTitle().then(function (title) {
      console.log("title is: " + title);
      assert(title !== '');
      // assert.equal(title, '');
    });
  });

test.it('Qubeship content test', function() {
    driver.get('https://qubeship.io');
    var content = driver.findElement(webdriver.By.xpath('//html/body/div[2]/div[2]/center/h3'));
    content.getAttribute("innerHTML").then(function(innerHTML) {
      console.log("text is: " + innerHTML);
      assert.equal(innerHTML, 'Spend less time delivering code, and more time delivering value.');
    });
  });

});
