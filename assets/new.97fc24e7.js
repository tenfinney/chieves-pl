import { j as jsxs, C as Container, b as jsx, z as HelmetExport, c as chakra, F as Flex, x as useWeb3, t as useSearchParams, r as react, aq as tokenPermissions, q as Box, T as Text, ar as Center, m as Stack, s as Heading, a7 as Spinner, I as Input, as as rolePermissions } from "./index.ad63a391.js";
import { a as useForm } from "./chakra-ui-icons.esm.f06a6d3f.js";
import { H as Header } from "./Header.ec7b278b.js";
import { O as OptionsForm } from "./MaxForm.3ecdd316.js";
import { e as extractMessage, c as Table, d as Thead, f as Tr, g as Th, a as Tooltip, i as Tbody, j as Td } from "./index.313d6108.js";
import { H as HomeLink } from "./HomeLink.b0556436.js";
import { S as SubmitButton } from "./SubmitButton.704bc556.js";
import { u as useToast } from "./chakra-ui-toast.esm.61009ef6.js";
import { C as Checkbox } from "./chakra-ui-checkbox.esm.6b996439.js";
import "./chakra-ui-textarea.esm.584aeaa9.js";
const New = () => /* @__PURE__ */ jsxs(Container, {
  maxW: "full",
  bg: "gray.700",
  children: [/* @__PURE__ */ jsx(HelmetExport, {
    children: /* @__PURE__ */ jsx("title", {
      children: "New Claim Asset or Token"
    })
  }), /* @__PURE__ */ jsxs(chakra.header, {
    children: [/* @__PURE__ */ jsx(HomeLink, {}), /* @__PURE__ */ jsx(Flex, {
      justify: "center",
      children: /* @__PURE__ */ jsx(Header, {})
    })]
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
      if (maintainer?.includes(".")) {
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
      children: [/* @__PURE__ */ jsx(Text, {
        fontSize: "24pt",
        ml: "40px",
        mt: "1rem",
        fontWeight: "bold",
        children: "ERC-1155 Access and Achievment Token Minting"
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
//# sourceMappingURL=new.97fc24e7.js.map
