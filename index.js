'use strict';

var prr = require('prr')

// Factory and generic prototype (helpful for `instanceof`)
function WmiError (message_, cause_) {
  // Called like a factory
  if (arguments.length) {
    if (arguments.length === 1 || cause_ === undefined) {
      var cause = message_, message
    } else {
      cause = cause_
      message = message_
    }

    if (typeof cause === 'number') var type = exports[cause]
    else if (typeof cause === 'string') type = exports[cause]
    else if (cause) {
      var child = cause

      if (type = exports[cause.message]) {
        // Don't copy message
      } else {
        message = message || cause.message
        type = exports[cause.code]  ||
               exports[cause.errno] ||
               exports[cause.type]
      }
    }

    if (!type) throw new TypeError('Unknown error code or errno: ' + cause)
    if (type !== WmiError) return new type(message, child)
  }

  if (!(this instanceof WmiError)) {
    throw new Error('Illegal usage')
  }

  Error.call(this)
}

WmiError.prototype = new Error()

function createError (type, code, errno, description) {
  var Type = function (message, cause) {
    if (!(this instanceof Type)) return new Type(message, cause)

    WmiError.call(this)

    if (!message) message = description
    else if (typeof message === 'number') message = String(message)
    else if (message && typeof message !== 'string') message = message.message

    prr(this, {
        type    : type
      , name    : type
      , cause   : cause || description
      , message : message
      , code    : code
      , errno   : errno
    }, 'ewr')

    if (Error.captureStackTrace) Error.captureStackTrace(this, WmiError)
  }

  Type.prototype = new WmiError()
  return Type
}

exports.Error = WmiError

// Everything below was generated with `node generate`

exports.WbemFailed = exports.WBEM_FAILED = exports[2147749889] =
  createError("WbemFailed", "WBEM_FAILED", 2147749889, "The call failed.")

exports.WbemNotFound = exports.WBEM_NOT_FOUND = exports[2147749890] =
  createError("WbemNotFound", "WBEM_NOT_FOUND", 2147749890, "The object could not be found.")

exports.WbemAccessDenied = exports.WBEM_ACCESS_DENIED = exports[2147749891] =
  createError("WbemAccessDenied", "WBEM_ACCESS_DENIED", 2147749891, "The current user does not have permission to perform the action.")

exports.WbemProviderFailure = exports.WBEM_PROVIDER_FAILURE = exports[2147749892] =
  createError("WbemProviderFailure", "WBEM_PROVIDER_FAILURE", 2147749892, "The provider has failed at some time other than during initialization.")

exports.WbemTypeMismatch = exports.WBEM_TYPE_MISMATCH = exports[2147749893] =
  createError("WbemTypeMismatch", "WBEM_TYPE_MISMATCH", 2147749893, "A type mismatch occurred.")

exports.WbemOutOfMemory = exports.WBEM_OUT_OF_MEMORY = exports[2147749894] =
  createError("WbemOutOfMemory", "WBEM_OUT_OF_MEMORY", 2147749894, "There was not enough memory for the operation.")

exports.WbemInvalidContext = exports.WBEM_INVALID_CONTEXT = exports[2147749895] =
  createError("WbemInvalidContext", "WBEM_INVALID_CONTEXT", 2147749895, "The SWbemNamedValue object is not valid.")

exports.WbemInvalidParameter = exports.WBEM_INVALID_PARAMETER = exports[2147749896] =
  createError("WbemInvalidParameter", "WBEM_INVALID_PARAMETER", 2147749896, "One of the parameters to the call is not correct.")

exports.WbemNotAvailable = exports.WBEM_NOT_AVAILABLE = exports[2147749897] =
  createError("WbemNotAvailable", "WBEM_NOT_AVAILABLE", 2147749897, "The resource, typically a remote server, is not currently available.")

exports.WbemCriticalError = exports.WBEM_CRITICAL_ERROR = exports[2147749898] =
  createError("WbemCriticalError", "WBEM_CRITICAL_ERROR", 2147749898, "An internal, critical, and unexpected error occurred. Report this error to Microsoft Technical Support.")

exports.WbemInvalidStream = exports.WBEM_INVALID_STREAM = exports[2147749899] =
  createError("WbemInvalidStream", "WBEM_INVALID_STREAM", 2147749899, "One or more network packets were corrupted during a remote session.")

exports.WbemNotSupported = exports.WBEM_NOT_SUPPORTED = exports[2147749900] =
  createError("WbemNotSupported", "WBEM_NOT_SUPPORTED", 2147749900, "The feature or operation is not supported.")

exports.WbemInvalidSuperclass = exports.WBEM_INVALID_SUPERCLASS = exports[2147749901] =
  createError("WbemInvalidSuperclass", "WBEM_INVALID_SUPERCLASS", 2147749901, "The parent class specified is not valid.")

exports.WbemInvalidNamespace = exports.WBEM_INVALID_NAMESPACE = exports[2147749902] =
  createError("WbemInvalidNamespace", "WBEM_INVALID_NAMESPACE", 2147749902, "The namespace specified could not be found.")

