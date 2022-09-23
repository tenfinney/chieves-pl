import { r as react, j as jsx, S as Stack, a as jsxs, F as Flex, T as Text, b as FormControl, c as chakra, d as FormLabel, I as Input, B as Button, H as HStack, e as Box, f as Heading, V as VStack, G as Grid, u as useSearchParams, g as defaults, h as useNavigate, i as useWeb3, k as createSearchParams, C as Container, l as HelmetExport } from "./index.a6d5e508.js";
import { t as toSpanList, L as Link, h as httpURL, l as lib, e as extractMessage, T as TokensTable } from "./index.d1ed9c77.js";
import { H as Header, u as useBreakpointValue, M as MenuLandingDesktop, a as MenuHeader, W as Who, B as BuiltWith, T as Team } from "./BuiltWith.e3af3706.js";
import { u as useForm, C as Controller, I as Image$1, S as StarIcon, a as CheckCircleIcon } from "./chakra-ui-icons.esm.dfc00d4a.js";
import { C as Checkbox } from "./chakra-ui-checkbox.esm.3e922b35.js";
class HiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "HiddenError";
  }
}
const TokenFilterForm = ({
  limit = 100,
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
    mb: "100px",
    align: "center",
    id: "querytokens",
    bg: "black",
    children: /* @__PURE__ */ jsxs(Flex, {
      as: "form",
      onSubmit: handleSubmit(submit),
      mt: 10,
      mb: "1rem",
      maxW: ["100%", "min(85vw, 100em)"],
      direction: ["column", "row"],
      sx: {
        a: {
          textDecoration: "underline"
        }
      },
      ...props,
      children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx(Text, {
        fontSize: "18pt",
        mt: "1rem",
        fontWeight: "bold",
        children: "ERC-1155 Standard Token Minting"
      }), /* @__PURE__ */ jsx(Text, {
        ml: "20px",
        fontSize: "12pt",
        fontWeight: "regular",
        children: "Each token reservation mints one master token and up to eight role tokens. Superuser, Minter, Caster, Transferer, Configurer,Limiter, Burner, or Destroyer. Use comma, space or dash separated list for Visible List Option."
      }), /* @__PURE__ */ jsxs(Stack, {
        ml: 3,
        children: [/* @__PURE__ */ jsx(FormControl, {
          children: /* @__PURE__ */ jsx(Flex, {
            align: "center",
            my: 1,
            children: /* @__PURE__ */ jsxs(Stack, {
              flexGrow: 1,
              sx: {
                "&>*:not(style)~*:not(style)": {
                  mt: 0.5
                },
                label: {
                  _after: {
                    content: '"."'
                  },
                  mt: 1.5,
                  mr: 1,
                  mb: 4,
                  fontSize: "110%"
                }
              },
              children: [/* @__PURE__ */ jsxs(FormControl, {
                children: [/* @__PURE__ */ jsx(Controller, {
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
                    children: ["View Permission", /* @__PURE__ */ jsx(chakra.br, {}), "Tokens", /* @__PURE__ */ jsx(chakra.br, {})]
                  })
                }), /* @__PURE__ */ jsxs(Flex, {
                  align: "center",
                  children: [/* @__PURE__ */ jsx(FormLabel, {
                    children: "Limit"
                  }), /* @__PURE__ */ jsx(Input, {
                    type: "number",
                    placeholder: "Number of tokens to display.",
                    ...register("limit")
                  })]
                })]
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
                  mb: "20px",
                  align: "center",
                  children: [/* @__PURE__ */ jsx(FormLabel, {
                    children: "Visible\xA0List"
                  }), /* @__PURE__ */ jsx(Input, {
                    placeholder: "Comma, space and dash separated list of indices.",
                    ...register("visible")
                  })]
                })
              })]
            })
          })
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          colorScheme: "green",
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
    bg: "black",
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
      children: [/* @__PURE__ */ jsx(Flex, {
        align: "center",
        mb: {
          base: 0,
          md: 8
        },
        flexDirection: {
          base: "column",
          md: "row"
        },
        children: !isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
          src: "/Landing/Circles3.png",
          alt: "circles3",
          mr: 10
        })
      }), /* @__PURE__ */ jsx(Flex, {
        align: "center",
        mb: 10,
        children: /* @__PURE__ */ jsxs(Flex, {
          flexDir: "column",
          fontSize: {
            base: "md",
            md: "3xl"
          },
          mb: "150px",
          ml: {
            base: 0,
            md: 20
          },
          px: {
            base: 12,
            md: 0
          },
          children: [/* @__PURE__ */ jsxs(Heading, {
            color: "main",
            fontSize: {
              base: 36,
              md: 60
            },
            pb: 10,
            fontWeight: "normal",
            display: "flex",
            flexDir: "column",
            textAlign: {
              base: "center",
              md: "initial"
            },
            children: ["What types of tokens are minted here? ", /* @__PURE__ */ jsx(Text, {
              color: "white"
            })]
          }), /* @__PURE__ */ jsx(Text, {
            children: "Access, Achievements, Content, Identity, Claim ... any type of token really."
          }), /* @__PURE__ */ jsxs(Flex, {
            alignSelf: {
              base: "center",
              md: "auto"
            },
            children: [/* @__PURE__ */ jsx(Image$1, {
              src: "/Landing/NFTs/NFT2w.png",
              alt: "NFT2",
              title: "NFT2",
              height: "20rem"
            }), !isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
              src: "/Landing/NFTs/NFT3w.png",
              alt: "NFT3",
              title: "NFT3",
              height: "20rem"
            }), !isSmallScreen && /* @__PURE__ */ jsx(Image$1, {
              src: "/Landing/NFTs/NFT1w.png",
              alt: "NFT1",
              title: "NFT1",
              height: "20rem"
            })]
          }), /* @__PURE__ */ jsxs(Text, {
            children: [/* @__PURE__ */ jsx(StarIcon, {
              color: "cyan"
            }), " Mint and distribute tokens freely for a", /* @__PURE__ */ jsx("span", {
              style: {
                color: "#03a5fc"
              },
              children: " decentralized "
            }), "user experience!"]
          })]
        })
      })]
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
  });
};
const Creators = () => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    lg: false
  });
  return /* @__PURE__ */ jsxs(VStack, {
    bg: "black",
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
        fontSize: 50,
        mb: 6,
        children: /* @__PURE__ */ jsxs(Text, {
          fontFamily: "Exo 2, sans-serif",
          children: ["Create ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: " & "
          }), "Manage Tokens"]
        })
      }), /* @__PURE__ */ jsxs(Box, {
        children: [/* @__PURE__ */ jsx(Heading, {
          color: "white",
          fontSize: 50,
          mb: 6
        }), /* @__PURE__ */ jsxs(Text, {
          mb: "24pt",
          color: "gray.100",
          display: "flex",
          children: ["Each token reservation mints one master token and up to eight role tokens. Superuser, Minter, Caster, Transferer, Configurer, Limiter, Burner, or Destroyer.", /* @__PURE__ */ jsx("span", {
            style: {
              fontSize: "14pt",
              color: "#03a5fc",
              marginLeft: 4
            },
            children: "Superuser, Minter, Caster, Transferer, Configurer, Limiter, Burner, or Destroyer"
          })]
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
        mb: "100px",
        gridArea: "creators",
        pr: 12,
        children: [/* @__PURE__ */ jsx(Image$1, {
          maxWidth: "200px",
          src: "/Landing/smartlaw-white.png",
          alt: "smartlaw"
        }), /* @__PURE__ */ jsx(Heading, {
          color: "white",
          fontSize: 50,
          mb: 6,
          children: /* @__PURE__ */ jsxs(Text, {
            fontFamily: "Exo 2, sans-serif",
            children: ["Create ", /* @__PURE__ */ jsx("span", {
              style: {
                color: "#03a5fc"
              },
              children: " & "
            }), "Manage Tokens"]
          })
        }), /* @__PURE__ */ jsxs(Text, {
          mb: "24pt",
          color: "gray.100",
          display: "flex",
          children: ["Each token reservation mints one master token and up to eight role tokens. Superuser, Minter, Caster, Transferer, Configurer, Limiter, Burner, or Destroyer.", /* @__PURE__ */ jsx("span", {
            style: {
              fontSize: "14pt",
              color: "#03a5fc",
              marginLeft: 4
            },
            children: "Superuser, Minter, Caster, Transferer, Configurer, Limiter, Burner, or Destroyer"
          })]
        }), /* @__PURE__ */ jsxs(Text, {
          mb: "24pt",
          color: "gray.100",
          fontSize: "18pt",
          display: "flex",
          children: ["Each token can be managed with a single Superuser token token or by a group of administrators each withtheir own role.", " "]
        }), /* @__PURE__ */ jsx(Text, {
          color: "orange",
          fontSize: "18pt",
          fontFamily: "Exo 2, sans-serif",
          children: "Superusers have the highest level of token control."
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
          color: "orange",
          fontSize: {
            base: 28,
            md: 40
          },
          mb: 6,
          children: "Superuser"
        }), " ", /* @__PURE__ */ jsxs(Text, {
          mb: 4,
          fontSize: {
            base: "lg",
            md: "3xl"
          },
          maxW: {
            base: "220px",
            md: "full"
          },
          children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Can", " ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: "perform all actions"
          }), " on the token."]
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
          color: "lime",
          fontSize: {
            base: 28,
            md: 40
          },
          mb: 3,
          children: "Minter"
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
          children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Can", " ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: "mint new instances"
          }), " of the token."]
        })]
      }), !isSmallScreen && /* @__PURE__ */ jsx(Box, {
        dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        p: 6,
        textAlign: "center",
        h: "338px",
        gridArea: "q",
        children: /* @__PURE__ */ jsxs(VStack, {
          children: [/* @__PURE__ */ jsxs(Text, {
            color: "gray.100",
            fontFamily: "Exo 2, sans-serif",
            children: ["All incentive tokens can be dispersed or disbursed using", " "]
          }), /* @__PURE__ */ jsx(Image$1, {
            src: "/Landing/airdrop_eth_logo-wh-400x.png",
            height: "60px",
            alt: "circles3",
            mr: 10
          }), /* @__PURE__ */ jsxs(Text, {
            color: "gray.100",
            fontFamily: "Exo 2, sans-serif",
            children: ["one example of a trusted tokens source. The history of", " ", /* @__PURE__ */ jsx("span", {
              style: {
                color: "#03a5fc"
              },
              children: "Airdrop.eth"
            }), " token minter can be found on a public blockchain.", " "]
          })]
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
          color: "gray.500",
          fontSize: {
            base: 28,
            md: 40
          },
          mb: 3,
          children: "Configurer"
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
          children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Can", " ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: "change the token\u2019s metadata"
          }), " and resource id."]
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
          color: "gray.500",
          fontSize: {
            base: 28,
            md: 40
          },
          mb: 3,
          children: "Transferer"
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
          children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Can", " ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: " transfer the token"
          }), " to another account."]
        })]
      }), /* @__PURE__ */ jsx(Box, {
        gridArea: "empty2"
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
      children: [/* @__PURE__ */ jsxs(Box, {
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
          color: "pink.300",
          fontSize: {
            base: 28,
            md: 40
          },
          mb: 3,
          children: "Caster"
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
          children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Can", " ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: "assign roles"
          }), " for the token."]
        })]
      }), !isSmallScreen && /* @__PURE__ */ jsx(Box, {
        dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        p: 6,
        textAlign: "center",
        h: "338px",
        gridArea: "q",
        children: /* @__PURE__ */ jsxs(VStack, {
          children: [/* @__PURE__ */ jsxs(Text, {
            color: "gray.100",
            fontFamily: "Exo 2, sans-serif",
            children: ["Web3 is a decentralized network of blockchains and nodes.", " "]
          }), /* @__PURE__ */ jsx(Image$1, {
            src: "/w3s-800w.png",
            alt: "web3skills",
            mr: 10
          }), /* @__PURE__ */ jsxs(Text, {
            color: "gray.100",
            fontFamily: "Exo 2, sans-serif",
            children: ["Sovereign data and", " ", /* @__PURE__ */ jsx("span", {
              style: {
                color: "#03a5fc"
              },
              children: "decentralized"
            }), " identities.", " "]
          })]
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
          color: "blue.200",
          fontSize: {
            base: 28,
            md: 40
          },
          mb: 3,
          children: "Limiter"
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
          children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Can", " ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: "set the maximum mintable allowance"
          }), " for a token."]
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
          color: "red.500",
          fontSize: {
            base: 28,
            md: 40
          },
          mb: 3,
          children: "Burner"
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
          children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " Can", " ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: " destroy an instance"
          }), " of a token."]
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
        maxW: "600px",
        src: "/Landing/group.svg",
        position: "absolute",
        left: "0",
        top: "-400px",
        alt: "group_image"
      }), /* @__PURE__ */ jsxs(Box, {
        id: "questers",
        mt: "200px",
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
          color: "cyan",
          fontSize: {
            base: 20,
            md: 50
          },
          mb: 12,
          children: "Great for Team Building!"
        }), /* @__PURE__ */ jsxs(Text, {
          color: "gray.100",
          mb: 6,
          fontSize: {
            base: "lg",
            md: "3xl"
          },
          children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " issue tokens for a job well done!"]
        }), /* @__PURE__ */ jsxs(Text, {
          color: "gray.100",
          mb: 6,
          fontSize: {
            base: "lg",
            md: "3xl"
          },
          children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " issue tokens for special events!"]
        }), /* @__PURE__ */ jsxs(Text, {
          color: "gray.100",
          mb: 6,
          fontSize: {
            base: "lg",
            md: "3xl"
          },
          children: [/* @__PURE__ */ jsx(CheckCircleIcon, {}), " issue tokens for invite-only parties."]
        })]
      })]
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
        const responses = await Promise.allSettled([(async () => {
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
          setToken(idx, {
            metadata: lib.parse(data)
          });
        })(), (async () => {
          const supply = await roContract.totalSupply(id);
          setToken(idx, {
            total: supply.toBigInt()
          });
        })(), (async () => {
          const max = await roContract.getMax(id);
          console.info({
            max
          });
          setToken(idx, {
            max: max.toBigInt()
          });
        })()]);
        const [{
          reason: error
        } = {
          reason: null
        }] = responses.filter((res) => res.status === "rejected");
        if (error)
          throw new Error(error);
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
    bg: "black",
    children: [/* @__PURE__ */ jsxs(HelmetExport, {
      children: [/* @__PURE__ */ jsx("title", {
        children: "SmartLaw Claims"
      }), /* @__PURE__ */ jsx("meta", {
        name: "description",
        content: "SmartLaw Claims Digital Assets"
      })]
    }), /* @__PURE__ */ jsxs(chakra.header, {
      bg: "black",
      children: [/* @__PURE__ */ jsx(MenuLandingDesktop, {}), /* @__PURE__ */ jsx(MenuHeader, {}), /* @__PURE__ */ jsx(Who, {}), /* @__PURE__ */ jsx(How, {}), /* @__PURE__ */ jsx(Creators, {}), /* @__PURE__ */ jsx(BuiltWith, {}), /* @__PURE__ */ jsx(Container, {
        children: /* @__PURE__ */ jsx(Team, {})
      })]
    }), /* @__PURE__ */ jsxs(chakra.main, {
      bg: "black",
      children: [/* @__PURE__ */ jsx(Header, {
        ml: "100px",
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
                  high: max + 100
                }]);
              } else {
                setLimit((lim) => lim + 100);
              }
            },
            children: [/* @__PURE__ */ jsx(Text, {
              as: "span",
              mr: 1,
              mt: -0.5,
              fontSize: "150%",
              fontWeight: "bold",
              children: "+"
            }), "100"]
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
//# sourceMappingURL=home.7ebe93b0.js.map
