var test = require('tape')
  , wmi = require('./')
  , stackParser = require('stack-parser')

test('factory', function (t) {
  var errors1 = [
    new wmi.Error(2147749893),
    new wmi.Error('2147749893'),
    new wmi.Error('WBEM_TYPE_MISMATCH'),
    new wmi.Error('WbemTypeMismatch'),
    new wmi.WbemTypeMismatch(),

    wmi.Error(2147749893),
    wmi.Error('2147749893'),
    wmi.Error('WBEM_TYPE_MISMATCH'),
    wmi.Error('WbemTypeMismatch'),
    wmi.WbemTypeMismatch()
  ]

  errors1.forEach(function (err) {
    verify(t, err, 'WbemTypeMismatch', {
      errno: 2147749893,
      code: 'WBEM_TYPE_MISMATCH',
      message: 'A type mismatch occurred.',
      cause: 'A type mismatch occurred.'
    })
  })

  var errors2 = [
    new wmi.Error('Custom', 2147749893),
    new wmi.Error('Custom', '2147749893'),
    new wmi.Error('Custom', 'WBEM_TYPE_MISMATCH'),
    new wmi.Error('Custom', 'WbemTypeMismatch'),
    new wmi.WbemTypeMismatch('Custom'),

    wmi.Error('Custom', 2147749893),
    wmi.Error('Custom', '2147749893'),
    wmi.Error('Custom', 'WBEM_TYPE_MISMATCH'),
    wmi.Error('Custom', 'WbemTypeMismatch'),
    wmi.WbemTypeMismatch('Custom')
  ]

  errors2.forEach(function (err) {
    verify(t, err, 'WbemTypeMismatch', {
      errno: 2147749893,
      code: 'WBEM_TYPE_MISMATCH',
      message: 'Custom',
      cause: 'A type mismatch occurred.'
    })
  })

  var errors3 = [
    new Error(2147749893),
    new Error('2147749893'),
    new Error('WBEM_TYPE_MISMATCH'),
    new Error('WbemTypeMismatch')
  ].map(function(inner) {
    var outer = new wmi.Error(inner)
    outer.expectedCause = inner
    return outer
  })

  errors3.forEach(function (err) {
    verify(t, err, 'WbemTypeMismatch', {
      errno: 2147749893,
      code: 'WBEM_TYPE_MISMATCH',
      message: 'A type mismatch occurred.',
      cause: err.expectedCause
    })
  })

  var errors4 = [
    2147749893,
    '2147749893',
    'WBEM_TYPE_MISMATCH',
    'WbemTypeMismatch'
  ].map(function(code) {
    var inner = new Error('Beep')
    inner.code = code
    var outer = new wmi.Error(inner)
    outer.expectedCause = inner
    return outer
  })

  errors4.forEach(function (err) {
    verify(t, err, 'WbemTypeMismatch', {
      errno: 2147749893,
      code: 'WBEM_TYPE_MISMATCH',
      message: 'Beep',
      cause: err.expectedCause
    })
  })

  // Quite lenient, maybe too much
  var errors5 = [
    2147749893,
    '2147749893',
    'WBEM_TYPE_MISMATCH',
    'WbemTypeMismatch'
  ].map(function(code) {
    var inner = new Error('Beep')
    inner.errno = code
    var outer = new wmi.Error(inner)
    outer.expectedCause = inner
    return outer
  })

  errors5.forEach(function (err) {
    verify(t, err, 'WbemTypeMismatch', {
      errno: 2147749893,
      code: 'WBEM_TYPE_MISMATCH',
      message: 'Beep',
      cause: err.expectedCause
    })
  })

  t.end()
})

// Not sure if it should..
test('Unknown type throws', function (t) {
  t.throws(wmi.Error)
  t.throws(wmi.Error.bind(wmi.Error, 2))
  t.ok(wmi.Error(2147749893))
  t.end()
})

test('stack', function stackTest(t) {
  var err = new wmi.Error(2147749896)
  var site = stackParser.parse(err.stack)[0]
  t.same(site.what, 'Test.stackTest', 'stack ok')
  t.end()
})

function verify (t, err, type, props) {
  t.ok(err instanceof wmi[type], 'instanceof ' + type)
  t.ok(err instanceof wmi.Error, 'instanceof wmi.Error')
  t.ok(err instanceof Error, 'instanceof Error')

  t.is(err.name, type, 'name ok')
  t.is(err.type, type, 'type ok')

  Object.keys(props).forEach(function (prop) {
    t.is(err[prop], props[prop], prop + ' ok')
  })
}