exports.WbemInvalidObject = exports.WBEM_INVALID_OBJECT = exports[2147749903] =
  createError("WbemInvalidObject", "WBEM_INVALID_OBJECT", 2147749903, "The specified instance is not valid.")

exports.WbemInvalidClass = exports.WBEM_INVALID_CLASS = exports[2147749904] =
  createError("WbemInvalidClass", "WBEM_INVALID_CLASS", 2147749904, "The specified class is not valid.")

exports.WbemProviderNotFound = exports.WBEM_PROVIDER_NOT_FOUND = exports[2147749905] =
  createError("WbemProviderNotFound", "WBEM_PROVIDER_NOT_FOUND", 2147749905, "A provider referenced in the schema does not have a corresponding registration.")

exports.WbemInvalidProviderRegistration = exports.WBEM_INVALID_PROVIDER_REGISTRATION = exports[2147749906] =
  createError("WbemInvalidProviderRegistration", "WBEM_INVALID_PROVIDER_REGISTRATION", 2147749906, "A provider referenced in the schema has an incorrect or incomplete registration. This error may be caused by a missing pragma namespace command in the MOF file used to register the provider, resulting in the provider being registered in the wrong WMI namespace. This error may also be caused by a corrupt repository, which may be fixed by deleting it and recompiling the MOF files.")

exports.WbemProviderLoadFailure = exports.WBEM_PROVIDER_LOAD_FAILURE = exports[2147749907] =
  createError("WbemProviderLoadFailure", "WBEM_PROVIDER_LOAD_FAILURE", 2147749907, "COM cannot locate a provider referenced in the schema. This error may be caused by any of the following:")

exports.WbemInitializationFailure = exports.WBEM_INITIALIZATION_FAILURE = exports[2147749908] =
  createError("WbemInitializationFailure", "WBEM_INITIALIZATION_FAILURE", 2147749908, "A component, such as a provider, failed to initialize for internal reasons.")

exports.WbemTransportFailure = exports.WBEM_TRANSPORT_FAILURE = exports[2147749909] =
  createError("WbemTransportFailure", "WBEM_TRANSPORT_FAILURE", 2147749909, "A networking error occurred, preventing normal operation.")

exports.WbemInvalidOperation = exports.WBEM_INVALID_OPERATION = exports[2147749910] =
  createError("WbemInvalidOperation", "WBEM_INVALID_OPERATION", 2147749910, "The requested operation is not valid. This error usually applies to invalid attempts to delete classes or properties.")

exports.WbemInvalidQuery = exports.WBEM_INVALID_QUERY = exports[2147749911] =
  createError("WbemInvalidQuery", "WBEM_INVALID_QUERY", 2147749911, "The requested operation is not valid. This error usually applies to invalid attempts to delete classes or properties.")

exports.WbemInvalidQueryType = exports.WBEM_INVALID_QUERY_TYPE = exports[2147749912] =
  createError("WbemInvalidQueryType", "WBEM_INVALID_QUERY_TYPE", 2147749912, "The requested query language is not supported.")

exports.WbemAlreadyExists = exports.WBEM_ALREADY_EXISTS = exports[2147749913] =
  createError("WbemAlreadyExists", "WBEM_ALREADY_EXISTS", 2147749913, "In a put operation, the wbemChangeFlagCreateOnly flag was specified, but the instance already exists.")

exports.WbemOverrideNotAllowed = exports.WBEM_OVERRIDE_NOT_ALLOWED = exports[2147749914] =
  createError("WbemOverrideNotAllowed", "WBEM_OVERRIDE_NOT_ALLOWED", 2147749914, "It is not possible to perform the add operation on this qualifier because the owning object does not permit overrides.")

exports.WbemPropagatedQualifier = exports.WBEM_PROPAGATED_QUALIFIER = exports[2147749915] =
  createError("WbemPropagatedQualifier", "WBEM_PROPAGATED_QUALIFIER", 2147749915, "The user attempted to delete a qualifier that was not owned. The qualifier was inherited from a parent class.")

exports.WbemPropagatedProperty = exports.WBEM_PROPAGATED_PROPERTY = exports[2147749916] =
  createError("WbemPropagatedProperty", "WBEM_PROPAGATED_PROPERTY", 2147749916, "The user attempted to delete a property that was not owned. The property was inherited from a parent class.")

exports.WbemUnexpected = exports.WBEM_UNEXPECTED = exports[2147749917] =
  createError("WbemUnexpected", "WBEM_UNEXPECTED", 2147749917, "The client made an unexpected and illegal sequence of calls, such as calling EndEnumeration before calling BeginEnumeration.")

exports.WbemIllegalOperation = exports.WBEM_ILLEGAL_OPERATION = exports[2147749918] =
  createError("WbemIllegalOperation", "WBEM_ILLEGAL_OPERATION", 2147749918, "The user requested an illegal operation, such as spawning a class from an instance.")

