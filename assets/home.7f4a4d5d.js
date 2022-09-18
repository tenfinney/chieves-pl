import { f as forwardRef, u as useMultiStyleConfig, o as omitThemingProps, r as react, c as chakra, a as cx, j as jsxs, S as StylesProvider, b as jsx, d as useStyles, e as useSearchParams, g as defaults, h as useNavigate, i as useWeb3, k as createSearchParams, H as HelmetExport } from "./index.17f6d302.js";
import { S as Stack, F as Flex, T as Text, t as toSpanList, H as HStack, B as Box, a as Heading, L as Link, V as VStack, G as Grid, b as Link$1, h as httpURL, l as lib, e as extractMessage, C as Container, c as TokensTable } from "./index.a95f6ae1.js";
import { u as useBreakpointValue, M as MenuHeader, H as Header } from "./MenuHeader.d9fee755.js";
import { u as useImage, a as useForm, I as Input, C as Controller, b as Image$1 } from "./index.esm.b640b06a.js";
import { C as Checkbox } from "./chakra-ui-checkbox.esm.ec16b609.js";
import { F as FormControl, a as FormLabel } from "./chakra-ui-form-control.esm.de49deb1.js";
import { B as Button } from "./chakra-ui-button.esm.fc7fe43e.js";
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
class HiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "HiddenError";
  }
}
const TokenFilterForm = ({
  limit = 10,
  setLimit,
  offset = 0,
  setOffset,
  gatingVisible = false,
  setGatingVisible,
  visibleList,
  setVisibleList,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue
  } = useForm();
  react.exports.useEffect(() => {
    setValue("limit", limit);
    setValue("offset", offset);
    setValue("visible", visibleList.toString());
    setValue("gatingVisible", gatingVisible);
  }, [limit, offset, visibleList, gatingVisible, setValue]);
  const submit = async (data) => {
    setLimit(Number(data.limit));
    setOffset(Number(data.offset));
    setGatingVisible(data.gatingVisible);
    setVisibleList(toSpanList(data.visible));
  };
  return /* @__PURE__ */ jsx(Stack, {
    align: "center",
    children: /* @__PURE__ */ jsxs(Flex, {
      as: "form",
      onSubmit: handleSubmit(submit),
      mt: 10,
      mb: "1rem",
      maxW: ["100%", "min(85vw, 50em)"],
      direction: ["column", "row"],
      sx: {
        a: {
          textDecoration: "underline"
        }
      },
      ...props,
      children: [/* @__PURE__ */ jsxs(Stack, {
        flexGrow: 1,
        sx: {
          "&>*:not(style)~*:not(style)": {
            mt: 0.5
          },
          label: {
            _after: {
              content: '":"'
            },
            mt: 1.5,
            mr: 1,
            fontSize: "110%"
          }
        },
        children: [/* @__PURE__ */ jsx(FormControl, {
          children: /* @__PURE__ */ jsxs(Flex, {
            align: "center",
            children: [/* @__PURE__ */ jsx(FormLabel, {
              children: "Limit"
            }), /* @__PURE__ */ jsx(Input, {
              type: "number",
              placeholder: "Number of tokens to display.",
              ...register("limit")
            })]
          })
        }), /* @__PURE__ */ jsx(FormControl, {
          children: /* @__PURE__ */ jsxs(Flex, {
            align: "center",
            children: [/* @__PURE__ */ jsx(FormLabel, {
              children: "Offset"
            }), /* @__PURE__ */ jsx(Input, {
              type: "number",
              placeholder: "Number of tokens offset from Token 1.",
              ...register("offset")
            })]
          })
        }), /* @__PURE__ */ jsx(Text, {
          textAlign: "center",
          children: "or"
        }), /* @__PURE__ */ jsx(FormControl, {
          children: /* @__PURE__ */ jsxs(Flex, {
            align: "center",
            children: [/* @__PURE__ */ jsx(FormLabel, {
              children: "Visible\xA0List"
            }), /* @__PURE__ */ jsx(Input, {
              placeholder: "Comma, space and dash separated list of indices.",
              ...register("visible")
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs(Stack, {
        ml: 3,
        children: [/* @__PURE__ */ jsx(FormControl, {
          children: /* @__PURE__ */ jsx(Flex, {
            align: "center",
            my: 1,
            children: /* @__PURE__ */ jsx(Controller, {
              control,
              name: "gatingVisible",
              defaultValue: gatingVisible,
              render: ({
                field: {
                  onChange,
                  value,
                  ref
                }
              }) => /* @__PURE__ */ jsxs(Checkbox, {
                onChange,
                ref,
                isChecked: value,
                children: ["View", /* @__PURE__ */ jsx(chakra.br, {}), "Permission", /* @__PURE__ */ jsx(chakra.br, {}), "Tokens"]
              })
            })
          })
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          colorScheme: "purple",
          children: "View"
        })]
      })]
    })
  });
};
const How = () => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    lg: false
  });
  return /* @__PURE__ */ jsxs(HStack, {
    w: "full",
    align: "center",
    justify: "center",
    minH: {
      base: "50vh",
      md: "70vh"
    },
    bg: "dark",
    bgPosition: "center",
    bgAttachment: "fixed",
    bgSize: "cover",
    position: "relative",
    id: "how",
    children: [/* @__PURE__ */ jsx(Box, {
      position: "absolute",
      borderRadius: "full",
      right: "-300px",
      top: "-300px",
      height: "600px",
      filter: "blur(484px)",
      width: "600px",
      background: "#03a5fc",
      zIndex: -3
    }), /* @__PURE__ */ jsxs(Flex, {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      lineHeight: {
        base: "lg",
        "2xl": "2xl"
      },
      pl: 0,
      marginInlineStart: "0 !important",
      zIndex: 100,
      fontWeight: "normal",
      color: "white",
      children: [/* @__PURE__ */ jsxs(Flex, {
        align: "center",
        mb: {
          base: 0,
          md: 8
        },
        flexDirection: {
          base: "column",
          md: "row"
        },
        children: [!isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
          src: "/Landing/Circles3.png",
          alt: "circles3",
          mr: 10
        }), /* @__PURE__ */ jsxs(Heading, {
          color: "main",
          fontSize: {
            base: 36,
            md: 79
          },
          pb: 10,
          fontWeight: "normal",
          display: "flex",
          flexDir: "column",
          textAlign: {
            base: "center",
            md: "initial"
          },
          children: ["How? ", /* @__PURE__ */ jsx(Text, {
            color: "white"
          })]
        })]
      }), /* @__PURE__ */ jsx(Flex, {
        align: "center",
        mb: 10,
        children: /* @__PURE__ */ jsxs(Flex, {
          flexDir: "column",
          fontSize: {
            base: "md",
            md: "3xl"
          },
          ml: {
            base: 0,
            md: 20
          },
          px: {
            base: 12,
            md: 0
          },
          children: [/* @__PURE__ */ jsx(Text, {
            children: "..."
          }), /* @__PURE__ */ jsxs(Text, {
            children: ["Show the world the", /* @__PURE__ */ jsx(Link, {
              w: "100%",
              href: "https://vitalik.ca/general/2022/01/26/soulbound.html",
              _hover: {
                textDecor: "none",
                bg: "whiteAlpha.200"
              },
              isExternal: true,
              borderRadius: "full",
              px: 2,
              children: /* @__PURE__ */ jsx("span", {
                style: {
                  color: "#03a5fc"
                },
                children: "this"
              })
            }), "collection!"]
          }), /* @__PURE__ */ jsxs(Flex, {
            alignSelf: {
              base: "center",
              md: "auto"
            },
            children: [!isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
              src: "/Landing/NFTs/NFT1.png",
              alt: "NFT1",
              title: "NFT1",
              height: "20rem"
            }), !isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
              src: "/Landing/NFTs/NFT2.png",
              alt: "NFT2",
              title: "NFT2",
              height: "20rem"
            }), /* @__PURE__ */ jsx(Image$1, {
              src: "/Landing/NFTs/NFT3.png",
              alt: "NFT3",
              title: "NFT3",
              height: "20rem"
            })]
          })]
        })
      })]
    })]
  });
};
const Creators = () => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    lg: false
  });
  return /* @__PURE__ */ jsxs(VStack, {
    w: "full",
    align: "center",
    justify: "center",
    minH: "100vh",
    pos: "relative",
    pt: 20,
    gap: {
      base: 10,
      md: 60
    },
    children: [/* @__PURE__ */ jsx(Box, {
      position: "absolute",
      borderRadius: "full",
      left: "-400px",
      top: "-200px",
      height: "600px",
      filter: "blur(484px)",
      width: "600px",
      background: "#03a5fc",
      zIndex: -3
    }), isSmallScreen && /* @__PURE__ */ jsxs(Box, {
      h: "338px",
      gridArea: "creators",
      px: 12,
      children: [/* @__PURE__ */ jsx(Heading, {
        color: "white",
        fontSize: {
          base: 36,
          md: 70
        },
        mb: 8,
        textAlign: {
          base: "center",
          md: "initial"
        },
        children: "Team Building"
      }), /* @__PURE__ */ jsxs(Box, {
        children: [/* @__PURE__ */ jsx(Text, {
          color: "gray.100",
          children: "The permissions of creator roles are cascading."
        }), /* @__PURE__ */ jsx(Text, {
          fontFamily: "Exo 2, sans-serif",
          children: "This means the owners have all permissions of admins, admins have all permissions of editors and editors have all permissions of reviewers."
        }), /* @__PURE__ */ jsx(Text, {
          fontFamily: "Exo 2, sans-serif",
          children: "Owners can add and remove other owners, admins, editors and reviewers. Admins can add and remove editors and reviewers."
        })]
      })]
    }), /* @__PURE__ */ jsxs(Grid, {
      display: {
        base: "initial",
        md: "grid"
      },
      gap: {
        base: 3,
        md: 0
      },
      id: "creators",
      templateColumns: {
        base: "repeat(1, 1fr)",
        md: "265px 265px 265px 265px"
      },
      templateRows: "auto",
      templateAreas: {
        md: `
            "creators creators creators reviewers"
            "owner q editors empty"
            "empty1 admins empty2 empty2"
          `
      },
      children: [!isSmallScreen && /* @__PURE__ */ jsxs(Box, {
        h: "338px",
        gridArea: "creators",
        pr: 12,
        children: [/* @__PURE__ */ jsx(Heading, {
          color: "white",
          fontSize: 70,
          mb: 6,
          children: "Create & Manage"
        }), /* @__PURE__ */ jsxs(Text, {
          color: "gray.100",
          display: "flex",
          children: ["The permissions of creator roles are", " ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc",
              marginLeft: 4
            },
            children: "cascading"
          }), "."]
        }), /* @__PURE__ */ jsx(Text, {
          color: "gray.100",
          fontFamily: "Exo 2, sans-serif",
          children: "This means the owners have all permissions of admins, admins have all permissions of editors and editors have all permissions of reviewers."
        }), /* @__PURE__ */ jsx(Text, {
          color: "gray.100",
          fontFamily: "Exo 2, sans-serif",
          children: "Owners can add and remove other owners, admins, editors and reviewers. Admins can add and remove editors and reviewers."
        })]
      }), /* @__PURE__ */ jsxs(Box, {
        dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        bgImage: "url(/Landing/Card4.svg)",
        bgPosition: "center",
        bgSize: "contain",
        backgroundRepeat: "no-repeat",
        p: 6,
        textAlign: "center",
        h: "338px",
        gridArea: "reviewers",
        children: [/* @__PURE__ */ jsx(Heading, {
          color: "white",
          fontSize: {
            base: 28,
            md: 40
          },
          mb: 6,
          children: "Reviewers"
        }), /* @__PURE__ */ jsxs(Text, {
          mb: 4,
          fontSize: {
            base: "lg",
            md: "3xl"
          },
          maxW: {
            base: "220px",
            md: "full"
          },
          children: ["\u2662 can", " ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: "accept or reject submitted proof"
          }), " ", "of quest completion"]
        })]
      }), /* @__PURE__ */ jsxs(Box, {
        dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        bgImage: "url(/Landing/Card1.svg)",
        bgPosition: "center",
        bgSize: "contain",
        backgroundRepeat: "no-repeat",
        p: 6,
        textAlign: "center",
        h: "338px",
        gridArea: "owner",
        children: [/* @__PURE__ */ jsx(Heading, {
          color: "white",
          fontSize: {
            base: 28,
            md: 40
          },
          mb: 3,
          children: "Owner/s"
        }), /* @__PURE__ */ jsxs(Text, {
          fontFamily: "Exo 2, sans-serif",
          mb: 4,
          fontSize: {
            base: "lg",
            md: "3xl"
          },
          maxW: {
            base: "220px",
            md: "full"
          },
          children: ["\u2662 creator of the quest chain,", " ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: "has all permissions"
          })]
        })]
      }), !isSmallScreen && /* @__PURE__ */ jsx(Flex, {
        dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        p: 6,
        textAlign: "center",
        h: "338px",
        gridArea: "q",
        children: /* @__PURE__ */ jsx(Image$1, {
          src: "/Landing/group.svg",
          alt: "circles3",
          mr: 10
        })
      }), /* @__PURE__ */ jsxs(Box, {
        dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        bgImage: "url(/Landing/Card3.svg)",
        bgPosition: "center",
        bgSize: "contain",
        backgroundRepeat: "no-repeat",
        p: 6,
        textAlign: "center",
        h: "338px",
        gridArea: "editors",
        children: [/* @__PURE__ */ jsx(Heading, {
          color: "white",
          fontSize: {
            base: 28,
            md: 40
          },
          mb: 3,
          children: "Editors"
        }), /* @__PURE__ */ jsxs(Text, {
          mb: 4,
          fontSize: {
            base: "lg",
            md: "3xl"
          },
          maxW: {
            base: "220px",
            md: "full"
          },
          children: ["\u2662 can ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: "create and edit"
          }), " ", "quests. Can disable and enable them as well."]
        })]
      }), /* @__PURE__ */ jsx(Box, {
        gridArea: "empty"
      }), /* @__PURE__ */ jsx(Box, {
        gridArea: "empty1"
      }), /* @__PURE__ */ jsxs(Box, {
        dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        bgImage: "url(/Landing/Card2.svg)",
        bgPosition: "center",
        bgSize: "contain",
        backgroundRepeat: "no-repeat",
        p: 6,
        textAlign: "center",
        h: "338px",
        gridArea: "admins",
        children: [/* @__PURE__ */ jsx(Heading, {
          color: "white",
          fontSize: {
            base: 28,
            md: 40
          },
          mb: 3,
          children: "Admins"
        }), /* @__PURE__ */ jsxs(Text, {
          mb: 4,
          fontSize: {
            base: "lg",
            md: "3xl"
          },
          maxW: {
            base: "220px",
            md: "full"
          },
          children: ["\u2662 can ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: " create and edit"
          }), " ", "quest chains and quests"]
        })]
      }), /* @__PURE__ */ jsx(Box, {
        gridArea: "empty2"
      })]
    }), /* @__PURE__ */ jsxs(Flex, {
      w: "full",
      pos: "relative",
      justifyContent: "center",
      mt: 40,
      children: [!isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
        src: "/Landing/tokensId.svg",
        position: "absolute",
        left: "0",
        top: "-400px",
        alt: "turbine"
      }), /* @__PURE__ */ jsxs(Box, {
        id: "questers",
        background: {
          base: "none",
          md: "radial-gradient(100% 100% at 100% 71%, rgba(255, 255, 255, 0.14) 17%, rgba(255, 255, 255, 0) 100%)"
        },
        backdropFilter: {
          base: "none",
          md: "blur(20px)"
        },
        border: {
          base: "none",
          md: "1px solid #03a5fc"
        },
        borderRadius: {
          base: "none",
          md: "29.8157px"
        },
        w: "80%",
        h: {
          base: "initial",
          md: "528px"
        },
        textAlign: "center",
        p: {
          base: 0,
          md: 24
        },
        mb: {
          base: 24,
          md: 0
        },
        children: [/* @__PURE__ */ jsx(Heading, {
          color: "gray.100",
          fontSize: {
            base: 20,
            md: 50
          },
          mb: 12,
          children: "Team Buildingx"
        }), /* @__PURE__ */ jsx(Text, {
          color: "gray.100",
          mb: 6,
          fontSize: {
            base: "lg",
            md: "3xl"
          },
          children: "\u2662 can complete quest chains by submitting proof of completion for quests"
        }), /* @__PURE__ */ jsx(Text, {
          color: "gray.100",
          fontSize: {
            base: "lg",
            md: "3xl"
          },
          children: "\u2662 able to mint an NFT after successfully completing all of the quests of a quest chain"
        })]
      })]
    })]
  });
};
const MenuLandingDesktop = () => {
  useBreakpointValue({
    base: true,
    lg: false
  });
  return /* @__PURE__ */ jsxs(HStack, {
    children: [/* @__PURE__ */ jsx(Link$1, {
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
    }), /* @__PURE__ */ jsx(Link$1, {
      activeClass: "active",
      to: "go-to-app",
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
    }), /* @__PURE__ */ jsx(Link$1, {
      activeClass: "active",
      to: "go-to-app",
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
    }), /* @__PURE__ */ jsx(Link$1, {
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
    }), /* @__PURE__ */ jsx(Link$1, {
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
const Who = () => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    lg: false
  });
  return /* @__PURE__ */ jsxs(HStack, {
    w: "full",
    h: "full",
    align: "center",
    justify: "center",
    minH: "40vh",
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
        },
        children: "Who?"
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
          children: "Human Resources"
        }), /* @__PURE__ */ jsx(Text, {
          mb: 4,
          children: "\u2662 DAO newcomers"
        }), /* @__PURE__ */ jsx(Text, {
          mb: 4,
          children: "\u2662 Curious, knowledge hungry people"
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
          children: "Creators"
        }), /* @__PURE__ */ jsx(Text, {
          mb: 4,
          children: "\u2662 DAOs"
        }), /* @__PURE__ */ jsx(Text, {
          mb: 4,
          children: "\u2662 Organizations that want to create courses"
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
    children: /* @__PURE__ */ jsx(Flex, {
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
      children: /* @__PURE__ */ jsxs(Flex, {
        align: "center",
        mb: 10,
        flexDir: "column",
        children: [/* @__PURE__ */ jsx(Heading, {
          color: "main",
          fontSize: {
            base: 36,
            md: 79
          },
          pb: 4,
          fontWeight: "normal",
          display: "flex",
          children: "Brought to you by:"
        }), /* @__PURE__ */ jsxs(Flex, {
          mb: 8,
          children: [/* @__PURE__ */ jsx(Link, {
            href: "https://github.com/tenfinney",
            isExternal: true,
            borderRadius: "full",
            mx: 4,
            children: /* @__PURE__ */ jsx(Image$1, {
              src: "/Landing/contact/discord.png",
              alt: "discord",
              height: 14
            })
          }), /* @__PURE__ */ jsx(Link, {
            href: "https://https://github.com/tenfinney",
            isExternal: true,
            borderRadius: "full",
            mx: 4,
            children: /* @__PURE__ */ jsx(Image$1, {
              bg: "white",
              src: "/Landing/contact/github.png",
              alt: "github",
              height: 14
            })
          }), /* @__PURE__ */ jsx(Link, {
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
              children: [/* @__PURE__ */ jsx(Link, {
                href: "https://github.com/tenfinney",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/github.png",
                  alt: "ipfs",
                  height: 6
                })
              }), /* @__PURE__ */ jsx(Link, {
                href: "https://www.linkedin.com/in/scott-stevenson-jd/",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/linkedin.png",
                  alt: "ipfs",
                  height: 6
                })
              }), /* @__PURE__ */ jsx(Link, {
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
              children: [/* @__PURE__ */ jsx(Link, {
                href: "https://github.com/tenfinney",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/github.png",
                  alt: "ipfs",
                  height: 6
                })
              }), /* @__PURE__ */ jsx(Link, {
                href: "https://www.linkedin.com/in/scott-stevenson-jd/",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/linkedin.png",
                  alt: "ipfs",
                  height: 6
                })
              }), /* @__PURE__ */ jsx(Link, {
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
              children: [/* @__PURE__ */ jsx(Link, {
                href: "https://github.com/tenfinney",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/github.png",
                  alt: "ipfs",
                  height: 6
                })
              }), /* @__PURE__ */ jsx(Link, {
                href: "https://www.linkedin.com/in/scott-stevenson-jd/",
                isExternal: true,
                borderRadius: "full",
                children: /* @__PURE__ */ jsx(Image$1, {
                  src: "/Landing/contact/linkedin.png",
                  alt: "ipfs",
                  height: 6
                })
              }), /* @__PURE__ */ jsx(Link, {
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
      })
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
    bg: "black",
    children: /* @__PURE__ */ jsxs(HStack, {
      w: "full",
      align: "center",
      justify: "center",
      minH: {
        base: "40vh",
        md: "20vh"
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
                md: 60
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
                children: "Polygon"
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
              alignSelf: "center",
              children: /* @__PURE__ */ jsx(Text, {
                color: "white",
                children: "with"
              })
            }), /* @__PURE__ */ jsx(Heading, {
              color: "main",
              fontSize: {
                base: 18,
                md: 60
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
                children: "IPFS"
              })
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(Link$1, {
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
const Home = () => {
  const [tokens, setTokens] = react.exports.useState([]);
  const [query] = useSearchParams();
  const [limit, setLimit] = react.exports.useState(Number(query.get("limit") ?? defaults.limit));
  const [offset, setOffset] = react.exports.useState(Number(query.get("offset") ?? defaults.offset));
  const [gatingVisible, setGatingVisible] = react.exports.useState(query.get("gating") === "true");
  const visible = query.get("visible") ?? defaults.visible;
  const [visibleList, setVisibleList] = react.exports.useState(toSpanList(visible));
  const navigate = useNavigate();
  const {
    roContract,
    bitsLibrary
  } = useWeb3();
  const setToken = react.exports.useCallback((idx, info) => {
    let token;
    setTokens((tkns) => {
      token = {
        ...tkns[idx],
        ...info
      };
      return [...tkns.slice(0, idx), ...Array.from({
        length: idx - tkns.length
      }, () => ({})), token, ...tkns.slice(idx + 1)];
    });
    return token;
  }, [setTokens]);
  const [typeCount, setTypeCount] = react.exports.useState(null);
  const [GATING_TYPE, setGATING_TYPE] = react.exports.useState(null);
  const [DISABLING_TYPE, setDISABLING_TYPE] = react.exports.useState(null);
  const [TYPE_WIDTH, setTYPE_WIDTH] = react.exports.useState(null);
  const [TYPE_BOUNDARY, setTYPE_BOUNDARY] = react.exports.useState(null);
  react.exports.useEffect(() => {
    const params = {};
    if (visibleList?.length > 0) {
      Object.assign(params, {
        visible: visibleList.toString()
      });
    } else {
      Object.entries({
        limit,
        offset,
        gating: gatingVisible
      }).forEach(([key, val]) => {
        if (val !== defaults[key]) {
          Object.assign(params, {
            [key]: val.toString()
          });
        }
      });
    }
    const options = {
      search: `?${createSearchParams(params)}`
    };
    navigate(options, {
      replace: true
    });
  }, [visibleList, limit, offset, gatingVisible, navigate]);
  react.exports.useEffect(() => {
    if (roContract && bitsLibrary) {
      roContract.typeSupply().then((supply) => supply.toBigInt()).then(setTypeCount);
      bitsLibrary.GATING_TYPE().then((type) => type.toBigInt()).then(setGATING_TYPE);
      bitsLibrary.DISABLING_TYPE().then((type) => type.toBigInt()).then(setDISABLING_TYPE);
      bitsLibrary.TYPE_WIDTH().then(setTYPE_WIDTH);
      bitsLibrary.TYPE_BOUNDARY().then(setTYPE_BOUNDARY);
    }
  }, [roContract, bitsLibrary]);
  react.exports.useEffect(() => {
    setVisibleList(toSpanList(visible));
  }, [visible]);
  const controller = react.exports.useRef(null);
  const retrieve = react.exports.useCallback(async (tokens2) => {
    controller.current?.abort();
    controller.current = new AbortController();
    setTokens([]);
    return await Promise.allSettled(tokens2.map(async (token, idx) => {
      try {
        const id = token.id ?? (await roContract.tokenByIndex(token.index)).toBigInt();
        const type = id & 2n ** BigInt(TYPE_WIDTH) - 1n << BigInt(TYPE_BOUNDARY);
        const gating = token.is?.gating ?? type === GATING_TYPE;
        const disabling = token.is?.disabling ?? type === (GATING_TYPE | DISABLING_TYPE);
        const gates = token.gates ?? (gating || disabling ? Number(2n ** 32n - 1n & id) : null);
        const is = {
          gating,
          disabling,
          hidden: token.hidable != false && (gating || disabling) && !gatingVisible
        };
        setToken(idx, {
          id: `0x${id.toString(16)}`,
          index: token.index,
          gates,
          is
        });
        if (is.hidden) {
          throw new HiddenError("Token is hidden.");
        }
        const uri = token.uri ?? await roContract.uri(id);
        if (uri === "") {
          throw new Error("No URI\u2026 Waiting for configuration\u2026");
        }
        setToken(idx, {
          uri
        });
        const response = await fetch(httpURL(uri), {
          signal: controller.current.signal
        });
        if (!response.ok) {
          throw new Error(`Request Status: ${response.status}`);
        }
        const data = await response.text();
        if (!data || data.trim() === "") {
          throw new Error("No Data Provided");
        }
        setToken(idx, {
          metadata: lib.parse(data)
        });
        roContract.totalSupply(id).then((total) => {
          setToken(idx, {
            total: total.toBigInt()
          });
        });
        roContract.getMax(id).then((max) => {
          setToken(idx, {
            max: max.toBigInt()
          });
        });
      } catch (error) {
        if (!(error instanceof HiddenError)) {
          console.error({
            error
          });
        }
        if (!(error instanceof DOMException)) {
          return setToken(idx, {
            error: extractMessage(error)
          });
        }
      }
    }));
  }, [GATING_TYPE, TYPE_BOUNDARY, TYPE_WIDTH, DISABLING_TYPE, gatingVisible, roContract, setToken]);
  react.exports.useEffect(() => {
    const load = async () => {
      if (roContract && bitsLibrary && typeCount != null && TYPE_WIDTH != null && TYPE_BOUNDARY != null && GATING_TYPE != null && DISABLING_TYPE != null) {
        const tokens2 = [];
        if (visibleList.some(() => true)) {
          visibleList.forEach((elem) => {
            let {
              high,
              low
            } = elem;
            const sorted = [low, high] = [low, high].sort((a, b) => a - b);
            if (sorted.some((elem2) => elem2 == null)) {
              [high, low] = [elem, elem];
            }
            tokens2.push(...Array.from({
              length: high - low + 1
            }).map((_, idx) => ({
              index: low + idx,
              hidable: false
            })));
          });
        } else {
          const start = offset < 0 ? Number(typeCount) + offset : offset;
          const count = Math.min(limit, Number(typeCount) - start);
          tokens2.push(...Array.from({
            length: count
          }).map((_, idx) => ({
            index: start + idx + 1
          })));
        }
        await retrieve(tokens2);
      }
    };
    load();
  }, [visibleList, retrieve, roContract, bitsLibrary, limit, offset, typeCount, TYPE_WIDTH, TYPE_BOUNDARY, GATING_TYPE, DISABLING_TYPE]);
  return /* @__PURE__ */ jsxs(Container, {
    maxW: "full",
    id: "back-to-top",
    children: [/* @__PURE__ */ jsxs(HelmetExport, {
      children: [/* @__PURE__ */ jsx("title", {
        children: "SmartLaw Claims"
      }), /* @__PURE__ */ jsx("meta", {
        name: "description",
        content: "SmartLaw Claims Digital Assets"
      })]
    }), /* @__PURE__ */ jsxs(chakra.header, {
      bg: "black",
      children: [/* @__PURE__ */ jsx(MenuLandingDesktop, {}), /* @__PURE__ */ jsxs(Container, {
        children: [/* @__PURE__ */ jsx(MenuHeader, {}), /* @__PURE__ */ jsx(Who, {}), /* @__PURE__ */ jsx(How, {}), /* @__PURE__ */ jsx(Creators, {}), /* @__PURE__ */ jsx(BuiltWith, {}), /* @__PURE__ */ jsx(Team, {})]
      })]
    }), /* @__PURE__ */ jsxs(chakra.main, {
      bg: "black",
      children: [/* @__PURE__ */ jsx(Header, {
        h: "40vh"
      }), /* @__PURE__ */ jsxs(Stack, {
        align: "center",
        children: [/* @__PURE__ */ jsx(TokenFilterForm, {
          flexGrow: 1,
          limit,
          setLimit,
          offset,
          setOffset,
          gatingVisible,
          setGatingVisible,
          visibleList,
          setVisibleList
        }), /* @__PURE__ */ jsx(TokensTable, {
          tokens
        }), /* @__PURE__ */ jsxs(Flex, {
          justify: "center",
          children: [/* @__PURE__ */ jsxs(Button, {
            onClick: () => {
              if (visibleList.length > 0) {
                const potentials = visibleList.map((entry) => entry?.high ?? entry);
                const max = Math.max(...potentials);
                setVisibleList((vis) => [...vis, {
                  low: max,
                  high: max + 10
                }]);
              } else {
                setLimit((lim) => lim + 10);
              }
            },
            children: [/* @__PURE__ */ jsx(Text, {
              as: "span",
              mr: 1,
              mt: -0.5,
              fontSize: "150%",
              fontWeight: "bold",
              children: "+"
            }), "10"]
          }), /* @__PURE__ */ jsxs(Button, {
            ml: 5,
            onClick: () => setOffset((off) => off + limit),
            children: [/* @__PURE__ */ jsx(Text, {
              as: "span",
              mr: 0.75,
              mt: -1,
              fontSize: "200%",
              fontWeight: "bold",
              children: "\u2193"
            }), limit]
          }), /* @__PURE__ */ jsxs(Button, {
            ml: 5,
            onClick: () => setOffset((off) => off - limit),
            children: [/* @__PURE__ */ jsx(Text, {
              as: "span",
              mr: 0.75,
              mt: -1,
              fontSize: "200%",
              fontWeight: "bold",
              children: "\u2191"
            }), limit]
          })]
        })]
      })]
    })]
  });
};
export {
  Home as default
};
//# sourceMappingURL=home.7f4a4d5d.js.map