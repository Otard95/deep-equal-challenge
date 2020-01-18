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

console.log(deepEquals('a', 'a')) // true  => true
console.log(deepEquals(1, 1))     // true  => true
console.log(deepEquals('a', 1))   // false => false
console.log(deepEquals({}, {}))   // true  => true
console.log(deepEquals({}, []))   // true  => false
console.log(deepEquals({}, null)) // true  => false
console.log(deepEquals(/a/g, {})) // true  => false