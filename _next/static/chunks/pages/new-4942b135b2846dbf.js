(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[971],{27327:function(e,n,r){"use strict";r.r(n),r.d(n,{New:function(){return C}});var t=r(8529),c=r(20406),i=r(28526),s=r.n(i),a=r(95321),o=r(64033),l=r(41215),u=r(3850),d=r(69204),h=r(26106),x=r(64618),f=r(2784),j=r(2241),v=r(10508),m=r(97729),k=r(5632),w=r(52322),C=function(){return(0,w.jsxs)(o.W2,{maxW:"full",children:[(0,w.jsx)(m.default,{children:(0,w.jsx)("title",{children:"New SmartLaw Cred Token"})}),(0,w.jsx)(l.m$.header,{children:(0,w.jsx)(o.kC,{justify:"center",children:(0,w.jsx)(a.h4,{my:"7vh",maxW:"xl"})})}),(0,w.jsx)(l.m$.main,{children:(0,w.jsx)(g,{})})]})},g=function(){var e=(0,x.$6)(),n=e.rwContract,r=e.connecting,i=e.connect,m=e.chain,C=(e.address,(0,k.useRouter)().query.tokenId),g=(0,f.useState)(Array.isArray(C)?C[0]:C),p=g[0],_=g[1],b=(0,f.useState)(!1),y=b[0],E=b[1],N=(0,u.pm)();(0,f.useEffect)((function(){"string"===typeof C&&_(C)}),[C]);var S=(0,f.useCallback)((0,c.Z)(s().mark((function e(){var r,c,i,a,o,l,u,d,h,x,f;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(E(!0),e.prev=1,n){e.next=4;break}throw new Error("Connect your Web3 account to reserve an ID.");case 4:return e.next=6,n["create()"]();case 6:return r=e.sent,e.next=9,r.wait();case 9:if(c=e.sent,i=c.events.find((function(e){return"Created"===e.event}))){e.next=13;break}throw new Error("Couldn\u2019t find a token creation event.");case 13:a=(0,t.Z)(i.args,2),o=a[0],a[1],_(o.toHexString()),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(1),f=null!==(l=null!==(u=null!==(d=null===(h=e.t0.error)||void 0===h?void 0:h.message)&&void 0!==d?d:null===(x=e.t0.data)||void 0===x?void 0:x.message)&&void 0!==u?u:e.t0.message)&&void 0!==l?l:e.t0,N({title:"Creation Error",description:f,status:"error",isClosable:!0,duration:1e4});case 21:return e.prev=21,E(!1),e.finish(21);case 24:case"end":return e.stop()}}),e,null,[[1,17,21,24]])}))),[n]);return n&&p&&!y?(0,w.jsx)(a.g_,{tokenId:p}):(0,w.jsx)(o.M5,{children:(0,w.jsxs)(o.Kq,{children:[(0,w.jsxs)(o.X6,{textAlign:"center",children:["Create A New",(0,w.jsx)(l.m$.span,{title:"Unique Cred Token",ml:2,children:"NFT"})]}),r?(0,w.jsxs)(o.kC,{justify:"center",children:[(0,w.jsx)(d.$,{thickness:"4px"}),(0,w.jsx)(o.xv,{ml:2,children:"Connecting\u2026"})]}):m&&m!==j.g.contract.chainId?(0,w.jsxs)(h.zx,{colorScheme:"blue",onClick:function(){(0,v.gu)(j.g.contract.chainId)},children:["Switch to the",(0,w.jsx)(l.m$.span,{mx:1.5,title:"".concat(m," \u2260 ").concat(j.g.contract.chainId),children:j.g.contract.name}),"chain"]}):n?y?(0,w.jsxs)(o.kC,{justify:"center",mt:7,children:[(0,w.jsx)(d.$,{}),(0,w.jsx)(o.xv,{ml:2,children:"Reserving\u2026"})]}):p?(0,w.jsx)(o.xv,{children:"How did we get here?"}):(0,w.jsx)(h.zx,{colorScheme:"green",onClick:S,children:"Reserve a Token ID"}):(0,w.jsx)(h.zx,{colorScheme:"blue",onClick:i,children:"Connect"})]})})};n.default=C},18310:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/new",function(){return r(27327)}])}},function(e){e.O(0,[730,321,774,888,179],(function(){return n=18310,e(e.s=n);var n}));var n=e.O();_N_E=n}]);