exports.WbemCannotBeKey = exports.WBEM_CANNOT_BE_KEY = exports[2147749919] =
  createError("WbemCannotBeKey", "WBEM_CANNOT_BE_KEY", 2147749919, "There was an illegal attempt to specify a key qualifier on a property that cannot be a key. The keys are specified in the class definition for an object, and cannot be altered on a per-instance basis.")

exports.WbemIncompleteClass = exports.WBEM_INCOMPLETE_CLASS = exports[2147749920] =
  createError("WbemIncompleteClass", "WBEM_INCOMPLETE_CLASS", 2147749920, "The current object is not a valid class definition. Either it is incomplete, or it has not been registered with WMI using SWbemObject.Put_.")

exports.WbemInvalidSyntax = exports.WBEM_INVALID_SYNTAX = exports[2147749921] =
  createError("WbemInvalidSyntax", "WBEM_INVALID_SYNTAX", 2147749921, "The syntax of an input parameter is incorrect for the applicable data structure. For example, when a CIM datetime structure does not have the correct format when passed to SWbemDateTime.SetFileTime.")

exports.WbemNondecoratedObject = exports.WBEM_NONDECORATED_OBJECT = exports[2147749922] =
  createError("WbemNondecoratedObject", "WBEM_NONDECORATED_OBJECT", 2147749922, "Reserved for future use.")

exports.WbemReadOnly = exports.WBEM_READ_ONLY = exports[2147749923] =
  createError("WbemReadOnly", "WBEM_READ_ONLY", 2147749923, "The property that you are attempting to modify is read-only.")

exports.WbemProviderNotCapable = exports.WBEM_PROVIDER_NOT_CAPABLE = exports[2147749924] =
  createError("WbemProviderNotCapable", "WBEM_PROVIDER_NOT_CAPABLE", 2147749924, "The provider cannot perform the requested operation. This would include a query that is too complex, retrieving an instance, creating or updating a class, deleting a class, or enumerating a class.")

exports.WbemClassHasChildren = exports.WBEM_CLASS_HAS_CHILDREN = exports[2147749925] =
  createError("WbemClassHasChildren", "WBEM_CLASS_HAS_CHILDREN", 2147749925, "An attempt was made to make a change that would invalidate a subclass.")

exports.WbemClassHasInstances = exports.WBEM_CLASS_HAS_INSTANCES = exports[2147749926] =
  createError("WbemClassHasInstances", "WBEM_CLASS_HAS_INSTANCES", 2147749926, "An attempt has been made to delete or modify a class that has instances.")

exports.WbemQueryNotImplemented = exports.WBEM_QUERY_NOT_IMPLEMENTED = exports[2147749927] =
  createError("WbemQueryNotImplemented", "WBEM_QUERY_NOT_IMPLEMENTED", 2147749927, "Reserved for future use.")

exports.WbemIllegalNull = exports.WBEM_ILLEGAL_NULL = exports[2147749928] =
  createError("WbemIllegalNull", "WBEM_ILLEGAL_NULL", 2147749928, "A value of Nothing was specified for a property that may not be Nothing, such as one that is marked by a Key, Indexed, or Not_Null qualifier.")

exports.WbemInvalidQualifierType = exports.WBEM_INVALID_QUALIFIER_TYPE = exports[2147749929] =
  createError("WbemInvalidQualifierType", "WBEM_INVALID_QUALIFIER_TYPE", 2147749929, "The CIM type specified for a property is not valid.")

exports.WbemInvalidPropertyType = exports.WBEM_INVALID_PROPERTY_TYPE = exports[2147749930] =
  createError("WbemInvalidPropertyType", "WBEM_INVALID_PROPERTY_TYPE", 2147749930, "The CIM type specified for a property is not valid.")

exports.WbemValueOutOfRange = exports.WBEM_VALUE_OUT_OF_RANGE = exports[2147749931] =
  createError("WbemValueOutOfRange", "WBEM_VALUE_OUT_OF_RANGE", 2147749931, "The request was made with an out-of-range value, or is incompatible with the type.")

exports.WbemCannotBeSingleton = exports.WBEM_CANNOT_BE_SINGLETON = exports[2147749932] =
  createError("WbemCannotBeSingleton", "WBEM_CANNOT_BE_SINGLETON", 2147749932, "An illegal attempt was made to make a class singleton, such as when the class is derived from a non-singleton class.")

exports.WbemInvalidCimType = exports.WBEM_INVALID_CIM_TYPE = exports[2147749933] =
  createError("WbemInvalidCimType", "WBEM_INVALID_CIM_TYPE", 2147749933, "The CIM type specified is not valid.")

exports.WbemInvalidMethod = exports.WBEM_INVALID_METHOD = exports[2147749934] =
  createError("WbemInvalidMethod", "WBEM_INVALID_METHOD", 2147749934, "The requested method is not available.")

