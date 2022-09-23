import { aZ as useParams, r as react, p as useWeb3, j as jsxs, i as Box, b as jsx, s as HelmetExport } from "./index.890e8d56.js";
import { p as deregexify, r as regexify, h as httpURL, l as lib, e as extractMessage } from "./index.cb31ef29.js";
import { O as OptionsForm } from "./MaxForm.c3a3b5e1.js";
import { H as HomeLink, A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./HomeLink.4bb108bb.js";
import "./chakra-ui-icons.esm.c9c7f6f0.js";
import "./chakra-ui-textarea.esm.ed402b5a.js";
import "./SubmitButton.052c3430.js";
import "./chakra-ui-toast.esm.460df4ba.js";
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
            setMetadata(null);
          } else {
            const response = await fetch(url);
            const body = await response.text();
            try {
              setMetaURI(metaURI2);
              setMetadata(lib.parse(body));
            } catch (error2) {
              console.error({
                url,
                tokenId,
                metaURI: metaURI2,
                error: error2,
                body
              });
            }
          }
        } catch (err) {
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
    }), /* @__PURE__ */ jsx(OptionsForm, {
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
//# sourceMappingURL=edit.23b0a170.js.map
