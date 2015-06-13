/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	rot90 = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-rot90', function tests() {

	var mat;

	beforeEach( function before() {
		var data, i;

		data = new Int8Array( 6 );
		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [3,2], 'int8' );
	});

	it( 'should export a function', function test() {
		expect( rot90 ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is not matrix-like', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				rot90( value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				rot90( mat, value );
			};
		}
	});

	it( 'should rotate a matrix 90 degrees (by default)', function test() {
		var expected, out;

		out = rot90( mat );
		expected = '1,3,5;0,2,4';

		assert.strictEqual( out.toString(), expected );

		out = rot90( mat, {
			'k': 1
		});
		assert.strictEqual( out.toString(), expected );
	});

	it( 'should rotate a matrix 180 degrees', function test() {
		var expected, out;

		out = rot90( mat, {
			'k': 2
		});
		expected = '5,4;3,2;1,0';

		assert.strictEqual( out.toString(), expected );
	});

	it( 'should rotate a matrix 270 degrees', function test() {
		var expected, out;

		out = rot90( mat, {
			'k': 3
		});
		expected = '4,2,0;5,3,1';

		assert.strictEqual( out.toString(), expected );
	});

	it( 'should rotate a matrix 360 degrees', function test() {
		var expected, out;

		out = rot90( mat, {
			'k': 4
		});
		expected = '0,1;2,3;4,5';

		assert.strictEqual( out.toString(), expected );
	});

	it( 'should rotate a matrix k*90 degrees', function test() {
		var expected, out;

		out = rot90( mat, {
			'k': 7
		});
		expected = '4,2,0;5,3,1';

		assert.strictEqual( out.toString(), expected );
	});

	it( 'should rotate a matrix -90 degrees', function test() {
		var expected, out;

		out = rot90( mat, {
			'k': -1
		});
		expected = '4,2,0;5,3,1';

		assert.strictEqual( out.toString(), expected );
	});

	it( 'should rotate a matrix -180 degrees', function test() {
		var expected, out;

		out = rot90( mat, {
			'k': -2
		});
		expected = '5,4;3,2;1,0';

		assert.strictEqual( out.toString(), expected );
	});

	it( 'should rotate a matrix -360 degrees', function test() {
		var expected, out;

		out = rot90( mat, {
			'k': -4
		});
		expected = '0,1;2,3;4,5';

		assert.strictEqual( out.toString(), expected );
	});

	it( 'should rotate a matrix view by 90 degrees', function test() {
		var expected, out;

		// Flip horizontally...
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		out = rot90( mat, {
			'k': 1
		});
		expected = '0,2,4;1,3,5';

		assert.strictEqual( out.toString(), expected );

		// Flip vertically...
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		out = rot90( mat, {
			'k': 1
		});
		expected = '4,2,0;5,3,1';

		assert.strictEqual( out.toString(), expected );

		// Flip horizontally...
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length - mat.strides[1] - 1;

		out = rot90( mat, {
			'k': 1
		});
		expected = '5,3,1;4,2,0';

		assert.strictEqual( out.toString(), expected );
	});

	it( 'should rotate a matrix view by 180 degrees', function test() {
		var expected, out;

		// Flip horizontally...
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		out = rot90( mat, {
			'k': 2
		});
		expected = '4,5;2,3;0,1';

		assert.strictEqual( out.toString(), expected );

		// Flip vertically...
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		out = rot90( mat, {
			'k': 2
		});
		expected = '0,1;2,3;4,5';

		assert.strictEqual( out.toString(), expected );

		// Flip horizontally...
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length - mat.strides[1] - 1;

		out = rot90( mat, {
			'k': 2
		});
		expected = '1,0;3,2;5,4';

		assert.strictEqual( out.toString(), expected );
	});

	it( 'should rotate and mutate a matrix', function test() {
		var expected, out;

		out = rot90( mat, {
			'copy': false,
			'k': -2
		});
		expected = '5,4;3,2;1,0';

		assert.strictEqual( out.toString(), expected );
		assert.strictEqual( mat, out );
	});

});
