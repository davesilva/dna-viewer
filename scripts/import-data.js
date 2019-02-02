const _ = require('lodash');
const RdfXmlParser = require("rdfxml-streaming-parser").RdfXmlParser;
const minimist = require('minimist');
const fs = require('fs');
const path = require('path');
const url = require('url');

const parser = new RdfXmlParser();
const argv = minimist(process.argv.slice(2));

const filename = argv['_'][0];

if (!filename) {
  console.log(`Usage: node import-data.js <RDF_FILE>`);
  process.exit(1);
}

const basename = path.basename(filename, path.extname(filename));

if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}
if (!fs.existsSync(`data/${basename}`)){
  fs.mkdirSync(`data/${basename}`);
}

const annotations = {};

function setAnnotation(subject, field, value) {
  const urlComponents = url.parse(subject).path.split('/');
  const secondLast = urlComponents[urlComponents.length - 2];
  const last = urlComponents[urlComponents.length - 1];

  if (secondLast === 'a' || secondLast === 'ac') {
    annotations[last] = annotations[last] || {};
    annotations[last][field] = value;
  }
}

fs.createReadStream(filename)
  .pipe(parser)
  .on('data', data => {
    const subject = data.subject.value;
    const predicate = data.predicate.value;
    const object = data.object.value;

    if (predicate === 'http://sbols.org/v1#nucleotides') {
      fs.writeFileSync(`data/${basename}/nucleotides`, object);
    } else if (predicate === 'http://sbols.org/v1#name') {
      setAnnotation(subject, 'name', object);
    } else if (predicate === 'http://sbols.org/v1#bioStart') {
      setAnnotation(subject, 'start', Number(object));
    } else if (predicate === 'http://sbols.org/v1#bioEnd') {
      setAnnotation(subject, 'end', Number(object));
    } else if (predicate === 'http://sbols.org/v1#strand') {
      setAnnotation(subject, 'strand', object);
    }
  })
  .on('error', console.error)
  .on('end', () => {
    const annotationsJson = JSON.stringify(_.values(annotations));
    fs.writeFileSync(`data/${basename}/annotations.json`, annotationsJson);
    console.log(`Finished processing ${filename}.`);
  });
