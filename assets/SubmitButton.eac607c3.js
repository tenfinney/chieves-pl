import { s as switchTo, o as capitalize } from "./index.8e4f925d.js";
import { x as useWeb3, r as react, a2 as NETWORKS, ax as useConfig, j as jsxs, O as Fragment, b as jsx, B as Button, F as Flex, a7 as Spinner, T as Text, L as Link } from "./index.9c6fd68e.js";
const SubmitButton = ({
  purpose = "create",
  processing = false,
  onClick,
  requireStorage,
  label = `${capitalize(purpose)} NFT`,
  ...props
}) => {
  const {
    chain,
    userProvider,
    connect,
    rwContract
  } = useWeb3();
  const offChain = react.exports.useMemo(() => chain !== NETWORKS.contract.chainId, [chain]);
  const [working, setWorking] = react.exports.useState(processing);
  const desiredNetwork = offChain ? NETWORKS.contract.name : null;
  const {
    Settings,
    storage
  } = useConfig({
    requireStorage
  });
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [rwContract && requireStorage && !storage && /* @__PURE__ */ jsx(Settings, {
      highlight: ["nftStorageAPIToken"]
    }), /* @__PURE__ */ jsx(Button, {
      type: "submit",
      variant: "solid",
      colorScheme: !rwContract || offChain ? "blue" : "green",
      isDisabled: offChain && !!rwContract || processing || working,
      w: "full",
      onClick: async (evt) => {
        try {
          setWorking(true);
          if (!userProvider) {
            evt.preventDefault();
            connect();
          } else if (offChain) {
            evt.preventDefault();
            switchTo(NETWORKS.contract.chainId);
          } else {
            onClick?.apply(null, [evt]);
          }
        } finally {
          setWorking(false);
        }
      },
      ...props,
      children: (() => {
        if (processing || working) {
          return /* @__PURE__ */ jsxs(Flex, {
            children: [/* @__PURE__ */ jsx(Spinner, {}), /* @__PURE__ */ jsxs(Text, {
              ml: 2,
              children: [capitalize(purpose).replace(/e$/, ""), "ing\u2026"]
            })]
          });
        } else if (!userProvider) {
          return `Connect To ${capitalize(purpose)}`;
        } else if (offChain) {
          return `Connect To The ${desiredNetwork} Network To ${capitalize(purpose)}`;
        } else if (!rwContract) {
          return "Contract Not Connected";
        } else if (requireStorage && !storage) {
          return /* @__PURE__ */ jsxs(Fragment, {
            children: ["Missing", /* @__PURE__ */ jsx(Link, {
              mx: 1,
              target: "_blank",
              href: "//nft.storage",
              children: "NFT.Storage"
            }), "Token"]
          });
        } else {
          return label;
        }
      })()
    })]
  });
};
export {
  SubmitButton as S
};
//# sourceMappingURL=SubmitButton.eac607c3.js.map
