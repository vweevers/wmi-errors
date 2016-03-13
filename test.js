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

  var errors6 = [
    new wmi.Error(undefined),
    new wmi.Error(null),
    new wmi.Error(0),
    new wmi.Error('beep'),
    new wmi.Error('OTHER_ERROR'),
    new wmi.Error('OtherError'),
    new wmi.OtherError(),

    wmi.Error(undefined),
    wmi.Error(null),
    wmi.Error(0),
    wmi.Error('beep'),
    wmi.Error('OTHER_ERROR'),
    wmi.Error('OtherError'),
    wmi.OtherError()
  ]

  errors6.forEach(function (err) {
    verify(t, err, 'OtherError', {
      errno: 0,
      code: null,
      message: 'Unknown error'
    })
  })

  var errors7 = [
    new wmi.Error('boop', undefined),
    new wmi.Error('boop', null),
    new wmi.Error('boop', 0),
    new wmi.Error('boop', 'beep'),
    new wmi.Error('boop', 'OTHER_ERROR'),
    new wmi.Error('boop', 'OtherError'),
    new wmi.OtherError('boop'),

    wmi.Error('boop', undefined),
    wmi.Error('boop', null),
    wmi.Error('boop', 0),
    wmi.Error('boop', 'beep'),
    wmi.Error('boop', 'OTHER_ERROR'),
    wmi.Error('boop', 'OtherError'),
    wmi.OtherError('boop')
  ]

  errors7.forEach(function (err) {
    verify(t, err, 'OtherError', {
      errno: 0,
      code: null,
      message: 'boop',
      cause: 'Unknown error'
    })
  })

  var errors8 = [
    new wmi.Error(undefined, undefined),
    new wmi.Error(null, null),
    new wmi.Error('', undefined),
    new wmi.Error('', null),
    new wmi.Error('', ''),
    new wmi.Error(''),
    new wmi.Error(undefined),
    new wmi.Error(),

    wmi.Error(undefined, undefined),
    wmi.Error(null, null),
    wmi.Error('', undefined),
    wmi.Error('', null),
    wmi.Error('', ''),
    wmi.Error(''),
    wmi.Error(undefined),
    wmi.Error(),
  ]

  errors8.forEach(function (err) {
    verify(t, err, 'OtherError', {
      errno: 0,
      code: null,
      message: 'Unknown error',
      cause: 'Unknown error'
    })
  })

  var errors9 = [0, '', undefined, ''].map(function(arg) {
    var inner = new Error('Beep')
    inner.errno = 34
    var outer = new wmi.Error(arg, inner)
    outer.expectedCause = inner
    return outer
  })

  errors9.forEach(function (err) {
    verify(t, err, 'OtherError', {
      errno: 34,
      code: null,
      message: 'Beep',
      cause: err.expectedCause
    })
  })

  var errors10 = [''].map(function() {
    var inner = new Error('Beep')
    inner.errno = 34
    var outer = new wmi.Error(inner)
    outer.expectedCause = inner
    return outer
  })

  errors10.forEach(function (err) {
    verify(t, err, 'OtherError', {
      errno: 34,
      code: null,
      message: 'Beep',
      cause: err.expectedCause
    })
  })

  var errors11 = [0, '', undefined, ''].map(function(arg) {
    var inner = new Error()
    inner.errno = 34
    inner.code = 'beep_boop'
    var outer = new wmi.Error(arg, inner)
    outer.expectedCause = inner
    return outer
  })

  errors11.forEach(function (err) {
    verify(t, err, 'OtherError', {
      errno: 34,
      code: 'beep_boop',
      message: 'Unknown error',
      cause: err.expectedCause
    })
  })

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
