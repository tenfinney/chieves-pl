import { aL as useParams, r as react, i as useWeb3, j as jsxs, b as jsx, H as HelmetExport } from "./index.a3ddac7b.js";
import { J as deregexify, B as Box, r as regexify, h as httpURL } from "./index.6aef949d.js";
import { O as OptionsForm } from "./MaxForm.bbe9a695.js";
import { H as HomeLink } from "./HomeLink.675bb16b.js";
import { A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./chakra-ui-alert.esm.adecbc5d.js";
import "./index.esm.f0d0ee6c.js";
import "./chakra-ui-form-control.esm.7aea2c04.js";
import "./chakra-ui-textarea.esm.a7f50e0c.js";
import "./chakra-ui-button.esm.e3fec911.js";
import "./SubmitButton.b5a500bd.js";
import "./chakra-ui-toast.esm.c9f97d79.js";
const Edit = () => {
  const {
    nftId
  } = useParams();
  const tokenId = react.exports.useMemo(() => deregexify(nftId), [nftId]);
  const [metadata, setMetadata] = react.exports.useState();
  const [error, setError] = react.exports.useState();
  const {
    roContract
  } = useWeb3();
  react.exports.useEffect(() => {
    const getMetadata = async () => {
      if (roContract && tokenId) {
        try {
          const meta = await roContract.uri(tokenId);
          if (!meta) {
            setMetadata(null);
          } else {
            const response = await fetch(httpURL(meta));
            setMetadata(await response.json());
          }
        } catch (err) {
          setError(err.message);
        }
      }
    };
    getMetadata();
  }, [roContract, tokenId]);
  return /* @__PURE__ */ jsxs(Box, {
    ml: 16,
    children: [/* @__PURE__ */ jsx(HelmetExport, {
      children: /* @__PURE__ */ jsxs("title", {
        children: ["Claim Token: Edit #", tokenId && regexify(tokenId)]
      })
    }), /* @__PURE__ */ jsx(HomeLink, {}), error && /* @__PURE__ */ jsxs(Alert, {
      status: "error",
      children: [/* @__PURE__ */ jsx(AlertIcon, {}), /* @__PURE__ */ jsx(AlertTitle, {
        children: "`setMetadata` Error"
      }), /* @__PURE__ */ jsx(AlertDescription, {
        children: error
      })]
    }), /* @__PURE__ */ jsx(OptionsForm, {
      purpose: "update",
      tokenId,
      metadata
    })]
  });
};
export {
  Edit,
  Edit as default
};
//# sourceMappingURL=edit.645822c5.js.map
