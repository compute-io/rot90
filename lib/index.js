'use strict';

// MODULES //

var isMatrixLike = require( 'validate.io-matrix-like' ),
	copy = require( './copy.js' ),
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
		err,
		out,
		tmp,
		k,
		o,
		i;
	if ( !isMatrixLike( mat ) ) {
		throw new TypeError( 'rot90()::invalid input argument. First argument must be a matrix. Value: `' + mat + '`.' );
	}
	opts = {};
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	k = opts.k;
	if ( k === void 0 ) {
		k = 1;
	} else {
		k = k % 4;
		if ( k < 0 ) {
			k = 4 + k;
		}
	}
	if ( opts.copy === false ) {
		out = mat;
	} else {
		out = copy( mat );
	}
	if ( k === 0 ) {
		return out;
	}
	// Rotate once...
	if ( k === 1 ) {
		// Flip horizontally...
		out.strides[ 1 ] *= -1;
		o = 0;
		for ( i = 0; i < out.ndims; i++ ) {
			if ( out.strides[ i ] < 0 ) {
				o -= ( out.shape[i]-1 ) * out.strides[ i ];
			}
		}
		out.offset = o;

		// Swap dimensions...
		tmp = out.shape[ 0 ];
		out.shape[ 0 ] = out.shape[ 1 ];
		out.shape[ 1 ] = tmp;

		// Swap strides...
		tmp = out.strides[ 0 ];
		out.strides[ 0 ] = out.strides[ 1 ];
		out.strides[ 1 ] = tmp;

		return out;
	}
	// Rotate twice...
	if ( k === 2 ) {
		// Flip horizontally and vertically...
		out.strides[ 0 ] *= -1;
		out.strides[ 1 ] *= -1;
		o = 0;
		for ( i = 0; i < out.ndims; i++ ) {
			if ( out.strides[ i ] < 0 ) {
				o -= ( out.shape[i]-1 ) * out.strides[ i ];
			}
		}
		out.offset = o;
		return out;
	}
	// Rotate thrice...

	// Swap dimensions...
	tmp = out.shape[ 0 ];
	out.shape[ 0 ] = out.shape[ 1 ];
	out.shape[ 1 ] = tmp;

	// Swap strides...
	tmp = out.strides[ 0 ];
	out.strides[ 0 ] = out.strides[ 1 ];
	out.strides[ 1 ] = tmp;

	// Flip horizontally...
	out.strides[ 1 ] *= -1;
	o = 0;
	for ( i = 0; i < out.ndims; i++ ) {
		if ( out.strides[ i ] < 0 ) {
			o -= ( out.shape[i]-1 ) * out.strides[ i ];
		}
	}
	out.offset = o;
	return out;
} // end FUNCTION rot90()


// EXPORTS //

module.exports = rot90;