exports.WbemInvalidMethodParameters = exports.WBEM_INVALID_METHOD_PARAMETERS = exports[2147749935] =
  createError("WbemInvalidMethodParameters", "WBEM_INVALID_METHOD_PARAMETERS", 2147749935, "The parameters provided for the method are not valid.")

exports.WbemSystemProperty = exports.WBEM_SYSTEM_PROPERTY = exports[2147749936] =
  createError("WbemSystemProperty", "WBEM_SYSTEM_PROPERTY", 2147749936, "There was an attempt to get qualifiers on a system property.")

exports.WbemInvalidProperty = exports.WBEM_INVALID_PROPERTY = exports[2147749937] =
  createError("WbemInvalidProperty", "WBEM_INVALID_PROPERTY", 2147749937, "The property type is not recognized.")

exports.WbemCallCancelled = exports.WBEM_CALL_CANCELLED = exports[2147749938] =
  createError("WbemCallCancelled", "WBEM_CALL_CANCELLED", 2147749938, "An asynchronous process has been canceled internally or by the user. Note that due to the timing and nature of the asynchronous operation the operation may not have been truly canceled.")

exports.WbemShuttingDown = exports.WBEM_SHUTTING_DOWN = exports[2147749939] =
  createError("WbemShuttingDown", "WBEM_SHUTTING_DOWN", 2147749939, "The user has requested an operation while WMI is in the process of shutting down.")

exports.WbemPropagatedMethod = exports.WBEM_PROPAGATED_METHOD = exports[2147749940] =
  createError("WbemPropagatedMethod", "WBEM_PROPAGATED_METHOD", 2147749940, "An attempt was made to reuse an existing method name from a parent class, and the signatures did not match.")

exports.WbemUnsupportedParameter = exports.WBEM_UNSUPPORTED_PARAMETER = exports[2147749941] =
  createError("WbemUnsupportedParameter", "WBEM_UNSUPPORTED_PARAMETER", 2147749941, "One or more parameter values, such as a query text, is too complex or unsupported. WMI is therefore requested to retry the operation with simpler parameters.")

exports.WbemMissingParameter = exports.WBEM_MISSING_PARAMETER = exports[2147749942] =
  createError("WbemMissingParameter", "WBEM_MISSING_PARAMETER", 2147749942, "A parameter was missing from the method call.")

exports.WbemInvalidParameterId = exports.WBEM_INVALID_PARAMETER_ID = exports[2147749943] =
  createError("WbemInvalidParameterId", "WBEM_INVALID_PARAMETER_ID", 2147749943, "A method parameter has an ID qualifier that is not valid.")

exports.WbemNonConsecutiveParameterIds = exports.WBEM_NON_CONSECUTIVE_PARAMETER_IDS = exports[2147749944] =
  createError("WbemNonConsecutiveParameterIds", "WBEM_NON_CONSECUTIVE_PARAMETER_IDS", 2147749944, "One or more of the method parameters have ID qualifiers that are out of sequence.")

exports.WbemParameterIdOnRetval = exports.WBEM_PARAMETER_ID_ON_RETVAL = exports[2147749945] =
  createError("WbemParameterIdOnRetval", "WBEM_PARAMETER_ID_ON_RETVAL", 2147749945, "The return value for a method has an ID qualifier.")

exports.WbemInvalidObjectPath = exports.WBEM_INVALID_OBJECT_PATH = exports[2147749946] =
  createError("WbemInvalidObjectPath", "WBEM_INVALID_OBJECT_PATH", 2147749946, "The specified object path was not valid.")

exports.WbemOutOfDiskSpace = exports.WBEM_OUT_OF_DISK_SPACE = exports[2147749947] =
  createError("WbemOutOfDiskSpace", "WBEM_OUT_OF_DISK_SPACE", 2147749947, "Windows Server 2003:  Disk is out of space or the 4 GB limit on WMI repository (CIM repository) size is reached.")

exports.WbemBufferTooSmall = exports.WBEM_BUFFER_TOO_SMALL = exports[2147749948] =
  createError("WbemBufferTooSmall", "WBEM_BUFFER_TOO_SMALL", 2147749948, "The supplied buffer was too small to hold all the objects in the enumerator or to read a string property.")

exports.WbemUnsupportedPutExtension = exports.WBEM_UNSUPPORTED_PUT_EXTENSION = exports[2147749949] =
  createError("WbemUnsupportedPutExtension", "WBEM_UNSUPPORTED_PUT_EXTENSION", 2147749949, "The provider does not support the requested put operation.")

exports.WbemUnknownObjectType = exports.WBEM_UNKNOWN_OBJECT_TYPE = exports[2147749950] =
  createError("WbemUnknownObjectType", "WBEM_UNKNOWN_OBJECT_TYPE", 2147749950, "An object with an incorrect type or version was encountered during marshaling.")

exports.WbemUnknownPacketType = exports.WBEM_UNKNOWN_PACKET_TYPE = exports[2147749951] =
  createError("WbemUnknownPacketType", "WBEM_UNKNOWN_PACKET_TYPE", 2147749951, "A packet with an incorrect type or version was encountered during marshaling.")

