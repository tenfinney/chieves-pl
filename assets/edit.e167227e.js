import { aM as useParams, r as react, g as useWeb3, j as jsxs, Y as Box, a as jsx, H as HelmetExport, X as Spinner } from "./index.8c16fa1d.js";
import { o as deregexify, r as regexify, h as httpURL, l as lib, e as extractMessage } from "./LinkedSVG.e13e285a.js";
import { O as OptionsForm } from "./MaxForm.1a172c5b.js";
import { H as HomeLink } from "./HomeLink.a8424a94.js";
import { A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./chakra-ui-alert.esm.c08ffda8.js";
import "./index.esm.d7710eed.js";
import "./chakra-ui-textarea.esm.a712e298.js";
import "./SubmitButton.dad9ea9c.js";
import "./chakra-ui-toast.esm.3cf7b003.js";
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
    children: [/* @__PURE__ */ jsx(HelmetExport, {
      children: /* @__PURE__ */ jsxs("title", {
        children: ["\u2019\u{1D588}\u{1D58D}\u{1D58E}\u{1D58A}\u{1D59B}\u{1D58A}: \u2130\u{1D4B9}\u{1D4BE}\u{1D4C9} #", tokenId && regexify(tokenId)]
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
//# sourceMappingURL=edit.e167227e.js.map
