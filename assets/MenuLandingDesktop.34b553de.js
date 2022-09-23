import { x as useTheme, a8 as isArray, a9 as fromEntries, aa as arrayToObjectNotation, ab as useEnvironment, $ as React, ac as breakpoints, j as jsxs, F as Flex, b as jsx, H as HStack, T as Text } from "./index.890e8d56.js";
import { a as Tooltip, b as LinkedSVG, L as Link } from "./index.cb31ef29.js";
function useBreakpoint(defaultBreakpoint) {
  if (defaultBreakpoint === void 0) {
    defaultBreakpoint = "base";
  }
  var _useTheme = useTheme(), __breakpoints = _useTheme.__breakpoints;
  var env = useEnvironment();
  var queries = React.useMemo(function() {
    var _breakpoints$details;
    return (_breakpoints$details = __breakpoints == null ? void 0 : __breakpoints.details.map(function(_ref) {
      var minMaxQuery = _ref.minMaxQuery, breakpoint = _ref.breakpoint;
      return {
        breakpoint,
        query: minMaxQuery.replace("@media screen and ", "")
      };
    })) != null ? _breakpoints$details : [];
  }, [__breakpoints]);
  var _React$useState = React.useState(function() {
    if (defaultBreakpoint) {
      var fallbackBreakpointDetail = queries.find(function(_ref2) {
        var breakpoint = _ref2.breakpoint;
        return breakpoint === defaultBreakpoint;
      });
      if (fallbackBreakpointDetail) {
        return fallbackBreakpointDetail.breakpoint;
      }
    }
    if (env.window.matchMedia) {
      var matchingBreakpointDetail = queries.find(function(_ref3) {
        var query = _ref3.query;
        return env.window.matchMedia(query).matches;
      });
      if (matchingBreakpointDetail) {
        return matchingBreakpointDetail.breakpoint;
      }
    }
    return void 0;
  }), currentBreakpoint = _React$useState[0], setCurrentBreakpoint = _React$useState[1];
  React.useEffect(function() {
    var allUnregisterFns = queries.map(function(_ref4) {
      var breakpoint = _ref4.breakpoint, query = _ref4.query;
      var mediaQueryList = env.window.matchMedia(query);
      if (mediaQueryList.matches) {
        setCurrentBreakpoint(breakpoint);
      }
      var handleChange = function handleChange2(ev) {
        if (ev.matches) {
          setCurrentBreakpoint(breakpoint);
        }
      };
      if (typeof mediaQueryList.addEventListener === "function") {
        mediaQueryList.addEventListener("change", handleChange);
      } else {
        mediaQueryList.addListener(handleChange);
      }
      return function() {
        if (typeof mediaQueryList.removeEventListener === "function") {
          mediaQueryList.removeEventListener("change", handleChange);
        } else {
          mediaQueryList.removeListener(handleChange);
        }
      };
    });
    return function() {
      allUnregisterFns.forEach(function(unregister) {
        return unregister();
      });
    };
  }, [queries, __breakpoints, env.window]);
  return currentBreakpoint;
}
function getClosestValue(values, breakpoint, breakpoints$1) {
  if (breakpoints$1 === void 0) {
    breakpoints$1 = breakpoints;
  }
  var index = Object.keys(values).indexOf(breakpoint);
  if (index !== -1) {
    return values[breakpoint];
  }
  var stopIndex = breakpoints$1.indexOf(breakpoint);
  while (stopIndex >= 0) {
    var key = breakpoints$1[stopIndex];
    if (values[key] != null) {
      index = stopIndex;
      break;
    }
    stopIndex -= 1;
  }
  if (index !== -1) {
    var _key = breakpoints$1[index];
    return values[_key];
  }
  return void 0;
}
function useBreakpointValue(values, defaultBreakpoint) {
  var _theme$__breakpoints;
  var breakpoint = useBreakpoint(defaultBreakpoint);
  var theme = useTheme();
  if (!breakpoint)
    return void 0;
  var breakpoints2 = Array.from(((_theme$__breakpoints = theme.__breakpoints) == null ? void 0 : _theme$__breakpoints.keys) || []);
  var obj = isArray(values) ? fromEntries(Object.entries(arrayToObjectNotation(values, breakpoints2)).map(function(_ref) {
    var key = _ref[0], value = _ref[1];
    return [key, value];
  })) : values;
  return getClosestValue(obj, breakpoint, breakpoints2);
}
const Header = ({
  links = {
    cup: "/new",
    sign: "/"
  },
  ...props
}) => /* @__PURE__ */ jsxs(Flex, {
  grow: 1,
  ...props,
  children: [/* @__PURE__ */ jsx(Tooltip, {
    hasArrow: true,
    label: "Create A New Token Type",
    children: /* @__PURE__ */ jsx(LinkedSVG, {
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
const MenuLandingDesktop = () => {
  useBreakpointValue({
    base: true,
    lg: false
  });
  return /* @__PURE__ */ jsxs(HStack, {
    bg: "black",
    children: [/* @__PURE__ */ jsx(Link, {
      activeClass: "active",
      to: "how",
      spy: true,
      smooth: true,
      duration: 500,
      children: /* @__PURE__ */ jsx(Text, {
        fontSize: 20,
        ml: 3,
        color: "white",
        cursor: "pointer",
        fontFamily: "Exo 2, sans-serif",
        children: "How to"
      })
    }), /* @__PURE__ */ jsx(Link, {
      activeClass: "active",
      to: "querytokens",
      spy: true,
      smooth: true,
      duration: 500,
      children: /* @__PURE__ */ jsx(Text, {
        fontSize: 20,
        ml: 3,
        color: "white",
        cursor: "pointer",
        fontFamily: "Exo 2, sans-serif",
        children: "Query"
      })
    }), /* @__PURE__ */ jsx(Link, {
      activeClass: "active",
      to: "createatoken",
      spy: true,
      smooth: true,
      duration: 500,
      children: /* @__PURE__ */ jsx(Text, {
        fontSize: 20,
        ml: 3,
        color: "white",
        cursor: "pointer",
        fontFamily: "Exo 2, sans-serif",
        children: "Create"
      })
    }), /* @__PURE__ */ jsx(Link, {
      activeClass: "active",
      to: "creators",
      spy: true,
      smooth: true,
      duration: 500,
      offset: -110,
      children: /* @__PURE__ */ jsx(Text, {
        fontSize: 20,
        ml: 3,
        color: "white",
        cursor: "pointer",
        fontFamily: "Exo 2, sans-serif",
        children: "Admin"
      })
    }), /* @__PURE__ */ jsx(Link, {
      activeClass: "active",
      to: "team",
      spy: true,
      smooth: true,
      duration: 500,
      children: /* @__PURE__ */ jsx(Text, {
        fontSize: 20,
        ml: 3,
        color: "white",
        cursor: "pointer",
        fontFamily: "Exo 2, sans-serif",
        children: "Contact"
      })
    })]
  });
};
export {
  Header as H,
  MenuLandingDesktop as M,
  useBreakpointValue as u
};
//# sourceMappingURL=MenuLandingDesktop.34b553de.js.map
