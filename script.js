const json = require('./data/figshare.json')
const fingerprint = require('talisman/keyers/fingerprint');
const MultiMap = require('mnemonist/multi-map');

var result = {};
var indexes = {};
var stricly_similar = {};
var representations = {};

var index = new MultiMap();
var buckets = new MultiMap();
var clusters = [];

json.map((el, i) => {
  index.set(el["Journal title"], i);
})

for (var key of index.keys()) {
  buckets.set(fingerprint(key), key)
}

for (var bucket of buckets.containers()) {
  if (bucket.length > 1) {
    clusters.push(bucket);
  }
}

console.log(buckets)

clusters.map((el) => {
  console.log(`${fingerprint(el[0])} has ${buckets.get(fingerprint(el[0])).length} versions`)
  el.map((version) => {
    console.log(`${version} has ${index.get(version).length} occurences`)
    console.log(index.get(version))
  })
})

// console.log(index)
// console.log(buckets)
// clusters.map((el) => {
//   console.log(`${el}`)
// })
// for(var key in result) {
//   if (result[key].length > 1) {
//     console.log(`cluster "${key}" has ${result[key].length} results`);
//     result[key].map((el) => {
//       if (el["Journal title"] != result[key]["base"])
//         console.log(`       ${el["Journal title"]}`)
//     });
//   }
// }

// console.log(stricly_similar)