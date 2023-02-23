import { aZ as useParams, r as react, x as useWeb3, j as jsxs, q as Box, b as jsx, z as HelmetExport, a7 as Spinner } from "./index.3ef1500f.js";
import { p as deregexify, r as regexify, h as httpURL, l as lib, e as extractMessage } from "./index.dd5f0e90.js";
import { O as OptionsForm } from "./MaxForm.1f4985d1.js";
import { H as HomeLink, A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./HomeLink.ce0dff3b.js";
import "./chakra-ui-icons.esm.7d29464d.js";
import "./chakra-ui-textarea.esm.15c20ee4.js";
import "./SubmitButton.2204330f.js";
import "./chakra-ui-toast.esm.3ed08256.js";
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
//# sourceMappingURL=edit.ffbed833.js.map
