const assert = require('assert')

const deepEquals = (a, b) => {
  if (typeof a !== typeof b)
    return false

  if (typeof a === 'object') {
    for (const key in a) {
      const val = a[key]
      if (!b[key] || b[key] !== val) return false
    }
    return true
  } else {
    return a === b
  }
}

assert.equal(deepEquals( 'a', 'a' ), true, `deepEquals('a', 'a') failed assertion. Expected 'true' but got '${deepEquals('a', 'a')}'`)
assert.equal(deepEquals(   1, 1   ), true, `deepEquals(1, 1) failed assertion. Expected 'true' but got '${deepEquals(1, 1)}'`)
assert.equal(deepEquals( 'a', 1   ), false, `deepEquals('a', 1) failed assertion. Expected 'false' but got '${deepEquals('a', 1)}'`)
assert.equal(deepEquals(  {}, {}  ), true, `deepEquals({}, {}) failed assertion. Expected 'true' but got '${deepEquals({}, {})}'`)
assert.equal(deepEquals(  {}, []  ), false, `deepEquals({}, []) failed assertion. Expected 'false' but got '${deepEquals({}, [])}'`)
assert.equal(deepEquals(  {}, null), false, `deepEquals({}, null) failed assertion. Expected 'false' but got '${deepEquals({}, null)}'`)
assert.equal(deepEquals(/a/g, {}  ), false, `deepEquals(/a/g, {}) failed assertion. Expected 'false' but got '${deepEquals(/a/g, {})}'`)