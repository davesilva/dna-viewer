# DNA Viewer

A webpage for viewing annotated DNA.

## Usage

I included a Dockerfile to make it easy to get running. Just run
`docker-compose build` to build the image, followed by `docker-compose up`
to start. Then open your browser to `localhost:3001`.

### Importing new data

I included some preprocessed test data, but if you want to import new
sequences, copy the rdf file to the `import` directory and then, use 
the import data script like this:

    docker-compose run app import-data import/YOUR_FILE.rdf

### Generating test data

I also included a script for generating random test data. To generate
an RDF file for testing, run:

    docker-compose run app generate-data -- \
      --nucleotides NUMBER_OF_NUCLEOTIDES \
      --annotations NUMBER_OF_ANNOTATIONS \
      --name NAME_OF_THE_SEQUENCE
 
### Running tests

    docker-compose run app test

## Features

* A smooth infinite zoom interface for moving between a high-level overview
  of the annotations and a view of the actual nucleotide sequence.

* Support for sequences of 1 billion nucleotides or more.

* Visualization of overlapping annotations.

## Assumptions

* The input is an RDF/XML file in the SBOL 1 format (like the example file).
  There's very little error handling, so the import script will fail
  ungracefully if you try to give it anything else.

* There are a relatively small number of annotations. There's no hard limit
  to the number of annotations it can support, but if you have enough
  overlapping annotations they eventually run off the screen and you can't
  scroll down to see them (because scrolling is how you zoom).

* The nucleotide sequence can fit in memory when running the import script.
  The app itself supports files of any size, but the import script doesn't.
  In practice this doesn't seem to matter much for something that's only
  going to run on your laptop because I tried generating a 1 billion
  nucleotide file and it was still only 1GB, which I was able to import.
  For something that needed to run on a server and accept GB-sized user
  input, you could swap out the parser for a streaming XML parser and fix
  this issue.

## Limitations & Bugs

* Rendering performance: The app runs pretty smoothly on my 2013 MacBook Air, 
  but it sometimes drops frames due to scaling the font size for the nucleotides
  which is a fairly expensive operation. With a little work I could probably
  swap it out for a scale transform, which would be a lot cheaper.
  
* Network performance: There's a bug where the app makes repeat network
  requests when fetching nucleotides. This is pretty easily fixable,
  but I didn't get around to addressing it because it requires something
  a little more sophisticated than `_.debounce`.

* Usability: There are a number of usability issues with the default
  behavior of the d3 scroll library. You can't select text because clicking
  and dragging pans the view. Pinch zooming works but it's weirdly slow
  compared to scrolling. Horizontal scrolling with the trackpad should
  pan the view but instead it does nothing. You can also pan past the ends
  of the sequence when you zoom in. It's probably possible to override
  this behavior and continue using d3 scroll, but I didn't spend enough
  time investigating to figure out how to do it.

* Visual bugs: There are some minor visual glitches. The text clipping
  is very naive and will cut off the text in the middle of a letter.
  Related to that, the text sometimes overruns the right side of the
  annotation. Also, the little arrows on the annotations pop into
  view suddenly as the annotation gets big enough to show it rather
  than animating smoothly like everything else.
