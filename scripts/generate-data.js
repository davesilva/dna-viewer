const _ = require('lodash');
const mustachio = require('mustachio');
const minimist = require('minimist');
const fs = require('fs');

const resolver = mustachio.resolver();
const argv = minimist(process.argv.slice(2));

const BASES = ['g', 'c', 'a', 't'];

const name = argv['name'];
const nucleotides = Number(argv['nucleotides']);
const annotations = Number(argv['annotations']);

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
      yield BASES[_.random(0, BASES.length - 1)];
    }
  },
  annotations: function* () {
    for(i = 0; i < annotations; i++) {
      const start = _.random(0, nucleotides - 1);
      const end = _.random(0, nucleotides - 1);
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

if (!fs.existsSync('import')) {
  fs.mkdirSync('import');
}

const stream = fs.createWriteStream(`import/${name}.rdf`);
renderer.stream().pipe(stream);
