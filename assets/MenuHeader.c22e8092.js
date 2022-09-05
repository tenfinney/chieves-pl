import { D as useTheme, a7 as isArray, a8 as fromEntries, a9 as arrayToObjectNotation, aa as useEnvironment, R as React, ab as breakpoints, j as jsxs, b as jsx } from "./index.05e67a5f.js";
import { F as Flex, d as Tooltip, f as LinkedSVG, B as Box, a as Heading, T as Text } from "./index.4ec9ff06.js";
import { b as Image$1 } from "./index.esm.211dd320.js";
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
      title: "Create a new Token"
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
const MenuHeader = () => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    lg: false
  });
  return /* @__PURE__ */ jsx(Box, {
    p: 3,
    bg: "black",
    children: /* @__PURE__ */ jsxs(Flex, {
      w: "full",
      align: "start",
      justify: "center",
      minH: "20vh",
      id: "what",
      gap: 10,
      pt: 20,
      children: [!isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
        src: "/Landing/Circles.png",
        alt: "circles"
      }), /* @__PURE__ */ jsxs(Flex, {
        display: "flex",
        flexDirection: "column",
        justify: "baseline",
        maxWidth: {
          base: "90%",
          md: "5xl"
        },
        lineHeight: {
          base: "lg",
          "2xl": "2xl"
        },
        pl: {
          base: 0,
          md: 0
        },
        zIndex: 100,
        fontWeight: "normal",
        color: "white",
        alignItems: {
          base: "center",
          md: "initial"
        },
        children: [isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
          src: "/Landing/Circles.png",
          alt: "circles",
          width: 20,
          mb: 8
        }), /* @__PURE__ */ jsx(Heading, {
          fontSize: {
            base: 36,
            md: 70
          },
          pb: 10,
          fontWeight: "normal",
          display: "flex",
          color: "white",
          alignItems: {
            base: "center",
            md: "initial"
          },
          textAlign: {
            base: "center",
            md: "initial"
          },
          children: /* @__PURE__ */ jsxs(Text, {
            fontFamily: "Exo 2, sans-serif",
            children: [/* @__PURE__ */ jsx("span", {
              style: {
                color: "#03a5fc"
              },
              children: "SmartLaw"
            }), " Tokens & Digital Assets"]
          })
        }), /* @__PURE__ */ jsx(Text, {
          fontSize: {
            base: "md",
            md: "3xl"
          },
          px: {
            base: 8,
            md: 0
          },
          children: "You should have a lot to say here. So do it."
        })]
      })]
    })
  });
};
export {
  Header as H,
  MenuHeader as M,
  useBreakpointValue as u
};
//# sourceMappingURL=MenuHeader.c22e8092.js.map