exports.WbemMarshalVersionMismatch = exports.WBEM_MARSHAL_VERSION_MISMATCH = exports[2147749952] =
  createError("WbemMarshalVersionMismatch", "WBEM_MARSHAL_VERSION_MISMATCH", 2147749952, "The packet has an unsupported version.")

exports.WbemMarshalInvalidSignature = exports.WBEM_MARSHAL_INVALID_SIGNATURE = exports[2147749953] =
  createError("WbemMarshalInvalidSignature", "WBEM_MARSHAL_INVALID_SIGNATURE", 2147749953, "The packet appears to be corrupted.")

exports.WbemInvalidQualifier = exports.WBEM_INVALID_QUALIFIER = exports[2147749954] =
  createError("WbemInvalidQualifier", "WBEM_INVALID_QUALIFIER", 2147749954, "An attempt has been made to mismatch qualifiers, such as putting [key] on an object instead of a property.")

exports.WbemInvalidDuplicateParameter = exports.WBEM_INVALID_DUPLICATE_PARAMETER = exports[2147749955] =
  createError("WbemInvalidDuplicateParameter", "WBEM_INVALID_DUPLICATE_PARAMETER", 2147749955, "A duplicate parameter has been declared in a CIM method.")

exports.WbemTooMuchData = exports.WBEM_TOO_MUCH_DATA = exports[2147749956] =
  createError("WbemTooMuchData", "WBEM_TOO_MUCH_DATA", 2147749956, "Reserved for future use.")

exports.WbemServerTooBusy = exports.WBEM_SERVER_TOO_BUSY = exports[2147749957] =
  createError("WbemServerTooBusy", "WBEM_SERVER_TOO_BUSY", 2147749957, "A call to IWbemObjectSink::Indicate has failed. The provider may choose to refire the event.")

exports.WbemInvalidFlavor = exports.WBEM_INVALID_FLAVOR = exports[2147749958] =
  createError("WbemInvalidFlavor", "WBEM_INVALID_FLAVOR", 2147749958, "The specified flavor was not valid.")

exports.WbemCircularReference = exports.WBEM_CIRCULAR_REFERENCE = exports[2147749959] =
  createError("WbemCircularReference", "WBEM_CIRCULAR_REFERENCE", 2147749959, "An attempt has been made to create a reference that is circular (for example, deriving a class from itself).")

exports.WbemUnsupportedClassUpdate = exports.WBEM_UNSUPPORTED_CLASS_UPDATE = exports[2147749960] =
  createError("WbemUnsupportedClassUpdate", "WBEM_UNSUPPORTED_CLASS_UPDATE", 2147749960, "The specified class is not supported.")

exports.WbemCannotChangeKeyInheritance = exports.WBEM_CANNOT_CHANGE_KEY_INHERITANCE = exports[2147749961] =
  createError("WbemCannotChangeKeyInheritance", "WBEM_CANNOT_CHANGE_KEY_INHERITANCE", 2147749961, "An attempt was made to change a key when instances or subclasses are already using the key.")

exports.WbemCannotChangeIndexInheritance = exports.WBEM_CANNOT_CHANGE_INDEX_INHERITANCE = exports[2147749968] =
  createError("WbemCannotChangeIndexInheritance", "WBEM_CANNOT_CHANGE_INDEX_INHERITANCE", 2147749968, "An attempt was made to change an index when instances or subclasses are already using the index.")

exports.WbemTooManyProperties = exports.WBEM_TOO_MANY_PROPERTIES = exports[2147749969] =
  createError("WbemTooManyProperties", "WBEM_TOO_MANY_PROPERTIES", 2147749969, "An attempt was made to create more properties than the current version of the class supports.")

exports.WbemUpdateTypeMismatch = exports.WBEM_UPDATE_TYPE_MISMATCH = exports[2147749970] =
  createError("WbemUpdateTypeMismatch", "WBEM_UPDATE_TYPE_MISMATCH", 2147749970, "A property was redefined with a conflicting type in a derived class.")

exports.WbemUpdateOverrideNotAllowed = exports.WBEM_UPDATE_OVERRIDE_NOT_ALLOWED = exports[2147749971] =
  createError("WbemUpdateOverrideNotAllowed", "WBEM_UPDATE_OVERRIDE_NOT_ALLOWED", 2147749971, "An attempt was made in a derived class to override a non-overrideable qualifier.")

exports.WbemUpdatePropagatedMethod = exports.WBEM_UPDATE_PROPAGATED_METHOD = exports[2147749972] =
  createError("WbemUpdatePropagatedMethod", "WBEM_UPDATE_PROPAGATED_METHOD", 2147749972, "A method was redeclared with a conflicting signature in a derived class.")

exports.WbemMethodNotImplemented = exports.WBEM_METHOD_NOT_IMPLEMENTED = exports[2147749973] =
  createError("WbemMethodNotImplemented", "WBEM_METHOD_NOT_IMPLEMENTED", 2147749973, "An attempt was made to execute a method not marked with [implemented] in any relevant class.")

