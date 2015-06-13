'use strict';

// MODULES //

var isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	validate = require( './validate.js' );


// ROTATE 90 //

/**
* FUNCTION: rot90( matrix[, opts] )
*	Rotates a matrix by 90 degrees.
*
* @param {Matrix} matrix - input matrix
* @param {Object} [opts] - function options
* @param {Number} [opts.k=1] - number of times to rotate input matrix by 90 degrees
* @returns {Matrix} output matrix
*/
function rot90( mat, options ) {
	/* jshint newcap:false */
	var opts,
		ctor,
		err,
		d,
		m;

	if ( !isMatrixLike( mat ) ) {
		throw new TypeError( 'rot90()::invalid input argument. First argument must be a matrix. Value: `' + mat + '`.' );
	}
	opts = {};
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	} else {
		opts.copy = true;
	}
	if ( opts.k === void 0 ) {
		opts.k = 1;
	}
	if ( opts.copy ) {
		// Copy the matrix data to a new typed array:
		ctor = ctors( mat.dtype );
		d = new ctor( mat.data );

		// Copy the strides:
		s = [ mat.strides[0], mat.strides[1] ];

		// Copy the shape:
		sh = [ mat.shape[0], mat.shape[1] ];

		// Create a new matrix:
		m = new mat.constructor( d, mat.dtype, sh, o, s );

		// Return the new matrix:
		return m;
	} else {
		mat.strides[ 1 ] *= -1;
		o = 0;
		for ( i = 0; i < mat.ndims; i++ ) {
			if ( mat.strides[ i ] < 0 ) {
				o -= ( mat.shape[i]-1 ) * mat.strides[ i ];
			}
		}
		mat.offset = o;
		return mat;
	}
} // end FUNCTION rot90()


// EXPORTS //

module.exports = rot90;
