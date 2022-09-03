import { aL as useParams, r as react, i as useWeb3, j as jsxs, b as jsx, H as HelmetExport } from "./index.1ecc66bf.js";
import { J as deregexify, B as Box, r as regexify, h as httpURL } from "./index.8708a840.js";
import { O as OptionsForm } from "./MaxForm.d8924f19.js";
import { H as HomeLink } from "./HomeLink.ac0290cc.js";
import { A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./chakra-ui-alert.esm.2e8c6809.js";
import "./index.esm.de70aaee.js";
import "./chakra-ui-form-control.esm.6c89a3e4.js";
import "./chakra-ui-textarea.esm.1c303b19.js";
import "./chakra-ui-button.esm.0b033da9.js";
import "./SubmitButton.570afe2d.js";
import "./chakra-ui-toast.esm.f1afa774.js";
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
//# sourceMappingURL=edit.84651879.js.map
