'use strict';

/**
 * Prototypes for strings.
 * (C) 2013 Alex Fernández.
 */

// requires
var testing = require('testing');
var object = require('./object.js');
var Log = require('log');

// globals
var log = new Log('info');
var newString = {};

/**
 * Find out if the string has the parameter at the beginning.
 */
newString.startsWith = function(str)
{
	return this.slice(0, str.length) == str;
};

/**
 * Find out if the string ends with the given parameter.
 */
newString.endsWith = function(str)
{
	return this.slice(this.length - str.length) == str;
};

/**
 * Run tests for start and end with.
 */
function testStartsEndsWith(callback)
{
	testing.assert('pepito'.startsWith('pe'), 'Failed to match using startsWith()', callback);
	testing.assert(!'pepito'.startsWith('po'), 'Invalid match using startsWith()', callback);
	testing.assert('pepito'.endsWith('to'), 'Failed to match using endsWith()', callback);
	testing.assert(!'pepito'.startsWith('po'), 'Invalid match using endsWith()', callback);
	testing.success(callback);
}

/**
 * Return the piece of string until the argument is found.
 * 'hi.there'.substringUpTo('.') => 'hi'
 */
newString.substringUpTo = function(str)
{
	if (!this.contains(str))
	{
		return this;
	}
	return this.slice(0, this.indexOf(str));
};

/**
 * Return the piece of string up until the last occurrence of the argument.
 * 'hi.there.you'.substringUpToLast('.') => 'hi.there'
 */
newString.substringUpToLast = function(str)
{
	if (!this.contains(str))
	{
		return this;
	}
	return this.slice(0, this.lastIndexOf(str));
};

/**
 * Return the piece of string starting with the argument; empty string if not found.
 * 'hi.there'.substringFrom('.') => 'there'
 */
newString.substringFrom = function(str)
{
	if (!this.contains(str))
	{
		return '';
	}
	return this.slice(this.indexOf(str) + str.length);
};

/**
 * Return the piece from the last occurrence of the argument; empty string if not found.
 * 'hi.there.you'.substringFromLast('.') => 'you'
 */
newString.substringFromLast = function(str)
{
	if (!this.contains(str))
	{
		return '';
	}
	return this.slice(this.lastIndexOf(str) + str.length);
};

/**
 * Run tests for substrings.
 */
function testSubstrings(callback)
{
	testing.assertEquals('hi.there.you'.substringUpTo('.'), 'hi', 'String.substringUpTo() not working!', callback);
	testing.assertEquals('hi.there.you'.substringUpToLast('.'), 'hi.there', 'String.substringUpToLast() not working!', callback);
	testing.assertEquals('hi.there.you'.substringFrom('.'), 'there.you', 'String.substringFrom() not working!', callback);
	testing.assertEquals('hi.there.you'.substringFromLast('.'), 'you', 'String.substringFromLast() not working!', callback);
	testing.success(callback);
}

/**
 * Find out if the string contains the argument at any position.
 */
newString.contains = function(str)
{
	return this.indexOf(str) != -1;
};

/**
 * Test contains.
 */
function testContains(callback)
{
	testing.assert('abcde'.contains('bcd'), 'Contains included', callback);
	testing.assert(!'abcde'.contains('dcb'), 'Not contains excluded', callback);
	testing.success(callback);
}

/**
 * Replace all occurrences of a string with the replacement.
 */
newString.replaceAll = function(find, replace)
{
	return this.split(find).join(replace);
};

/**
 * Test replace all.
 */
function testReplaceAll(callback)
{
	testing.assertEquals('pepito'.replaceAll('p', 'c'), 'cecito', 'Invalid replaceAll().', callback);
	testing.assertEquals('ababab'.replace('a', 'x'), 'xbabab', 'Invalid replacement', callback);
	testing.assertEquals('ababab'.replaceAll('a', 'x'), 'xbxbxb', 'Invalid replacement for all', callback);
	testing.success(callback);
}

/**
 * Repeat the given string a few times.
 * Based on: http://stackoverflow.com/a/5450113/978796
 */
newString.repeat = function(count)
{
	if (count < 1)
	{
		return '';
	}
	var result = '', pattern = this.valueOf();
	while (count > 0)
	{
		if (count & 1)
		{
			result += pattern;
		}
		count >>= 1;
		pattern += pattern;
	}
	return result;
};

/**
 * Test repeat.
 */
function testRepeat(callback)
{
	for (var i = 0; i < 10; i++)
	{
		testing.assertEquals('p'.repeat(i).length, i, 'Invalid repeat p.', callback);
	}
	testing.success(callback);
}

/**
 * Capitalize a string: first letter upper case, rest as is.
 */
newString.capitalize = function()
{
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// add new string functions to string prototype
object.addProperties(String.prototype, newString);

/**
 * Run package tests.
 */
exports.test = function(callback)
{
	log.debug('Running tests');
	var tests = {
		startsEndsWith: testStartsEndsWith,
		substrings: testSubstrings,
		contains: testContains,
		replaceAll: testReplaceAll,
		repeat: testRepeat,
	};
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])  
{
	exports.test(testing.show);
}
