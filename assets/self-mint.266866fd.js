import { i as useWeb3, r as react, a as jsxs, C as Container, l as HelmetExport, j as jsx, S as Stack, aZ as useParams } from "./index.a6d5e508.js";
import { e as extractMessage, r as regexify, p as deregexify } from "./index.d1ed9c77.js";
import { View } from "./view.f8c77743.js";
import { S as SubmitButton } from "./SubmitButton.9339986a.js";
import { u as useToast } from "./chakra-ui-toast.esm.dca5a00b.js";
import "./HomeLink.106bb4f9.js";
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
//# sourceMappingURL=self-mint.266866fd.js.map
