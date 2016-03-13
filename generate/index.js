const pascalCase = require('pascal-case')
    , constantCase = require('constant-case')
    , js = []

require('./errors.json').forEach(function(err) {
  const errno = err.code
      , name = 'Wbem' + err.error.slice(7)
      , type = pascalCase(name)
      , code = constantCase(name)
      , desc = err.description ? `"${err.description}"` : null

  js.push(`exports.${type} = exports.${code} = exports[${errno}] =`)
  js.push(`  createError("${type}", "${code}", ${errno}, ${desc})`)
  js.push('')
})

console.log(js.join('\n'))
