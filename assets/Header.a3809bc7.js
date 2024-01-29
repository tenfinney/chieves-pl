import { d as jsxs, F as Flex, j as jsx } from "./index.eb582024.js";
import { a as Tooltip, b as LinkedSVG } from "./styles.66348739.js";
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
      width: "75%",
      h: "auto",
      svg: "Circles.svg",
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
      svg: "Circles2.svg",
      href: links.sign,
      title: "View Existing Tokens",
      id: "createatoken"
    })
  })]
});
export {
  Header as H
};
//# sourceMappingURL=Header.a3809bc7.js.map