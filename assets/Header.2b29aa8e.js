import { j as jsxs, F as Flex, b as jsx } from "./index.5f145343.js";
import { a as Tooltip, b as LinkedSVG } from "./index.ae0e666f.js";
const Header = ({
  links = {
    cup: "/new",
    sign: "/"
  },
  ...props
}) => /* @__PURE__ */ jsxs(Flex, {
  grow: 1,
  ...props,
  children: [/* @__PURE__ */ jsx(Tooltip, {
    hasArrow: true,
    label: "Create A New Token Type",
    children: /* @__PURE__ */ jsx(LinkedSVG, {
      ml: "120px",
      mb: "120px",
      w: "min(40%, 75vh)",
      h: "auto",
      svg: "Circles.png",
      href: links.cup,
      title: "Create a new Token",
      id: "createatoken"
    })
  }), /* @__PURE__ */ jsx(Tooltip, {
    hasArrow: true,
    label: "List Existing Tokens",
    children: /* @__PURE__ */ jsx(LinkedSVG, {
      w: "75%",
      h: "auto",
      ml: "-15%",
      svg: "Circles2.png",
      href: links.sign,
      title: "View Existing Tokens"
    })
  })]
});
export {
  Header as H
};
//# sourceMappingURL=Header.2b29aa8e.js.map
