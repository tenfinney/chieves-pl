import { j as jsxs, F as Flex, b as jsx, a4 as getAugmentedNamespace, ab as require$$0$2, a5 as getDefaultExportFromCjs, a9 as commonjsGlobal } from "./index.6563bd6c.js";
import { a as Tooltip, b as LinkedSVG, r as require$$0$3 } from "./index.94919749.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
const Header = ({
  links = {
    cup: "/new",
    sign: "/"
  },
  ...props2
}) => /* @__PURE__ */ jsxs(Flex, {
  grow: 1,
  ...props2,
  children: [/* @__PURE__ */ jsx(Tooltip, {
    hasArrow: true,
    label: "Create A New Token Type",
    children: /* @__PURE__ */ jsx(LinkedSVG, {
      ml: "120px",
      mb: "120px",
      w: "min(40%, 75vh)",
      h: "auto",
      svg: "Circles.png",
      href: links.cup,
      title: "Create a new Token",
      id: "createatoken"
    })
  }), /* @__PURE__ */ jsx(Tooltip, {
    hasArrow: true,
    label: "List Existing Tokens",
    children: /* @__PURE__ */ jsx(LinkedSVG, {
      w: "75%",
      h: "auto",
      ml: "-15%",
      svg: "Circles2.png",
      href: links.sign,
      title: "View Existing Tokens"
    })
  })]
});
var lib = {};
var players$1 = {};
var utils$1 = {};
var loadScript = function load(src, opts, cb) {
  var head = document.head || document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  if (typeof opts === "function") {
    cb = opts;
    opts = {};
  }
  opts = opts || {};
  cb = cb || function() {
  };
  script.type = opts.type || "text/javascript";
  script.charset = opts.charset || "utf8";
  script.async = "async" in opts ? !!opts.async : true;
  script.src = src;
  if (opts.attrs) {
    setAttributes(script, opts.attrs);
  }
  if (opts.text) {
    script.text = "" + opts.text;
  }
  var onend = "onload" in script ? stdOnEnd : ieOnEnd;
  onend(script, cb);
  if (!script.onload) {
    stdOnEnd(script, cb);
  }
  head.appendChild(script);
};
function setAttributes(script, attrs) {
  for (var attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}
function stdOnEnd(script, cb) {
  script.onload = function() {
    this.onerror = this.onload = null;
    cb(null, script);
  };
  script.onerror = function() {
    this.onerror = this.onload = null;
    cb(new Error("Failed to load " + this.src), script);
  };
}
function ieOnEnd(script, cb) {
  script.onreadystatechange = function() {
    if (this.readyState != "complete" && this.readyState != "loaded")
      return;
    this.onreadystatechange = null;
    cb(null, script);
  };
}
const loadScript$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: loadScript
}, [loadScript]);
const require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(loadScript$1);
var isMergeableObject = function isMergeableObject2(value) {
  return isNonNullObject(value) && !isSpecial(value);
};
function isNonNullObject(value) {
  return !!value && typeof value === "object";
}
function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
}
var canUseSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}
function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}
function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function(element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}
function getMergeFunction(key, options) {
  if (!options.customMerge) {
    return deepmerge;
  }
  var customMerge = options.customMerge(key);
  return typeof customMerge === "function" ? customMerge : deepmerge;
}
function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
    return Object.propertyIsEnumerable.call(target, symbol);
  }) : [];
}
function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}
function propertyIsOnObject(object2, property) {
  try {
    return property in object2;
  } catch (_) {
    return false;
  }
}
function propertyIsUnsafe(target, key) {
  return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
}
function mergeObject(target, source, options) {
  var destination = {};
  if (options.isMergeableObject(target)) {
    getKeys(target).forEach(function(key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }
  getKeys(source).forEach(function(key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }
    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    }
  });
  return destination;
}
function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}
deepmerge.all = function deepmergeAll(array2, options) {
  if (!Array.isArray(array2)) {
    throw new Error("first argument should be an array");
  }
  return array2.reduce(function(prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};
var deepmerge_1 = deepmerge;
var cjs = deepmerge_1;
const cjs$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: cjs
}, [cjs]);
const require$$1$1 = /* @__PURE__ */ getAugmentedNamespace(cjs$1);
Object.defineProperty(utils$1, "__esModule", {
  value: true
});
var parseStartTime_1 = utils$1.parseStartTime = parseStartTime;
var parseEndTime_1 = utils$1.parseEndTime = parseEndTime;
var randomString_1 = utils$1.randomString = randomString;
var queryString_1 = utils$1.queryString = queryString;
var getSDK_1 = utils$1.getSDK = getSDK;
var getConfig_1 = utils$1.getConfig = getConfig;
var omit_1 = utils$1.omit = omit;
var callPlayer_1 = utils$1.callPlayer = callPlayer;
var isMediaStream_1 = utils$1.isMediaStream = isMediaStream;
var isBlobUrl_1 = utils$1.isBlobUrl = isBlobUrl;
var supportsWebKitPresentationMode_1 = utils$1.supportsWebKitPresentationMode = supportsWebKitPresentationMode;
var _loadScript = _interopRequireDefault$2(require$$0$1);
var _deepmerge$1 = _interopRequireDefault$2(require$$1$1);
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = void 0;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
var MATCH_START_QUERY = /[?&#](?:start|t)=([0-9hms]+)/;
var MATCH_END_QUERY = /[?&#]end=([0-9hms]+)/;
var MATCH_START_STAMP = /(\d+)(h|m|s)/g;
var MATCH_NUMERIC = /^\d+$/;
function parseTimeParam(url, pattern) {
  if (url instanceof Array) {
    return void 0;
  }
  var match = url.match(pattern);
  if (match) {
    var stamp = match[1];
    if (stamp.match(MATCH_START_STAMP)) {
      return parseTimeString(stamp);
    }
    if (MATCH_NUMERIC.test(stamp)) {
      return parseInt(stamp);
    }
  }
  return void 0;
}
function parseTimeString(stamp) {
  var seconds = 0;
  var array2 = MATCH_START_STAMP.exec(stamp);
  while (array2 !== null) {
    var _array = array2, _array2 = _slicedToArray(_array, 3), count = _array2[1], period = _array2[2];
    if (period === "h")
      seconds += parseInt(count, 10) * 60 * 60;
    if (period === "m")
      seconds += parseInt(count, 10) * 60;
    if (period === "s")
      seconds += parseInt(count, 10);
    array2 = MATCH_START_STAMP.exec(stamp);
  }
  return seconds;
}
function parseStartTime(url) {
  return parseTimeParam(url, MATCH_START_QUERY);
}
function parseEndTime(url) {
  return parseTimeParam(url, MATCH_END_QUERY);
}
function randomString() {
  return Math.random().toString(36).substr(2, 5);
}
function queryString(object2) {
  return Object.keys(object2).map(function(key) {
    return "".concat(key, "=").concat(object2[key]);
  }).join("&");
}
function getGlobal(key) {
  if (window[key]) {
    return window[key];
  }
  if (window.exports && window.exports[key]) {
    return window.exports[key];
  }
  if (window.module && window.module.exports && window.module.exports[key]) {
    return window.module.exports[key];
  }
  return null;
}
var requests = {};
function getSDK(url, sdkGlobal) {
  var sdkReady = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
  var isLoaded = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function() {
    return true;
  };
  var fetchScript = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : _loadScript["default"];
  var existingGlobal = getGlobal(sdkGlobal);
  if (existingGlobal && isLoaded(existingGlobal)) {
    return Promise.resolve(existingGlobal);
  }
  return new Promise(function(resolve, reject) {
    if (requests[url]) {
      requests[url].push({
        resolve,
        reject
      });
      return;
    }
    requests[url] = [{
      resolve,
      reject
    }];
    var onLoaded = function onLoaded2(sdk) {
      requests[url].forEach(function(request) {
        return request.resolve(sdk);
      });
    };
    if (sdkReady) {
      var previousOnReady = window[sdkReady];
      window[sdkReady] = function() {
        if (previousOnReady)
          previousOnReady();
        onLoaded(getGlobal(sdkGlobal));
      };
    }
    fetchScript(url, function(err) {
      if (err) {
        requests[url].forEach(function(request) {
          return request.reject(err);
        });
        requests[url] = null;
      } else if (!sdkReady) {
        onLoaded(getGlobal(sdkGlobal));
      }
    });
  });
}
function getConfig(props2, defaultProps2) {
  return (0, _deepmerge$1["default"])(defaultProps2.config, props2.config);
}
function omit(object2) {
  var _ref;
  for (var _len = arguments.length, arrays = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arrays[_key - 1] = arguments[_key];
  }
  var omitKeys = (_ref = []).concat.apply(_ref, arrays);
  var output = {};
  var keys = Object.keys(object2);
  for (var _i2 = 0, _keys = keys; _i2 < _keys.length; _i2++) {
    var key = _keys[_i2];
    if (omitKeys.indexOf(key) === -1) {
      output[key] = object2[key];
    }
  }
  return output;
}
function callPlayer(method) {
  var _this$player;
  if (!this.player || !this.player[method]) {
    var message = "ReactPlayer: ".concat(this.constructor.displayName, " player could not call %c").concat(method, "%c \u2013 ");
    if (!this.player) {
      message += "The player was not available";
    } else if (!this.player[method]) {
      message += "The method was not available";
    }
    console.warn(message, "font-weight: bold", "");
    return null;
  }
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  return (_this$player = this.player)[method].apply(_this$player, args);
}
function isMediaStream(url) {
  return typeof window !== "undefined" && typeof window.MediaStream !== "undefined" && url instanceof window.MediaStream;
}
function isBlobUrl(url) {
  return /^blob:/.test(url);
}
function supportsWebKitPresentationMode() {
  var video = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document.createElement("video");
  var notMobile = /iPhone|iPod/.test(navigator.userAgent) === false;
  return video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === "function" && notMobile;
}
const utils = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  parseStartTime: parseStartTime_1,
  parseEndTime: parseEndTime_1,
  randomString: randomString_1,
  queryString: queryString_1,
  getSDK: getSDK_1,
  getConfig: getConfig_1,
  omit: omit_1,
  callPlayer: callPlayer_1,
  isMediaStream: isMediaStream_1,
  isBlobUrl: isBlobUrl_1,
  supportsWebKitPresentationMode: supportsWebKitPresentationMode_1,
  default: utils$1
}, [utils$1]);
const require$$5 = /* @__PURE__ */ getAugmentedNamespace(utils);
var patterns$1 = {};
Object.defineProperty(patterns$1, "__esModule", {
  value: true
});
var canPlay_1 = patterns$1.canPlay = FLV_EXTENSIONS_1 = patterns$1.FLV_EXTENSIONS = DASH_EXTENSIONS_1 = patterns$1.DASH_EXTENSIONS = HLS_EXTENSIONS_1 = patterns$1.HLS_EXTENSIONS = VIDEO_EXTENSIONS_1 = patterns$1.VIDEO_EXTENSIONS = AUDIO_EXTENSIONS_1 = patterns$1.AUDIO_EXTENSIONS = MATCH_URL_KALTURA_1 = patterns$1.MATCH_URL_KALTURA = MATCH_URL_VIDYARD_1 = patterns$1.MATCH_URL_VIDYARD = MATCH_URL_MIXCLOUD_1 = patterns$1.MATCH_URL_MIXCLOUD = MATCH_URL_DAILYMOTION_1 = patterns$1.MATCH_URL_DAILYMOTION = MATCH_URL_TWITCH_CHANNEL_1 = patterns$1.MATCH_URL_TWITCH_CHANNEL = MATCH_URL_TWITCH_VIDEO_1 = patterns$1.MATCH_URL_TWITCH_VIDEO = MATCH_URL_WISTIA_1 = patterns$1.MATCH_URL_WISTIA = MATCH_URL_STREAMABLE_1 = patterns$1.MATCH_URL_STREAMABLE = MATCH_URL_FACEBOOK_WATCH_1 = patterns$1.MATCH_URL_FACEBOOK_WATCH = MATCH_URL_FACEBOOK_1 = patterns$1.MATCH_URL_FACEBOOK = MATCH_URL_VIMEO_1 = patterns$1.MATCH_URL_VIMEO = MATCH_URL_SOUNDCLOUD_1 = patterns$1.MATCH_URL_SOUNDCLOUD = MATCH_URL_YOUTUBE_1 = patterns$1.MATCH_URL_YOUTUBE = void 0;
var _utils$1 = require$$5;
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = o[Symbol.iterator]();
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//;
var MATCH_URL_YOUTUBE_1 = patterns$1.MATCH_URL_YOUTUBE = MATCH_URL_YOUTUBE;
var MATCH_URL_SOUNDCLOUD = /(?:soundcloud\.com|snd\.sc)\/[^.]+$/;
var MATCH_URL_SOUNDCLOUD_1 = patterns$1.MATCH_URL_SOUNDCLOUD = MATCH_URL_SOUNDCLOUD;
var MATCH_URL_VIMEO = /vimeo\.com\/(?!progressive_redirect).+/;
var MATCH_URL_VIMEO_1 = patterns$1.MATCH_URL_VIMEO = MATCH_URL_VIMEO;
var MATCH_URL_FACEBOOK = /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/;
var MATCH_URL_FACEBOOK_1 = patterns$1.MATCH_URL_FACEBOOK = MATCH_URL_FACEBOOK;
var MATCH_URL_FACEBOOK_WATCH = /^https?:\/\/fb\.watch\/.+$/;
var MATCH_URL_FACEBOOK_WATCH_1 = patterns$1.MATCH_URL_FACEBOOK_WATCH = MATCH_URL_FACEBOOK_WATCH;
var MATCH_URL_STREAMABLE = /streamable\.com\/([a-z0-9]+)$/;
var MATCH_URL_STREAMABLE_1 = patterns$1.MATCH_URL_STREAMABLE = MATCH_URL_STREAMABLE;
var MATCH_URL_WISTIA = /(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?(.*)$/;
var MATCH_URL_WISTIA_1 = patterns$1.MATCH_URL_WISTIA = MATCH_URL_WISTIA;
var MATCH_URL_TWITCH_VIDEO = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/;
var MATCH_URL_TWITCH_VIDEO_1 = patterns$1.MATCH_URL_TWITCH_VIDEO = MATCH_URL_TWITCH_VIDEO;
var MATCH_URL_TWITCH_CHANNEL = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/;
var MATCH_URL_TWITCH_CHANNEL_1 = patterns$1.MATCH_URL_TWITCH_CHANNEL = MATCH_URL_TWITCH_CHANNEL;
var MATCH_URL_DAILYMOTION = /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?(?:[\w.#_-]+)?/;
var MATCH_URL_DAILYMOTION_1 = patterns$1.MATCH_URL_DAILYMOTION = MATCH_URL_DAILYMOTION;
var MATCH_URL_MIXCLOUD = /mixcloud\.com\/([^/]+\/[^/]+)/;
var MATCH_URL_MIXCLOUD_1 = patterns$1.MATCH_URL_MIXCLOUD = MATCH_URL_MIXCLOUD;
var MATCH_URL_VIDYARD = /vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/;
var MATCH_URL_VIDYARD_1 = patterns$1.MATCH_URL_VIDYARD = MATCH_URL_VIDYARD;
var MATCH_URL_KALTURA = /^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_].*)$/;
var MATCH_URL_KALTURA_1 = patterns$1.MATCH_URL_KALTURA = MATCH_URL_KALTURA;
var AUDIO_EXTENSIONS = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
var AUDIO_EXTENSIONS_1 = patterns$1.AUDIO_EXTENSIONS = AUDIO_EXTENSIONS;
var VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;
var VIDEO_EXTENSIONS_1 = patterns$1.VIDEO_EXTENSIONS = VIDEO_EXTENSIONS;
var HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;
var HLS_EXTENSIONS_1 = patterns$1.HLS_EXTENSIONS = HLS_EXTENSIONS;
var DASH_EXTENSIONS = /\.(mpd)($|\?)/i;
var DASH_EXTENSIONS_1 = patterns$1.DASH_EXTENSIONS = DASH_EXTENSIONS;
var FLV_EXTENSIONS = /\.(flv)($|\?)/i;
var FLV_EXTENSIONS_1 = patterns$1.FLV_EXTENSIONS = FLV_EXTENSIONS;
var canPlayFile = function canPlayFile2(url) {
  if (url instanceof Array) {
    var _iterator = _createForOfIteratorHelper(url), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var item = _step.value;
        if (typeof item === "string" && canPlayFile2(item)) {
          return true;
        }
        if (canPlayFile2(item.src)) {
          return true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return false;
  }
  if ((0, _utils$1.isMediaStream)(url) || (0, _utils$1.isBlobUrl)(url)) {
    return true;
  }
  return AUDIO_EXTENSIONS.test(url) || VIDEO_EXTENSIONS.test(url) || HLS_EXTENSIONS.test(url) || DASH_EXTENSIONS.test(url) || FLV_EXTENSIONS.test(url);
};
var canPlay = {
  youtube: function youtube(url) {
    if (url instanceof Array) {
      return url.every(function(item) {
        return MATCH_URL_YOUTUBE.test(item);
      });
    }
    return MATCH_URL_YOUTUBE.test(url);
  },
  soundcloud: function soundcloud(url) {
    return MATCH_URL_SOUNDCLOUD.test(url) && !AUDIO_EXTENSIONS.test(url);
  },
  vimeo: function vimeo(url) {
    return MATCH_URL_VIMEO.test(url) && !VIDEO_EXTENSIONS.test(url) && !HLS_EXTENSIONS.test(url);
  },
  facebook: function facebook(url) {
    return MATCH_URL_FACEBOOK.test(url) || MATCH_URL_FACEBOOK_WATCH.test(url);
  },
  streamable: function streamable(url) {
    return MATCH_URL_STREAMABLE.test(url);
  },
  wistia: function wistia(url) {
    return MATCH_URL_WISTIA.test(url);
  },
  twitch: function twitch(url) {
    return MATCH_URL_TWITCH_VIDEO.test(url) || MATCH_URL_TWITCH_CHANNEL.test(url);
  },
  dailymotion: function dailymotion(url) {
    return MATCH_URL_DAILYMOTION.test(url);
  },
  mixcloud: function mixcloud(url) {
    return MATCH_URL_MIXCLOUD.test(url);
  },
  vidyard: function vidyard(url) {
    return MATCH_URL_VIDYARD.test(url);
  },
  kaltura: function kaltura(url) {
    return MATCH_URL_KALTURA.test(url);
  },
  file: canPlayFile
};
canPlay_1 = patterns$1.canPlay = canPlay;
const patterns = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  get canPlay() {
    return canPlay_1;
  },
  get FLV_EXTENSIONS() {
    return FLV_EXTENSIONS_1;
  },
  get DASH_EXTENSIONS() {
    return DASH_EXTENSIONS_1;
  },
  get HLS_EXTENSIONS() {
    return HLS_EXTENSIONS_1;
  },
  get VIDEO_EXTENSIONS() {
    return VIDEO_EXTENSIONS_1;
  },
  get AUDIO_EXTENSIONS() {
    return AUDIO_EXTENSIONS_1;
  },
  get MATCH_URL_KALTURA() {
    return MATCH_URL_KALTURA_1;
  },
  get MATCH_URL_VIDYARD() {
    return MATCH_URL_VIDYARD_1;
  },
  get MATCH_URL_MIXCLOUD() {
    return MATCH_URL_MIXCLOUD_1;
  },
  get MATCH_URL_DAILYMOTION() {
    return MATCH_URL_DAILYMOTION_1;
  },
  get MATCH_URL_TWITCH_CHANNEL() {
    return MATCH_URL_TWITCH_CHANNEL_1;
  },
  get MATCH_URL_TWITCH_VIDEO() {
    return MATCH_URL_TWITCH_VIDEO_1;
  },
  get MATCH_URL_WISTIA() {
    return MATCH_URL_WISTIA_1;
  },
  get MATCH_URL_STREAMABLE() {
    return MATCH_URL_STREAMABLE_1;
  },
  get MATCH_URL_FACEBOOK_WATCH() {
    return MATCH_URL_FACEBOOK_WATCH_1;
  },
  get MATCH_URL_FACEBOOK() {
    return MATCH_URL_FACEBOOK_1;
  },
  get MATCH_URL_VIMEO() {
    return MATCH_URL_VIMEO_1;
  },
  get MATCH_URL_SOUNDCLOUD() {
    return MATCH_URL_SOUNDCLOUD_1;
  },
  get MATCH_URL_YOUTUBE() {
    return MATCH_URL_YOUTUBE_1;
  },
  default: patterns$1
}, [patterns$1]);
const require$$2$1 = /* @__PURE__ */ getAugmentedNamespace(patterns);
var YouTube = {};
var hasRequiredYouTube;
function requireYouTube() {
  if (hasRequiredYouTube)
    return YouTube;
  hasRequiredYouTube = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    var _utils2 = require$$5;
    var _patterns = require$$2$1;
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache2();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys2(object2, enumerableOnly) {
      var keys = Object.keys(object2);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object2);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys2(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _slicedToArray2(arr, i) {
      return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest2();
    }
    function _nonIterableRest2() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray2(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray2(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray2(o, minLen);
    }
    function _arrayLikeToArray2(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit2(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles2(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://www.youtube.com/iframe_api";
    var SDK_GLOBAL = "YT";
    var SDK_GLOBAL_READY = "onYouTubeIframeAPIReady";
    var MATCH_PLAYLIST = /[?&](?:list|channel)=([a-zA-Z0-9_-]+)/;
    var MATCH_USER_UPLOADS = /user\/([a-zA-Z0-9_-]+)\/?/;
    var MATCH_NOCOOKIE = /youtube-nocookie\.com/;
    var NOCOOKIE_HOST = "https://www.youtube-nocookie.com";
    var YouTube2 = /* @__PURE__ */ function(_Component) {
      _inherits2(YouTube3, _Component);
      var _super = _createSuper2(YouTube3);
      function YouTube3() {
        var _this;
        _classCallCheck2(this, YouTube3);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "callPlayer", _utils2.callPlayer);
        _defineProperty2(_assertThisInitialized2(_this), "parsePlaylist", function(url) {
          if (url instanceof Array) {
            return {
              listType: "playlist",
              playlist: url.map(_this.getID).join(",")
            };
          }
          if (MATCH_PLAYLIST.test(url)) {
            var _url$match = url.match(MATCH_PLAYLIST), _url$match2 = _slicedToArray2(_url$match, 2), playlistId = _url$match2[1];
            return {
              listType: "playlist",
              list: playlistId.replace(/^UC/, "UU")
            };
          }
          if (MATCH_USER_UPLOADS.test(url)) {
            var _url$match3 = url.match(MATCH_USER_UPLOADS), _url$match4 = _slicedToArray2(_url$match3, 2), username = _url$match4[1];
            return {
              listType: "user_uploads",
              list: username
            };
          }
          return {};
        });
        _defineProperty2(_assertThisInitialized2(_this), "onStateChange", function(event) {
          var data = event.data;
          var _this$props = _this.props, onPlay = _this$props.onPlay, onPause = _this$props.onPause, onBuffer = _this$props.onBuffer, onBufferEnd = _this$props.onBufferEnd, onEnded = _this$props.onEnded, onReady = _this$props.onReady, loop = _this$props.loop, _this$props$config = _this$props.config, playerVars = _this$props$config.playerVars, onUnstarted = _this$props$config.onUnstarted;
          var _window$SDK_GLOBAL$Pl = window[SDK_GLOBAL].PlayerState, UNSTARTED = _window$SDK_GLOBAL$Pl.UNSTARTED, PLAYING = _window$SDK_GLOBAL$Pl.PLAYING, PAUSED = _window$SDK_GLOBAL$Pl.PAUSED, BUFFERING = _window$SDK_GLOBAL$Pl.BUFFERING, ENDED = _window$SDK_GLOBAL$Pl.ENDED, CUED = _window$SDK_GLOBAL$Pl.CUED;
          if (data === UNSTARTED)
            onUnstarted();
          if (data === PLAYING) {
            onPlay();
            onBufferEnd();
          }
          if (data === PAUSED)
            onPause();
          if (data === BUFFERING)
            onBuffer();
          if (data === ENDED) {
            var isPlaylist = !!_this.callPlayer("getPlaylist");
            if (loop && !isPlaylist) {
              if (playerVars.start) {
                _this.seekTo(playerVars.start);
              } else {
                _this.play();
              }
            }
            onEnded();
          }
          if (data === CUED)
            onReady();
        });
        _defineProperty2(_assertThisInitialized2(_this), "mute", function() {
          _this.callPlayer("mute");
        });
        _defineProperty2(_assertThisInitialized2(_this), "unmute", function() {
          _this.callPlayer("unMute");
        });
        _defineProperty2(_assertThisInitialized2(_this), "ref", function(container) {
          _this.container = container;
        });
        return _this;
      }
      _createClass2(YouTube3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "getID",
        value: function getID(url) {
          if (!url || url instanceof Array || MATCH_PLAYLIST.test(url)) {
            return null;
          }
          return url.match(_patterns.MATCH_URL_YOUTUBE)[1];
        }
      }, {
        key: "load",
        value: function load2(url, isReady) {
          var _this2 = this;
          var _this$props2 = this.props, playing = _this$props2.playing, muted = _this$props2.muted, playsinline = _this$props2.playsinline, controls = _this$props2.controls, loop = _this$props2.loop, config = _this$props2.config, _onError = _this$props2.onError;
          var playerVars = config.playerVars, embedOptions = config.embedOptions;
          var id = this.getID(url);
          if (isReady) {
            if (MATCH_PLAYLIST.test(url) || MATCH_USER_UPLOADS.test(url) || url instanceof Array) {
              this.player.loadPlaylist(this.parsePlaylist(url));
              return;
            }
            this.player.cueVideoById({
              videoId: id,
              startSeconds: (0, _utils2.parseStartTime)(url) || playerVars.start,
              endSeconds: (0, _utils2.parseEndTime)(url) || playerVars.end
            });
            return;
          }
          (0, _utils2.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, function(YT) {
            return YT.loaded;
          }).then(function(YT) {
            if (!_this2.container)
              return;
            _this2.player = new YT.Player(_this2.container, _objectSpread2({
              width: "100%",
              height: "100%",
              videoId: id,
              playerVars: _objectSpread2(_objectSpread2({
                autoplay: playing ? 1 : 0,
                mute: muted ? 1 : 0,
                controls: controls ? 1 : 0,
                start: (0, _utils2.parseStartTime)(url),
                end: (0, _utils2.parseEndTime)(url),
                origin: window.location.origin,
                playsinline: playsinline ? 1 : 0
              }, _this2.parsePlaylist(url)), playerVars),
              events: {
                onReady: function onReady() {
                  if (loop) {
                    _this2.player.setLoop(true);
                  }
                  _this2.props.onReady();
                },
                onPlaybackRateChange: function onPlaybackRateChange(event) {
                  return _this2.props.onPlaybackRateChange(event.data);
                },
                onStateChange: _this2.onStateChange,
                onError: function onError(event) {
                  return _onError(event.data);
                }
              },
              host: MATCH_NOCOOKIE.test(url) ? NOCOOKIE_HOST : void 0
            }, embedOptions));
          }, _onError);
          if (embedOptions.events) {
            console.warn("Using `embedOptions.events` will likely break things. Use ReactPlayer\u2019s callback props instead, eg onReady, onPlay, onPause");
          }
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("playVideo");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pauseVideo");
        }
      }, {
        key: "stop",
        value: function stop() {
          if (!document.body.contains(this.callPlayer("getIframe")))
            return;
          this.callPlayer("stopVideo");
        }
      }, {
        key: "seekTo",
        value: function seekTo(amount) {
          this.callPlayer("seekTo", amount);
          if (!this.props.playing) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction * 100);
        }
      }, {
        key: "setPlaybackRate",
        value: function setPlaybackRate(rate) {
          this.callPlayer("setPlaybackRate", rate);
        }
      }, {
        key: "setLoop",
        value: function setLoop(loop) {
          this.callPlayer("setLoop", loop);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.callPlayer("getDuration");
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.callPlayer("getCurrentTime");
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return this.callPlayer("getVideoLoadedFraction") * this.getDuration();
        }
      }, {
        key: "render",
        value: function render() {
          var display = this.props.display;
          var style = {
            width: "100%",
            height: "100%",
            display
          };
          return /* @__PURE__ */ _react2["default"].createElement("div", {
            style
          }, /* @__PURE__ */ _react2["default"].createElement("div", {
            ref: this.ref
          }));
        }
      }]);
      return YouTube3;
    }(_react2.Component);
    exports["default"] = YouTube2;
    _defineProperty2(YouTube2, "displayName", "YouTube");
    _defineProperty2(YouTube2, "canPlay", _patterns.canPlay.youtube);
  })(YouTube);
  return YouTube;
}
var SoundCloud = {};
var hasRequiredSoundCloud;
function requireSoundCloud() {
  if (hasRequiredSoundCloud)
    return SoundCloud;
  hasRequiredSoundCloud = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    var _utils2 = require$$5;
    var _patterns = require$$2$1;
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache2();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys2(object2, enumerableOnly) {
      var keys = Object.keys(object2);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object2);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys2(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://w.soundcloud.com/player/api.js";
    var SDK_GLOBAL = "SC";
    var SoundCloud2 = /* @__PURE__ */ function(_Component) {
      _inherits2(SoundCloud3, _Component);
      var _super = _createSuper2(SoundCloud3);
      function SoundCloud3() {
        var _this;
        _classCallCheck2(this, SoundCloud3);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "callPlayer", _utils2.callPlayer);
        _defineProperty2(_assertThisInitialized2(_this), "duration", null);
        _defineProperty2(_assertThisInitialized2(_this), "currentTime", null);
        _defineProperty2(_assertThisInitialized2(_this), "fractionLoaded", null);
        _defineProperty2(_assertThisInitialized2(_this), "mute", function() {
          _this.setVolume(0);
        });
        _defineProperty2(_assertThisInitialized2(_this), "unmute", function() {
          if (_this.props.volume !== null) {
            _this.setVolume(_this.props.volume);
          }
        });
        _defineProperty2(_assertThisInitialized2(_this), "ref", function(iframe) {
          _this.iframe = iframe;
        });
        return _this;
      }
      _createClass2(SoundCloud3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load2(url, isReady) {
          var _this2 = this;
          (0, _utils2.getSDK)(SDK_URL, SDK_GLOBAL).then(function(SC) {
            if (!_this2.iframe)
              return;
            var _SC$Widget$Events = SC.Widget.Events, PLAY = _SC$Widget$Events.PLAY, PLAY_PROGRESS = _SC$Widget$Events.PLAY_PROGRESS, PAUSE = _SC$Widget$Events.PAUSE, FINISH = _SC$Widget$Events.FINISH, ERROR = _SC$Widget$Events.ERROR;
            if (!isReady) {
              _this2.player = SC.Widget(_this2.iframe);
              _this2.player.bind(PLAY, _this2.props.onPlay);
              _this2.player.bind(PAUSE, function() {
                var remaining = _this2.duration - _this2.currentTime;
                if (remaining < 0.05) {
                  return;
                }
                _this2.props.onPause();
              });
              _this2.player.bind(PLAY_PROGRESS, function(e) {
                _this2.currentTime = e.currentPosition / 1e3;
                _this2.fractionLoaded = e.loadedProgress;
              });
              _this2.player.bind(FINISH, function() {
                return _this2.props.onEnded();
              });
              _this2.player.bind(ERROR, function(e) {
                return _this2.props.onError(e);
              });
            }
            _this2.player.load(url, _objectSpread2(_objectSpread2({}, _this2.props.config.options), {}, {
              callback: function callback() {
                _this2.player.getDuration(function(duration) {
                  _this2.duration = duration / 1e3;
                  _this2.props.onReady();
                });
              }
            }));
          });
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          this.callPlayer("seekTo", seconds * 1e3);
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction * 100);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return this.fractionLoaded * this.duration;
        }
      }, {
        key: "render",
        value: function render() {
          var display = this.props.display;
          var style = {
            width: "100%",
            height: "100%",
            display
          };
          return /* @__PURE__ */ _react2["default"].createElement("iframe", {
            ref: this.ref,
            src: "https://w.soundcloud.com/player/?url=".concat(encodeURIComponent(this.props.url)),
            style,
            frameBorder: 0,
            allow: "autoplay"
          });
        }
      }]);
      return SoundCloud3;
    }(_react2.Component);
    exports["default"] = SoundCloud2;
    _defineProperty2(SoundCloud2, "displayName", "SoundCloud");
    _defineProperty2(SoundCloud2, "canPlay", _patterns.canPlay.soundcloud);
    _defineProperty2(SoundCloud2, "loopOnEnded", true);
  })(SoundCloud);
  return SoundCloud;
}
var Vimeo = {};
var hasRequiredVimeo;
function requireVimeo() {
  if (hasRequiredVimeo)
    return Vimeo;
  hasRequiredVimeo = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    var _utils2 = require$$5;
    var _patterns = require$$2$1;
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache2();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys2(object2, enumerableOnly) {
      var keys = Object.keys(object2);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object2);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys2(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://player.vimeo.com/api/player.js";
    var SDK_GLOBAL = "Vimeo";
    var Vimeo2 = /* @__PURE__ */ function(_Component) {
      _inherits2(Vimeo3, _Component);
      var _super = _createSuper2(Vimeo3);
      function Vimeo3() {
        var _this;
        _classCallCheck2(this, Vimeo3);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "callPlayer", _utils2.callPlayer);
        _defineProperty2(_assertThisInitialized2(_this), "duration", null);
        _defineProperty2(_assertThisInitialized2(_this), "currentTime", null);
        _defineProperty2(_assertThisInitialized2(_this), "secondsLoaded", null);
        _defineProperty2(_assertThisInitialized2(_this), "mute", function() {
          _this.setMuted(true);
        });
        _defineProperty2(_assertThisInitialized2(_this), "unmute", function() {
          _this.setMuted(false);
        });
        _defineProperty2(_assertThisInitialized2(_this), "ref", function(container) {
          _this.container = container;
        });
        return _this;
      }
      _createClass2(Vimeo3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load2(url) {
          var _this2 = this;
          this.duration = null;
          (0, _utils2.getSDK)(SDK_URL, SDK_GLOBAL).then(function(Vimeo4) {
            if (!_this2.container)
              return;
            var _this2$props$config = _this2.props.config, playerOptions = _this2$props$config.playerOptions, title = _this2$props$config.title;
            _this2.player = new Vimeo4.Player(_this2.container, _objectSpread2({
              url,
              autoplay: _this2.props.playing,
              muted: _this2.props.muted,
              loop: _this2.props.loop,
              playsinline: _this2.props.playsinline,
              controls: _this2.props.controls
            }, playerOptions));
            _this2.player.ready().then(function() {
              var iframe = _this2.container.querySelector("iframe");
              iframe.style.width = "100%";
              iframe.style.height = "100%";
              if (title) {
                iframe.title = title;
              }
            })["catch"](_this2.props.onError);
            _this2.player.on("loaded", function() {
              _this2.props.onReady();
              _this2.refreshDuration();
            });
            _this2.player.on("play", function() {
              _this2.props.onPlay();
              _this2.refreshDuration();
            });
            _this2.player.on("pause", _this2.props.onPause);
            _this2.player.on("seeked", function(e) {
              return _this2.props.onSeek(e.seconds);
            });
            _this2.player.on("ended", _this2.props.onEnded);
            _this2.player.on("error", _this2.props.onError);
            _this2.player.on("timeupdate", function(_ref) {
              var seconds = _ref.seconds;
              _this2.currentTime = seconds;
            });
            _this2.player.on("progress", function(_ref2) {
              var seconds = _ref2.seconds;
              _this2.secondsLoaded = seconds;
            });
            _this2.player.on("bufferstart", _this2.props.onBuffer);
            _this2.player.on("bufferend", _this2.props.onBufferEnd);
            _this2.player.on("playbackratechange", function(e) {
              return _this2.props.onPlaybackRateChange(e.playbackRate);
            });
          }, this.props.onError);
        }
      }, {
        key: "refreshDuration",
        value: function refreshDuration() {
          var _this3 = this;
          this.player.getDuration().then(function(duration) {
            _this3.duration = duration;
          });
        }
      }, {
        key: "play",
        value: function play() {
          var promise = this.callPlayer("play");
          if (promise) {
            promise["catch"](this.props.onError);
          }
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
          this.callPlayer("unload");
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          this.callPlayer("setCurrentTime", seconds);
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction);
        }
      }, {
        key: "setMuted",
        value: function setMuted(muted) {
          this.callPlayer("setMuted", muted);
        }
      }, {
        key: "setLoop",
        value: function setLoop(loop) {
          this.callPlayer("setLoop", loop);
        }
      }, {
        key: "setPlaybackRate",
        value: function setPlaybackRate(rate) {
          this.callPlayer("setPlaybackRate", rate);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return this.secondsLoaded;
        }
      }, {
        key: "render",
        value: function render() {
          var display = this.props.display;
          var style = {
            width: "100%",
            height: "100%",
            overflow: "hidden",
            display
          };
          return /* @__PURE__ */ _react2["default"].createElement("div", {
            key: this.props.url,
            ref: this.ref,
            style
          });
        }
      }]);
      return Vimeo3;
    }(_react2.Component);
    exports["default"] = Vimeo2;
    _defineProperty2(Vimeo2, "displayName", "Vimeo");
    _defineProperty2(Vimeo2, "canPlay", _patterns.canPlay.vimeo);
    _defineProperty2(Vimeo2, "forceLoad", true);
  })(Vimeo);
  return Vimeo;
}
var Facebook = {};
var hasRequiredFacebook;
function requireFacebook() {
  if (hasRequiredFacebook)
    return Facebook;
  hasRequiredFacebook = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    var _utils2 = require$$5;
    var _patterns = require$$2$1;
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache2();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _extends2() {
      _extends2 = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends2.apply(this, arguments);
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://connect.facebook.net/en_US/sdk.js";
    var SDK_GLOBAL = "FB";
    var SDK_GLOBAL_READY = "fbAsyncInit";
    var PLAYER_ID_PREFIX = "facebook-player-";
    var Facebook2 = /* @__PURE__ */ function(_Component) {
      _inherits2(Facebook3, _Component);
      var _super = _createSuper2(Facebook3);
      function Facebook3() {
        var _this;
        _classCallCheck2(this, Facebook3);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "callPlayer", _utils2.callPlayer);
        _defineProperty2(_assertThisInitialized2(_this), "playerID", _this.props.config.playerId || "".concat(PLAYER_ID_PREFIX).concat((0, _utils2.randomString)()));
        _defineProperty2(_assertThisInitialized2(_this), "mute", function() {
          _this.callPlayer("mute");
        });
        _defineProperty2(_assertThisInitialized2(_this), "unmute", function() {
          _this.callPlayer("unmute");
        });
        return _this;
      }
      _createClass2(Facebook3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load2(url, isReady) {
          var _this2 = this;
          if (isReady) {
            (0, _utils2.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then(function(FB) {
              return FB.XFBML.parse();
            });
            return;
          }
          (0, _utils2.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then(function(FB) {
            FB.init({
              appId: _this2.props.config.appId,
              xfbml: true,
              version: _this2.props.config.version
            });
            FB.Event.subscribe("xfbml.render", function(msg) {
              _this2.props.onLoaded();
            });
            FB.Event.subscribe("xfbml.ready", function(msg) {
              if (msg.type === "video" && msg.id === _this2.playerID) {
                _this2.player = msg.instance;
                _this2.player.subscribe("startedPlaying", _this2.props.onPlay);
                _this2.player.subscribe("paused", _this2.props.onPause);
                _this2.player.subscribe("finishedPlaying", _this2.props.onEnded);
                _this2.player.subscribe("startedBuffering", _this2.props.onBuffer);
                _this2.player.subscribe("finishedBuffering", _this2.props.onBufferEnd);
                _this2.player.subscribe("error", _this2.props.onError);
                if (_this2.props.muted) {
                  _this2.callPlayer("mute");
                } else {
                  _this2.callPlayer("unmute");
                }
                _this2.props.onReady();
                document.getElementById(_this2.playerID).querySelector("iframe").style.visibility = "visible";
              }
            });
          });
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          this.callPlayer("seek", seconds);
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.callPlayer("getDuration");
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.callPlayer("getCurrentPosition");
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return null;
        }
      }, {
        key: "render",
        value: function render() {
          var attributes = this.props.config.attributes;
          var style = {
            width: "100%",
            height: "100%"
          };
          return /* @__PURE__ */ _react2["default"].createElement("div", _extends2({
            style,
            id: this.playerID,
            className: "fb-video",
            "data-href": this.props.url,
            "data-autoplay": this.props.playing ? "true" : "false",
            "data-allowfullscreen": "true",
            "data-controls": this.props.controls ? "true" : "false"
          }, attributes));
        }
      }]);
      return Facebook3;
    }(_react2.Component);
    exports["default"] = Facebook2;
    _defineProperty2(Facebook2, "displayName", "Facebook");
    _defineProperty2(Facebook2, "canPlay", _patterns.canPlay.facebook);
    _defineProperty2(Facebook2, "loopOnEnded", true);
  })(Facebook);
  return Facebook;
}
var Streamable = {};
var hasRequiredStreamable;
function requireStreamable() {
  if (hasRequiredStreamable)
    return Streamable;
  hasRequiredStreamable = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    var _utils2 = require$$5;
    var _patterns = require$$2$1;
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache2();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://cdn.embed.ly/player-0.1.0.min.js";
    var SDK_GLOBAL = "playerjs";
    var Streamable2 = /* @__PURE__ */ function(_Component) {
      _inherits2(Streamable3, _Component);
      var _super = _createSuper2(Streamable3);
      function Streamable3() {
        var _this;
        _classCallCheck2(this, Streamable3);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "callPlayer", _utils2.callPlayer);
        _defineProperty2(_assertThisInitialized2(_this), "duration", null);
        _defineProperty2(_assertThisInitialized2(_this), "currentTime", null);
        _defineProperty2(_assertThisInitialized2(_this), "secondsLoaded", null);
        _defineProperty2(_assertThisInitialized2(_this), "mute", function() {
          _this.callPlayer("mute");
        });
        _defineProperty2(_assertThisInitialized2(_this), "unmute", function() {
          _this.callPlayer("unmute");
        });
        _defineProperty2(_assertThisInitialized2(_this), "ref", function(iframe) {
          _this.iframe = iframe;
        });
        return _this;
      }
      _createClass2(Streamable3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load2(url) {
          var _this2 = this;
          (0, _utils2.getSDK)(SDK_URL, SDK_GLOBAL).then(function(playerjs) {
            if (!_this2.iframe)
              return;
            _this2.player = new playerjs.Player(_this2.iframe);
            _this2.player.setLoop(_this2.props.loop);
            _this2.player.on("ready", _this2.props.onReady);
            _this2.player.on("play", _this2.props.onPlay);
            _this2.player.on("pause", _this2.props.onPause);
            _this2.player.on("seeked", _this2.props.onSeek);
            _this2.player.on("ended", _this2.props.onEnded);
            _this2.player.on("error", _this2.props.onError);
            _this2.player.on("timeupdate", function(_ref) {
              var duration = _ref.duration, seconds = _ref.seconds;
              _this2.duration = duration;
              _this2.currentTime = seconds;
            });
            _this2.player.on("buffered", function(_ref2) {
              var percent = _ref2.percent;
              if (_this2.duration) {
                _this2.secondsLoaded = _this2.duration * percent;
              }
            });
            if (_this2.props.muted) {
              _this2.player.mute();
            }
          }, this.props.onError);
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          this.callPlayer("setCurrentTime", seconds);
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction * 100);
        }
      }, {
        key: "setLoop",
        value: function setLoop(loop) {
          this.callPlayer("setLoop", loop);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return this.secondsLoaded;
        }
      }, {
        key: "render",
        value: function render() {
          var id = this.props.url.match(_patterns.MATCH_URL_STREAMABLE)[1];
          var style = {
            width: "100%",
            height: "100%"
          };
          return /* @__PURE__ */ _react2["default"].createElement("iframe", {
            ref: this.ref,
            src: "https://streamable.com/o/".concat(id),
            frameBorder: "0",
            scrolling: "no",
            style,
            allow: "encrypted-media; autoplay; fullscreen;"
          });
        }
      }]);
      return Streamable3;
    }(_react2.Component);
    exports["default"] = Streamable2;
    _defineProperty2(Streamable2, "displayName", "Streamable");
    _defineProperty2(Streamable2, "canPlay", _patterns.canPlay.streamable);
  })(Streamable);
  return Streamable;
}
var Wistia = {};
var hasRequiredWistia;
function requireWistia() {
  if (hasRequiredWistia)
    return Wistia;
  hasRequiredWistia = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    var _utils2 = require$$5;
    var _patterns = require$$2$1;
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache2();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys2(object2, enumerableOnly) {
      var keys = Object.keys(object2);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object2);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys2(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://fast.wistia.com/assets/external/E-v1.js";
    var SDK_GLOBAL = "Wistia";
    var PLAYER_ID_PREFIX = "wistia-player-";
    var Wistia2 = /* @__PURE__ */ function(_Component) {
      _inherits2(Wistia3, _Component);
      var _super = _createSuper2(Wistia3);
      function Wistia3() {
        var _this;
        _classCallCheck2(this, Wistia3);
        for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
          _args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(_args));
        _defineProperty2(_assertThisInitialized2(_this), "callPlayer", _utils2.callPlayer);
        _defineProperty2(_assertThisInitialized2(_this), "playerID", _this.props.config.playerId || "".concat(PLAYER_ID_PREFIX).concat((0, _utils2.randomString)()));
        _defineProperty2(_assertThisInitialized2(_this), "onPlay", function() {
          var _this$props;
          return (_this$props = _this.props).onPlay.apply(_this$props, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onPause", function() {
          var _this$props2;
          return (_this$props2 = _this.props).onPause.apply(_this$props2, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onSeek", function() {
          var _this$props3;
          return (_this$props3 = _this.props).onSeek.apply(_this$props3, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onEnded", function() {
          var _this$props4;
          return (_this$props4 = _this.props).onEnded.apply(_this$props4, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onPlaybackRateChange", function() {
          var _this$props5;
          return (_this$props5 = _this.props).onPlaybackRateChange.apply(_this$props5, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "mute", function() {
          _this.callPlayer("mute");
        });
        _defineProperty2(_assertThisInitialized2(_this), "unmute", function() {
          _this.callPlayer("unmute");
        });
        return _this;
      }
      _createClass2(Wistia3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load2(url) {
          var _this2 = this;
          var _this$props6 = this.props, playing = _this$props6.playing, muted = _this$props6.muted, controls = _this$props6.controls, _onReady = _this$props6.onReady, config = _this$props6.config, onError = _this$props6.onError;
          (0, _utils2.getSDK)(SDK_URL, SDK_GLOBAL).then(function(Wistia4) {
            if (config.customControls) {
              config.customControls.forEach(function(control) {
                return Wistia4.defineControl(control);
              });
            }
            window._wq = window._wq || [];
            window._wq.push({
              id: _this2.playerID,
              options: _objectSpread2({
                autoPlay: playing,
                silentAutoPlay: "allow",
                muted,
                controlsVisibleOnLoad: controls,
                fullscreenButton: controls,
                playbar: controls,
                playbackRateControl: controls,
                qualityControl: controls,
                volumeControl: controls,
                settingsControl: controls,
                smallPlayButton: controls
              }, config.options),
              onReady: function onReady(player) {
                _this2.player = player;
                _this2.unbind();
                _this2.player.bind("play", _this2.onPlay);
                _this2.player.bind("pause", _this2.onPause);
                _this2.player.bind("seek", _this2.onSeek);
                _this2.player.bind("end", _this2.onEnded);
                _this2.player.bind("playbackratechange", _this2.onPlaybackRateChange);
                _onReady();
              }
            });
          }, onError);
        }
      }, {
        key: "unbind",
        value: function unbind() {
          this.player.unbind("play", this.onPlay);
          this.player.unbind("pause", this.onPause);
          this.player.unbind("seek", this.onSeek);
          this.player.unbind("end", this.onEnded);
          this.player.unbind("playbackratechange", this.onPlaybackRateChange);
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
          this.unbind();
          this.callPlayer("remove");
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          this.callPlayer("time", seconds);
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("volume", fraction);
        }
      }, {
        key: "setPlaybackRate",
        value: function setPlaybackRate(rate) {
          this.callPlayer("playbackRate", rate);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.callPlayer("duration");
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.callPlayer("time");
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return null;
        }
      }, {
        key: "render",
        value: function render() {
          var url = this.props.url;
          var videoID = url && url.match(_patterns.MATCH_URL_WISTIA)[1];
          var className = "wistia_embed wistia_async_".concat(videoID);
          var style = {
            width: "100%",
            height: "100%"
          };
          return /* @__PURE__ */ _react2["default"].createElement("div", {
            id: this.playerID,
            key: videoID,
            className,
            style
          });
        }
      }]);
      return Wistia3;
    }(_react2.Component);
    exports["default"] = Wistia2;
    _defineProperty2(Wistia2, "displayName", "Wistia");
    _defineProperty2(Wistia2, "canPlay", _patterns.canPlay.wistia);
    _defineProperty2(Wistia2, "loopOnEnded", true);
  })(Wistia);
  return Wistia;
}
var Twitch = {};
var hasRequiredTwitch;
function requireTwitch() {
  if (hasRequiredTwitch)
    return Twitch;
  hasRequiredTwitch = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    var _utils2 = require$$5;
    var _patterns = require$$2$1;
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache2();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys2(object2, enumerableOnly) {
      var keys = Object.keys(object2);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object2);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys2(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://player.twitch.tv/js/embed/v1.js";
    var SDK_GLOBAL = "Twitch";
    var PLAYER_ID_PREFIX = "twitch-player-";
    var Twitch2 = /* @__PURE__ */ function(_Component) {
      _inherits2(Twitch3, _Component);
      var _super = _createSuper2(Twitch3);
      function Twitch3() {
        var _this;
        _classCallCheck2(this, Twitch3);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "callPlayer", _utils2.callPlayer);
        _defineProperty2(_assertThisInitialized2(_this), "playerID", _this.props.config.playerId || "".concat(PLAYER_ID_PREFIX).concat((0, _utils2.randomString)()));
        _defineProperty2(_assertThisInitialized2(_this), "mute", function() {
          _this.callPlayer("setMuted", true);
        });
        _defineProperty2(_assertThisInitialized2(_this), "unmute", function() {
          _this.callPlayer("setMuted", false);
        });
        return _this;
      }
      _createClass2(Twitch3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load2(url, isReady) {
          var _this2 = this;
          var _this$props = this.props, playsinline = _this$props.playsinline, onError = _this$props.onError, config = _this$props.config, controls = _this$props.controls;
          var isChannel = _patterns.MATCH_URL_TWITCH_CHANNEL.test(url);
          var id = isChannel ? url.match(_patterns.MATCH_URL_TWITCH_CHANNEL)[1] : url.match(_patterns.MATCH_URL_TWITCH_VIDEO)[1];
          if (isReady) {
            if (isChannel) {
              this.player.setChannel(id);
            } else {
              this.player.setVideo("v" + id);
            }
            return;
          }
          (0, _utils2.getSDK)(SDK_URL, SDK_GLOBAL).then(function(Twitch4) {
            _this2.player = new Twitch4.Player(_this2.playerID, _objectSpread2({
              video: isChannel ? "" : id,
              channel: isChannel ? id : "",
              height: "100%",
              width: "100%",
              playsinline,
              autoplay: _this2.props.playing,
              muted: _this2.props.muted,
              controls: isChannel ? true : controls,
              time: (0, _utils2.parseStartTime)(url)
            }, config.options));
            var _Twitch$Player = Twitch4.Player, READY = _Twitch$Player.READY, PLAYING = _Twitch$Player.PLAYING, PAUSE = _Twitch$Player.PAUSE, ENDED = _Twitch$Player.ENDED, ONLINE = _Twitch$Player.ONLINE, OFFLINE = _Twitch$Player.OFFLINE, SEEK = _Twitch$Player.SEEK;
            _this2.player.addEventListener(READY, _this2.props.onReady);
            _this2.player.addEventListener(PLAYING, _this2.props.onPlay);
            _this2.player.addEventListener(PAUSE, _this2.props.onPause);
            _this2.player.addEventListener(ENDED, _this2.props.onEnded);
            _this2.player.addEventListener(SEEK, _this2.props.onSeek);
            _this2.player.addEventListener(ONLINE, _this2.props.onLoaded);
            _this2.player.addEventListener(OFFLINE, _this2.props.onLoaded);
          }, onError);
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
          this.callPlayer("pause");
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          this.callPlayer("seek", seconds);
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.callPlayer("getDuration");
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.callPlayer("getCurrentTime");
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return null;
        }
      }, {
        key: "render",
        value: function render() {
          var style = {
            width: "100%",
            height: "100%"
          };
          return /* @__PURE__ */ _react2["default"].createElement("div", {
            style,
            id: this.playerID
          });
        }
      }]);
      return Twitch3;
    }(_react2.Component);
    exports["default"] = Twitch2;
    _defineProperty2(Twitch2, "displayName", "Twitch");
    _defineProperty2(Twitch2, "canPlay", _patterns.canPlay.twitch);
    _defineProperty2(Twitch2, "loopOnEnded", true);
  })(Twitch);
  return Twitch;
}
var DailyMotion = {};
var hasRequiredDailyMotion;
function requireDailyMotion() {
  if (hasRequiredDailyMotion)
    return DailyMotion;
  hasRequiredDailyMotion = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    var _utils2 = require$$5;
    var _patterns = require$$2$1;
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache2();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys2(object2, enumerableOnly) {
      var keys = Object.keys(object2);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object2);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys2(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _slicedToArray2(arr, i) {
      return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest2();
    }
    function _nonIterableRest2() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray2(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray2(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray2(o, minLen);
    }
    function _arrayLikeToArray2(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit2(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles2(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://api.dmcdn.net/all.js";
    var SDK_GLOBAL = "DM";
    var SDK_GLOBAL_READY = "dmAsyncInit";
    var DailyMotion2 = /* @__PURE__ */ function(_Component) {
      _inherits2(DailyMotion3, _Component);
      var _super = _createSuper2(DailyMotion3);
      function DailyMotion3() {
        var _this;
        _classCallCheck2(this, DailyMotion3);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "callPlayer", _utils2.callPlayer);
        _defineProperty2(_assertThisInitialized2(_this), "onDurationChange", function() {
          var duration = _this.getDuration();
          _this.props.onDuration(duration);
        });
        _defineProperty2(_assertThisInitialized2(_this), "mute", function() {
          _this.callPlayer("setMuted", true);
        });
        _defineProperty2(_assertThisInitialized2(_this), "unmute", function() {
          _this.callPlayer("setMuted", false);
        });
        _defineProperty2(_assertThisInitialized2(_this), "ref", function(container) {
          _this.container = container;
        });
        return _this;
      }
      _createClass2(DailyMotion3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load2(url) {
          var _this2 = this;
          var _this$props = this.props, controls = _this$props.controls, config = _this$props.config, onError = _this$props.onError, playing = _this$props.playing;
          var _url$match = url.match(_patterns.MATCH_URL_DAILYMOTION), _url$match2 = _slicedToArray2(_url$match, 2), id = _url$match2[1];
          if (this.player) {
            this.player.load(id, {
              start: (0, _utils2.parseStartTime)(url),
              autoplay: playing
            });
            return;
          }
          (0, _utils2.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, function(DM) {
            return DM.player;
          }).then(function(DM) {
            if (!_this2.container)
              return;
            var Player2 = DM.player;
            _this2.player = new Player2(_this2.container, {
              width: "100%",
              height: "100%",
              video: id,
              params: _objectSpread2({
                controls,
                autoplay: _this2.props.playing,
                mute: _this2.props.muted,
                start: (0, _utils2.parseStartTime)(url),
                origin: window.location.origin
              }, config.params),
              events: {
                apiready: _this2.props.onReady,
                seeked: function seeked() {
                  return _this2.props.onSeek(_this2.player.currentTime);
                },
                video_end: _this2.props.onEnded,
                durationchange: _this2.onDurationChange,
                pause: _this2.props.onPause,
                playing: _this2.props.onPlay,
                waiting: _this2.props.onBuffer,
                error: function error(event) {
                  return onError(event);
                }
              }
            });
          }, onError);
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          this.callPlayer("seek", seconds);
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.player.duration || null;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.player.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return this.player.bufferedTime;
        }
      }, {
        key: "render",
        value: function render() {
          var display = this.props.display;
          var style = {
            width: "100%",
            height: "100%",
            display
          };
          return /* @__PURE__ */ _react2["default"].createElement("div", {
            style
          }, /* @__PURE__ */ _react2["default"].createElement("div", {
            ref: this.ref
          }));
        }
      }]);
      return DailyMotion3;
    }(_react2.Component);
    exports["default"] = DailyMotion2;
    _defineProperty2(DailyMotion2, "displayName", "DailyMotion");
    _defineProperty2(DailyMotion2, "canPlay", _patterns.canPlay.dailymotion);
    _defineProperty2(DailyMotion2, "loopOnEnded", true);
  })(DailyMotion);
  return DailyMotion;
}
var Mixcloud = {};
var hasRequiredMixcloud;
function requireMixcloud() {
  if (hasRequiredMixcloud)
    return Mixcloud;
  hasRequiredMixcloud = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    var _utils2 = require$$5;
    var _patterns = require$$2$1;
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache2();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys2(object2, enumerableOnly) {
      var keys = Object.keys(object2);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object2);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys2(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://widget.mixcloud.com/media/js/widgetApi.js";
    var SDK_GLOBAL = "Mixcloud";
    var Mixcloud2 = /* @__PURE__ */ function(_Component) {
      _inherits2(Mixcloud3, _Component);
      var _super = _createSuper2(Mixcloud3);
      function Mixcloud3() {
        var _this;
        _classCallCheck2(this, Mixcloud3);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "callPlayer", _utils2.callPlayer);
        _defineProperty2(_assertThisInitialized2(_this), "duration", null);
        _defineProperty2(_assertThisInitialized2(_this), "currentTime", null);
        _defineProperty2(_assertThisInitialized2(_this), "secondsLoaded", null);
        _defineProperty2(_assertThisInitialized2(_this), "mute", function() {
        });
        _defineProperty2(_assertThisInitialized2(_this), "unmute", function() {
        });
        _defineProperty2(_assertThisInitialized2(_this), "ref", function(iframe) {
          _this.iframe = iframe;
        });
        return _this;
      }
      _createClass2(Mixcloud3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load2(url) {
          var _this2 = this;
          (0, _utils2.getSDK)(SDK_URL, SDK_GLOBAL).then(function(Mixcloud4) {
            _this2.player = Mixcloud4.PlayerWidget(_this2.iframe);
            _this2.player.ready.then(function() {
              _this2.player.events.play.on(_this2.props.onPlay);
              _this2.player.events.pause.on(_this2.props.onPause);
              _this2.player.events.ended.on(_this2.props.onEnded);
              _this2.player.events.error.on(_this2.props.error);
              _this2.player.events.progress.on(function(seconds, duration) {
                _this2.currentTime = seconds;
                _this2.duration = duration;
              });
              _this2.props.onReady();
            });
          }, this.props.onError);
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          this.callPlayer("seek", seconds);
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return null;
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props = this.props, url = _this$props.url, config = _this$props.config;
          var id = url.match(_patterns.MATCH_URL_MIXCLOUD)[1];
          var style = {
            width: "100%",
            height: "100%"
          };
          var query = (0, _utils2.queryString)(_objectSpread2(_objectSpread2({}, config.options), {}, {
            feed: "/".concat(id, "/")
          }));
          return /* @__PURE__ */ _react2["default"].createElement("iframe", {
            key: id,
            ref: this.ref,
            style,
            src: "https://www.mixcloud.com/widget/iframe/?".concat(query),
            frameBorder: "0",
            allow: "autoplay"
          });
        }
      }]);
      return Mixcloud3;
    }(_react2.Component);
    exports["default"] = Mixcloud2;
    _defineProperty2(Mixcloud2, "displayName", "Mixcloud");
    _defineProperty2(Mixcloud2, "canPlay", _patterns.canPlay.mixcloud);
    _defineProperty2(Mixcloud2, "loopOnEnded", true);
  })(Mixcloud);
  return Mixcloud;
}
var Vidyard = {};
var hasRequiredVidyard;
function requireVidyard() {
  if (hasRequiredVidyard)
    return Vidyard;
  hasRequiredVidyard = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    var _utils2 = require$$5;
    var _patterns = require$$2$1;
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache2();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys2(object2, enumerableOnly) {
      var keys = Object.keys(object2);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object2);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys2(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://play.vidyard.com/embed/v4.js";
    var SDK_GLOBAL = "VidyardV4";
    var SDK_GLOBAL_READY = "onVidyardAPI";
    var Vidyard2 = /* @__PURE__ */ function(_Component) {
      _inherits2(Vidyard3, _Component);
      var _super = _createSuper2(Vidyard3);
      function Vidyard3() {
        var _this;
        _classCallCheck2(this, Vidyard3);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "callPlayer", _utils2.callPlayer);
        _defineProperty2(_assertThisInitialized2(_this), "mute", function() {
          _this.setVolume(0);
        });
        _defineProperty2(_assertThisInitialized2(_this), "unmute", function() {
          if (_this.props.volume !== null) {
            _this.setVolume(_this.props.volume);
          }
        });
        _defineProperty2(_assertThisInitialized2(_this), "ref", function(container) {
          _this.container = container;
        });
        return _this;
      }
      _createClass2(Vidyard3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load2(url) {
          var _this2 = this;
          var _this$props = this.props, playing = _this$props.playing, config = _this$props.config, onError = _this$props.onError, onDuration = _this$props.onDuration;
          var id = url && url.match(_patterns.MATCH_URL_VIDYARD)[1];
          if (this.player) {
            this.stop();
          }
          (0, _utils2.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then(function(Vidyard4) {
            if (!_this2.container)
              return;
            Vidyard4.api.addReadyListener(function(data, player) {
              if (_this2.player) {
                return;
              }
              _this2.player = player;
              _this2.player.on("ready", _this2.props.onReady);
              _this2.player.on("play", _this2.props.onPlay);
              _this2.player.on("pause", _this2.props.onPause);
              _this2.player.on("seek", _this2.props.onSeek);
              _this2.player.on("playerComplete", _this2.props.onEnded);
            }, id);
            Vidyard4.api.renderPlayer(_objectSpread2({
              uuid: id,
              container: _this2.container,
              autoplay: playing ? 1 : 0
            }, config.options));
            Vidyard4.api.getPlayerMetadata(id).then(function(meta) {
              _this2.duration = meta.length_in_seconds;
              onDuration(meta.length_in_seconds);
            });
          }, onError);
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
          window.VidyardV4.api.destroyPlayer(this.player);
        }
      }, {
        key: "seekTo",
        value: function seekTo(amount) {
          this.callPlayer("seek", amount);
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction);
        }
      }, {
        key: "setPlaybackRate",
        value: function setPlaybackRate(rate) {
          this.callPlayer("setPlaybackSpeed", rate);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.callPlayer("currentTime");
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return null;
        }
      }, {
        key: "render",
        value: function render() {
          var display = this.props.display;
          var style = {
            width: "100%",
            height: "100%",
            display
          };
          return /* @__PURE__ */ _react2["default"].createElement("div", {
            style
          }, /* @__PURE__ */ _react2["default"].createElement("div", {
            ref: this.ref
          }));
        }
      }]);
      return Vidyard3;
    }(_react2.Component);
    exports["default"] = Vidyard2;
    _defineProperty2(Vidyard2, "displayName", "Vidyard");
    _defineProperty2(Vidyard2, "canPlay", _patterns.canPlay.vidyard);
  })(Vidyard);
  return Vidyard;
}
var Kaltura = {};
var hasRequiredKaltura;
function requireKaltura() {
  if (hasRequiredKaltura)
    return Kaltura;
  hasRequiredKaltura = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    var _utils2 = require$$5;
    var _patterns = require$$2$1;
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache2();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://cdn.embed.ly/player-0.1.0.min.js";
    var SDK_GLOBAL = "playerjs";
    var Kaltura2 = /* @__PURE__ */ function(_Component) {
      _inherits2(Kaltura3, _Component);
      var _super = _createSuper2(Kaltura3);
      function Kaltura3() {
        var _this;
        _classCallCheck2(this, Kaltura3);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "callPlayer", _utils2.callPlayer);
        _defineProperty2(_assertThisInitialized2(_this), "duration", null);
        _defineProperty2(_assertThisInitialized2(_this), "currentTime", null);
        _defineProperty2(_assertThisInitialized2(_this), "secondsLoaded", null);
        _defineProperty2(_assertThisInitialized2(_this), "mute", function() {
          _this.callPlayer("mute");
        });
        _defineProperty2(_assertThisInitialized2(_this), "unmute", function() {
          _this.callPlayer("unmute");
        });
        _defineProperty2(_assertThisInitialized2(_this), "ref", function(iframe) {
          _this.iframe = iframe;
        });
        return _this;
      }
      _createClass2(Kaltura3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load2(url) {
          var _this2 = this;
          (0, _utils2.getSDK)(SDK_URL, SDK_GLOBAL).then(function(playerjs) {
            if (!_this2.iframe)
              return;
            _this2.player = new playerjs.Player(_this2.iframe);
            _this2.player.on("ready", function() {
              setTimeout(function() {
                _this2.player.isReady = true;
                _this2.player.setLoop(_this2.props.loop);
                if (_this2.props.muted) {
                  _this2.player.mute();
                }
                _this2.addListeners(_this2.player, _this2.props);
                _this2.props.onReady();
              }, 500);
            });
          }, this.props.onError);
        }
      }, {
        key: "addListeners",
        value: function addListeners(player, props2) {
          var _this3 = this;
          player.on("play", props2.onPlay);
          player.on("pause", props2.onPause);
          player.on("ended", props2.onEnded);
          player.on("error", props2.onError);
          player.on("timeupdate", function(_ref) {
            var duration = _ref.duration, seconds = _ref.seconds;
            _this3.duration = duration;
            _this3.currentTime = seconds;
          });
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          this.callPlayer("setCurrentTime", seconds);
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction);
        }
      }, {
        key: "setLoop",
        value: function setLoop(loop) {
          this.callPlayer("setLoop", loop);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return this.secondsLoaded;
        }
      }, {
        key: "render",
        value: function render() {
          var style = {
            width: "100%",
            height: "100%"
          };
          return /* @__PURE__ */ _react2["default"].createElement("iframe", {
            ref: this.ref,
            src: this.props.url,
            frameBorder: "0",
            scrolling: "no",
            style,
            allow: "encrypted-media; autoplay; fullscreen;",
            referrerPolicy: "no-referrer-when-downgrade"
          });
        }
      }]);
      return Kaltura3;
    }(_react2.Component);
    exports["default"] = Kaltura2;
    _defineProperty2(Kaltura2, "displayName", "Kaltura");
    _defineProperty2(Kaltura2, "canPlay", _patterns.canPlay.kaltura);
  })(Kaltura);
  return Kaltura;
}
var FilePlayer = {};
var hasRequiredFilePlayer;
function requireFilePlayer() {
  if (hasRequiredFilePlayer)
    return FilePlayer;
  hasRequiredFilePlayer = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    var _utils2 = require$$5;
    var _patterns = require$$2$1;
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache2();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _extends2() {
      _extends2 = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends2.apply(this, arguments);
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var HAS_NAVIGATOR = typeof navigator !== "undefined";
    var IS_IPAD_PRO = HAS_NAVIGATOR && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    var IS_IOS = HAS_NAVIGATOR && (/iPad|iPhone|iPod/.test(navigator.userAgent) || IS_IPAD_PRO) && !window.MSStream;
    var IS_SAFARI = HAS_NAVIGATOR && /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && !window.MSStream;
    var HLS_SDK_URL = "https://cdn.jsdelivr.net/npm/hls.js@VERSION/dist/hls.min.js";
    var HLS_GLOBAL = "Hls";
    var DASH_SDK_URL = "https://cdnjs.cloudflare.com/ajax/libs/dashjs/VERSION/dash.all.min.js";
    var DASH_GLOBAL = "dashjs";
    var FLV_SDK_URL = "https://cdn.jsdelivr.net/npm/flv.js@VERSION/dist/flv.min.js";
    var FLV_GLOBAL = "flvjs";
    var MATCH_DROPBOX_URL = /www\.dropbox\.com\/.+/;
    var MATCH_CLOUDFLARE_STREAM = /https:\/\/watch\.cloudflarestream\.com\/([a-z0-9]+)/;
    var REPLACE_CLOUDFLARE_STREAM = "https://videodelivery.net/{id}/manifest/video.m3u8";
    var FilePlayer2 = /* @__PURE__ */ function(_Component) {
      _inherits2(FilePlayer3, _Component);
      var _super = _createSuper2(FilePlayer3);
      function FilePlayer3() {
        var _this;
        _classCallCheck2(this, FilePlayer3);
        for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
          _args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(_args));
        _defineProperty2(_assertThisInitialized2(_this), "onReady", function() {
          var _this$props;
          return (_this$props = _this.props).onReady.apply(_this$props, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onPlay", function() {
          var _this$props2;
          return (_this$props2 = _this.props).onPlay.apply(_this$props2, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onBuffer", function() {
          var _this$props3;
          return (_this$props3 = _this.props).onBuffer.apply(_this$props3, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onBufferEnd", function() {
          var _this$props4;
          return (_this$props4 = _this.props).onBufferEnd.apply(_this$props4, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onPause", function() {
          var _this$props5;
          return (_this$props5 = _this.props).onPause.apply(_this$props5, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onEnded", function() {
          var _this$props6;
          return (_this$props6 = _this.props).onEnded.apply(_this$props6, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onError", function() {
          var _this$props7;
          return (_this$props7 = _this.props).onError.apply(_this$props7, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onPlayBackRateChange", function(event) {
          return _this.props.onPlaybackRateChange(event.target.playbackRate);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onEnablePIP", function() {
          var _this$props8;
          return (_this$props8 = _this.props).onEnablePIP.apply(_this$props8, arguments);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onDisablePIP", function(e) {
          var _this$props9 = _this.props, onDisablePIP = _this$props9.onDisablePIP, playing = _this$props9.playing;
          onDisablePIP(e);
          if (playing) {
            _this.play();
          }
        });
        _defineProperty2(_assertThisInitialized2(_this), "onPresentationModeChange", function(e) {
          if (_this.player && (0, _utils2.supportsWebKitPresentationMode)(_this.player)) {
            var webkitPresentationMode = _this.player.webkitPresentationMode;
            if (webkitPresentationMode === "picture-in-picture") {
              _this.onEnablePIP(e);
            } else if (webkitPresentationMode === "inline") {
              _this.onDisablePIP(e);
            }
          }
        });
        _defineProperty2(_assertThisInitialized2(_this), "onSeek", function(e) {
          _this.props.onSeek(e.target.currentTime);
        });
        _defineProperty2(_assertThisInitialized2(_this), "mute", function() {
          _this.player.muted = true;
        });
        _defineProperty2(_assertThisInitialized2(_this), "unmute", function() {
          _this.player.muted = false;
        });
        _defineProperty2(_assertThisInitialized2(_this), "renderSourceElement", function(source, index2) {
          if (typeof source === "string") {
            return /* @__PURE__ */ _react2["default"].createElement("source", {
              key: index2,
              src: source
            });
          }
          return /* @__PURE__ */ _react2["default"].createElement("source", _extends2({
            key: index2
          }, source));
        });
        _defineProperty2(_assertThisInitialized2(_this), "renderTrack", function(track, index2) {
          return /* @__PURE__ */ _react2["default"].createElement("track", _extends2({
            key: index2
          }, track));
        });
        _defineProperty2(_assertThisInitialized2(_this), "ref", function(player) {
          if (_this.player) {
            _this.prevPlayer = _this.player;
          }
          _this.player = player;
        });
        return _this;
      }
      _createClass2(FilePlayer3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
          this.addListeners(this.player);
          this.player.src = this.getSource(this.props.url);
          if (IS_IOS) {
            this.player.load();
          }
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(prevProps)) {
            this.removeListeners(this.prevPlayer, prevProps.url);
            this.addListeners(this.player);
          }
          if (this.props.url !== prevProps.url && !(0, _utils2.isMediaStream)(this.props.url)) {
            this.player.srcObject = null;
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.player.src = "";
          this.removeListeners(this.player);
          if (this.hls) {
            this.hls.destroy();
          }
        }
      }, {
        key: "addListeners",
        value: function addListeners(player) {
          var _this$props10 = this.props, url = _this$props10.url, playsinline = _this$props10.playsinline;
          player.addEventListener("play", this.onPlay);
          player.addEventListener("waiting", this.onBuffer);
          player.addEventListener("playing", this.onBufferEnd);
          player.addEventListener("pause", this.onPause);
          player.addEventListener("seeked", this.onSeek);
          player.addEventListener("ended", this.onEnded);
          player.addEventListener("error", this.onError);
          player.addEventListener("ratechange", this.onPlayBackRateChange);
          player.addEventListener("enterpictureinpicture", this.onEnablePIP);
          player.addEventListener("leavepictureinpicture", this.onDisablePIP);
          player.addEventListener("webkitpresentationmodechanged", this.onPresentationModeChange);
          if (!this.shouldUseHLS(url)) {
            player.addEventListener("canplay", this.onReady);
          }
          if (playsinline) {
            player.setAttribute("playsinline", "");
            player.setAttribute("webkit-playsinline", "");
            player.setAttribute("x5-playsinline", "");
          }
        }
      }, {
        key: "removeListeners",
        value: function removeListeners(player, url) {
          player.removeEventListener("canplay", this.onReady);
          player.removeEventListener("play", this.onPlay);
          player.removeEventListener("waiting", this.onBuffer);
          player.removeEventListener("playing", this.onBufferEnd);
          player.removeEventListener("pause", this.onPause);
          player.removeEventListener("seeked", this.onSeek);
          player.removeEventListener("ended", this.onEnded);
          player.removeEventListener("error", this.onError);
          player.removeEventListener("ratechange", this.onPlayBackRateChange);
          player.removeEventListener("enterpictureinpicture", this.onEnablePIP);
          player.removeEventListener("leavepictureinpicture", this.onDisablePIP);
          player.removeEventListener("webkitpresentationmodechanged", this.onPresentationModeChange);
          if (!this.shouldUseHLS(url)) {
            player.removeEventListener("canplay", this.onReady);
          }
        }
      }, {
        key: "shouldUseAudio",
        value: function shouldUseAudio(props2) {
          if (props2.config.forceVideo) {
            return false;
          }
          if (props2.config.attributes.poster) {
            return false;
          }
          return _patterns.AUDIO_EXTENSIONS.test(props2.url) || props2.config.forceAudio;
        }
      }, {
        key: "shouldUseHLS",
        value: function shouldUseHLS(url) {
          if (this.props.config.forceHLS) {
            return true;
          }
          if (IS_SAFARI && this.props.config.forceSafariHLS) {
            return true;
          }
          if (IS_IOS) {
            return false;
          }
          return _patterns.HLS_EXTENSIONS.test(url) || MATCH_CLOUDFLARE_STREAM.test(url);
        }
      }, {
        key: "shouldUseDASH",
        value: function shouldUseDASH(url) {
          return _patterns.DASH_EXTENSIONS.test(url) || this.props.config.forceDASH;
        }
      }, {
        key: "shouldUseFLV",
        value: function shouldUseFLV(url) {
          return _patterns.FLV_EXTENSIONS.test(url) || this.props.config.forceFLV;
        }
      }, {
        key: "load",
        value: function load2(url) {
          var _this2 = this;
          var _this$props$config = this.props.config, hlsVersion = _this$props$config.hlsVersion, hlsOptions = _this$props$config.hlsOptions, dashVersion = _this$props$config.dashVersion, flvVersion = _this$props$config.flvVersion;
          if (this.hls) {
            this.hls.destroy();
          }
          if (this.dash) {
            this.dash.reset();
          }
          if (this.shouldUseHLS(url)) {
            (0, _utils2.getSDK)(HLS_SDK_URL.replace("VERSION", hlsVersion), HLS_GLOBAL).then(function(Hls) {
              _this2.hls = new Hls(hlsOptions);
              _this2.hls.on(Hls.Events.MANIFEST_PARSED, function() {
                _this2.props.onReady();
              });
              _this2.hls.on(Hls.Events.ERROR, function(e, data) {
                _this2.props.onError(e, data, _this2.hls, Hls);
              });
              if (MATCH_CLOUDFLARE_STREAM.test(url)) {
                var id = url.match(MATCH_CLOUDFLARE_STREAM)[1];
                _this2.hls.loadSource(REPLACE_CLOUDFLARE_STREAM.replace("{id}", id));
              } else {
                _this2.hls.loadSource(url);
              }
              _this2.hls.attachMedia(_this2.player);
              _this2.props.onLoaded();
            });
          }
          if (this.shouldUseDASH(url)) {
            (0, _utils2.getSDK)(DASH_SDK_URL.replace("VERSION", dashVersion), DASH_GLOBAL).then(function(dashjs) {
              _this2.dash = dashjs.MediaPlayer().create();
              _this2.dash.initialize(_this2.player, url, _this2.props.playing);
              _this2.dash.on("error", _this2.props.onError);
              if (parseInt(dashVersion) < 3) {
                _this2.dash.getDebug().setLogToBrowserConsole(false);
              } else {
                _this2.dash.updateSettings({
                  debug: {
                    logLevel: dashjs.Debug.LOG_LEVEL_NONE
                  }
                });
              }
              _this2.props.onLoaded();
            });
          }
          if (this.shouldUseFLV(url)) {
            (0, _utils2.getSDK)(FLV_SDK_URL.replace("VERSION", flvVersion), FLV_GLOBAL).then(function(flvjs) {
              _this2.flv = flvjs.createPlayer({
                type: "flv",
                url
              });
              _this2.flv.attachMediaElement(_this2.player);
              _this2.flv.on(flvjs.Events.ERROR, function(e, data) {
                _this2.props.onError(e, data, _this2.flv, flvjs);
              });
              _this2.flv.load();
              _this2.props.onLoaded();
            });
          }
          if (url instanceof Array) {
            this.player.load();
          } else if ((0, _utils2.isMediaStream)(url)) {
            try {
              this.player.srcObject = url;
            } catch (e) {
              this.player.src = window.URL.createObjectURL(url);
            }
          }
        }
      }, {
        key: "play",
        value: function play() {
          var promise = this.player.play();
          if (promise) {
            promise["catch"](this.props.onError);
          }
        }
      }, {
        key: "pause",
        value: function pause() {
          this.player.pause();
        }
      }, {
        key: "stop",
        value: function stop() {
          this.player.removeAttribute("src");
          if (this.dash) {
            this.dash.reset();
          }
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          this.player.currentTime = seconds;
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.player.volume = fraction;
        }
      }, {
        key: "enablePIP",
        value: function enablePIP() {
          if (this.player.requestPictureInPicture && document.pictureInPictureElement !== this.player) {
            this.player.requestPictureInPicture();
          } else if ((0, _utils2.supportsWebKitPresentationMode)(this.player) && this.player.webkitPresentationMode !== "picture-in-picture") {
            this.player.webkitSetPresentationMode("picture-in-picture");
          }
        }
      }, {
        key: "disablePIP",
        value: function disablePIP() {
          if (document.exitPictureInPicture && document.pictureInPictureElement === this.player) {
            document.exitPictureInPicture();
          } else if ((0, _utils2.supportsWebKitPresentationMode)(this.player) && this.player.webkitPresentationMode !== "inline") {
            this.player.webkitSetPresentationMode("inline");
          }
        }
      }, {
        key: "setPlaybackRate",
        value: function setPlaybackRate(rate) {
          try {
            this.player.playbackRate = rate;
          } catch (error) {
            this.props.onError(error);
          }
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          if (!this.player)
            return null;
          var _this$player = this.player, duration = _this$player.duration, seekable = _this$player.seekable;
          if (duration === Infinity && seekable.length > 0) {
            return seekable.end(seekable.length - 1);
          }
          return duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          if (!this.player)
            return null;
          return this.player.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          if (!this.player)
            return null;
          var buffered = this.player.buffered;
          if (buffered.length === 0) {
            return 0;
          }
          var end = buffered.end(buffered.length - 1);
          var duration = this.getDuration();
          if (end > duration) {
            return duration;
          }
          return end;
        }
      }, {
        key: "getSource",
        value: function getSource(url) {
          var useHLS = this.shouldUseHLS(url);
          var useDASH = this.shouldUseDASH(url);
          var useFLV = this.shouldUseFLV(url);
          if (url instanceof Array || (0, _utils2.isMediaStream)(url) || useHLS || useDASH || useFLV) {
            return void 0;
          }
          if (MATCH_DROPBOX_URL.test(url)) {
            return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
          }
          return url;
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props11 = this.props, url = _this$props11.url, playing = _this$props11.playing, loop = _this$props11.loop, controls = _this$props11.controls, muted = _this$props11.muted, config = _this$props11.config, width = _this$props11.width, height = _this$props11.height;
          var useAudio = this.shouldUseAudio(this.props);
          var Element2 = useAudio ? "audio" : "video";
          var style = {
            width: width === "auto" ? width : "100%",
            height: height === "auto" ? height : "100%"
          };
          return /* @__PURE__ */ _react2["default"].createElement(Element2, _extends2({
            ref: this.ref,
            src: this.getSource(url),
            style,
            preload: "auto",
            autoPlay: playing || void 0,
            controls,
            muted,
            loop
          }, config.attributes), url instanceof Array && url.map(this.renderSourceElement), config.tracks.map(this.renderTrack));
        }
      }]);
      return FilePlayer3;
    }(_react2.Component);
    exports["default"] = FilePlayer2;
    _defineProperty2(FilePlayer2, "displayName", "FilePlayer");
    _defineProperty2(FilePlayer2, "canPlay", _patterns.canPlay.file);
  })(FilePlayer);
  return FilePlayer;
}
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var _react2 = require$$0$2;
  var _utils2 = require$$5;
  var _patterns = require$$2$1;
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof2 = function _typeof3(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof2 = function _typeof3(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof2(obj);
  }
  function _getRequireWildcardCache2() {
    if (typeof WeakMap !== "function")
      return null;
    var cache = /* @__PURE__ */ new WeakMap();
    _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
      return cache;
    };
    return cache;
  }
  function _interopRequireWildcard2(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
      return { "default": obj };
    }
    var cache = _getRequireWildcardCache2();
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj["default"] = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  var _default = [{
    key: "youtube",
    name: "YouTube",
    canPlay: _patterns.canPlay.youtube,
    lazyPlayer: /* @__PURE__ */ (0, _react2.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard2(requireYouTube());
      });
    })
  }, {
    key: "soundcloud",
    name: "SoundCloud",
    canPlay: _patterns.canPlay.soundcloud,
    lazyPlayer: /* @__PURE__ */ (0, _react2.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard2(requireSoundCloud());
      });
    })
  }, {
    key: "vimeo",
    name: "Vimeo",
    canPlay: _patterns.canPlay.vimeo,
    lazyPlayer: /* @__PURE__ */ (0, _react2.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard2(requireVimeo());
      });
    })
  }, {
    key: "facebook",
    name: "Facebook",
    canPlay: _patterns.canPlay.facebook,
    lazyPlayer: /* @__PURE__ */ (0, _react2.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard2(requireFacebook());
      });
    })
  }, {
    key: "streamable",
    name: "Streamable",
    canPlay: _patterns.canPlay.streamable,
    lazyPlayer: /* @__PURE__ */ (0, _react2.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard2(requireStreamable());
      });
    })
  }, {
    key: "wistia",
    name: "Wistia",
    canPlay: _patterns.canPlay.wistia,
    lazyPlayer: /* @__PURE__ */ (0, _react2.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard2(requireWistia());
      });
    })
  }, {
    key: "twitch",
    name: "Twitch",
    canPlay: _patterns.canPlay.twitch,
    lazyPlayer: /* @__PURE__ */ (0, _react2.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard2(requireTwitch());
      });
    })
  }, {
    key: "dailymotion",
    name: "DailyMotion",
    canPlay: _patterns.canPlay.dailymotion,
    lazyPlayer: /* @__PURE__ */ (0, _react2.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard2(requireDailyMotion());
      });
    })
  }, {
    key: "mixcloud",
    name: "Mixcloud",
    canPlay: _patterns.canPlay.mixcloud,
    lazyPlayer: /* @__PURE__ */ (0, _react2.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard2(requireMixcloud());
      });
    })
  }, {
    key: "vidyard",
    name: "Vidyard",
    canPlay: _patterns.canPlay.vidyard,
    lazyPlayer: /* @__PURE__ */ (0, _react2.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard2(requireVidyard());
      });
    })
  }, {
    key: "kaltura",
    name: "Kaltura",
    canPlay: _patterns.canPlay.kaltura,
    lazyPlayer: /* @__PURE__ */ (0, _react2.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard2(requireKaltura());
      });
    })
  }, {
    key: "file",
    name: "FilePlayer",
    canPlay: _patterns.canPlay.file,
    canEnablePIP: function canEnablePIP(url) {
      return _patterns.canPlay.file(url) && (document.pictureInPictureEnabled || (0, _utils2.supportsWebKitPresentationMode)()) && !_patterns.AUDIO_EXTENSIONS.test(url);
    },
    lazyPlayer: /* @__PURE__ */ (0, _react2.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard2(requireFilePlayer());
      });
    })
  }];
  exports["default"] = _default;
})(players$1);
const index = /* @__PURE__ */ getDefaultExportFromCjs(players$1);
const players = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [players$1]);
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(players);
var ReactPlayer$2 = {};
var safeIsNaN = Number.isNaN || function ponyfill(value) {
  return typeof value === "number" && value !== value;
};
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }
  return false;
}
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (var i = 0; i < newInputs.length; i++) {
    if (!isEqual(newInputs[i], lastInputs[i])) {
      return false;
    }
  }
  return true;
}
function memoizeOne(resultFn, isEqual3) {
  if (isEqual3 === void 0) {
    isEqual3 = areInputsEqual;
  }
  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;
  function memoized() {
    var newArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }
    if (calledOnce && lastThis === this && isEqual3(newArgs, lastArgs)) {
      return lastResult;
    }
    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }
  return memoized;
}
const memoizeOne_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: memoizeOne
}, Symbol.toStringTag, { value: "Module" }));
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(memoizeOne_esm);
var hasElementType = typeof Element !== "undefined";
var hasMap = typeof Map === "function";
var hasSet = typeof Set === "function";
var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
function equal(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor)
      return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!equal(a[i], b[i]))
          return false;
      return true;
    }
    var it;
    if (hasMap && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size)
        return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0]))
          return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0])))
          return false;
      return true;
    }
    if (hasSet && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size)
        return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0]))
          return false;
      return true;
    }
    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (a[i] !== b[i])
          return false;
      return true;
    }
    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function")
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function")
      return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
        return false;
    if (hasElementType && a instanceof Element)
      return false;
    for (i = length; i-- !== 0; ) {
      if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
        continue;
      }
      if (!equal(a[keys[i]], b[keys[i]]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
}
var reactFastCompare = function isEqual2(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message || "").match(/stack|recursion/i)) {
      console.warn("react-fast-compare cannot handle circular refs");
      return false;
    }
    throw error;
  }
};
const reactFastCompare$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: reactFastCompare
}, [reactFastCompare]);
const require$$3 = /* @__PURE__ */ getAugmentedNamespace(reactFastCompare$1);
var props$1 = {};
Object.defineProperty(props$1, "__esModule", {
  value: true
});
var defaultProps_1 = props$1.defaultProps = propTypes_1 = props$1.propTypes = void 0;
var _propTypes = _interopRequireDefault$1(require$$0$3);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
var string = _propTypes["default"].string, bool = _propTypes["default"].bool, number = _propTypes["default"].number, array = _propTypes["default"].array, oneOfType = _propTypes["default"].oneOfType, shape = _propTypes["default"].shape, object = _propTypes["default"].object, func = _propTypes["default"].func, node = _propTypes["default"].node;
var propTypes = {
  url: oneOfType([string, array, object]),
  playing: bool,
  loop: bool,
  controls: bool,
  volume: number,
  muted: bool,
  playbackRate: number,
  width: oneOfType([string, number]),
  height: oneOfType([string, number]),
  style: object,
  progressInterval: number,
  playsinline: bool,
  pip: bool,
  stopOnUnmount: bool,
  light: oneOfType([bool, string, object]),
  playIcon: node,
  previewTabIndex: number,
  fallback: node,
  oEmbedUrl: string,
  wrapper: oneOfType([string, func, shape({
    render: func.isRequired
  })]),
  config: shape({
    soundcloud: shape({
      options: object
    }),
    youtube: shape({
      playerVars: object,
      embedOptions: object,
      onUnstarted: func
    }),
    facebook: shape({
      appId: string,
      version: string,
      playerId: string,
      attributes: object
    }),
    dailymotion: shape({
      params: object
    }),
    vimeo: shape({
      playerOptions: object,
      title: string
    }),
    file: shape({
      attributes: object,
      tracks: array,
      forceVideo: bool,
      forceAudio: bool,
      forceHLS: bool,
      forceSafariHLS: bool,
      forceDASH: bool,
      forceFLV: bool,
      hlsOptions: object,
      hlsVersion: string,
      dashVersion: string,
      flvVersion: string
    }),
    wistia: shape({
      options: object,
      playerId: string,
      customControls: array
    }),
    mixcloud: shape({
      options: object
    }),
    twitch: shape({
      options: object,
      playerId: string
    }),
    vidyard: shape({
      options: object
    })
  }),
  onReady: func,
  onStart: func,
  onPlay: func,
  onPause: func,
  onBuffer: func,
  onBufferEnd: func,
  onEnded: func,
  onError: func,
  onDuration: func,
  onSeek: func,
  onPlaybackRateChange: func,
  onProgress: func,
  onClickPreview: func,
  onEnablePIP: func,
  onDisablePIP: func
};
var propTypes_1 = props$1.propTypes = propTypes;
var noop = function noop2() {
};
var defaultProps = {
  playing: false,
  loop: false,
  controls: false,
  volume: null,
  muted: false,
  playbackRate: 1,
  width: "640px",
  height: "360px",
  style: {},
  progressInterval: 1e3,
  playsinline: false,
  pip: false,
  stopOnUnmount: true,
  light: false,
  fallback: null,
  wrapper: "div",
  previewTabIndex: 0,
  oEmbedUrl: "https://noembed.com/embed?url={url}",
  config: {
    soundcloud: {
      options: {
        visual: true,
        buying: false,
        liking: false,
        download: false,
        sharing: false,
        show_comments: false,
        show_playcount: false
      }
    },
    youtube: {
      playerVars: {
        playsinline: 1,
        showinfo: 0,
        rel: 0,
        iv_load_policy: 3,
        modestbranding: 1
      },
      embedOptions: {},
      onUnstarted: noop
    },
    facebook: {
      appId: "1309697205772819",
      version: "v3.3",
      playerId: null,
      attributes: {}
    },
    dailymotion: {
      params: {
        api: 1,
        "endscreen-enable": false
      }
    },
    vimeo: {
      playerOptions: {
        autopause: false,
        byline: false,
        portrait: false,
        title: false
      },
      title: null
    },
    file: {
      attributes: {},
      tracks: [],
      forceVideo: false,
      forceAudio: false,
      forceHLS: false,
      forceDASH: false,
      forceFLV: false,
      hlsOptions: {},
      hlsVersion: "1.1.4",
      dashVersion: "3.1.3",
      flvVersion: "1.5.0"
    },
    wistia: {
      options: {},
      playerId: null,
      customControls: null
    },
    mixcloud: {
      options: {
        hide_cover: 1
      }
    },
    twitch: {
      options: {},
      playerId: null
    },
    vidyard: {
      options: {}
    }
  },
  onReady: noop,
  onStart: noop,
  onPlay: noop,
  onPause: noop,
  onBuffer: noop,
  onBufferEnd: noop,
  onEnded: noop,
  onError: noop,
  onDuration: noop,
  onSeek: noop,
  onPlaybackRateChange: noop,
  onProgress: noop,
  onClickPreview: noop,
  onEnablePIP: noop,
  onDisablePIP: noop
};
defaultProps_1 = props$1.defaultProps = defaultProps;
const props = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  get defaultProps() {
    return defaultProps_1;
  },
  get propTypes() {
    return propTypes_1;
  },
  default: props$1
}, [props$1]);
const require$$4 = /* @__PURE__ */ getAugmentedNamespace(props);
var Player$2 = {};
(function(exports) {
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof2 = function _typeof3(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof2 = function _typeof3(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof2(obj);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var _react2 = _interopRequireWildcard2(require$$0$2);
  var _reactFastCompare2 = _interopRequireDefault2(require$$3);
  var _props2 = require$$4;
  var _utils2 = require$$5;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _getRequireWildcardCache2() {
    if (typeof WeakMap !== "function")
      return null;
    var cache = /* @__PURE__ */ new WeakMap();
    _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
      return cache;
    };
    return cache;
  }
  function _interopRequireWildcard2(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
      return { "default": obj };
    }
    var cache = _getRequireWildcardCache2();
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj["default"] = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  function _extends2() {
    _extends2 = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends2.apply(this, arguments);
  }
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties2(target, props2) {
    for (var i = 0; i < props2.length; i++) {
      var descriptor = props2[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass2(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties2(Constructor, staticProps);
    return Constructor;
  }
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
    if (superClass)
      _setPrototypeOf2(subClass, superClass);
  }
  function _setPrototypeOf2(o, p) {
    _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf2(o, p);
  }
  function _createSuper2(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct2();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf2(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf2(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn2(this, result);
    };
  }
  function _possibleConstructorReturn2(self, call) {
    if (call && (_typeof2(call) === "object" || typeof call === "function")) {
      return call;
    }
    return _assertThisInitialized2(self);
  }
  function _assertThisInitialized2(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _isNativeReflectConstruct2() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _getPrototypeOf2(o) {
    _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf2(o);
  }
  function _defineProperty2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var SEEK_ON_PLAY_EXPIRY = 5e3;
  var Player2 = /* @__PURE__ */ function(_Component) {
    _inherits2(Player3, _Component);
    var _super = _createSuper2(Player3);
    function Player3() {
      var _this;
      _classCallCheck2(this, Player3);
      for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
        _args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(_args));
      _defineProperty2(_assertThisInitialized2(_this), "mounted", false);
      _defineProperty2(_assertThisInitialized2(_this), "isReady", false);
      _defineProperty2(_assertThisInitialized2(_this), "isPlaying", false);
      _defineProperty2(_assertThisInitialized2(_this), "isLoading", true);
      _defineProperty2(_assertThisInitialized2(_this), "loadOnReady", null);
      _defineProperty2(_assertThisInitialized2(_this), "startOnPlay", true);
      _defineProperty2(_assertThisInitialized2(_this), "seekOnPlay", null);
      _defineProperty2(_assertThisInitialized2(_this), "onDurationCalled", false);
      _defineProperty2(_assertThisInitialized2(_this), "handlePlayerMount", function(player) {
        if (_this.player) {
          _this.progress();
          return;
        }
        _this.player = player;
        _this.player.load(_this.props.url);
        _this.progress();
      });
      _defineProperty2(_assertThisInitialized2(_this), "getInternalPlayer", function(key) {
        if (!_this.player)
          return null;
        return _this.player[key];
      });
      _defineProperty2(_assertThisInitialized2(_this), "progress", function() {
        if (_this.props.url && _this.player && _this.isReady) {
          var playedSeconds = _this.getCurrentTime() || 0;
          var loadedSeconds = _this.getSecondsLoaded();
          var duration = _this.getDuration();
          if (duration) {
            var progress = {
              playedSeconds,
              played: playedSeconds / duration
            };
            if (loadedSeconds !== null) {
              progress.loadedSeconds = loadedSeconds;
              progress.loaded = loadedSeconds / duration;
            }
            if (progress.playedSeconds !== _this.prevPlayed || progress.loadedSeconds !== _this.prevLoaded) {
              _this.props.onProgress(progress);
            }
            _this.prevPlayed = progress.playedSeconds;
            _this.prevLoaded = progress.loadedSeconds;
          }
        }
        _this.progressTimeout = setTimeout(_this.progress, _this.props.progressFrequency || _this.props.progressInterval);
      });
      _defineProperty2(_assertThisInitialized2(_this), "handleReady", function() {
        if (!_this.mounted)
          return;
        _this.isReady = true;
        _this.isLoading = false;
        var _this$props = _this.props, onReady = _this$props.onReady, playing = _this$props.playing, volume = _this$props.volume, muted = _this$props.muted;
        onReady();
        if (!muted && volume !== null) {
          _this.player.setVolume(volume);
        }
        if (_this.loadOnReady) {
          _this.player.load(_this.loadOnReady, true);
          _this.loadOnReady = null;
        } else if (playing) {
          _this.player.play();
        }
        _this.handleDurationCheck();
      });
      _defineProperty2(_assertThisInitialized2(_this), "handlePlay", function() {
        _this.isPlaying = true;
        _this.isLoading = false;
        var _this$props2 = _this.props, onStart = _this$props2.onStart, onPlay = _this$props2.onPlay, playbackRate = _this$props2.playbackRate;
        if (_this.startOnPlay) {
          if (_this.player.setPlaybackRate && playbackRate !== 1) {
            _this.player.setPlaybackRate(playbackRate);
          }
          onStart();
          _this.startOnPlay = false;
        }
        onPlay();
        if (_this.seekOnPlay) {
          _this.seekTo(_this.seekOnPlay);
          _this.seekOnPlay = null;
        }
        _this.handleDurationCheck();
      });
      _defineProperty2(_assertThisInitialized2(_this), "handlePause", function(e) {
        _this.isPlaying = false;
        if (!_this.isLoading) {
          _this.props.onPause(e);
        }
      });
      _defineProperty2(_assertThisInitialized2(_this), "handleEnded", function() {
        var _this$props3 = _this.props, activePlayer = _this$props3.activePlayer, loop = _this$props3.loop, onEnded = _this$props3.onEnded;
        if (activePlayer.loopOnEnded && loop) {
          _this.seekTo(0);
        }
        if (!loop) {
          _this.isPlaying = false;
          onEnded();
        }
      });
      _defineProperty2(_assertThisInitialized2(_this), "handleError", function() {
        var _this$props4;
        _this.isLoading = false;
        (_this$props4 = _this.props).onError.apply(_this$props4, arguments);
      });
      _defineProperty2(_assertThisInitialized2(_this), "handleDurationCheck", function() {
        clearTimeout(_this.durationCheckTimeout);
        var duration = _this.getDuration();
        if (duration) {
          if (!_this.onDurationCalled) {
            _this.props.onDuration(duration);
            _this.onDurationCalled = true;
          }
        } else {
          _this.durationCheckTimeout = setTimeout(_this.handleDurationCheck, 100);
        }
      });
      _defineProperty2(_assertThisInitialized2(_this), "handleLoaded", function() {
        _this.isLoading = false;
      });
      return _this;
    }
    _createClass2(Player3, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.mounted = true;
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        clearTimeout(this.progressTimeout);
        clearTimeout(this.durationCheckTimeout);
        if (this.isReady && this.props.stopOnUnmount) {
          this.player.stop();
          if (this.player.disablePIP) {
            this.player.disablePIP();
          }
        }
        this.mounted = false;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this2 = this;
        if (!this.player) {
          return;
        }
        var _this$props5 = this.props, url = _this$props5.url, playing = _this$props5.playing, volume = _this$props5.volume, muted = _this$props5.muted, playbackRate = _this$props5.playbackRate, pip = _this$props5.pip, loop = _this$props5.loop, activePlayer = _this$props5.activePlayer, disableDeferredLoading = _this$props5.disableDeferredLoading;
        if (!(0, _reactFastCompare2["default"])(prevProps.url, url)) {
          if (this.isLoading && !activePlayer.forceLoad && !disableDeferredLoading && !(0, _utils2.isMediaStream)(url)) {
            console.warn("ReactPlayer: the attempt to load ".concat(url, " is being deferred until the player has loaded"));
            this.loadOnReady = url;
            return;
          }
          this.isLoading = true;
          this.startOnPlay = true;
          this.onDurationCalled = false;
          this.player.load(url, this.isReady);
        }
        if (!prevProps.playing && playing && !this.isPlaying) {
          this.player.play();
        }
        if (prevProps.playing && !playing && this.isPlaying) {
          this.player.pause();
        }
        if (!prevProps.pip && pip && this.player.enablePIP) {
          this.player.enablePIP();
        }
        if (prevProps.pip && !pip && this.player.disablePIP) {
          this.player.disablePIP();
        }
        if (prevProps.volume !== volume && volume !== null) {
          this.player.setVolume(volume);
        }
        if (prevProps.muted !== muted) {
          if (muted) {
            this.player.mute();
          } else {
            this.player.unmute();
            if (volume !== null) {
              setTimeout(function() {
                return _this2.player.setVolume(volume);
              });
            }
          }
        }
        if (prevProps.playbackRate !== playbackRate && this.player.setPlaybackRate) {
          this.player.setPlaybackRate(playbackRate);
        }
        if (prevProps.loop !== loop && this.player.setLoop) {
          this.player.setLoop(loop);
        }
      }
    }, {
      key: "getDuration",
      value: function getDuration() {
        if (!this.isReady)
          return null;
        return this.player.getDuration();
      }
    }, {
      key: "getCurrentTime",
      value: function getCurrentTime() {
        if (!this.isReady)
          return null;
        return this.player.getCurrentTime();
      }
    }, {
      key: "getSecondsLoaded",
      value: function getSecondsLoaded() {
        if (!this.isReady)
          return null;
        return this.player.getSecondsLoaded();
      }
    }, {
      key: "seekTo",
      value: function seekTo(amount, type) {
        var _this3 = this;
        if (!this.isReady) {
          if (amount !== 0) {
            this.seekOnPlay = amount;
            setTimeout(function() {
              _this3.seekOnPlay = null;
            }, SEEK_ON_PLAY_EXPIRY);
          }
          return;
        }
        var isFraction = !type ? amount > 0 && amount < 1 : type === "fraction";
        if (isFraction) {
          var duration = this.player.getDuration();
          if (!duration) {
            console.warn("ReactPlayer: could not seek using fraction \u2013\xA0duration not yet available");
            return;
          }
          this.player.seekTo(duration * amount);
          return;
        }
        this.player.seekTo(amount);
      }
    }, {
      key: "render",
      value: function render() {
        var Player4 = this.props.activePlayer;
        if (!Player4) {
          return null;
        }
        return /* @__PURE__ */ _react2["default"].createElement(Player4, _extends2({}, this.props, {
          onMount: this.handlePlayerMount,
          onReady: this.handleReady,
          onPlay: this.handlePlay,
          onPause: this.handlePause,
          onEnded: this.handleEnded,
          onLoaded: this.handleLoaded,
          onError: this.handleError
        }));
      }
    }]);
    return Player3;
  }(_react2.Component);
  exports["default"] = Player2;
  _defineProperty2(Player2, "displayName", "Player");
  _defineProperty2(Player2, "propTypes", _props2.propTypes);
  _defineProperty2(Player2, "defaultProps", _props2.defaultProps);
})(Player$2);
const Player = /* @__PURE__ */ getDefaultExportFromCjs(Player$2);
const Player$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: Player
}, [Player$2]);
const require$$6 = /* @__PURE__ */ getAugmentedNamespace(Player$1);
var Preview$1 = {};
var hasRequiredPreview;
function requirePreview() {
  if (hasRequiredPreview)
    return Preview$1;
  hasRequiredPreview = 1;
  (function(exports) {
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof3(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function _typeof3(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react2 = _interopRequireWildcard2(require$$0$2);
    function _getRequireWildcardCache2() {
      if (typeof WeakMap !== "function")
        return null;
      var cache2 = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache2 = function _getRequireWildcardCache3() {
        return cache2;
      };
      return cache2;
    }
    function _interopRequireWildcard2(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache2 = _getRequireWildcardCache2();
      if (cache2 && cache2.has(obj)) {
        return cache2.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache2) {
        cache2.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys2(object2, enumerableOnly) {
      var keys = Object.keys(object2);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object2);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys2(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties2(target, props2) {
      for (var i = 0; i < props2.length; i++) {
        var descriptor = props2[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      return Constructor;
    }
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf2(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf2(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn2(this, result);
      };
    }
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self);
    }
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct2() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf2(o) {
      _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf2(o);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var ICON_SIZE = "64px";
    var cache = {};
    var Preview2 = /* @__PURE__ */ function(_Component) {
      _inherits2(Preview3, _Component);
      var _super = _createSuper2(Preview3);
      function Preview3() {
        var _this;
        _classCallCheck2(this, Preview3);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "mounted", false);
        _defineProperty2(_assertThisInitialized2(_this), "state", {
          image: null
        });
        _defineProperty2(_assertThisInitialized2(_this), "handleKeyPress", function(e) {
          if (e.key === "Enter" || e.key === " ") {
            _this.props.onClick();
          }
        });
        return _this;
      }
      _createClass2(Preview3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.mounted = true;
          this.fetchImage(this.props);
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          var _this$props = this.props, url = _this$props.url, light = _this$props.light;
          if (prevProps.url !== url || prevProps.light !== light) {
            this.fetchImage(this.props);
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.mounted = false;
        }
      }, {
        key: "fetchImage",
        value: function fetchImage(_ref) {
          var _this2 = this;
          var url = _ref.url, light = _ref.light, oEmbedUrl = _ref.oEmbedUrl;
          if (/* @__PURE__ */ _react2["default"].isValidElement(light)) {
            return;
          }
          if (typeof light === "string") {
            this.setState({
              image: light
            });
            return;
          }
          if (cache[url]) {
            this.setState({
              image: cache[url]
            });
            return;
          }
          this.setState({
            image: null
          });
          return window.fetch(oEmbedUrl.replace("{url}", url)).then(function(response) {
            return response.json();
          }).then(function(data) {
            if (data.thumbnail_url && _this2.mounted) {
              var image = data.thumbnail_url.replace("height=100", "height=480").replace("-d_295x166", "-d_640");
              _this2.setState({
                image
              });
              cache[url] = image;
            }
          });
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props2 = this.props, light = _this$props2.light, onClick = _this$props2.onClick, playIcon = _this$props2.playIcon, previewTabIndex = _this$props2.previewTabIndex;
          var image = this.state.image;
          var isElement = /* @__PURE__ */ _react2["default"].isValidElement(light);
          var flexCenter = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          };
          var styles = {
            preview: _objectSpread2({
              width: "100%",
              height: "100%",
              backgroundImage: image && !isElement ? "url(".concat(image, ")") : void 0,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer"
            }, flexCenter),
            shadow: _objectSpread2({
              background: "radial-gradient(rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%)",
              borderRadius: ICON_SIZE,
              width: ICON_SIZE,
              height: ICON_SIZE,
              position: isElement ? "absolute" : void 0
            }, flexCenter),
            playIcon: {
              borderStyle: "solid",
              borderWidth: "16px 0 16px 26px",
              borderColor: "transparent transparent transparent white",
              marginLeft: "7px"
            }
          };
          var defaultPlayIcon = /* @__PURE__ */ _react2["default"].createElement("div", {
            style: styles.shadow,
            className: "react-player__shadow"
          }, /* @__PURE__ */ _react2["default"].createElement("div", {
            style: styles.playIcon,
            className: "react-player__play-icon"
          }));
          return /* @__PURE__ */ _react2["default"].createElement("div", {
            style: styles.preview,
            className: "react-player__preview",
            onClick,
            tabIndex: previewTabIndex,
            onKeyPress: this.handleKeyPress
          }, isElement ? light : null, playIcon || defaultPlayIcon);
        }
      }]);
      return Preview3;
    }(_react2.Component);
    exports["default"] = Preview2;
  })(Preview$1);
  return Preview$1;
}
Object.defineProperty(ReactPlayer$2, "__esModule", {
  value: true
});
var createReactPlayer_1 = ReactPlayer$2.createReactPlayer = void 0;
var _react = _interopRequireWildcard(require$$0$2);
var _deepmerge = _interopRequireDefault(require$$1$1);
var _memoizeOne = _interopRequireDefault(require$$2);
var _reactFastCompare = _interopRequireDefault(require$$3);
var _props = require$$4;
var _utils = require$$5;
var _Player3 = _interopRequireDefault(require$$6);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function ownKeys(object2, enumerableOnly) {
  var keys = Object.keys(object2);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object2);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props2) {
  for (var i = 0; i < props2.length; i++) {
    var descriptor = props2[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function")
    return null;
  var cache = /* @__PURE__ */ new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache2() {
    return cache;
  };
  return cache;
}
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return { "default": obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
var Preview = /* @__PURE__ */ (0, _react.lazy)(function() {
  return Promise.resolve().then(function() {
    return _interopRequireWildcard(requirePreview());
  });
});
var IS_BROWSER = typeof window !== "undefined" && window.document;
var IS_GLOBAL = typeof commonjsGlobal !== "undefined" && commonjsGlobal.window && commonjsGlobal.window.document;
var SUPPORTED_PROPS = Object.keys(_props.propTypes);
var UniversalSuspense = IS_BROWSER || IS_GLOBAL ? _react.Suspense : function() {
  return null;
};
var customPlayers = [];
var createReactPlayer = function createReactPlayer2(players2, fallback) {
  var _class, _temp;
  return _temp = _class = /* @__PURE__ */ function(_Component) {
    _inherits(ReactPlayer2, _Component);
    var _super = _createSuper(ReactPlayer2);
    function ReactPlayer2() {
      var _this;
      _classCallCheck(this, ReactPlayer2);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      _defineProperty(_assertThisInitialized(_this), "state", {
        showPreview: !!_this.props.light
      });
      _defineProperty(_assertThisInitialized(_this), "references", {
        wrapper: function wrapper(_wrapper) {
          _this.wrapper = _wrapper;
        },
        player: function player(_player) {
          _this.player = _player;
        }
      });
      _defineProperty(_assertThisInitialized(_this), "handleClickPreview", function(e) {
        _this.setState({
          showPreview: false
        });
        _this.props.onClickPreview(e);
      });
      _defineProperty(_assertThisInitialized(_this), "showPreview", function() {
        _this.setState({
          showPreview: true
        });
      });
      _defineProperty(_assertThisInitialized(_this), "getDuration", function() {
        if (!_this.player)
          return null;
        return _this.player.getDuration();
      });
      _defineProperty(_assertThisInitialized(_this), "getCurrentTime", function() {
        if (!_this.player)
          return null;
        return _this.player.getCurrentTime();
      });
      _defineProperty(_assertThisInitialized(_this), "getSecondsLoaded", function() {
        if (!_this.player)
          return null;
        return _this.player.getSecondsLoaded();
      });
      _defineProperty(_assertThisInitialized(_this), "getInternalPlayer", function() {
        var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "player";
        if (!_this.player)
          return null;
        return _this.player.getInternalPlayer(key);
      });
      _defineProperty(_assertThisInitialized(_this), "seekTo", function(fraction, type) {
        if (!_this.player)
          return null;
        _this.player.seekTo(fraction, type);
      });
      _defineProperty(_assertThisInitialized(_this), "handleReady", function() {
        _this.props.onReady(_assertThisInitialized(_this));
      });
      _defineProperty(_assertThisInitialized(_this), "getActivePlayer", (0, _memoizeOne["default"])(function(url) {
        for (var _i = 0, _arr = [].concat(customPlayers, _toConsumableArray(players2)); _i < _arr.length; _i++) {
          var player = _arr[_i];
          if (player.canPlay(url)) {
            return player;
          }
        }
        if (fallback) {
          return fallback;
        }
        return null;
      }));
      _defineProperty(_assertThisInitialized(_this), "getConfig", (0, _memoizeOne["default"])(function(url, key) {
        var config = _this.props.config;
        return _deepmerge["default"].all([_props.defaultProps.config, _props.defaultProps.config[key] || {}, config, config[key] || {}]);
      }));
      _defineProperty(_assertThisInitialized(_this), "getAttributes", (0, _memoizeOne["default"])(function(url) {
        return (0, _utils.omit)(_this.props, SUPPORTED_PROPS);
      }));
      _defineProperty(_assertThisInitialized(_this), "renderActivePlayer", function(url) {
        if (!url)
          return null;
        var player = _this.getActivePlayer(url);
        if (!player)
          return null;
        var config = _this.getConfig(url, player.key);
        return /* @__PURE__ */ _react["default"].createElement(_Player3["default"], _extends({}, _this.props, {
          key: player.key,
          ref: _this.references.player,
          config,
          activePlayer: player.lazyPlayer || player,
          onReady: _this.handleReady
        }));
      });
      return _this;
    }
    _createClass(ReactPlayer2, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !(0, _reactFastCompare["default"])(this.props, nextProps) || !(0, _reactFastCompare["default"])(this.state, nextState);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var light = this.props.light;
        if (!prevProps.light && light) {
          this.setState({
            showPreview: true
          });
        }
        if (prevProps.light && !light) {
          this.setState({
            showPreview: false
          });
        }
      }
    }, {
      key: "renderPreview",
      value: function renderPreview(url) {
        if (!url)
          return null;
        var _this$props = this.props, light = _this$props.light, playIcon = _this$props.playIcon, previewTabIndex = _this$props.previewTabIndex, oEmbedUrl = _this$props.oEmbedUrl;
        return /* @__PURE__ */ _react["default"].createElement(Preview, {
          url,
          light,
          playIcon,
          previewTabIndex,
          oEmbedUrl,
          onClick: this.handleClickPreview
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props, url = _this$props2.url, style = _this$props2.style, width = _this$props2.width, height = _this$props2.height, fallback2 = _this$props2.fallback, Wrapper = _this$props2.wrapper;
        var showPreview = this.state.showPreview;
        var attributes = this.getAttributes(url);
        var wrapperRef = typeof Wrapper === "string" ? this.references.wrapper : void 0;
        return /* @__PURE__ */ _react["default"].createElement(Wrapper, _extends({
          ref: wrapperRef,
          style: _objectSpread(_objectSpread({}, style), {}, {
            width,
            height
          })
        }, attributes), /* @__PURE__ */ _react["default"].createElement(UniversalSuspense, {
          fallback: fallback2
        }, showPreview ? this.renderPreview(url) : this.renderActivePlayer(url)));
      }
    }]);
    return ReactPlayer2;
  }(_react.Component), _defineProperty(_class, "displayName", "ReactPlayer"), _defineProperty(_class, "propTypes", _props.propTypes), _defineProperty(_class, "defaultProps", _props.defaultProps), _defineProperty(_class, "addCustomPlayer", function(player) {
    customPlayers.push(player);
  }), _defineProperty(_class, "removeCustomPlayers", function() {
    customPlayers.length = 0;
  }), _defineProperty(_class, "canPlay", function(url) {
    for (var _i2 = 0, _arr2 = [].concat(customPlayers, _toConsumableArray(players2)); _i2 < _arr2.length; _i2++) {
      var _Player = _arr2[_i2];
      if (_Player.canPlay(url)) {
        return true;
      }
    }
    return false;
  }), _defineProperty(_class, "canEnablePIP", function(url) {
    for (var _i3 = 0, _arr3 = [].concat(customPlayers, _toConsumableArray(players2)); _i3 < _arr3.length; _i3++) {
      var _Player2 = _arr3[_i3];
      if (_Player2.canEnablePIP && _Player2.canEnablePIP(url)) {
        return true;
      }
    }
    return false;
  }), _temp;
};
createReactPlayer_1 = ReactPlayer$2.createReactPlayer = createReactPlayer;
const ReactPlayer$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  get createReactPlayer() {
    return createReactPlayer_1;
  },
  default: ReactPlayer$2
}, [ReactPlayer$2]);
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(ReactPlayer$1);
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var _players = _interopRequireDefault2(require$$0);
  var _ReactPlayer = require$$1;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var fallback = _players["default"][_players["default"].length - 1];
  var _default = (0, _ReactPlayer.createReactPlayer)(_players["default"], fallback);
  exports["default"] = _default;
})(lib);
const ReactPlayer = /* @__PURE__ */ getDefaultExportFromCjs(lib);
export {
  Header as H,
  ReactPlayer as R
};
//# sourceMappingURL=index.cd44d29d.js.map
