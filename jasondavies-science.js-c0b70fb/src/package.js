require("../science");

require("util").puts(JSON.stringify({
  "name": "science.js",
  "version": science.version,
  "description": "Scientific and statistical computing in JavaScript.",
  "keywords": ["science", "statistics", "mathematics"],
  "homepage": "https://github.com/jasondavies/science.js",
  "author": {"name": "Jason Davies", "url": "http://www.jasondavies.com/"},
  "repository": {"type": "git", "url": "http://github.com/jasondavies/science.js.git"},
  "devDependencies": {
    "uglify-js": "1.2.2",
    "vows": "0.6.0"
  }
}, null, 2));