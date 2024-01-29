import { g as chakra, r as react, p as useWeb3, d as jsxs, j as jsx, F as Flex, a4 as Spinner, T as Text, S as Stack, s as HelmetExport, l as Heading, aX as useParams } from "./index.d0605c9d.js";
import { R as ReactMarkdown, r as regexify, h as httpURL, p as deregexify, l as lib } from "./index.55a1ed27.js";
import { A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription, H as HomeLink } from "./HomeLink.746bdf5a.js";
const Markdown = chakra(ReactMarkdown);
const View = ({
  tokenId,
  header = true
}) => {
  const [metadata, setMetadata] = react.exports.useState();
  const [error, setError] = react.exports.useState();
  const {
    roContract
  } = useWeb3();
  react.exports.useEffect(() => {
    const getMetadata = async () => {
      if (roContract && tokenId) {
        try {
          let realId = BigInt(tokenId);
          if (realId < 2 ** 32) {
            realId = await roContract.tokenByIndex(realId);
          }
          const metadataURI = await roContract.uri(realId);
          const metadataURL = httpURL(metadataURI);
          if (!metadataURL) {
            throw new Error(`Could not find metadata for token #${regexify(tokenId)}.`);
          }
          const response = await fetch(metadataURL);
          const data = await response.text();
          setMetadata(lib.parse(data));
        } catch (err) {
          setError(err.message);
        }
      }
    };
    getMetadata();
  }, [roContract, tokenId]);
  if (error) {
    return /* @__PURE__ */ jsxs(Alert, {
      status: "error",
      children: [/* @__PURE__ */ jsx(AlertIcon, {}), /* @__PURE__ */ jsx(AlertTitle, {
        mr: 2,
        children: "Error: Loading Token"
      }), /* @__PURE__ */ jsx(AlertDescription, {
        children: error
      })]
    });
  }
  if (!metadata) {
    return /* @__PURE__ */ jsxs(Flex, {
      align: "center",
      justify: "center",
      h: "100vh",
      children: [/* @__PURE__ */ jsx(Spinner, {
        thickness: "4px",
        speed: "1s",
        mr: 2
      }), /* @__PURE__ */ jsxs(Text, {
        children: ["Loading Metadata For Token #", regexify(tokenId)]
      })]
    });
  }
  const {
    name,
    image,
    animation_url: animation,
    description,
    background_color: bg
  } = metadata;
  return /* @__PURE__ */ jsxs(Stack, {
    align: "center",
    position: "relative",
    bg: "gray.700",
    children: [header && /* @__PURE__ */ jsxs(HelmetExport, {
      children: [/* @__PURE__ */ jsxs("title", {
        children: ["Claim View #", regexify(tokenId)]
      }), /* @__PURE__ */ jsx("meta", {
        name: "description",
        content: "SmartLaw Claims"
      })]
    }), /* @__PURE__ */ jsx(HomeLink, {}), name && /* @__PURE__ */ jsx(Heading, {
      children: name
    }), image && /* @__PURE__ */ jsx(chakra.object, {
      data: httpURL(image) ?? void 0,
      title: name,
      pointerEvents: "none",
      maxW: "80vmin",
      maxH: "80vmin",
      bg: `#${bg}`,
      borderRadius: 15,
      p: 2
    }), description && /* @__PURE__ */ jsx(Markdown, {
      maxW: "30rem",
      sx: {
        a: {
          textDecoration: "underline"
        },
        p: {
          textIndent: "1em",
          my: 3,
          textAlign: "justify"
        }
      },
      linkTarget: "_blank",
      children: description
    }), animation && (() => {
      const url = httpURL(animation) ?? void 0;
      const props = {
        maxW: 96,
        maxH: 96
      };
      if (/(mpe?g|mp4)$/i.test(animation)) {
        return /* @__PURE__ */ jsx(chakra.video, {
          ...props,
          controls: true,
          autoPlay: true,
          loop: true,
          muted: true,
          children: /* @__PURE__ */ jsx(chakra.source, {
            src: url
          })
        });
      } else if (/(glb|gltf)$/i.test(animation)) {
        return /* @__PURE__ */ jsx(Text, {
          textAlign: "center",
          children: "3D Support Coming Soon"
        });
      } else {
        return /* @__PURE__ */ jsx(chakra.object, {
          data: url,
          title: name,
          pointerEvents: "none",
          bg: `#${bg}`,
          borderRadius: 15,
          p: 2,
          ...props
        });
      }
    })()]
  });
};
const ViewPage = () => {
  const {
    nftId
  } = useParams();
  const tokenId = deregexify(Array.isArray(nftId) ? nftId[0] : nftId);
  return /* @__PURE__ */ jsx(View, {
    tokenId
  });
};
export {
  View,
  ViewPage,
  ViewPage as default
};
//# sourceMappingURL=view.c1ff6e23.js.map
