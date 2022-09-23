import { j as jsxs, F as Flex, b as jsx } from "./index.65de4a2c.js";
import { a as Tooltip, b as LinkedSVG } from "./index.e6b9903f.js";
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
//# sourceMappingURL=Header.fded51cd.js.map
