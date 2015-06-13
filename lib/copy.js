'use strict';

// MODULES //

var ctors = require( 'compute-array-constructors' );


// COPY //

/**
* FUNCTION: copy( mat )
*	Copies a matrix.
*
* @param {Matrix} mat - input matrix
* @returns {Matrix} output matrix
*/
function copy( mat ) {
	/* jshint newcap:false */
	var ctor,
		d,
		sh, s;

	// Copy the matrix data to a new typed array:
	ctor = ctors( mat.dtype );
	d = new ctor( mat.data );

	// Copy the shape:
	sh = [ mat.shape[0], mat.shape[1] ];

	// Copy the strides:
	s = [ mat.strides[0], mat.strides[1] ];

	// Return a new matrix:
	return new mat.constructor( d, mat.dtype, sh, mat.offset, s );
} // end FUNCTION copy()


// EXPORTS //

module.exports = copy;
