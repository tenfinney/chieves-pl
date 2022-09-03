import { aL as useParams, r as react, i as useWeb3, j as jsxs, b as jsx, H as HelmetExport } from "./index.2ada5cbf.js";
import { J as deregexify, B as Box, r as regexify, h as httpURL } from "./index.30f75012.js";
import { O as OptionsForm } from "./MaxForm.5f595daa.js";
import { H as HomeLink } from "./HomeLink.09f8d283.js";
import { A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./chakra-ui-alert.esm.c27bc3d4.js";
import "./index.esm.64efabe1.js";
import "./chakra-ui-form-control.esm.30a9f0b8.js";
import "./chakra-ui-textarea.esm.14c10ea5.js";
import "./chakra-ui-button.esm.fe9f0625.js";
import "./SubmitButton.cd93816c.js";
import "./chakra-ui-toast.esm.593c0f6b.js";
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
//# sourceMappingURL=edit.14fad3a4.js.map
