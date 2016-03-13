# wmi-errors

**Error types for [Windows Management Instrumentation (WMI)](https://msdn.microsoft.com/en-us/library/windows/desktop/aa384642(v=vs.85).aspx). Get descriptive errors for [WbemErrorEnum](https://msdn.microsoft.com/en-us/library/windows/desktop/aa393978(v=vs.85).aspx) constants, with a call-stack captured at the time you create the error.**

```
throw new wmi.Error(2147749890)
^
 WbemNotFound: The object could not be found.
    at Object.<anonymous> (D:\Projecten\GitHub\wmi-errors\example.js:13:7)
    at Module._compile (module.js:410:26)
    at Object.Module._extensions..js (module.js:417:10)
    at Module.load (module.js:344:32)
    at Function.Module._load (module.js:301:12)
    at Function.Module.runMain (module.js:442:10)
    at startup (node.js:136:18)
    at node.js:966:3
```

[![npm status](http://img.shields.io/npm/v/wmi-errors.svg?style=flat-square)](https://www.npmjs.org/package/wmi-errors) [![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/wmi-errors.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/wmi-errors) [![Dependency status](https://img.shields.io/david/vweevers/wmi-errors.svg?style=flat-square)](https://david-dm.org/vweevers/wmi-errors)

## usage

```js
var wmi = require('wmi-errors')
var err = new wmi.Error(2147749890)

// Errors get a code, errno and message
console.log(err.code, err.errno)

// And have a simple hierarchy
console.log(err instanceof wmi.WbemNotFound)
console.log(err instanceof wmi.Error)
console.log(err instanceof Error)

// Create by errno, code, name or directly
throw new wmi.Error(2147749890)
throw new wmi.Error('2147749890')
throw new wmi.Error('WBEM_NOT_FOUND')
throw new wmi.Error('WbemNotFound')
throw new wmi.WbemNotFound()

// With a custom message
throw new wmi.Error('Thing was not found', 2147749890)
throw new wmi.WbemNotFound('Thing was not found')

// Wrap other error (must have a code, errno or message)
var err = new Error(2147749890)
throw new wmi.Error(err)

// That had a custom message
var inner = new Error('Custom message')
inner.code = 2147749890

// The original error is available as cause property
var outer = new wmi.Error(inner)
console.log(outer.cause === inner)

// Or give it a custom message
var inner = new Error(2147749890)
throw new wmi.Error('Custom message', inner)
```

## install

With [npm](https://npmjs.org) do:

```
npm install wmi-errors
```

## license

[MIT](http://opensource.org/licenses/MIT) © Vincent Weevers. Some code adapted from [errno](https://www.npmjs.com/package/errno) © 2012-2015 Rod Vagg. Error codes taken from [regedit](https://www.npmjs.com/package/regedit) © [ironSource](http://www.ironsrc.com/).
