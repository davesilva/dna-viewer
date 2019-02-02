const _ = require('lodash');
const mustachio = require('mustachio');
const minimist = require('minimist');
const fs = require('fs');

const resolver = mustachio.resolver();
const argv = minimist(process.argv.slice(2));

const BASES = ['g', 'c', 'a', 't'];

const name = argv['name'];
const nucleotides = argv['nucleotides'];
const annotations = argv['annotations'];

if (!name || !nucleotides || !annotations) {
  console.log(`Usage: node generate-data.js --name <NAME>
                             --nucleotides <NUMBER_OF_NUCLEOTIDES>
                             --annotations <NUMBER_OF_ANNOTATIONS>`);
  process.exit(1);
}

const renderer = resolver('template.xml', {
  name: name,
  nucleotides: function* () {
    for (i = 0; i < nucleotides; i++) {
      yield BASES[_.random(0, 4)];
    }
  },
  annotations: function* () {
    for(i = 0; i < annotations; i++) {
      const start = _.random(0, nucleotides);
      const end = _.random(0, nucleotides);
      yield {
        number: i,
        annotationName: `annotation_${i}`,
        start: Math.min(start, end),
        end: Math.max(start, end),
        strand: start <= end ? '+' : '-'
      };
    }
  }
});

const stream = fs.createWriteStream(`${name}.rdf`);
renderer.stream().pipe(stream);
