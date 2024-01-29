import { d as jsxs, C as Container, j as jsx, s as HelmetExport, g as chakra, F as Flex, p as useWeb3, m as useSearchParams, r as react, an as tokenPermissions, k as Box, l as Heading, T as Text, ao as Center, S as Stack, a4 as Spinner, I as Input, ap as rolePermissions } from "./index.eb582024.js";
import { u as useForm } from "./index.esm.fa7042ff.js";
import { H as Header } from "./Header.a3809bc7.js";
import { O as OptionsForm } from "./MaxForm.38c3613b.js";
import { e as extractMessage, c as Table, d as Thead, f as Tr, g as Th, a as Tooltip, i as Tbody, j as Td } from "./styles.66348739.js";
import { H as HomeLink } from "./HomeLink.b9af989e.js";
import { S as SubmitButton } from "./SubmitButton.4ffcfa9e.js";
import { u as useToast } from "./chakra-ui-toast.esm.dc6b2f3b.js";
import { C as Checkbox } from "./chakra-ui-checkbox.esm.05e42f21.js";
import "./chakra-ui-textarea.esm.14553051.js";
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
      children: [/* @__PURE__ */ jsx(HomeLink, {}), /* @__PURE__ */ jsx(Header, {})]
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
      }), /* @__PURE__ */ jsx(Container, {
        mt: "20px",
        mb: "100px",
        bg: "gray.700"
      }), /* @__PURE__ */ jsx(Container, {
        mt: "20px",
        mb: "100px",
        bg: "gray.700"
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
//# sourceMappingURL=new.441d5039.js.map
