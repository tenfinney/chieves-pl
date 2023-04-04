import { E as useWeb3, r as react, j as jsxs, C as Container, K as HelmetExport, b as jsx, m as Stack, a_ as useParams } from "./index.3d4843a5.js";
import { e as extractMessage, o as regexify, q as deregexify } from "./index.d4b8a677.js";
import { View } from "./view.d973b5af.js";
import { S as SubmitButton } from "./SubmitButton.93dc93fb.js";
import { u as useToast } from "./chakra-ui-toast.esm.f7f46d90.js";
import "./HomeLink.ec383cf5.js";
const SelfMint = ({
  tokenId
}) => {
  const {
    rwContract,
    address
  } = useWeb3();
  const [processing, setProcessing] = react.exports.useState(false);
  const toast = useToast();
  const mint = react.exports.useCallback(async () => {
    try {
      setProcessing(true);
      const tx = await rwContract["mint(address[],uint256,bytes)"]([address], BigInt(tokenId), []);
      await tx.wait();
    } catch (error) {
      console.error({
        error
      });
      toast({
        title: "Minting Error",
        description: extractMessage(error),
        status: "error",
        isClosable: true,
        duration: 1e4
      });
    } finally {
      setProcessing(false);
    }
  }, [address, rwContract, toast, tokenId]);
  return /* @__PURE__ */ jsxs(Container, {
    maxW: "40rem",
    my: 10,
    children: [/* @__PURE__ */ jsxs(HelmetExport, {
      children: [/* @__PURE__ */ jsxs("title", {
        children: ["Self-Mint Token or Digital Asset #", regexify(tokenId)]
      }), /* @__PURE__ */ jsx("meta", {
        name: "description",
        content: "Mint a Digital Asset or Token"
      })]
    }), /* @__PURE__ */ jsxs(Stack, {
      as: "form",
      onSubmit: mint,
      children: [/* @__PURE__ */ jsx(SubmitButton, {
        purpose: "mint",
        processing
      }), /* @__PURE__ */ jsx(View, {
        tokenId,
        header: false
      }), /* @__PURE__ */ jsx(SubmitButton, {
        purpose: "mint",
        processing
      })]
    })]
  });
};
const SelfMintPage = () => {
  const {
    nftId
  } = useParams();
  const tokenId = deregexify(Array.isArray(nftId) ? nftId[0] : nftId);
  return /* @__PURE__ */ jsx(SelfMint, {
    tokenId
  });
};
export {
  SelfMint,
  SelfMintPage,
  SelfMintPage as default
};
//# sourceMappingURL=self-mint.bb7da7ec.js.map
