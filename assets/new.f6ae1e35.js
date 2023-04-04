import { j as jsxs, C as Container, b as jsx, A as HelmetExport, c as chakra, F as Flex, y as useWeb3, v as useSearchParams, r as react, ar as tokenPermissions, q as Box, s as Heading, T as Text, H as HStack, as as Center, m as Stack, a8 as Spinner, I as Input, at as rolePermissions } from "./index.6563bd6c.js";
import { H as Header, R as ReactPlayer } from "./index.cd44d29d.js";
import { a as useForm, I as Image$1 } from "./chakra-ui-icons.esm.0c12c08f.js";
import { O as OptionsForm } from "./MaxForm.1b1d223f.js";
import { e as extractMessage, c as Table, d as Thead, f as Tr, g as Th, a as Tooltip, i as Tbody, j as Td } from "./index.94919749.js";
import { H as HomeLink } from "./HomeLink.0e02af8e.js";
import { S as SubmitButton } from "./SubmitButton.4b08a4d9.js";
import { u as useToast } from "./chakra-ui-toast.esm.e53fcbc6.js";
import { C as Checkbox } from "./chakra-ui-checkbox.esm.3f053822.js";
import "./chakra-ui-textarea.esm.03983de6.js";
const New = () => /* @__PURE__ */ jsxs(Container, {
  maxW: "full",
  bg: "gray.700",
  children: [/* @__PURE__ */ jsx(HelmetExport, {
    children: /* @__PURE__ */ jsx("title", {
      children: "New Claim Asset or Token"
    })
  }), /* @__PURE__ */ jsx(chakra.header, {
    children: /* @__PURE__ */ jsxs(Flex, {
      justify: "center",
      children: [/* @__PURE__ */ jsx(Header, {
        my: "7vh",
        maxW: "xl"
      }), /* @__PURE__ */ jsx(HomeLink, {}), /* @__PURE__ */ jsx(Header, {})]
    })
  }), /* @__PURE__ */ jsx(chakra.main, {
    children: /* @__PURE__ */ jsx(Content, {})
  })]
});
const Content = () => {
  const {
    ensProvider,
    roContract,
    rwContract,
    rolesLibrary,
    connecting,
    connect,
    chain,
    address
  } = useWeb3();
  const [search, setSearch] = useSearchParams({
    tokenId: ""
  });
  const id = search.get("tokenId");
  const [tokenId, setTokenId] = react.exports.useState(Array.isArray(id) ? id[0] : id);
  const [roles, setRoles] = react.exports.useState(tokenPermissions);
  const [working, setWorking] = react.exports.useState(false);
  const {
    register,
    handleSubmit
  } = useForm();
  const toast = useToast();
  react.exports.useEffect(() => {
    if (typeof id === "string") {
      setTokenId(id);
    }
  }, [id]);
  react.exports.useEffect(() => {
  }, [roContract]);
  const reserve = react.exports.useCallback(async (data) => {
    setWorking(true);
    try {
      if (!rwContract) {
        throw new Error("Connect your Web3 account to reserve a token ID.");
      }
      if (!rolesLibrary) {
        throw new Error("Library not loaded.");
      }
      const grants = [];
      const disables = [];
      await Promise.all(Object.entries(data).map(async ([key, value]) => {
        if (typeof value === "boolean" && value) {
          const [, type, role] = key.match(/^(grant|disable)\((.+)\)$/) ?? [];
          const roleId = await rolesLibrary.roleIndexForName(role);
          switch (type) {
            case "grant": {
              grants.push(roleId);
              break;
            }
            case "disable": {
              disables.push(roleId);
              break;
            }
            default: {
              throw new Error(`Unknown operation: ${type}`);
            }
          }
        }
      }));
      let {
        maintainer
      } = data;
      if (maintainer === "") {
        maintainer = address;
      }
      if (maintainer == null) {
        throw new Error("`maintainer` is not set.");
      }
      if (maintainer.includes(".")) {
        if (!ensProvider) {
          throw new Error("ENS provider not defined.");
        }
        maintainer = await ensProvider.resolveName(maintainer) ?? void 0;
      }
      const tx = await rwContract["create(address,uint8[],uint8[])"](maintainer, grants, disables);
      const receipt = await tx.wait();
      const event = receipt.events.find((evt) => evt.event === "Created");
      if (!event) {
        throw new Error("Could not find a creation event.");
      }
      const [id2] = event.args;
      setTokenId(id2.toHexString());
    } catch (error) {
      toast({
        title: "Creation Error",
        description: extractMessage(error),
        status: "error",
        isClosable: true,
        duration: 1e4
      });
      console.error(error.stack);
    } finally {
      setWorking(false);
    }
  }, [address, ensProvider, rolesLibrary, rwContract, toast]);
  if (!rwContract || !tokenId || working) {
    return /* @__PURE__ */ jsxs(Box, {
      ml: "50px",
      bg: "gray.700",
      children: [/* @__PURE__ */ jsx(Heading, {
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
          }), "Artifacts ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#03a5fc"
            },
            children: " & "
          }), "Digital Assets"]
        })
      }), /* @__PURE__ */ jsxs(Container, {
        mt: "20px",
        mb: "100px",
        bg: "gray.700",
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
            children: "Select your reward.:"
          })
        }), /* @__PURE__ */ jsxs(HStack, {
          w: "full",
          h: "full",
          align: "center",
          justify: "center",
          id: "who",
          children: [/* @__PURE__ */ jsx(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center"
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx(Heading, {
              color: "white",
              fontSize: {
                base: 20,
                md: 28
              },
              mb: 6,
              children: "____1____"
            }), /* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmPRA815r4wnGNVS9oBsiJPq6HzTdWiMjfaNz2QV93q35b",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Image$1, {
                src: "https://freeweb3.infura-ipfs.io/ipfs/QmbqP4AwkJbdei7Ms9ssKnZYTRvbspytc3vMcvW8NsjdQG",
                alt: "circles",
                width: "200px",
                mb: {
                  base: 0,
                  md: 8
                }
              })
            })]
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx(Heading, {
              color: "white",
              fontSize: {
                base: 20,
                md: 28
              },
              mb: 6,
              children: "____2____"
            }), /* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmSorLgMwRDoyTFrrcR1MiSSN3xjc73xVb5Zy54BByWFBH",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Image$1, {
                src: "https://freeweb3.infura-ipfs.io/ipfs/QmSRi4x8YXZHqdeazrm8M3bnarZWQCh5bUKSXJWVmhkvhe",
                alt: "circles",
                width: "200px",
                mb: {
                  base: 0,
                  md: 8
                }
              })
            })]
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx(Heading, {
              color: "white",
              fontSize: {
                base: 20,
                md: 28
              },
              mb: 6,
              children: "____3____"
            }), /* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmcHDgNH3SVqtNxUJjmLAw9Ar6ThbTBQr33Qiq4c37Fq8b",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Image$1, {
                src: "https://freeweb3.infura-ipfs.io/ipfs/QmQ9z2sBTFfDTujRcucFE7VpEZNb8WCzw2WdbwSD2ZX4ss",
                alt: "circles",
                width: "200px",
                mb: {
                  base: 0,
                  md: 8
                }
              })
            })]
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx(Heading, {
              color: "white",
              fontSize: {
                base: 20,
                md: 28
              },
              mb: 6,
              children: "____4____"
            }), /* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmUPoxFersgfWRMqL8pvF7okMsRZnStkgo86iN3YGJXSFv",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Image$1, {
                src: "https://freeweb3.infura-ipfs.io/ipfs/QmcuKmRNozzq9JP2xHTAVHsvtyGZBASjckZWVqKij24dYV",
                alt: "circles",
                width: "200px",
                mb: {
                  base: 0,
                  md: 8
                }
              })
            })]
          })]
        }), /* @__PURE__ */ jsxs(HStack, {
          w: "full",
          h: "full",
          align: "center",
          justify: "center",
          id: "who",
          children: [/* @__PURE__ */ jsx(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center"
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx(Heading, {
              color: "white",
              fontSize: {
                base: 20,
                md: 28
              },
              mb: 6,
              children: "____5____"
            }), /* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmU7nG48PN5WUEjh8CMSiWq9xxi9tZq46D6dy8jkspN45s",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Image$1, {
                src: "https://freeweb3.infura-ipfs.io/ipfs/QmXZgzob57HNJE9GUJt7yP1TigvX6hFKnp1FCQRUL5RbdP",
                alt: "circles",
                width: "200px",
                mb: {
                  base: 0,
                  md: 8
                }
              })
            })]
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx(Heading, {
              color: "white",
              fontSize: {
                base: 20,
                md: 28
              },
              mb: 6,
              children: "____6____"
            }), /* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmbNxfvQZCTjfvMgPDntBELgVyWLs8vFtgAnARQA5Hw88H",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Image$1, {
                src: "https://freeweb3.infura-ipfs.io/ipfs/QmeAqi7EnereFwNAVjdgW1G2yoasSNZ63gFugyoRkoERtP",
                alt: "circles",
                width: "200px",
                mb: {
                  base: 0,
                  md: 8
                }
              })
            })]
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx(Heading, {
              color: "white",
              fontSize: {
                base: 20,
                md: 28
              },
              mb: 6,
              children: "____7____"
            }), /* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmWW9WGrYhq3UAszoqKDz7nJFoEfdjH94c9sS68bZzXbj7",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Image$1, {
                src: "https://freeweb3.infura-ipfs.io/ipfs/QmaweXixs8kupGMEv4U6HC2FkvVwViQWXTK4VftNaf4ZFN",
                alt: "circles",
                width: "200px",
                mb: {
                  base: 0,
                  md: 8
                }
              })
            })]
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx(Heading, {
              color: "white",
              fontSize: {
                base: 20,
                md: 28
              },
              mb: 6,
              children: "____8____"
            }), /* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmTmXs54SYFYH82TS3wJqiVo9XzK1T7dkBWyN2TNKb9v7u",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Image$1, {
                src: "https://freeweb3.infura-ipfs.io/ipfs/QmaNjHv5HZLiZYZkPWvFcJbGDvhq2hk58Xs2NRdBm8rzZN",
                alt: "circles",
                width: "200px",
                mb: {
                  base: 0,
                  md: 8
                }
              })
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(Container, {
        mt: "20px",
        mb: "100px",
        bg: "gray.700",
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
            children: "Select your workgroup."
          })
        }), /* @__PURE__ */ jsxs(HStack, {
          w: "full",
          h: "full",
          align: "center",
          justify: "center",
          id: "who",
          children: [/* @__PURE__ */ jsx(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            mt: 50,
            p: 6,
            textAlign: "center"
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            mt: 50,
            p: 6,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmV6LTBM4zMAwqNVNqigPX8D9h4h7EGH4NGTFm2P6fCE16",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Heading, {
                color: "white",
                fontSize: {
                  base: 20,
                  md: 28
                },
                mb: 6,
                children: "____1____"
              })
            }), /* @__PURE__ */ jsx(ReactPlayer, {
              url: "https://freeweb3.infura-ipfs.io/ipfs/QmV7eu99fQaEzD8yJsyWdNK82pQyo8re4TetsJD7YgiVru",
              width: "100%",
              height: "100%",
              controls: true
            })]
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmV6LTBM4zMAwqNVNqigPX8D9h4h7EGH4NGTFm2P6fCE16",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Heading, {
                color: "white",
                fontSize: {
                  base: 20,
                  md: 28
                },
                mb: 6,
                children: "____2____"
              })
            }), /* @__PURE__ */ jsx(ReactPlayer, {
              url: "https://freeweb3.infura-ipfs.io/ipfs/QmdjJ9xDiEMwwW6YZqeDGmvF3ZkdwFecenCT4F4PbGtJhE",
              width: "100%",
              height: "100%",
              controls: true
            })]
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmV6LTBM4zMAwqNVNqigPX8D9h4h7EGH4NGTFm2P6fCE16",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Heading, {
                color: "white",
                fontSize: {
                  base: 20,
                  md: 28
                },
                mb: 6,
                children: "____3____"
              })
            }), /* @__PURE__ */ jsx(ReactPlayer, {
              url: "https://freeweb3.infura-ipfs.io/ipfs/QmWJfUdHJuMasDijbJ3nhWmoifo1wTfGfDHEW9RTv7nvyi",
              width: "100%",
              height: "100%",
              controls: true
            })]
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmV6LTBM4zMAwqNVNqigPX8D9h4h7EGH4NGTFm2P6fCE16",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Heading, {
                color: "white",
                fontSize: {
                  base: 20,
                  md: 28
                },
                mb: 6,
                children: "____4____"
              })
            }), /* @__PURE__ */ jsx(ReactPlayer, {
              url: "https://freeweb3.infura-ipfs.io/ipfs/QmVUFJoQ2DSyvDHi4ezUFmASUJFgbnCVVuMW1twPsuZY6n",
              width: "100%",
              height: "100%",
              controls: true
            })]
          })]
        }), /* @__PURE__ */ jsxs(HStack, {
          w: "full",
          h: "full",
          align: "center",
          justify: "center",
          id: "who",
          children: [/* @__PURE__ */ jsx(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center"
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmV6LTBM4zMAwqNVNqigPX8D9h4h7EGH4NGTFm2P6fCE16",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Heading, {
                color: "white",
                fontSize: {
                  base: 20,
                  md: 28
                },
                mb: 6,
                children: "____5____"
              })
            }), /* @__PURE__ */ jsx(ReactPlayer, {
              url: "https://freeweb3.infura-ipfs.io/ipfs/QmV6LTBM4zMAwqNVNqigPX8D9h4h7EGH4NGTFm2P6fCE16",
              width: "100%",
              height: "100%",
              controls: true
            })]
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmV6LTBM4zMAwqNVNqigPX8D9h4h7EGH4NGTFm2P6fCE16",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Heading, {
                color: "white",
                fontSize: {
                  base: 20,
                  md: 28
                },
                mb: 6,
                children: "____6____"
              })
            }), /* @__PURE__ */ jsx(ReactPlayer, {
              url: "https://freeweb3.infura-ipfs.io/ipfs/QmarpnLXQLpWQDg5ZgaDq9NeeUPdnHErKeQ5sEk8pnmsSS",
              width: "100%",
              height: "100%",
              controls: true
            })]
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmV6LTBM4zMAwqNVNqigPX8D9h4h7EGH4NGTFm2P6fCE16",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Heading, {
                color: "white",
                fontSize: {
                  base: 20,
                  md: 28
                },
                mb: 6,
                children: "____7____"
              })
            }), /* @__PURE__ */ jsx(ReactPlayer, {
              url: "https://freeweb3.infura-ipfs.io/ipfs/QmP7ASYTBucqPEzmNSPz97zp7F1BvFayXHQ256peWptQRT",
              width: "100%",
              height: "100%",
              controls: true
            })]
          }), /* @__PURE__ */ jsxs(Box, {
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgImage: "url(/Landing/RectangleBG1.svg)",
            bgPosition: {
              base: "center",
              md: "center"
            },
            bgSize: {
              base: "cover",
              md: "contain"
            },
            backgroundRepeat: "no-repeat",
            maxW: "267px",
            p: 6,
            mt: 50,
            textAlign: "center",
            children: [/* @__PURE__ */ jsx("a", {
              href: "https://freeweb3.infura-ipfs.io/ipfs/QmV6LTBM4zMAwqNVNqigPX8D9h4h7EGH4NGTFm2P6fCE16",
              rel: "noopener noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Heading, {
                color: "white",
                fontSize: {
                  base: 20,
                  md: 28
                },
                mb: 6,
                children: "____8____"
              })
            }), /* @__PURE__ */ jsx(ReactPlayer, {
              url: "https://freeweb3.infura-ipfs.io/ipfs/QmUjUBukcuvPQdWZb7gndgTe6qcaBzj4jTj9xSLEoZW7dp",
              width: "100%",
              height: "100%",
              controls: true
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx(Text, {
        fontSize: "24pt",
        ml: "40px",
        mt: "1rem",
        fontWeight: "bold",
        children: "ERC-1155 Access and Achievement Token Minting"
      }), /* @__PURE__ */ jsx(Text, {
        ml: "40px",
        fontSize: "18pt",
        fontWeight: "bold",
        children: "Digital Tokens on the Polygon EVM Blockchain using IPFS"
      }), /* @__PURE__ */ jsx(Text, {
        ml: "50px",
        fontSize: "12pt",
        fontWeight: "regular",
        children: "Each token reservation mints one master token and up to eight role tokens. Superuser, Minter, Caster, Transferer, Configurer,Limiter, Burner, or Destroyer. Each token can be automatically minted with the master token and can be assigned to third-parties for administration."
      }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("hr", {}), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsxs(Center, {
        children: [/* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsxs(Stack, {
          children: [/* @__PURE__ */ jsx(Heading, {
            textAlign: "center",
            children: "Create a New Token Type"
          }), (() => {
            if (connecting) {
              return /* @__PURE__ */ jsxs(Flex, {
                justify: "center",
                children: [/* @__PURE__ */ jsx(Spinner, {
                  thickness: "4px"
                }), /* @__PURE__ */ jsx(Text, {
                  ml: 2,
                  children: "Connecting\u2026"
                })]
              });
            }
            if (working) {
              return /* @__PURE__ */ jsxs(Flex, {
                justify: "center",
                mt: 7,
                children: [/* @__PURE__ */ jsx(Spinner, {}), /* @__PURE__ */ jsx(Text, {
                  ml: 2,
                  children: "Reserving your digital asset or token\u2026"
                })]
              });
            }
            if (!tokenId) {
              return /* @__PURE__ */ jsxs(Stack, {
                as: "form",
                onSubmit: handleSubmit(reserve),
                children: [/* @__PURE__ */ jsxs(Flex, {
                  align: "center",
                  children: [/* @__PURE__ */ jsx(chakra.label, {
                    mr: 3,
                    children: "Admin:"
                  }), /* @__PURE__ */ jsx(Input, {
                    ...register("maintainer"),
                    placeholder: "Maintainer Address (default Creator)"
                  })]
                }), /* @__PURE__ */ jsxs(Table, {
                  mb: 5,
                  children: [/* @__PURE__ */ jsx(Thead, {
                    children: /* @__PURE__ */ jsxs(Tr, {
                      children: [/* @__PURE__ */ jsx(Th, {
                        children: "Role"
                      }), /* @__PURE__ */ jsx(Th, {
                        children: /* @__PURE__ */ jsx(Tooltip, {
                          label: "Give the administrator these roles:",
                          children: "Grant"
                        })
                      }), /* @__PURE__ */ jsx(Th, {
                        children: /* @__PURE__ */ jsx(Tooltip, {
                          label: "Prevent these permissions from being checked:",
                          children: "Disable"
                        })
                      }), /* @__PURE__ */ jsx(Th, {
                        children: "Description"
                      })]
                    })
                  }), /* @__PURE__ */ jsx(Tbody, {
                    children: roles.map((role, idx) => /* @__PURE__ */ jsxs(Tr, {
                      children: [/* @__PURE__ */ jsx(Td, {
                        children: role
                      }), /* @__PURE__ */ jsx(Td, {
                        textAlign: "center",
                        children: /* @__PURE__ */ jsx(Checkbox, {
                          ...register(`grant(${role})`)
                        })
                      }), /* @__PURE__ */ jsx(Td, {
                        textAlign: "center",
                        children: /* @__PURE__ */ jsx(Checkbox, {
                          ...register(`disable(${role})`)
                        })
                      }), /* @__PURE__ */ jsx(Td, {
                        children: rolePermissions[role]
                      })]
                    }, idx))
                  })]
                }), /* @__PURE__ */ jsx(SubmitButton, {
                  purpose: "create",
                  label: "Reserve an ID",
                  requireStorage: false
                })]
              });
            }
            return /* @__PURE__ */ jsx(Text, {
              children: "We are glad you showed up!"
            });
          })()]
        })]
      })]
    });
  }
  return /* @__PURE__ */ jsx(OptionsForm, {
    tokenId
  });
};
export {
  New,
  New as default
};
//# sourceMappingURL=new.f6ae1e35.js.map
