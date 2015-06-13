/* jshint -W099 */ // allow mixed spaces and tabs
'use strict';

var matrix = require( 'dstructs-matrix' ),
	rot90 = require( './../lib' );

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
console.log( out.toString() );

// Rotate the matrix 180 degrees...
out = rot90( mat, {
	'k': 2
});
/*
	[ 5 4
	  3 2
	  1 0 ]
*/
console.log( out.toString() );

// Rotate the matrix 270 degrees...
out = rot90( mat, {
	'k': 3
});
/*
	[ 4 2 0
	  5 3 1 ]
*/
console.log( out.toString() );

// Rotate the matrix 360 degrees...
out = rot90( mat, {
	'k': 4
});
/*
	[ 0 1
	  2 3
	  4 5 ]
*/
console.log( out.toString() );

// Rotate the matrix -90 (equiv to +270) degrees...
out = rot90( mat, {
	'k': -1
});
/*
	[ 4 2 0
	  5 3 1 ]
*/
console.log( out.toString() );

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
console.log( out.toString() );
console.log( 'Mutated: ', out === mat );
