import { aX as useParams, r as react, n as useWeb3, j as jsxs, a3 as Box, d as jsx, p as HelmetExport } from "./index.e95cddb5.js";
import { p as deregexify, r as regexify, h as httpURL, l as lib, e as extractMessage } from "./index.35f9ddb4.js";
import { O as OptionsForm } from "./MaxForm.a9134122.js";
import { H as HomeLink } from "./HomeLink.d79347af.js";
import { A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./chakra-ui-alert.esm.58ab8e19.js";
import "./index.esm.7a48d061.js";
import "./chakra-ui-textarea.esm.c8b59b74.js";
import "./SubmitButton.885fc157.js";
import "./chakra-ui-toast.esm.57e354fe.js";
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
//# sourceMappingURL=edit.694e042d.js.map