exports.WbemMethodDisabled = exports.WBEM_METHOD_DISABLED = exports[2147749974] =
  createError("WbemMethodDisabled", "WBEM_METHOD_DISABLED", 2147749974, "An attempt was made to execute a method marked with [disabled].")

exports.WbemRefresherBusy = exports.WBEM_REFRESHER_BUSY = exports[2147749975] =
  createError("WbemRefresherBusy", "WBEM_REFRESHER_BUSY", 2147749975, "The refresher is busy with another operation.")

exports.WbemUnparsableQuery = exports.WBEM_UNPARSABLE_QUERY = exports[2147749976] =
  createError("WbemUnparsableQuery", "WBEM_UNPARSABLE_QUERY", 2147749976, "The filtering query is syntactically not valid.")

exports.WbemNotEventClass = exports.WBEM_NOT_EVENT_CLASS = exports[2147749977] =
  createError("WbemNotEventClass", "WBEM_NOT_EVENT_CLASS", 2147749977, "The FROM clause of a filtering query references a class that is not an event class (not derived from __Event).")

exports.WbemMissingGroupWithin = exports.WBEM_MISSING_GROUP_WITHIN = exports[2147749978] =
  createError("WbemMissingGroupWithin", "WBEM_MISSING_GROUP_WITHIN", 2147749978, "A GROUP BY clause was used without the corresponding GROUP WITHIN clause.")

exports.WbemMissingAggregationList = exports.WBEM_MISSING_AGGREGATION_LIST = exports[2147749979] =
  createError("WbemMissingAggregationList", "WBEM_MISSING_AGGREGATION_LIST", 2147749979, "A GROUP BY clause was used. Aggregation on all properties is not supported.")

exports.WbemPropertyNotAnObject = exports.WBEM_PROPERTY_NOT_AN_OBJECT = exports[2147749980] =
  createError("WbemPropertyNotAnObject", "WBEM_PROPERTY_NOT_AN_OBJECT", 2147749980, "Dot notation was used on a property that is not an embedded object.")

exports.WbemAggregatingByObject = exports.WBEM_AGGREGATING_BY_OBJECT = exports[2147749981] =
  createError("WbemAggregatingByObject", "WBEM_AGGREGATING_BY_OBJECT", 2147749981, "A GROUP BY clause references a property that is an embedded object without using dot notation.")

exports.WbemUninterpretableProviderQuery = exports.WBEM_UNINTERPRETABLE_PROVIDER_QUERY = exports[2147749983] =
  createError("WbemUninterpretableProviderQuery", "WBEM_UNINTERPRETABLE_PROVIDER_QUERY", 2147749983, "An event provider registration query ( __EventProviderRegistration) did not specify the classes for which events were provided.")

exports.WbemBackupRestoreWinmgmtRunning = exports.WBEM_BACKUP_RESTORE_WINMGMT_RUNNING = exports[2147749984] =
  createError("WbemBackupRestoreWinmgmtRunning", "WBEM_BACKUP_RESTORE_WINMGMT_RUNNING", 2147749984, "An request was made to back up or restore the repository while WMI was using it.")

exports.WbemQueueOverflow = exports.WBEM_QUEUE_OVERFLOW = exports[2147749985] =
  createError("WbemQueueOverflow", "WBEM_QUEUE_OVERFLOW", 2147749985, "The asynchronous delivery queue overflowed due to the event consumer being too slow.")

exports.WbemPrivilegeNotHeld = exports.WBEM_PRIVILEGE_NOT_HELD = exports[2147749986] =
  createError("WbemPrivilegeNotHeld", "WBEM_PRIVILEGE_NOT_HELD", 2147749986, "The operation failed because the client did not have the necessary security privilege.")

exports.WbemInvalidOperator = exports.WBEM_INVALID_OPERATOR = exports[2147749987] =
  createError("WbemInvalidOperator", "WBEM_INVALID_OPERATOR", 2147749987, "The operator is not valid for this property type.")

exports.WbemLocalCredentials = exports.WBEM_LOCAL_CREDENTIALS = exports[2147749988] =
  createError("WbemLocalCredentials", "WBEM_LOCAL_CREDENTIALS", 2147749988, "The user specified a username, password or authority for a local connection. The user must use a blank username/password and rely on default security.")

exports.WbemCannotBeAbstract = exports.WBEM_CANNOT_BE_ABSTRACT = exports[2147749989] =
  createError("WbemCannotBeAbstract", "WBEM_CANNOT_BE_ABSTRACT", 2147749989, "The class was made abstract when its parent class is not abstract.")

exports.WbemAmendedObject = exports.WBEM_AMENDED_OBJECT = exports[2147749990] =
  createError("WbemAmendedObject", "WBEM_AMENDED_OBJECT", 2147749990, "An amended object was put without the wbemFlagUseAmendedQualifiers flag being specified.")

