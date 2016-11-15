[![Build Status](https://travis-ci.org/FloatingIntegers/autocomplete-app.svg?branch=master)](https://travis-ci.org/FloatingIntegers/autocomplete-app)

[![codecov](https://codecov.io/gh/FloatingIntegers/autocomplete-app/branch/master/graph/badge.svg)](https://codecov.io/gh/FloatingIntegers/autocomplete-app)

[![Code Climate](https://codeclimate.com/github/FloatingIntegers/autocomplete-app/badges/gpa.svg)](https://codeclimate.com/github/FloatingIntegers/autocomplete-app)

# Autocomplete Project

## Quickstart guide
``` bash
git clone <our repository name>
cd <our repository path>
npm install
npm start
```
And to see the tests:
``` bash
npm run test
```

## What?

Autocomplete application that returns the closest 10 word matches of a string entered
into a form input field and updates as you type.

URL (hosted on heroku): https://mighty-refuge-83559.herokuapp.com/public/origami.html

## How?

Each key-press event in the form input field sends an ajax request to the server
with the string entered thus far as a query string. On the server-side, a read
stream is created that reads through a dictionary text file word by word, uses the query
string to filter out matches, and streams the filtered words into the response body.
The client-side then uses the response to populate a series of divs under
the form input with the filtered words.

The origami animations are implemented using a css library called [OriDomi](http://oridomi.com/).

## Testing
Jasmine is used to test the front-end, and tape is used to test the back-end.

## Stretch Goals

* Adjust accordion to resize to the number of filtered words returned.
* ~~Make it so that you can select each filtered word returned and populate the
input field with it.~~
* Have the placeholder text of the input field remain as you type and be changed
to the first filtered word returned as you type.
