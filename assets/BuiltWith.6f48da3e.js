import { m as forwardRef, n as useMultiStyleConfig, o as omitThemingProps, r as react, c as chakra, q as cx, a as jsxs, p as StylesProvider, j as jsx, s as useStyles, x as useTheme, a8 as isArray, a9 as fromEntries, aa as arrayToObjectNotation, ab as useEnvironment, Z as React, ac as breakpoints, F as Flex, H as HStack, T as Text, e as Box, f as Heading, C as Container, G as Grid, a2 as Link$1 } from "./index.b10e4469.js";
import { a as Tooltip, b as LinkedSVG, L as Link } from "./index.c26b2481.js";
import { b as useImage, I as Image$1, a as CheckCircleIcon } from "./chakra-ui-icons.esm.6e472982.js";
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
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
var _excluded$1 = ["name", "getInitials"], _excluded2 = ["src", "srcSet", "name", "showBorder", "borderRadius", "onError", "getInitials", "icon", "iconLabel", "loading", "children", "borderColor", "ignoreFallback"];
function initials(name) {
  var _name$split = name.split(" "), firstName = _name$split[0], lastName = _name$split[1];
  return firstName && lastName ? "" + firstName.charAt(0) + lastName.charAt(0) : firstName.charAt(0);
}
var AvatarName = function AvatarName2(props) {
  var name = props.name, getInitials = props.getInitials, rest = _objectWithoutPropertiesLoose(props, _excluded$1);
  var styles = useStyles();
  return /* @__PURE__ */ react.exports.createElement(chakra.div, _extends({
    role: "img",
    "aria-label": name
  }, rest, {
    __css: styles.label
  }), name ? getInitials == null ? void 0 : getInitials(name) : null);
};
var DefaultIcon = function DefaultIcon2(props) {
  return /* @__PURE__ */ react.exports.createElement(
    chakra.svg,
    _extends({
      viewBox: "0 0 128 128",
      color: "#fff",
      width: "100%",
      height: "100%",
      className: "chakra-avatar__svg"
    }, props),
    /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
    }),
    /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
    })
  );
};
var baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: "medium",
  position: "relative",
  flexShrink: 0
};
var Avatar = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useMultiStyleConfig("Avatar", props);
  var _omitThemingProps = omitThemingProps(props), src = _omitThemingProps.src, srcSet = _omitThemingProps.srcSet, name = _omitThemingProps.name, showBorder = _omitThemingProps.showBorder, _omitThemingProps$bor = _omitThemingProps.borderRadius, borderRadius = _omitThemingProps$bor === void 0 ? "full" : _omitThemingProps$bor, onError = _omitThemingProps.onError, _omitThemingProps$get = _omitThemingProps.getInitials, getInitials = _omitThemingProps$get === void 0 ? initials : _omitThemingProps$get, _omitThemingProps$ico = _omitThemingProps.icon, icon = _omitThemingProps$ico === void 0 ? /* @__PURE__ */ jsx(DefaultIcon, {}) : _omitThemingProps$ico, _omitThemingProps$ico2 = _omitThemingProps.iconLabel, iconLabel = _omitThemingProps$ico2 === void 0 ? " avatar" : _omitThemingProps$ico2, loading = _omitThemingProps.loading, children = _omitThemingProps.children, borderColor = _omitThemingProps.borderColor, ignoreFallback = _omitThemingProps.ignoreFallback, rest = _objectWithoutPropertiesLoose(_omitThemingProps, _excluded2);
  var avatarStyles = _extends({
    borderRadius,
    borderWidth: showBorder ? "2px" : void 0
  }, baseStyle, styles.container);
  if (borderColor) {
    avatarStyles.borderColor = borderColor;
  }
  return /* @__PURE__ */ react.exports.createElement(
    chakra.span,
    _extends({
      ref
    }, rest, {
      className: cx("chakra-avatar", props.className),
      __css: avatarStyles
    }),
    /* @__PURE__ */ jsxs(StylesProvider, {
      value: styles,
      children: [/* @__PURE__ */ jsx(AvatarImage, {
        src,
        srcSet,
        loading,
        onError,
        getInitials,
        name,
        borderRadius,
        icon,
        iconLabel,
        ignoreFallback
      }), children]
    })
  );
});
var AvatarImage = function AvatarImage2(props) {
  var src = props.src, srcSet = props.srcSet, onError = props.onError, getInitials = props.getInitials, name = props.name, borderRadius = props.borderRadius, loading = props.loading, iconLabel = props.iconLabel, _props$icon = props.icon, icon = _props$icon === void 0 ? /* @__PURE__ */ jsx(DefaultIcon, {}) : _props$icon, ignoreFallback = props.ignoreFallback;
  var status = useImage({
    src,
    onError,
    ignoreFallback
  });
  var hasLoaded = status === "loaded";
  var showFallback = !src || !hasLoaded;
  if (showFallback) {
    return name ? /* @__PURE__ */ jsx(AvatarName, {
      className: "chakra-avatar__initials",
      getInitials,
      name
    }) : /* @__PURE__ */ react.exports.cloneElement(icon, {
      role: "img",
      "aria-label": iconLabel
    });
  }
  return /* @__PURE__ */ react.exports.createElement(chakra.img, {
    src,
    srcSet,
    alt: name,
    className: "chakra-avatar__img",
    loading,
    __css: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius
    }
  });
};
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
const MenuHeader = () => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    md: true,
    lg: true
  });
  return /* @__PURE__ */ jsx(Box, {
    p: 3,
    bg: "",
    children: /* @__PURE__ */ jsxs(Flex, {
      w: "full",
      align: "start",
      justify: "center",
      minH: "20vh",
      id: "what",
      gap: 10,
      pt: 20,
      pb: 20,
      children: [!isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
        src: "/Landing/smartlaw-white.png",
        alt: "smartlaw"
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
          src: "/Landing/smartlaw-white.png",
          alt: "smartlaw",
          width: 400,
          mb: 8
        }), /* @__PURE__ */ jsx(Heading, {
          fontSize: {
            base: 24,
            md: 60
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
              children: "Web3 "
            }), "Tokens ", /* @__PURE__ */ jsx("span", {
              style: {
                color: "#03a5fc"
              },
              children: " & "
            }), "Digital Assets"]
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
          children: "The next wave in computing is decentralized. Node-based and public blockchains provide assurances in data that until recently was impossible. A big part of the the Web3 ecosystem provides incentives, identity confirmations, non-transferable achievements and credentials, and encrypted content."
        })]
      })]
    })
  });
};
const Who = () => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    lg: false
  });
  return /* @__PURE__ */ jsxs(Container, {
    children: [/* @__PURE__ */ jsx(Heading, {
      fontSize: {
        base: 24,
        md: 40
      },
      fontWeight: "normal",
      display: "flex",
      color: "cyan",
      alignItems: {
        base: "center",
        md: "initial"
      },
      textAlign: {
        base: "center",
        md: "initial"
      },
      children: /* @__PURE__ */ jsx(Text, {
        fontFamily: "Exo 2, sans-serif",
        children: "Use digital tokens for:"
      })
    }), /* @__PURE__ */ jsxs(HStack, {
      w: "full",
      h: "full",
      align: "center",
      justify: "center",
      id: "who",
      children: [!isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
        src: "/Landing/Circles2.png",
        alt: "circles"
      }), /* @__PURE__ */ jsxs(Flex, {
        gap: 8,
        justifyContent: "center",
        maxWidth: {
          base: "90%",
          md: "5xl"
        },
        flexDirection: {
          base: "column",
          md: "row"
        },
        alignItems: {
          base: "center",
          md: "initial"
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
        height: {
          base: "100%",
          md: "340px"
        },
        my: {
          base: 24,
          md: 0
        },
        children: [isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
          src: "/Landing/Circles2.png",
          alt: "circles",
          width: 20,
          mb: {
            base: 0,
            md: 8
          }
        }), /* @__PURE__ */ jsx(Heading, {
          color: "main",
          fontSize: {
            base: 36,
            md: 58
          },
          fontWeight: "normal",
          display: "flex",
          flexDir: "column",
          alignSelf: "center",
          alignItems: {
            base: "center",
            md: "start"
          }
        }), /* @__PURE__ */ jsxs(Box, {
          dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          bgImage: "url(/Landing/RectangleBG1.svg)",
          bgPosition: {
            base: "bottom",
            md: "center"
          },
          bgSize: {
            base: "cover",
            md: "contain"
          },
          backgroundRepeat: "no-repeat",
          maxW: "267px",
          p: 6,
          textAlign: "center",
          children: [/* @__PURE__ */ jsx(Heading, {
            color: "white",
            fontSize: {
              base: 28,
              md: 40
            },
            mb: 6,
            children: "Rewards..."
          }), /* @__PURE__ */ jsxs(Text, {
            mb: 4,
            children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Participation rewards."]
          }), /* @__PURE__ */ jsxs(Text, {
            mb: 4,
            children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Work for hire rewards"]
          }), /* @__PURE__ */ jsxs(Text, {
            mb: 4,
            children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Retain talent though streaming tokens"]
          }), /* @__PURE__ */ jsxs(Text, {
            mb: 4,
            children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Support tokens through liquidity pools"]
          })]
        }), /* @__PURE__ */ jsxs(Box, {
          dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          bgImage: "url(/Landing/RectangleBG2.svg)",
          bgPosition: {
            base: "bottom",
            md: "center"
          },
          bgSize: {
            base: "cover",
            md: "contain"
          },
          backgroundRepeat: "no-repeat",
          maxW: "267px",
          p: 6,
          textAlign: "center",
          children: [/* @__PURE__ */ jsx(Heading, {
            color: "white",
            fontSize: {
              base: 28,
              md: 40
            },
            mb: 6,
            children: "Incentives"
          }), /* @__PURE__ */ jsxs(Text, {
            mb: 4,
            children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Attract Talent"]
          }), /* @__PURE__ */ jsxs(Text, {
            mb: 4,
            children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Build Community"]
          }), /* @__PURE__ */ jsxs(Text, {
            mb: 4,
            children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Learn to Play"]
          }), /* @__PURE__ */ jsxs(Text, {
            mb: 4,
            children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Play to Earn"]
          }), /* @__PURE__ */ jsxs(Text, {
            mb: 4,
            children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Earn to Learn"]
          })]
        })]
      })]
    })]
  });
};
const Team = () => {
  useBreakpointValue({
    base: true,
    lg: false
  });
  return /* @__PURE__ */ jsx(HStack, {
    w: "full",
    align: "center",
    justify: "center",
    minH: {
      base: "full",
      md: "80vh"
    },
    bg: "dark",
    bgPosition: "center",
    bgAttachment: "fixed",
    bgSize: "cover",
    id: "team",
    children: /* @__PURE__ */ jsxs(Flex, {
      display: "flex",
      flexDirection: "column",
      lineHeight: {
        base: "lg",
        "2xl": "2xl"
      },
      pl: {
        base: 0,
        md: 0
      },
      marginInlineStart: "0 !important",
      zIndex: 100,
      w: "full",
      fontWeight: "normal",
      color: "white",
      children: [/* @__PURE__ */ jsxs(Flex, {
        align: "center",
        mb: 10,
        flexDir: "column",
        children: [/* @__PURE__ */ jsx(Heading, {
          color: "main",
          fontSize: {
            base: 24,
            md: 40
          },
          pb: 4,
          fontWeight: "normal",
          display: "flex",
          children: "Engineered by :"
        }), /* @__PURE__ */ jsxs(Grid, {
          gap: 8,
          templateColumns: {
            base: "repeat(1, 1fr)",
            md: "repeat(4, 1fr)"
          },
          height: {
            base: "initial",
            md: "20rem"
          },
          children: [/* @__PURE__ */ jsxs(Flex, {
            flexDir: "column",
            alignItems: "center",
            background: "linear-gradient(transparent, rgba(45, 248, 199, 0.2))",
            p: 8,
            borderRadius: 12,
            children: [/* @__PURE__ */ jsx(Avatar, {
              name: "Web3LegalEngineering",
              src: "/Landing/profile/dysbulic.png",
              size: "2xl",
              showBorder: true,
              borderColor: "main"
            }), /* @__PURE__ */ jsx(Text, {
              fontWeight: "bold",
              mt: 3,
              fontSize: "lg",
              fontFamily: "heading",
              mb: 2,
              children: "Dysbulic"
            }), /* @__PURE__ */ jsx(Text, {
              marginBottom: "auto",
              fontSize: "sm",
              children: "MetaGame Builder Champion"
            }), /* @__PURE__ */ jsxs(Flex, {
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              children: [/* @__PURE__ */ jsx(Link$1, {
                href: "https://github.com/tenfinney",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/github.png",
                  alt: "ipfs",
                  height: 6
                })
              }), /* @__PURE__ */ jsx(Link$1, {
                href: "https://www.linkedin.com/in/scott-stevenson-jd/",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/linkedin.png",
                  alt: "ipfs",
                  height: 6
                })
              }), /* @__PURE__ */ jsx(Link$1, {
                href: "https://twitter.com/tenfinney",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/twitter.png",
                  alt: "ipfs",
                  height: 6
                })
              })]
            })]
          }), /* @__PURE__ */ jsxs(Flex, {
            flexDir: "column",
            alignItems: "center",
            background: "linear-gradient(transparent, rgba(45, 248, 199, 0.2))",
            p: 8,
            borderRadius: 12,
            children: [/* @__PURE__ */ jsx(Avatar, {
              name: "Scott",
              src: "/Landing/profile/ethereans-02893-t-hex-B4D-tr-400w.png",
              size: "2xl",
              showBorder: true,
              borderColor: "main",
              background: "black"
            }), /* @__PURE__ */ jsx(Text, {
              fontWeight: "bold",
              mt: 3,
              fontSize: "lg",
              fontFamily: "heading",
              mb: 2,
              children: "Web3 Legal Engineering"
            }), /* @__PURE__ */ jsx(Text, {
              marginBottom: "auto",
              fontSize: "sm",
              children: "Metaverse Services"
            }), /* @__PURE__ */ jsxs(Flex, {
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              children: [/* @__PURE__ */ jsx(Link$1, {
                href: "https://github.com/tenfinney",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/github.png",
                  alt: "ipfs",
                  height: 6
                })
              }), /* @__PURE__ */ jsx(Link$1, {
                href: "https://www.linkedin.com/in/scott-stevenson-jd/",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/linkedin.png",
                  alt: "ipfs",
                  height: 6
                })
              }), /* @__PURE__ */ jsx(Link$1, {
                href: "https://twitter.com/tenfinney",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/twitter.png",
                  alt: "ipfs",
                  height: 6
                })
              })]
            })]
          }), /* @__PURE__ */ jsxs(Flex, {
            flexDir: "column",
            alignItems: "center",
            background: "linear-gradient(transparent, rgba(45, 248, 199, 0.2))",
            p: 8,
            borderRadius: 12,
            children: [/* @__PURE__ */ jsx(Avatar, {
              name: "Web3LegalEngineering",
              src: "/Landing/profile/ss-03-400w2.png",
              size: "2xl",
              showBorder: true,
              borderColor: "main"
            }), /* @__PURE__ */ jsx(Text, {
              fontWeight: "bold",
              mt: 3,
              fontSize: "lg",
              fontFamily: "heading",
              mb: 2,
              children: "Scott Stevenson JD"
            }), /* @__PURE__ */ jsx(Text, {
              marginBottom: "auto",
              fontSize: "sm",
              children: "Web3 Applications"
            }), /* @__PURE__ */ jsxs(Flex, {
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              children: [/* @__PURE__ */ jsx(Link$1, {
                href: "https://github.com/tenfinney",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/github.png",
                  alt: "ipfs",
                  height: 6
                })
              }), /* @__PURE__ */ jsx(Link$1, {
                href: "https://www.linkedin.com/in/scott-stevenson-jd/",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/linkedin.png",
                  alt: "ipfs",
                  height: 6
                })
              }), /* @__PURE__ */ jsx(Link$1, {
                href: "https://twitter.com/tenfinney",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/twitter.png",
                  alt: "ipfs",
                  height: 6
                })
              })]
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx(Heading, {
        color: "main",
        fontSize: {
          base: 24,
          md: 40
        },
        pb: 4,
        fontWeight: "normal",
        display: "flex",
        children: "Join us here:"
      }), /* @__PURE__ */ jsxs(Flex, {
        mb: 8,
        children: [/* @__PURE__ */ jsx(Link$1, {
          href: "https://github.com/tenfinney",
          isExternal: true,
          borderRadius: "full",
          mx: 4,
          children: /* @__PURE__ */ jsx(Image$1, {
            src: "/Landing/contact/discord.png",
            alt: "discord",
            height: 14
          })
        }), /* @__PURE__ */ jsx(Link$1, {
          href: "https://https://github.com/tenfinney",
          isExternal: true,
          borderRadius: "full",
          mx: 4,
          children: /* @__PURE__ */ jsx(Image$1, {
            src: "/Landing/contact/github-w.png",
            alt: "github",
            height: 14
          })
        }), /* @__PURE__ */ jsx(Link$1, {
          href: "https://mobile.twitter.com/tenfinney",
          isExternal: true,
          borderRadius: "full",
          mx: 4,
          children: /* @__PURE__ */ jsx(Image$1, {
            src: "/Landing/contact/twitter.png",
            alt: "twitter",
            height: 14
          })
        })]
      })]
    })
  });
};
const BuiltWith = () => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    lg: false
  });
  return /* @__PURE__ */ jsx(Box, {
    color: "white",
    p: 3,
    bg: "",
    children: /* @__PURE__ */ jsxs(HStack, {
      w: "full",
      align: "center",
      justify: "center",
      minH: {
        base: "40vh",
        md: "40vh"
      },
      bg: "dark",
      bgPosition: "center",
      bgAttachment: "fixed",
      bgSize: "cover",
      position: "relative",
      children: [/* @__PURE__ */ jsx(Box, {
        position: "absolute",
        borderRadius: "full",
        right: "-300px",
        top: "-300px",
        height: "200px",
        filter: "blur(484px)",
        width: "400px",
        background: "#03a5fc",
        zIndex: -3
      }), /* @__PURE__ */ jsx(Flex, {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        lineHeight: {
          base: "lg",
          "2xl": "2xl"
        },
        pl: {
          base: 0,
          md: 0
        },
        marginInlineStart: "0 !important",
        zIndex: 100,
        w: "full",
        fontWeight: "normal",
        color: "white",
        children: /* @__PURE__ */ jsxs(Grid, {
          mb: 20,
          templateColumns: {
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)"
          },
          children: [!isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
            src: "/Landing/Circles5.png",
            alt: "circles3",
            mr: 10
          }), /* @__PURE__ */ jsx(Flex, {
            flexDir: "column",
            mr: {
              base: 0,
              md: 20
            },
            children: /* @__PURE__ */ jsx(Heading, {
              color: "main",
              fontSize: {
                base: 18,
                md: 40
              },
              pb: 10,
              pt: {
                base: 10,
                md: 0
              },
              fontWeight: "normal",
              display: "flex",
              alignSelf: "center",
              children: /* @__PURE__ */ jsx(Text, {
                color: "cyan",
                ml: 10,
                children: "Built with:"
              })
            })
          }), /* @__PURE__ */ jsxs(Flex, {
            flexDir: "column",
            children: [/* @__PURE__ */ jsx(Heading, {
              color: "main",
              fontSize: {
                base: 10,
                md: 30
              },
              pb: 0,
              pt: {
                base: 10,
                md: 0
              },
              fontWeight: "normal",
              display: "flex",
              flexDir: "column",
              alignSelf: "center"
            }), /* @__PURE__ */ jsx(Heading, {
              color: "main",
              fontSize: {
                base: 18,
                md: 40
              },
              pb: 10,
              pt: {
                base: 10,
                md: 0
              },
              fontWeight: "normal",
              display: "flex",
              flexDir: "column",
              alignSelf: "center",
              children: /* @__PURE__ */ jsx(Text, {
                color: "white",
                children: "Solidity on Polygon using IPFS and the Graph "
              })
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(Link, {
        to: "back-to-top",
        spy: true,
        smooth: true,
        duration: 800,
        children: /* @__PURE__ */ jsx(Image$1, {
          src: "/Landing/Up.svg",
          alt: "up",
          mr: 10,
          pos: "absolute",
          right: {
            base: 4,
            md: 50
          },
          bottom: {
            base: 5,
            md: 20
          },
          cursor: "pointer"
        })
      })]
    })
  });
};
export {
  BuiltWith as B,
  Header as H,
  MenuLandingDesktop as M,
  Team as T,
  Who as W,
  MenuHeader as a,
  useBreakpointValue as u
};
//# sourceMappingURL=BuiltWith.6f48da3e.js.map
