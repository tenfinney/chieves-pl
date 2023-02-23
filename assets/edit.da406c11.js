import { aZ as useParams, r as react, x as useWeb3, j as jsxs, q as Box, b as jsx, z as HelmetExport, a7 as Spinner } from "./index.9c6fd68e.js";
import { p as deregexify, r as regexify, h as httpURL, l as lib, e as extractMessage } from "./index.8e4f925d.js";
import { O as OptionsForm } from "./MaxForm.ed283ce9.js";
import { H as HomeLink, A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./HomeLink.c66c892b.js";
import "./chakra-ui-icons.esm.af337d62.js";
import "./chakra-ui-textarea.esm.28883a15.js";
import "./SubmitButton.eac607c3.js";
import "./chakra-ui-toast.esm.c25ee409.js";
const Edit = () => {
  const {
    nftId
  } = useParams();
  const tokenId = react.exports.useMemo(() => deregexify(nftId), [nftId]);
  const [metadata, setMetadata] = react.exports.useState();
  const [metaURI, setMetaURI] = react.exports.useState();
  const [error, setError] = react.exports.useState();
  const {
    roContract
  } = useWeb3();
  react.exports.useEffect(() => {
    const getMetadata = async () => {
      if (roContract && tokenId) {
        try {
          const metaURI2 = await roContract.uri(tokenId);
          const url = httpURL(metaURI2);
          if (!metaURI2 || metaURI2 === "") {
            throw new Error("No metadata URI.");
          } else {
            const response = await fetch(url);
            const body = await response.text();
            try {
              setMetadata(lib.parse(body));
              setMetaURI(metaURI2);
            } catch (error2) {
              console.error({
                url,
                tokenId,
                metaURI: metaURI2,
                error: error2,
                body
              });
              throw error2;
            }
          }
        } catch (err) {
          setMetadata(null);
          setError(extractMessage(err));
        }
      }
    };
    getMetadata();
  }, [roContract, tokenId]);
  return /* @__PURE__ */ jsxs(Box, {
    ml: 16,
    bg: "black",
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
    }), metadata === void 0 ? /* @__PURE__ */ jsxs(Box, {
      children: [/* @__PURE__ */ jsx(Spinner, {}), " Loading ", metaURI, "\u2026"]
    }) : /* @__PURE__ */ jsx(OptionsForm, {
      purpose: "update",
      tokenId,
      metadata,
      metaURI
    })]
  });
};
export {
  Edit,
  Edit as default
};
//# sourceMappingURL=edit.da406c11.js.map