exports.WbemClientTooSlow = exports.WBEM_CLIENT_TOO_SLOW = exports[2147749991] =
  createError("WbemClientTooSlow", "WBEM_CLIENT_TOO_SLOW", 2147749991, "Windows Server 2003:  The client was not retrieving objects quickly enough from an enumeration. This constant is returned when a client creates an enumeration object but does not retrieve objects from the enumerator in a timely fashion, causing the enumerator\'s object caches to get backed up.")

exports.WbemNullSecurityDescriptor = exports.WBEM_NULL_SECURITY_DESCRIPTOR = exports[2147749992] =
  createError("WbemNullSecurityDescriptor", "WBEM_NULL_SECURITY_DESCRIPTOR", 2147749992, "Windows Server 2003:  A null security descriptor was used.")

exports.WbemTimeout = exports.WBEM_TIMEOUT = exports[2147749993] =
  createError("WbemTimeout", "WBEM_TIMEOUT", 2147749993, "Windows Server 2003:  The operation timed out.")

exports.WbemInvalidAssociation = exports.WBEM_INVALID_ASSOCIATION = exports[2147749994] =
  createError("WbemInvalidAssociation", "WBEM_INVALID_ASSOCIATION", 2147749994, "Windows Server 2003:  The association being used is not valid.")

exports.WbemAmbiguousOperation = exports.WBEM_AMBIGUOUS_OPERATION = exports[2147749995] =
  createError("WbemAmbiguousOperation", "WBEM_AMBIGUOUS_OPERATION", 2147749995, "Windows Server 2003:  The operation was ambiguous.")

exports.WbemQuotaViolation = exports.WBEM_QUOTA_VIOLATION = exports[2147749996] =
  createError("WbemQuotaViolation", "WBEM_QUOTA_VIOLATION", 2147749996, "Windows Server 2003:  WMI is taking up too much memory. This could be caused either by low memory availability or excessive memory consumption by WMI.")

exports.WbemTransactionConflict = exports.WBEM_TRANSACTION_CONFLICT = exports[2147749997] =
  createError("WbemTransactionConflict", "WBEM_TRANSACTION_CONFLICT", 2147749997, "Windows Server 2003:  The operation resulted in a transaction conflict.")

exports.WbemForcedRollback = exports.WBEM_FORCED_ROLLBACK = exports[2147749998] =
  createError("WbemForcedRollback", "WBEM_FORCED_ROLLBACK", 2147749998, "Windows Server 2003:  The transaction forced a rollback.")

exports.WbemUnsupportedLocale = exports.WBEM_UNSUPPORTED_LOCALE = exports[2147749999] =
  createError("WbemUnsupportedLocale", "WBEM_UNSUPPORTED_LOCALE", 2147749999, "Windows Server 2003:  The locale used in the call is not supported.")

exports.WbemHandleOutOfDate = exports.WBEM_HANDLE_OUT_OF_DATE = exports[2147750000] =
  createError("WbemHandleOutOfDate", "WBEM_HANDLE_OUT_OF_DATE", 2147750000, "Windows Server 2003:  The object handle is out of date.")

exports.WbemConnectionFailed = exports.WBEM_CONNECTION_FAILED = exports[2147750001] =
  createError("WbemConnectionFailed", "WBEM_CONNECTION_FAILED", 2147750001, "Windows Server 2003:  Indicates that the connection to the SQL database failed.")

exports.WbemInvalidHandleRequest = exports.WBEM_INVALID_HANDLE_REQUEST = exports[2147750002] =
  createError("WbemInvalidHandleRequest", "WBEM_INVALID_HANDLE_REQUEST", 2147750002, "Windows Server 2003:  The handle request was not valid.")

exports.WbemPropertyNameTooWide = exports.WBEM_PROPERTY_NAME_TOO_WIDE = exports[2147750003] =
  createError("WbemPropertyNameTooWide", "WBEM_PROPERTY_NAME_TOO_WIDE", 2147750003, "Windows Server 2003:  The property name contains more than 255 characters.")

exports.WbemClassNameTooWide = exports.WBEM_CLASS_NAME_TOO_WIDE = exports[2147750004] =
  createError("WbemClassNameTooWide", "WBEM_CLASS_NAME_TOO_WIDE", 2147750004, "Windows Server 2003:  The class name contains more than 255 characters.")

exports.WbemMethodNameTooWide = exports.WBEM_METHOD_NAME_TOO_WIDE = exports[2147750005] =
  createError("WbemMethodNameTooWide", "WBEM_METHOD_NAME_TOO_WIDE", 2147750005, "Windows Server 2003:  The method name contains more than 255 characters.")

exports.WbemQualifierNameTooWide = exports.WBEM_QUALIFIER_NAME_TOO_WIDE = exports[2147750006] =
  createError("WbemQualifierNameTooWide", "WBEM_QUALIFIER_NAME_TOO_WIDE", 2147750006, "Windows Server 2003:  The qualifier name contains more than 255 characters.")

