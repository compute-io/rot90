rot90
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Rotates a [matrix](https://github.com/dstructs/matrix) by 90 degrees.


## Installation

``` bash
$ npm install compute-rot90
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var foo = require( 'compute-rot90' );
```

#### rot90( matrix[, options] )

Rotates a [`matrix`](https://github.com/dstructs/matrix) by `90` degrees in the __counterclockwise__ direction.

``` javascript
var matrix = require( 'dstructs-matrix' );

var data = new Float32Array( 6 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
var mat = matrix( data, [3,2], 'float32' );
/*
	[ 0 1
	  2 3 
	  4 5 ]
*/

var out = rot90( mat );
/*
	[ 1 3 5
	  0 2 4 ]
*/
```

The function accepts the following `options`:
*	__k__: number of times to rotate a [`matrix`](https://github.com/dstructs/matrix) by `90` degrees. Default: `1`.
*	__copy__: `boolean` indicating whether to return a new [`matrix`](https://github.com/dstructs/matrix). Default: `true`.

To rotate a [`matrix`](https://github.com/dstructs/matrix) multiple times, set the `k` option.

``` javascript
// Rotate the matrix 3 times...
var out = rot90( mat, {
	'k': 3
});
/*
	[ 4 2 0
	  5 3 1 ]
*/
```

`k` may also be negative and thus rotate the [`matrix`](https://github.com/dstructs/matrix) in a __clockwise__ direction.

``` javascript
var out = rot90( mat, {
	'k': -2
});
/*
	[ 5 4
	  3 2
	  1 0 ]
*/
```

By default, the function returns a new [matrix](https://github.com/dstructs/matrix) instance. To mutate the input [matrix](https://github.com/dstructs/matrix), set the `copy` option to `false`.

``` javascript
var out = rot90( mat, {
	'copy': false
});
/*
	[ 1 3 5
	  0 2 4 ]
*/

var bool = ( mat === out );
// returns true
```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	rot90 = require( 'compute-rot90' );

var nRows = 3,
	nCols = 2,
	mat,
	out,
	i, j;

mat = matrix( [nRows,nCols], 'int32' );
for ( i = 0; i < nRows; i++ ) {
	for ( j = 0; j < nCols; j++ ) {
		mat.set( i, j, i*nRows + j );
	}
}
/*
	[ 0 1
	  2 3
	  4 5 ]
*/

// Rotate the matrix 90 degrees...
out = rot90( mat );
/*
	[ 1 3 5
	  0 2 4 ]
*/

// Rotate the matrix 180 degrees...
out = rot90( mat, {
	'k': 2
});
/*
	[ 5 4
	  3 2
	  1 0 ]
*/

// Rotate the matrix 270 degrees...
out = rot90( mat, {
	'k': 3
});
/*
	[ 4 2 0
	  5 3 1 ]
*/

// Rotate the matrix 360 degrees...
out = rot90( mat, {
	'k': 4
});
/*
	[ 0 1
	  2 3
	  4 5 ]
*/

// Rotate the matrix -90 (equiv to +270) degrees...
out = rot90( mat, {
	'k': -1
});
/*
	[ 4 2 0
	  5 3 1 ]
*/

// Rotate the matrix -180 (equiv to +180) degrees and mutate...
out = rot90( mat, {
	'copy': false,
	'k': -2
});
/*
	[ 5 4
	  3 2
	  1 0 ]
*/
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-rot90.svg
[npm-url]: https://npmjs.org/package/compute-rot90

[travis-image]: http://img.shields.io/travis/compute-io/rot90/master.svg
[travis-url]: https://travis-ci.org/compute-io/rot90

[coveralls-image]: https://img.shields.io/coveralls/compute-io/rot90/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/rot90?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/rot90.svg
[dependencies-url]: https://david-dm.org/compute-io/rot90

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/rot90.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/rot90

[github-issues-image]: http://img.shields.io/github/issues/compute-io/rot90.svg
[github-issues-url]: https://github.com/compute-io/rot90/issues
