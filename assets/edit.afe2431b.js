import { aL as useParams, r as react, i as useWeb3, j as jsxs, b as jsx, H as HelmetExport } from "./index.373e0097.js";
import { J as deregexify, B as Box, r as regexify, h as httpURL } from "./index.f2a92095.js";
import { O as OptionsForm } from "./MaxForm.79369dd2.js";
import { H as HomeLink } from "./HomeLink.0d052ef1.js";
import { A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./chakra-ui-alert.esm.5df6d56a.js";
import "./index.esm.4b5fa57a.js";
import "./chakra-ui-form-control.esm.6485c24d.js";
import "./chakra-ui-textarea.esm.720ae1c0.js";
import "./chakra-ui-button.esm.1e608943.js";
import "./SubmitButton.02d3762c.js";
import "./chakra-ui-toast.esm.047f4f8c.js";
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
//# sourceMappingURL=edit.afe2431b.js.map
