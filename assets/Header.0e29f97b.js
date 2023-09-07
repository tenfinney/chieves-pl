import { d as jsxs, F as Flex, j as jsx } from "./index.40a204e8.js";
import { a as Tooltip, b as LinkedSVG } from "./index.3ac31c1e.js";
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
      w: "75%",
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
      ml: "220px",
      mb: "220px",
      w: "75%",
      h: "auto",
      svg: "Circles.png",
      href: links.sign,
      title: "View Existing Tokens",
      id: "createatoken"
    })
  })]
});
export {
  Header as H
};
//# sourceMappingURL=Header.0e29f97b.js.map
