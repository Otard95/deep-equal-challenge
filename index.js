const assert = require('assert')

const deepEquals = (a, b) => {

	if(a === undefined || b === undefined || a === null || b === null) return a === b;

	if(String(a) !== String(b)) return false;

	const compareProperties = (a, b) => {

		const
			aProperties = Object.getOwnPropertyNames(a),
			bProperties = Object.getOwnPropertyNames(b);

		for (let property in aProperties) {

			if (!bProperties.hasOwnProperty(property) || a[property] !== b[property]) return false;

		}

		return true;

	};

	if (!compareProperties(a, b) || !compareProperties(Object.getPrototypeOf(a), Object.getPrototypeOf(b))) return false;

	if(a instanceof Object && Symbol.iterator in a){

		for (let property in a) {

			if (!b.hasOwnProperty(property) || !equals(a[property], b[property])) return false;

		}

	}

	return true;

}

// Not tricked by types
assert.equal(deepEquals( 'a', 'a' ),  true, `deepEquals('a', 'a') failed assertion. Expected 'true' but got '${deepEquals('a', 'a')}'`)
assert.equal(deepEquals(   1, 1   ),  true, `deepEquals(1, 1) failed assertion. Expected 'true' but got '${deepEquals(1, 1)}'`)
assert.equal(deepEquals( 'a', 1   ), false, `deepEquals('a', 1) failed assertion. Expected 'false' but got '${deepEquals('a', 1)}'`)
assert.equal(deepEquals(  {}, {}  ),  true, `deepEquals({}, {}) failed assertion. Expected 'true' but got '${deepEquals({}, {})}'`)
assert.equal(deepEquals(  {}, []  ), false, `deepEquals({}, []) failed assertion. Expected 'false' but got '${deepEquals({}, [])}'`)
assert.equal(deepEquals(  {}, null), false, `deepEquals({}, null) failed assertion. Expected 'false' but got '${deepEquals({}, null)}'`)
assert.equal(deepEquals(/a/g, {}  ), false, `deepEquals(/a/g, {}) failed assertion. Expected 'false' but got '${deepEquals(/a/g, {})}'`)

// Works as intended
assert.equal(deepEquals(
  { a: 1, b: 'qwe', c: { d: [ 1, 'asd' ] } },
  { a: 1, b: 'qwe', c: { d: [ 1, 'asd' ] } }
), true, `deepEquals(...) failed assertion. Expected 'true' but got 'false`)
assert.equal(deepEquals(
  { a: 2, b: 'qwe', c: { d: [ 1, 'asd' ] } },
  { a: 1, b: 'qwe', c: { d: [ 1, 'asd' ] } }
), false, `deepEquals(...) failed assertion. Expected 'false' but got 'true'`)
assert.equal(deepEquals(
  { a: 1, b: 'qwe', c: { d: [ 1, 'asd' ] } },
  { a: 1, b: 'qwe', c: { d: [ '1', 'asd' ] } }
), false, `deepEquals(...) failed assertion. Expected 'false' but got 'true'`)
assert.equal(deepEquals(
  { a: 1, b: 'qwe', c: { d: [ 1, 'asd' ] } },
  { a: 1, b: 'qwe', c: { d: [ '1', 'asd' ] } }
), false, `deepEquals(...) failed assertion. Expected 'false' but got 'true'`)
assert.equal(deepEquals(
  [ 1, 'asd', { a: 'b', c: 123 } ]
  [ 1, 'asd', { a: 'b', c: 123 } ]
), true, `deepEquals(...) failed assertion. Expected 'true' but got 'false'`)
