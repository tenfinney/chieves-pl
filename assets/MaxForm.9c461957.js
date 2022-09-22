import { m as forwardRef, n as useMultiStyleConfig, o as omitThemingProps, at as split, au as layoutPropNames, av as useFormControl, aw as mergeWith, r as react, c as chakra, j as jsx, am as dataAttr, q as cx, i as useWeb3, h as useNavigate, ax as useConfig, a as jsxs, S as Stack, e as Box, I as Input, ay as nftBase, az as UnorderedList, aA as ListItem, b as FormControl, F as Flex, d as FormLabel, aB as SimpleGrid, Z as React, ar as Center, B as Button, a2 as Link, T as Text, a1 as Spinner } from "./index.b10e4469.js";
import { r as regexify, e as extractMessage, l as lib, k as isSet, m as ipfsify, n as isEmpty, a as Tooltip, h as httpURL, R as ReactMarkdown, c as Table, d as Thead, f as Tr, g as Th, i as Tbody, j as Td } from "./index.c26b2481.js";
import { u as useForm, I as Image$1, c as CloseIcon, A as AddIcon, E as ExternalLinkIcon } from "./chakra-ui-icons.esm.6e472982.js";
import { T as Tabs, a as TabList, b as Tab, c as TabPanels, d as TabPanel, R as RadioGroup, e as Radio, f as Textarea } from "./chakra-ui-textarea.esm.e28a3d18.js";
import { S as SubmitButton } from "./SubmitButton.300611a4.js";
import { u as useToast } from "./chakra-ui-toast.esm.e8d2864f.js";
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
var _excluded = ["children", "placeholder", "className"], _excluded2 = ["rootProps", "placeholder", "icon", "color", "height", "h", "minH", "minHeight", "iconColor", "iconSize", "isFullWidth"], _excluded3 = ["children"];
var SelectField = /* @__PURE__ */ forwardRef(function(props, ref) {
  var children = props.children, placeholder = props.placeholder, className = props.className, rest = _objectWithoutPropertiesLoose(props, _excluded);
  return /* @__PURE__ */ react.exports.createElement(chakra.select, _extends({}, rest, {
    ref,
    className: cx("chakra-select", className)
  }), placeholder && /* @__PURE__ */ jsx("option", {
    value: "",
    children: placeholder
  }), children);
});
var Select = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useMultiStyleConfig("Select", props);
  var _omitThemingProps = omitThemingProps(props), rootProps = _omitThemingProps.rootProps, placeholder = _omitThemingProps.placeholder, icon = _omitThemingProps.icon, color = _omitThemingProps.color, height = _omitThemingProps.height, h = _omitThemingProps.h, minH = _omitThemingProps.minH, minHeight = _omitThemingProps.minHeight, iconColor = _omitThemingProps.iconColor, iconSize = _omitThemingProps.iconSize;
  _omitThemingProps.isFullWidth;
  var rest = _objectWithoutPropertiesLoose(_omitThemingProps, _excluded2);
  var _split = split(rest, layoutPropNames), layoutProps = _split[0], otherProps = _split[1];
  var ownProps = useFormControl(otherProps);
  var rootStyles = {
    width: "100%",
    height: "fit-content",
    position: "relative",
    color
  };
  var fieldStyles = mergeWith({
    paddingEnd: "2rem"
  }, styles.field, {
    _focus: {
      zIndex: "unset"
    }
  });
  return /* @__PURE__ */ react.exports.createElement(
    chakra.div,
    _extends({
      className: "chakra-select__wrapper",
      __css: rootStyles
    }, layoutProps, rootProps),
    /* @__PURE__ */ jsx(SelectField, {
      ref,
      height: h != null ? h : height,
      minH: minH != null ? minH : minHeight,
      placeholder,
      ...ownProps,
      __css: fieldStyles,
      children: props.children
    }),
    /* @__PURE__ */ jsx(SelectIcon, {
      "data-disabled": dataAttr(ownProps.disabled),
      ...(iconColor || color) && {
        color: iconColor || color
      },
      __css: styles.icon,
      ...iconSize && {
        fontSize: iconSize
      },
      children: icon
    })
  );
});
var DefaultIcon = function DefaultIcon2(props) {
  return /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 24 24",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
    })
  });
};
var IconWrapper = chakra("div", {
  baseStyle: {
    position: "absolute",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    top: "50%",
    transform: "translateY(-50%)"
  }
});
var SelectIcon = function SelectIcon2(props) {
  var _props$children = props.children, children = _props$children === void 0 ? /* @__PURE__ */ jsx(DefaultIcon, {}) : _props$children, rest = _objectWithoutPropertiesLoose(props, _excluded3);
  var clone = /* @__PURE__ */ react.exports.cloneElement(children, {
    role: "presentation",
    className: "chakra-select__icon",
    focusable: false,
    "aria-hidden": true,
    style: {
      width: "1em",
      height: "1em",
      color: "currentColor"
    }
  });
  return /* @__PURE__ */ jsx(IconWrapper, {
    ...rest,
    className: "chakra-select__icon-wrapper",
    children: /* @__PURE__ */ react.exports.isValidElement(children) ? clone : null
  });
};
const OptionsForm = ({
  purpose = "create",
  tokenId
}) => {
  const {
    rwContract
  } = useWeb3();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      isSubmitting: processing,
      isDirty: dirty
    }
  } = useForm();
  const FIELD_FORM = 0;
  const URI_FORM = 1;
  const JSON5_FORM = 2;
  const [tab, setTab] = react.exports.useState(FIELD_FORM);
  const toast = useToast();
  const {
    storage
  } = useConfig();
  const metadata = watch("metadata");
  const json5 = watch("json5");
  const uri = watch("uri");
  react.exports.useEffect(() => {
    setValue("uri", uri);
  }, [uri, setValue]);
  const configure = react.exports.useCallback(async ({
    metadata: metadata2
  }) => {
    if (!rwContract) {
      throw new Error(`Cannot connect to contract to ${purpose} metadata.`);
    }
    if (tokenId == null) {
      throw new Error("Token id is unset.");
    }
    try {
      const tx = await rwContract.setURI(BigInt(tokenId), metadata2);
      await tx.wait();
      if (metadata2 !== "") {
        navigate(`/view/${regexify(tokenId)}`);
      }
    } catch (error) {
      console.error({
        error
      });
      toast({
        title: "Contract Error",
        description: extractMessage(error),
        status: "error",
        isClosable: true,
        duration: 1e4
      });
    }
  }, [rwContract, tokenId, purpose, navigate, toast]);
  const buildMeta = async (data) => {
    const {
      name,
      description,
      homepage,
      color,
      images,
      animation,
      attributes
    } = data;
    const metadata2 = {
      name: isSet(name) ? name : "Untitled Token",
      decimals: 0
    };
    if (isSet(description)) {
      metadata2.description = description;
    }
    if (isSet(homepage)) {
      metadata2.external_url = homepage;
    }
    if (Array.isArray(images) && images.some((img) => img != null)) {
      metadata2.image = await ipfsify({
        filesOrURL: images,
        storage
      });
    } else if (!Array.isArray(images)) {
      console.warn(`Unknown Image Type: ${typeof images}`);
    }
    if (animation instanceof File || typeof animation === "string") {
      metadata2.animation_url = (await ipfsify({
        filesOrURL: animation,
        storage
      }))[0];
    } else if (animation != null) {
      console.warn(`Unknown Animation Type: ${typeof animation}`);
    }
    if (color?.startsWith("#")) {
      metadata2.background_color = color.substring(1).toUpperCase();
    }
    if (isSet(attributes) && !isEmpty(attributes)) {
      metadata2.attributes = attributes.map(({
        name: name2,
        value,
        type
      }) => {
        const attr = {
          trait_type: name2,
          value
        };
        if (type !== "string") {
          attr.display_type = type;
        }
        return attr;
      });
    }
    return metadata2;
  };
  const submit = async (data) => {
    try {
      const name = `metadata.${new Date().toISOString()}.json`;
      let metadata2 = await (async () => {
        switch (tab) {
          case FIELD_FORM: {
            const content = JSON.stringify(await buildMeta(data), null, 2);
            return {
              name,
              content
            };
          }
          case URI_FORM: {
            return data.uri ?? "";
          }
          case JSON5_FORM: {
            if (!isSet(data.json5)) {
              throw new Error("JSON5 isn\u2019t set.");
            }
            const meta = lib.parse(data.json5);
            return {
              name,
              content: JSON.stringify(meta, null, 2)
            };
          }
          default: {
            throw new Error(`Unknown Tab: ${tab}`);
          }
        }
      })();
      if (metadata2 == null) {
        throw new Error(`Metadata is \`${lib.stringify(metadata2)}\`.`);
      } else if (metadata2 !== "") {
        metadata2 = await ipfsify({
          filesOrURL: metadata2,
          storage
        });
      }
      await configure({
        metadata: metadata2
      });
    } catch (error) {
      console.error({
        error
      });
      toast({
        title: "Metadata Error",
        description: extractMessage(error),
        status: "error",
        isClosable: true,
        duration: 1e4
      });
    }
  };
  return /* @__PURE__ */ jsxs(Stack, {
    align: "center",
    children: [/* @__PURE__ */ jsxs(Box, {
      as: "form",
      onSubmit: handleSubmit(submit),
      mt: 10,
      w: ["100%", "min(85vw, 40em)"],
      sx: {
        a: {
          textDecoration: "underline"
        }
      },
      children: [/* @__PURE__ */ jsx(SubmitButton, {
        purpose,
        processing,
        mb: 3
      }), /* @__PURE__ */ jsxs(Tabs, {
        mx: [0, 5],
        isFitted: true,
        variant: "enclosed",
        onChange: async (idx) => {
          switch (idx) {
            case FIELD_FORM: {
              switch (tab) {
                case URI_FORM: {
                  const res = await fetch(uri);
                  lib.parse(await res.text());
                  break;
                }
                case JSON5_FORM: {
                  lib.parse(json5);
                  break;
                }
              }
              break;
            }
          }
          setTab(idx);
        },
        children: [/* @__PURE__ */ jsxs(TabList, {
          mb: "1em",
          children: [/* @__PURE__ */ jsx(Tab, {
            children: "Fields"
          }), /* @__PURE__ */ jsx(Tab, {
            children: "URI"
          }), /* @__PURE__ */ jsx(Tab, {
            children: "JSON5"
          })]
        }), /* @__PURE__ */ jsx(TabPanels, {
          children: [NFTForm, URIForm, JSONForm].map((Form, idx) => /* @__PURE__ */ jsx(TabPanel, {
            p: 0,
            children: /* @__PURE__ */ jsx(Form, {
              register,
              watch,
              setValue,
              tokenId,
              metadata
            })
          }, idx))
        })]
      }), /* @__PURE__ */ jsx(SubmitButton, {
        purpose,
        processing,
        mb: 3,
        requireStorage: true
      })]
    }), /* @__PURE__ */ jsx(MaxForm, {
      colorScheme: "blue",
      tokenId,
      purpose
    }), /* @__PURE__ */ jsx(MaxForm, {
      colorScheme: "blue",
      perUser: true,
      tokenId,
      purpose
    })]
  });
};
const URIForm = ({
  register
}) => {
  return /* @__PURE__ */ jsx(Input, {
    placeholder: "Enter a URI for the token\u2026",
    ...register("uri")
  });
};
const AttrRow = ({
  attributes = [],
  setValue: setFormValue,
  index
}) => {
  const {
    name = "",
    value = "",
    type = "string"
  } = attributes[index];
  const setter = react.exports.useCallback((prop) => (value2) => {
    setFormValue("attributes", [...attributes.slice(0, index), {
      ...attributes[index],
      [prop]: value2
    }, ...attributes.slice(index + 1)]);
  }, [setFormValue, index, attributes]);
  const setName = setter("name");
  const setValue = setter("value");
  const setType = setter("type");
  return /* @__PURE__ */ jsxs(Tr, {
    children: [/* @__PURE__ */ jsx(Td, {
      children: /* @__PURE__ */ jsx(Input, {
        value: name,
        onChange: ({
          target: {
            value: value2
          }
        }) => {
          setName(value2);
        }
      })
    }), /* @__PURE__ */ jsx(Td, {
      children: (() => {
        switch (type) {
          case "date": {
            return /* @__PURE__ */ jsx(Input, {
              type: "date",
              value: isEmpty(value) ? "" : new Date(value).toISOString().split("T")[0],
              onChange: ({
                target: {
                  value: value2
                }
              }) => {
                setValue(new Date(value2).getTime());
              }
            });
          }
          case "string": {
            return /* @__PURE__ */ jsx(Input, {
              value,
              onChange: ({
                target: {
                  value: value2
                }
              }) => {
                setValue(value2);
              }
            });
          }
          default: {
            return /* @__PURE__ */ jsx(Input, {
              type: "number",
              value,
              onChange: ({
                target: {
                  value: value2
                }
              }) => {
                setValue(value2 != null ? Number(value2) : "");
              }
            });
          }
        }
      })()
    }), /* @__PURE__ */ jsx(Td, {
      children: /* @__PURE__ */ jsxs(Select, {
        value: type,
        onChange: ({
          target: {
            value: value2
          }
        }) => {
          setType(value2);
        },
        children: [/* @__PURE__ */ jsx(chakra.option, {
          value: "string",
          children: "String"
        }), /* @__PURE__ */ jsx(chakra.option, {
          value: "date",
          children: "Date"
        }), /* @__PURE__ */ jsx(chakra.option, {
          value: "number",
          children: "Number"
        }), /* @__PURE__ */ jsx(chakra.option, {
          value: "boost_percentage",
          children: "Boost Percentage"
        }), /* @__PURE__ */ jsx(chakra.option, {
          value: "boost_number",
          children: "Boost Number"
        })]
      })
    }), /* @__PURE__ */ jsx(Td, {
      children: /* @__PURE__ */ jsx(Tooltip, {
        label: "Remove",
        hasArrow: true,
        children: /* @__PURE__ */ jsx(Button, {
          size: "sm",
          ml: 2,
          colorScheme: "red",
          onClick: () => setFormValue("attributes", [...attributes.slice(0, index), ...attributes.slice(index + 1)]),
          children: /* @__PURE__ */ jsx(CloseIcon, {})
        })
      })
    })]
  });
};
const NFTForm = ({
  register,
  watch,
  setValue,
  tokenId = "\u{1D61C}\u{1D62F}\u{1D62C}\u{1D62F}\u{1D630}\u{1D638}\u{1D62F}",
  metadata
}) => {
  const [primaryImageIdx, setPrimaryImageIdx] = react.exports.useState(0);
  const imageRef = react.exports.useRef(null);
  const {
    homepage,
    description,
    color,
    images,
    attributes,
    animation
  } = watch();
  react.exports.useEffect(() => {
    if (metadata) {
      Object.entries({
        name: null,
        description: null,
        external_url: "homepage",
        animation_url: "animation"
      }).forEach(([prop, name]) => {
        setValue(name ?? prop, metadata[prop]);
      });
      if (metadata.image) {
        setValue("images", [metadata.image]);
      }
      const {
        attributes: attrs
      } = metadata;
      if (!isEmpty(attrs)) {
        setValue("attributes", (attrs ?? []).map(({
          trait_type: name,
          value,
          display_type: type = "string"
        }) => ({
          name,
          value,
          type
        })));
      }
      const bg = metadata.background_color;
      if (bg && !isEmpty(bg)) {
        setValue("color", `#${bg}`);
      }
    }
  }, [metadata, setValue]);
  react.exports.useEffect(() => {
    if (!homepage || isEmpty(homepage) || homepage.endsWith("\u{1D61C}\u{1D62F}\u{1D62C}\u{1D62F}\u{1D630}\u{1D638}\u{1D62F}")) {
      setValue("homepage", `${nftBase}/${regexify(tokenId)}`);
    }
  }, [homepage, setValue, tokenId]);
  react.exports.useEffect(() => {
    if (window.location.hash) {
      const elem = document.getElementById(window.location.hash.substring(1));
      window.scroll({
        top: (elem?.offsetTop ?? 0) - 120,
        behavior: "smooth"
      });
    }
  }, []);
  const addImage = ({
    target: {
      files
    }
  }) => {
    if (files?.length && files?.length >= 1) {
      setValue("images", [...images ?? [], ...Array.from(files)]);
    }
  };
  const removeImage = (idx) => {
    const replacement = [...images.slice(0, idx), ...images.slice(idx + 1)];
    setValue("images", replacement);
    if (primaryImageIdx === idx) {
      setPrimaryImageIdx(replacement.length > 0 ? 0 : void 0);
    }
  };
  const configAnimation = (evt) => {
    const {
      target: {
        files
      }
    } = evt;
    if (files?.length >= 1) {
      setValue("animation", files[0]);
    } else {
      setValue("animation", null);
    }
    evt.preventDefault();
  };
  const addRow = () => {
    setValue("attributes", [...attributes ?? [], {}]);
  };
  return /* @__PURE__ */ jsxs(UnorderedList, {
    listStyleType: "none",
    children: [/* @__PURE__ */ jsx(ListItem, {
      children: /* @__PURE__ */ jsx(FormControl, {
        mt: 3,
        children: /* @__PURE__ */ jsxs(Flex, {
          direction: {
            base: "column",
            md: "row"
          },
          children: [/* @__PURE__ */ jsx(FormLabel, {
            _after: {
              content: '":"'
            },
            children: "Name"
          }), /* @__PURE__ */ jsx(Input, {
            autoFocus: true,
            ml: {
              base: 0,
              md: 4
            },
            ...register("name")
          })]
        })
      })
    }), /* @__PURE__ */ jsx(ListItem, {
      children: /* @__PURE__ */ jsxs(FormControl, {
        mt: 3,
        children: [/* @__PURE__ */ jsxs(Flex, {
          direction: {
            base: "column",
            md: "row"
          },
          children: [/* @__PURE__ */ jsx(FormLabel, {
            _after: {
              content: '":"'
            },
            children: "Images"
          }), /* @__PURE__ */ jsx(Input, {
            type: "file",
            accept: "image/*",
            ref: imageRef,
            onChange: addImage,
            display: "none",
            multiple: true
          })]
        }), images?.length > 0 && /* @__PURE__ */ jsx(RadioGroup, {
          value: primaryImageIdx,
          onChange: (value) => {
            setPrimaryImageIdx(Number(value));
          },
          children: /* @__PURE__ */ jsx(SimpleGrid, {
            columns: 3,
            templateColumns: "6rem 1fr 2rem",
            children: images.map((image, idx) => {
              const name = image?.name ?? image?.replace(/^.*\//g, "");
              return /* @__PURE__ */ jsxs(React.Fragment, {
                children: [/* @__PURE__ */ jsx(Flex, {
                  w: 16,
                  children: /* @__PURE__ */ jsx(Radio, {
                    value: idx,
                    children: "Display Image"
                  })
                }), /* @__PURE__ */ jsx(Flex, {
                  justify: "center",
                  bg: idx === primaryImageIdx ? color : "transparent",
                  children: /* @__PURE__ */ jsx(Tooltip, {
                    label: name,
                    hasArrow: true,
                    children: /* @__PURE__ */ jsx(Image$1, {
                      alt: name,
                      src: image instanceof File ? URL.createObjectURL(image) : httpURL(image) ?? void 0,
                      maxH: 60,
                      mt: 0,
                      onClick: () => imageRef.current?.click()
                    })
                  })
                }), /* @__PURE__ */ jsx(Center, {
                  children: /* @__PURE__ */ jsx(Button, {
                    size: "xs",
                    colorScheme: "red",
                    onClick: () => removeImage(idx),
                    children: /* @__PURE__ */ jsx(CloseIcon, {})
                  })
                })]
              }, idx);
            })
          })
        }), /* @__PURE__ */ jsx(Button, {
          w: "full",
          mt: 3,
          colorScheme: "teal",
          onClick: () => imageRef.current?.click(),
          children: /* @__PURE__ */ jsx(AddIcon, {})
        })]
      })
    }), /* @__PURE__ */ jsx(ListItem, {
      children: /* @__PURE__ */ jsx(FormControl, {
        mt: 3,
        children: /* @__PURE__ */ jsxs(Flex, {
          direction: {
            base: "column",
            md: "row"
          },
          children: [/* @__PURE__ */ jsx(FormLabel, {
            _after: {
              content: '":"'
            },
            children: "Background"
          }), /* @__PURE__ */ jsx(Input, {
            type: "color",
            ...register("color")
          })]
        })
      })
    }), /* @__PURE__ */ jsx(ListItem, {
      children: /* @__PURE__ */ jsx(FormControl, {
        mt: 3,
        children: /* @__PURE__ */ jsxs(Flex, {
          direction: {
            base: "column",
            md: "row"
          },
          children: [/* @__PURE__ */ jsx(FormLabel, {
            _after: {
              content: '":"'
            },
            children: "Homepage"
          }), /* @__PURE__ */ jsxs(Flex, {
            grow: 1,
            children: [/* @__PURE__ */ jsx(Input, {
              ...register("homepage")
            }), homepage?.length > 0 && /* @__PURE__ */ jsx(Link, {
              ml: 2,
              href: homepage,
              isExternal: true,
              children: /* @__PURE__ */ jsx(ExternalLinkIcon, {})
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx(ListItem, {
      children: /* @__PURE__ */ jsx(FormControl, {
        mt: 3,
        children: /* @__PURE__ */ jsxs(Stack, {
          children: [/* @__PURE__ */ jsx(FormLabel, {
            _after: {
              content: '":"'
            },
            children: "Description"
          }), /* @__PURE__ */ jsxs(Tabs, {
            ml: 5,
            isFitted: true,
            variant: "enclosed",
            children: [/* @__PURE__ */ jsxs(TabList, {
              mb: "1em",
              children: [/* @__PURE__ */ jsx(Tab, {
                children: "Markdown"
              }), /* @__PURE__ */ jsx(Tab, {
                children: "Preview"
              })]
            }), /* @__PURE__ */ jsxs(TabPanels, {
              children: [/* @__PURE__ */ jsx(TabPanel, {
                children: /* @__PURE__ */ jsx(Textarea, {
                  placeholder: "Enter a markdown formatted description.",
                  minH: 32,
                  ...register("description")
                })
              }), /* @__PURE__ */ jsx(TabPanel, {
                children: /* @__PURE__ */ jsx(ReactMarkdown, {
                  children: description
                })
              })]
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx(ListItem, {
      children: /* @__PURE__ */ jsx(FormControl, {
        mt: 3,
        children: /* @__PURE__ */ jsxs(Flex, {
          direction: {
            base: "column",
            md: "row"
          },
          children: [/* @__PURE__ */ jsx(FormLabel, {
            _after: {
              content: '":"'
            },
            children: "Animation"
          }), typeof animation === "string" && /* @__PURE__ */ jsxs(Flex, {
            children: [/* @__PURE__ */ jsx(Text, {
              children: decodeURI(animation.replace(/^ipfs:\/\/[^/]+\//, ""))
            }), /* @__PURE__ */ jsx(Link, {
              href: httpURL(animation),
              ml: 3,
              mb: 5,
              isExternal: true,
              children: /* @__PURE__ */ jsx(ExternalLinkIcon, {})
            })]
          }), typeof File !== "undefined" && animation instanceof File && /* @__PURE__ */ jsxs(Flex, {
            children: [/* @__PURE__ */ jsx(Text, {
              children: animation.name
            }), /* @__PURE__ */ jsx(Link, {
              ml: 3,
              mb: 5,
              isExternal: true,
              href: URL.createObjectURL(animation),
              children: /* @__PURE__ */ jsx(ExternalLinkIcon, {})
            })]
          }), /* @__PURE__ */ jsx(Input, {
            type: "file",
            accept: "model/gltf+json,model/gltf-binary,video/*,.gltf,.glb",
            onChange: configAnimation,
            h: "auto"
          })]
        })
      })
    }), /* @__PURE__ */ jsx(ListItem, {
      id: "attributes",
      children: /* @__PURE__ */ jsx(FormControl, {
        mt: 3,
        children: /* @__PURE__ */ jsxs(Stack, {
          children: [/* @__PURE__ */ jsxs(Flex, {
            children: [/* @__PURE__ */ jsx(FormLabel, {
              _after: {
                content: '":"'
              },
              children: "Attributes"
            }), /* @__PURE__ */ jsx(Button, {
              ml: 2,
              size: "xs",
              onClick: addRow,
              colorScheme: "teal",
              children: /* @__PURE__ */ jsx(AddIcon, {})
            })]
          }), attributes?.length > 0 && /* @__PURE__ */ jsxs(Table, {
            sx: {
              "th, td": {
                textAlign: "center",
                px: 2
              }
            },
            children: [/* @__PURE__ */ jsx(Thead, {
              children: /* @__PURE__ */ jsxs(Tr, {
                children: [/* @__PURE__ */ jsx(Th, {
                  children: "Name"
                }), /* @__PURE__ */ jsx(Th, {
                  children: "Value"
                }), /* @__PURE__ */ jsx(Th, {
                  children: "Type"
                })]
              })
            }), /* @__PURE__ */ jsx(Tbody, {
              children: attributes.map((_, index) => /* @__PURE__ */ jsx(AttrRow, {
                attributes,
                setValue,
                index
              }, index))
            })]
          })]
        })
      })
    })]
  });
};
const JSONForm = ({
  register
}) => /* @__PURE__ */ jsx(Textarea, {
  placeholder: "Enter JSON5 token metadata\u2026",
  h: "75vh",
  ...register("json5")
});
const MaxForm = ({
  tokenId,
  purpose = "create",
  perUser = false,
  ...props
}) => {
  const [max, setMax] = react.exports.useState(null);
  const [processing, setProcessing] = react.exports.useState(false);
  const {
    roContract,
    rwContract
  } = useWeb3();
  const toast = useToast();
  react.exports.useEffect(() => {
    const load = async () => {
      if (roContract && tokenId) {
        if (perUser) {
          setMax(await roContract.getPerUserMax(BigInt(tokenId)));
        } else {
          setMax(await roContract.getMax(BigInt(tokenId)));
        }
      }
    };
    load();
  }, [tokenId, roContract]);
  const save = react.exports.useCallback(async (evt) => {
    evt.preventDefault();
    if (!rwContract) {
      throw new Error("`rwContract` is not defined");
    }
    try {
      setProcessing(true);
      let tx;
      if (perUser) {
        tx = await rwContract.setPerUserMax(tokenId, max);
      } else {
        tx = await rwContract.setMax(tokenId, max);
      }
      await tx.wait();
    } catch (error) {
      toast({
        title: "Contract Error",
        description: extractMessage(error),
        status: "error",
        isClosable: true,
        duration: 1e4
      });
    } finally {
      setProcessing(false);
    }
  }, [max, rwContract, toast, tokenId]);
  return /* @__PURE__ */ jsxs(Flex, {
    as: "form",
    onSubmit: save,
    alignItems: "flex-end",
    children: [/* @__PURE__ */ jsxs(FormControl, {
      display: "flex",
      w: "auto",
      alignItems: "baseline",
      mt: 3,
      children: [/* @__PURE__ */ jsxs(FormLabel, {
        whiteSpace: "pre",
        _after: {
          content: '":"'
        },
        children: [perUser && "Per User", " Maximum Mintable"]
      }), max == null ? /* @__PURE__ */ jsxs(Flex, {
        children: [/* @__PURE__ */ jsx(Spinner, {}), /* @__PURE__ */ jsx(Text, {
          ml: 3,
          children: "Loading\u2026"
        })]
      }) : /* @__PURE__ */ jsx(Input, {
        type: "number",
        mx: {
          base: 0,
          md: 4
        },
        w: 32,
        textAlign: "center",
        value: max,
        onChange: ({
          target: {
            value
          }
        }) => {
          setMax(value.trim().replace(/^0+([^0])/, "$1"));
        }
      })]
    }), /* @__PURE__ */ jsx(SubmitButton, {
      label: `Set ${perUser ? "Per User" : ""} Max`,
      disabled: !/^-?\d+$/.test(max),
      purpose,
      processing,
      ...props
    })]
  });
};
export {
  OptionsForm as O
};
//# sourceMappingURL=MaxForm.9c461957.js.map
