const assert = require('assert')
// assert(条件， msg)，条件为false才会打印出来msg
assert(5>3, '啥也不会打出来')
// assert(5<3, '错了')
assert.deepEqual({id:1}, {id:1}, '等不等')
assert.deepStrictEqual({id:1}, {id:1}, '严格相等？')