exports.WbemRerunCommand = exports.WBEM_RERUN_COMMAND = exports[2147750007] =
  createError("WbemRerunCommand", "WBEM_RERUN_COMMAND", 2147750007, "Windows Server 2003:  Indicates that an SQL command should be rerun because there is a deadlock in SQL. This can be returned only when data is being stored in an SQL database.")

exports.WbemDatabaseVerMismatch = exports.WBEM_DATABASE_VER_MISMATCH = exports[2147750008] =
  createError("WbemDatabaseVerMismatch", "WBEM_DATABASE_VER_MISMATCH", 2147750008, "Windows Server 2003:  The database version does not match the version that the repository driver processes.")

exports.WbemVetoDelete = exports.WBEM_VETO_DELETE = exports[2147750010] =
  createError("WbemVetoDelete", "WBEM_VETO_DELETE", 2147750010, "Windows Server 2003:  WMI cannot do the delete operation because the provider does not allow it.")

exports.WbemVetoPut = exports.WBEM_VETO_PUT = exports[2147750010] =
  createError("WbemVetoPut", "WBEM_VETO_PUT", 2147750010, "Windows Server 2003:  WMI cannot do the put operation because the provider does not allow it.")

exports.WbemInvalidLocale = exports.WBEM_INVALID_LOCALE = exports[2147750016] =
  createError("WbemInvalidLocale", "WBEM_INVALID_LOCALE", 2147750016, "Windows Server 2003:  The specified locale identifier was not valid for the operation.")

exports.WbemProviderSuspended = exports.WBEM_PROVIDER_SUSPENDED = exports[2147750017] =
  createError("WbemProviderSuspended", "WBEM_PROVIDER_SUSPENDED", 2147750017, "Windows Server 2003:  The provider is suspended.")

exports.WbemSynchronizationRequired = exports.WBEM_SYNCHRONIZATION_REQUIRED = exports[2147750018] =
  createError("WbemSynchronizationRequired", "WBEM_SYNCHRONIZATION_REQUIRED", 2147750018, "Windows Server 2003:  The object must be committed and retrieved again before the requested operation can succeed. This constant is returned when an object must be committed and re-retrieved to see the property value.")

exports.WbemNoSchema = exports.WBEM_NO_SCHEMA = exports[2147750019] =
  createError("WbemNoSchema", "WBEM_NO_SCHEMA", 2147750019, "Windows Server 2003:  The operation cannot be completed because no schema is available.")

exports.WbemProviderAlreadyRegistered = exports.WBEM_PROVIDER_ALREADY_REGISTERED = exports[2147750020] =
  createError("WbemProviderAlreadyRegistered", "WBEM_PROVIDER_ALREADY_REGISTERED", 2147750020, "Windows Server 2003:  The provider registration cannot be done because the provider is already registered.")

exports.WbemProviderNotRegistered = exports.WBEM_PROVIDER_NOT_REGISTERED = exports[2147750021] =
  createError("WbemProviderNotRegistered", "WBEM_PROVIDER_NOT_REGISTERED", 2147750021, "Windows Server 2003:  The provider for the requested data is not registered.")

exports.WbemFatalTransportError = exports.WBEM_FATAL_TRANSPORT_ERROR = exports[2147750022] =
  createError("WbemFatalTransportError", "WBEM_FATAL_TRANSPORT_ERROR", 2147750022, "Windows Server 2003:  A fatal transport error occurred and other transport will not be attempted.")

exports.WbemEncryptedConnectionRequired = exports.WBEM_ENCRYPTED_CONNECTION_REQUIRED = exports[2147750023] =
  createError("WbemEncryptedConnectionRequired", "WBEM_ENCRYPTED_CONNECTION_REQUIRED", 2147750023, "Windows Server 2003:  The client connection to WINMGMT must be encrypted for this operation. The IWbemServices proxy security settings should be adjusted and the operation retried.")

exports.WbemRegistrationTooBroad = exports.WBEM_REGISTRATION_TOO_BROAD = exports[2147753985] =
  createError("WbemRegistrationTooBroad", "WBEM_REGISTRATION_TOO_BROAD", 2147753985, "Windows Server 2003:  The provider registration overlaps with the system event domain.")

exports.WbemRegistrationTooPrecise = exports.WBEM_REGISTRATION_TOO_PRECISE = exports[2147753986] =
  createError("WbemRegistrationTooPrecise", "WBEM_REGISTRATION_TOO_PRECISE", 2147753986, "Windows Server 2003:  A WITHIN clause was not used in this query.")

exports.WbemTimedout = exports.WBEM_TIMEDOUT = exports[2147758081] =
  createError("WbemTimedout", "WBEM_TIMEDOUT", 2147758081, "Windows Server 2003:  Automation-specific error.")

exports.WbemResetToDefault = exports.WBEM_RESET_TO_DEFAULT = exports[2147758082] =
  createError("WbemResetToDefault", "WBEM_RESET_TO_DEFAULT", 2147758082, null)
