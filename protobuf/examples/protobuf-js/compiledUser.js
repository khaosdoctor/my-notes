/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict"

var $protobuf = require("protobufjs/minimal")

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {})

$root.meetings = (function () {

  /**
   * Namespace meetings.
   * @exports meetings
   * @namespace
   */
  var meetings = {}

  meetings.User = (function () {

    /**
     * Properties of a User.
     * @memberof meetings
     * @interface IUser
     * @property {string|null} [firstName] User firstName
     * @property {string|null} [lastName] User lastName
     * @property {string|null} [email] User email
     * @property {Array.<meetings.User.IAddress>|null} [addresses] User addresses
     */

    /**
     * Constructs a new User.
     * @memberof meetings
     * @classdesc Represents a User.
     * @implements IUser
     * @constructor
     * @param {meetings.IUser=} [properties] Properties to set
     */
    function User (properties) {
      this.addresses = []
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null)
            this[keys[i]] = properties[keys[i]]
    }

    /**
     * User firstName.
     * @member {string} firstName
     * @memberof meetings.User
     * @instance
     */
    User.prototype.firstName = ""

    /**
     * User lastName.
     * @member {string} lastName
     * @memberof meetings.User
     * @instance
     */
    User.prototype.lastName = ""

    /**
     * User email.
     * @member {string} email
     * @memberof meetings.User
     * @instance
     */
    User.prototype.email = ""

    /**
     * User addresses.
     * @member {Array.<meetings.User.IAddress>} addresses
     * @memberof meetings.User
     * @instance
     */
    User.prototype.addresses = $util.emptyArray

    /**
     * Creates a new User instance using the specified properties.
     * @function create
     * @memberof meetings.User
     * @static
     * @param {meetings.IUser=} [properties] Properties to set
     * @returns {meetings.User} User instance
     */
    User.create = function create (properties) {
      return new User(properties)
    }

    /**
     * Encodes the specified User message. Does not implicitly {@link meetings.User.verify|verify} messages.
     * @function encode
     * @memberof meetings.User
     * @static
     * @param {meetings.IUser} message User message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    User.encode = function encode (message, writer) {
      if (!writer)
        writer = $Writer.create()
      if (message.firstName != null && message.hasOwnProperty("firstName"))
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.firstName)
      if (message.lastName != null && message.hasOwnProperty("lastName"))
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.lastName)
      if (message.email != null && message.hasOwnProperty("email"))
        writer.uint32(/* id 3, wireType 2 =*/26).string(message.email)
      if (message.addresses != null && message.addresses.length)
        for (var i = 0; i < message.addresses.length; ++i)
          $root.meetings.User.Address.encode(message.addresses[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim()
      return writer
    }

    /**
     * Encodes the specified User message, length delimited. Does not implicitly {@link meetings.User.verify|verify} messages.
     * @function encodeDelimited
     * @memberof meetings.User
     * @static
     * @param {meetings.IUser} message User message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    User.encodeDelimited = function encodeDelimited (message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
     * Decodes a User message from the specified reader or buffer.
     * @function decode
     * @memberof meetings.User
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meetings.User} User
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    User.decode = function decode (reader, length) {
      if (!(reader instanceof $Reader))
        reader = $Reader.create(reader)
      var end = length === undefined ? reader.len : reader.pos + length, message = new $root.meetings.User()
      while (reader.pos < end) {
        var tag = reader.uint32()
        switch (tag >>> 3) {
          case 1:
            message.firstName = reader.string()
            break
          case 2:
            message.lastName = reader.string()
            break
          case 3:
            message.email = reader.string()
            break
          case 4:
            if (!(message.addresses && message.addresses.length))
              message.addresses = []
            message.addresses.push($root.meetings.User.Address.decode(reader, reader.uint32()))
            break
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * Decodes a User message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof meetings.User
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {meetings.User} User
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    User.decodeDelimited = function decodeDelimited (reader) {
      if (!(reader instanceof $Reader))
        reader = new $Reader(reader)
      return this.decode(reader, reader.uint32())
    }

    /**
     * Verifies a User message.
     * @function verify
     * @memberof meetings.User
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    User.verify = function verify (message) {
      if (typeof message !== "object" || message === null)
        return "object expected"
      if (message.firstName != null && message.hasOwnProperty("firstName"))
        if (!$util.isString(message.firstName))
          return "firstName: string expected"
      if (message.lastName != null && message.hasOwnProperty("lastName"))
        if (!$util.isString(message.lastName))
          return "lastName: string expected"
      if (message.email != null && message.hasOwnProperty("email"))
        if (!$util.isString(message.email))
          return "email: string expected"
      if (message.addresses != null && message.hasOwnProperty("addresses")) {
        if (!Array.isArray(message.addresses))
          return "addresses: array expected"
        for (var i = 0; i < message.addresses.length; ++i) {
          var error = $root.meetings.User.Address.verify(message.addresses[i])
          if (error)
            return "addresses." + error
        }
      }
      return null
    }

    /**
     * Creates a User message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof meetings.User
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {meetings.User} User
     */
    User.fromObject = function fromObject (object) {
      if (object instanceof $root.meetings.User)
        return object
      var message = new $root.meetings.User()
      if (object.firstName != null)
        message.firstName = String(object.firstName)
      if (object.lastName != null)
        message.lastName = String(object.lastName)
      if (object.email != null)
        message.email = String(object.email)
      if (object.addresses) {
        if (!Array.isArray(object.addresses))
          throw TypeError(".meetings.User.addresses: array expected")
        message.addresses = []
        for (var i = 0; i < object.addresses.length; ++i) {
          if (typeof object.addresses[i] !== "object")
            throw TypeError(".meetings.User.addresses: object expected")
          message.addresses[i] = $root.meetings.User.Address.fromObject(object.addresses[i])
        }
      }
      return message
    }

    /**
     * Creates a plain object from a User message. Also converts values to other types if specified.
     * @function toObject
     * @memberof meetings.User
     * @static
     * @param {meetings.User} message User
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    User.toObject = function toObject (message, options) {
      if (!options)
        options = {}
      var object = {}
      if (options.arrays || options.defaults)
        object.addresses = []
      if (options.defaults) {
        object.firstName = ""
        object.lastName = ""
        object.email = ""
      }
      if (message.firstName != null && message.hasOwnProperty("firstName"))
        object.firstName = message.firstName
      if (message.lastName != null && message.hasOwnProperty("lastName"))
        object.lastName = message.lastName
      if (message.email != null && message.hasOwnProperty("email"))
        object.email = message.email
      if (message.addresses && message.addresses.length) {
        object.addresses = []
        for (var j = 0; j < message.addresses.length; ++j)
          object.addresses[j] = $root.meetings.User.Address.toObject(message.addresses[j], options)
      }
      return object
    }

    /**
     * Converts this User to JSON.
     * @function toJSON
     * @memberof meetings.User
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    User.prototype.toJSON = function toJSON () {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    /**
     * AddressType enum.
     * @name meetings.User.AddressType
     * @enum {string}
     * @property {number} HOME=0 HOME value
     * @property {number} POSTAL=1 POSTAL value
     * @property {number} WORK=2 WORK value
     */
    User.AddressType = (function () {
      var valuesById = {}, values = Object.create(valuesById)
      values[valuesById[0] = "HOME"] = 0
      values[valuesById[1] = "POSTAL"] = 1
      values[valuesById[2] = "WORK"] = 2
      return values
    })()

    User.Address = (function () {

      /**
       * Properties of an Address.
       * @memberof meetings.User
       * @interface IAddress
       * @property {string|null} [line1] Address line1
       * @property {string|null} [line2] Address line2
       * @property {string|null} [region] Address region
       * @property {string|null} [city] Address city
       * @property {string|null} [suburb] Address suburb
       * @property {string|null} [code] Address code
       * @property {meetings.User.AddressType|null} [type] Address type
       */

      /**
       * Constructs a new Address.
       * @memberof meetings.User
       * @classdesc Represents an Address.
       * @implements IAddress
       * @constructor
       * @param {meetings.User.IAddress=} [properties] Properties to set
       */
      function Address (properties) {
        if (properties)
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]]
      }

      /**
       * Address line1.
       * @member {string} line1
       * @memberof meetings.User.Address
       * @instance
       */
      Address.prototype.line1 = ""

      /**
       * Address line2.
       * @member {string} line2
       * @memberof meetings.User.Address
       * @instance
       */
      Address.prototype.line2 = ""

      /**
       * Address region.
       * @member {string} region
       * @memberof meetings.User.Address
       * @instance
       */
      Address.prototype.region = ""

      /**
       * Address city.
       * @member {string} city
       * @memberof meetings.User.Address
       * @instance
       */
      Address.prototype.city = ""

      /**
       * Address suburb.
       * @member {string} suburb
       * @memberof meetings.User.Address
       * @instance
       */
      Address.prototype.suburb = ""

      /**
       * Address code.
       * @member {string} code
       * @memberof meetings.User.Address
       * @instance
       */
      Address.prototype.code = ""

      /**
       * Address type.
       * @member {meetings.User.AddressType} type
       * @memberof meetings.User.Address
       * @instance
       */
      Address.prototype.type = 0

      /**
       * Creates a new Address instance using the specified properties.
       * @function create
       * @memberof meetings.User.Address
       * @static
       * @param {meetings.User.IAddress=} [properties] Properties to set
       * @returns {meetings.User.Address} Address instance
       */
      Address.create = function create (properties) {
        return new Address(properties)
      }

      /**
       * Encodes the specified Address message. Does not implicitly {@link meetings.User.Address.verify|verify} messages.
       * @function encode
       * @memberof meetings.User.Address
       * @static
       * @param {meetings.User.IAddress} message Address message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      Address.encode = function encode (message, writer) {
        if (!writer)
          writer = $Writer.create()
        if (message.line1 != null && message.hasOwnProperty("line1"))
          writer.uint32(/* id 1, wireType 2 =*/10).string(message.line1)
        if (message.line2 != null && message.hasOwnProperty("line2"))
          writer.uint32(/* id 2, wireType 2 =*/18).string(message.line2)
        if (message.region != null && message.hasOwnProperty("region"))
          writer.uint32(/* id 3, wireType 2 =*/26).string(message.region)
        if (message.city != null && message.hasOwnProperty("city"))
          writer.uint32(/* id 4, wireType 2 =*/34).string(message.city)
        if (message.suburb != null && message.hasOwnProperty("suburb"))
          writer.uint32(/* id 5, wireType 2 =*/42).string(message.suburb)
        if (message.code != null && message.hasOwnProperty("code"))
          writer.uint32(/* id 6, wireType 2 =*/50).string(message.code)
        if (message.type != null && message.hasOwnProperty("type"))
          writer.uint32(/* id 7, wireType 0 =*/56).int32(message.type)
        return writer
      }

      /**
       * Encodes the specified Address message, length delimited. Does not implicitly {@link meetings.User.Address.verify|verify} messages.
       * @function encodeDelimited
       * @memberof meetings.User.Address
       * @static
       * @param {meetings.User.IAddress} message Address message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      Address.encodeDelimited = function encodeDelimited (message, writer) {
        return this.encode(message, writer).ldelim()
      }

      /**
       * Decodes an Address message from the specified reader or buffer.
       * @function decode
       * @memberof meetings.User.Address
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meetings.User.Address} Address
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      Address.decode = function decode (reader, length) {
        if (!(reader instanceof $Reader))
          reader = $Reader.create(reader)
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.meetings.User.Address()
        while (reader.pos < end) {
          var tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.line1 = reader.string()
              break
            case 2:
              message.line2 = reader.string()
              break
            case 3:
              message.region = reader.string()
              break
            case 4:
              message.city = reader.string()
              break
            case 5:
              message.suburb = reader.string()
              break
            case 6:
              message.code = reader.string()
              break
            case 7:
              message.type = reader.int32()
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      /**
       * Decodes an Address message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof meetings.User.Address
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {meetings.User.Address} Address
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      Address.decodeDelimited = function decodeDelimited (reader) {
        if (!(reader instanceof $Reader))
          reader = new $Reader(reader)
        return this.decode(reader, reader.uint32())
      }

      /**
       * Verifies an Address message.
       * @function verify
       * @memberof meetings.User.Address
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */
      Address.verify = function verify (message) {
        if (typeof message !== "object" || message === null)
          return "object expected"
        if (message.line1 != null && message.hasOwnProperty("line1"))
          if (!$util.isString(message.line1))
            return "line1: string expected"
        if (message.line2 != null && message.hasOwnProperty("line2"))
          if (!$util.isString(message.line2))
            return "line2: string expected"
        if (message.region != null && message.hasOwnProperty("region"))
          if (!$util.isString(message.region))
            return "region: string expected"
        if (message.city != null && message.hasOwnProperty("city"))
          if (!$util.isString(message.city))
            return "city: string expected"
        if (message.suburb != null && message.hasOwnProperty("suburb"))
          if (!$util.isString(message.suburb))
            return "suburb: string expected"
        if (message.code != null && message.hasOwnProperty("code"))
          if (!$util.isString(message.code))
            return "code: string expected"
        if (message.type != null && message.hasOwnProperty("type"))
          switch (message.type) {
            default:
              return "type: enum value expected"
            case 0:
            case 1:
            case 2:
              break
          }
        return null
      }

      /**
       * Creates an Address message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof meetings.User.Address
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {meetings.User.Address} Address
       */
      Address.fromObject = function fromObject (object) {
        if (object instanceof $root.meetings.User.Address)
          return object
        var message = new $root.meetings.User.Address()
        if (object.line1 != null)
          message.line1 = String(object.line1)
        if (object.line2 != null)
          message.line2 = String(object.line2)
        if (object.region != null)
          message.region = String(object.region)
        if (object.city != null)
          message.city = String(object.city)
        if (object.suburb != null)
          message.suburb = String(object.suburb)
        if (object.code != null)
          message.code = String(object.code)
        switch (object.type) {
          case "HOME":
          case 0:
            message.type = 0
            break
          case "POSTAL":
          case 1:
            message.type = 1
            break
          case "WORK":
          case 2:
            message.type = 2
            break
        }
        return message
      }

      /**
       * Creates a plain object from an Address message. Also converts values to other types if specified.
       * @function toObject
       * @memberof meetings.User.Address
       * @static
       * @param {meetings.User.Address} message Address
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */
      Address.toObject = function toObject (message, options) {
        if (!options)
          options = {}
        var object = {}
        if (options.defaults) {
          object.line1 = ""
          object.line2 = ""
          object.region = ""
          object.city = ""
          object.suburb = ""
          object.code = ""
          object.type = options.enums === String ? "HOME" : 0
        }
        if (message.line1 != null && message.hasOwnProperty("line1"))
          object.line1 = message.line1
        if (message.line2 != null && message.hasOwnProperty("line2"))
          object.line2 = message.line2
        if (message.region != null && message.hasOwnProperty("region"))
          object.region = message.region
        if (message.city != null && message.hasOwnProperty("city"))
          object.city = message.city
        if (message.suburb != null && message.hasOwnProperty("suburb"))
          object.suburb = message.suburb
        if (message.code != null && message.hasOwnProperty("code"))
          object.code = message.code
        if (message.type != null && message.hasOwnProperty("type"))
          object.type = options.enums === String ? $root.meetings.User.AddressType[message.type] : message.type
        return object
      }

      /**
       * Converts this Address to JSON.
       * @function toJSON
       * @memberof meetings.User.Address
       * @instance
       * @returns {Object.<string,*>} JSON object
       */
      Address.prototype.toJSON = function toJSON () {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
      }

      return Address
    })()

    return User
  })()

  return meetings
})()

module.exports = $root
