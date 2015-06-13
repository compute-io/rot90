/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	copy = require( './../lib/copy.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'copy', function tests() {

	it( 'should export a function', function test() {
		expect( copy ).to.be.a( 'function' );
	});

	it( 'should copy a matrix', function test() {
		var data,
			mat,
			out,
			i;

		data = new Int32Array( 6 );
		for ( i = 0; i <  data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [3,2], 'int32' );

		out = copy( mat );

		assert.strictEqual( mat.toString(), out.toString() );
		assert.strictEqual( mat.dtype, out.dtype );
		assert.strictEqual( mat.offset, out.offset );
		assert.deepEqual( mat.shape, out.shape );
		assert.deepEqual( mat.strides, out.strides );
		assert.deepEqual( mat.data, out.data );
		assert.notEqual( mat, out );
		assert.notEqual( mat.shape, out.shape );
		assert.notEqual( mat.strides, out.strides );
	});

});
