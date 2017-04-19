const json = require('./data/figshare.json')

const levenshtein = require('talisman/metrics/distance/levenshtein');
const MultiMap = require('mnemonist/multi-map');

var index = new MultiMap();
var buckets = new MultiMap();

json.map((el, i) => {
  index.set(el["Journal title"], i);
});
keys = []
for (var key of index.keys()) {
  keys.push(key);
};

for (var i = 0; i < keys.length; i++) {
  for (var j = i + 1; j < keys.length; j++) {
    var threshold = (keys[i].length + keys[j].length) / 10

    if (levenshtein(keys[i].trim(), keys[j].trim()) < threshold 
      && levenshtein(keys[i].trim(), keys[j].trim()) > 3) {
      buckets.set(keys[i], keys[j])
    }
  }
}

// keys.map((key1) => {
//   keys.map((key2) => {
//     if (levenshtein(key1.toLowerCase().trim(), key2.toLowerCase().trim()) < 2 
//       && levenshtein(key1.toLowerCase().trim(), key2.toLowerCase().trim()) > 0) {
//       buckets.set(key1, key2)
//     }
//   })
//   keys.shift()
// })

console.log(buckets)

// for (var key1 of index.keys()) {
//   for (var key2 of index.keys()) {
//     if (levenshtein(key1, key2) < 2 && levenshtein(key1, key2) > 0) {
//       buckets.set(key1, key2)
//     }
//   }  
// }