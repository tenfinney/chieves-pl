(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{19842:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return N}});var n=r(20406),i=r(8529),s=r(95235),o=r(52746),a=r(28526),c=r.n(a),u=r(2784),l=r(97729),f=r(64033),p=r(41215),m=r(10508),x=r(5286),d=r(64618),b=r(5632),h=r(42840),j=r(79338),v=r(80038),g=r(26106),y=r(63955),O=r(52322);function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){(0,s.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var S=function(e){var t=e.limit,r=void 0===t?100:t,i=e.setLimit,s=e.offset,o=void 0===s?0:s,a=e.setOffset,l=e.gatingVisible,p=void 0!==l&&l,m=e.setGatingVisible,d=e.visibleList,b=void 0===d?[]:d,k=e.setVisibleList,S=(0,y.cI)(),P=S.register,E=S.handleSubmit,N=S.control,I=S.setValue,_=S.formState,C=(_.errors,_.isSubmitting,_.isDirty,function(){var e=(0,n.Z)(c().mark((function e(t){var r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log({data:t}),i(Number(t.limit)),a(Number(t.offset)),m(t.gatingVisible),k(null===(r=t.visibleList)||void 0===r?void 0:r.split(/\s*,\s*/).filter((function(e){return""!==e})));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());return(0,u.useEffect)((function(){I("limit",r),I("offset",o),I("visibleList",b.join(", ")),I("gatingVisible",p)}),[r,o,b,p]),(0,O.jsxs)(f.xu,{as:"form",onSubmit:E(C),mt:10,ml:20,mb:"1rem",maxW:['100%", "min(85vw, 50em)'],sx:{a:{textDecoration:"underline"}},children:[(0,O.jsx)(x.R6,{}),(0,O.jsx)(x.OE,{}),(0,O.jsx)(x.zV,{}),(0,O.jsx)(x.BB,{}),(0,O.jsx)(x.R6,{}),(0,O.jsx)(f.xv,{fontSize:"24pt",mt:"1rem",fontWeight:"bold",children:"ERC-1155 Access and Achievment Token Minting"}),(0,O.jsx)(f.xv,{ml:"20px",fontSize:"18pt",fontWeight:"bold",children:"Digital Tokens on the Polygon EVM Blockchain using IPFS"}),(0,O.jsx)(f.xv,{ml:"50px",fontSize:"12pt",fontWeight:"regular",children:"Each token reservation mints one (1) master token and up to (11) role tokens. Superuser, Minter, Caster, Transferer, Configurer, Maintainer, Creator, Limiter, Burner, Destroyer, and/or Oracle can be automatically minted with the master token and can be assigned to third-parties for administration."}),(0,O.jsx)("br",{}),(0,O.jsx)("hr",{}),(0,O.jsx)("br",{}),(0,O.jsx)(h.NI,{children:(0,O.jsx)(f.kC,{align:"center",my:1,children:(0,O.jsx)(y.Qr,{control:N,name:"gatingVisible",defaultValue:p,render:function(e){var t=e.field,r=t.onChange,n=t.value,i=t.ref;return(0,O.jsx)(j.XZ,{onChange:r,ref:i,isChecked:n,children:"View\xa0Permission\xa0Tokens"})}})})}),(0,O.jsx)(h.NI,{children:(0,O.jsxs)(f.kC,{align:"center",maxW:"200px",my:4,children:[(0,O.jsx)(h.lX,{_after:{content:'":"'},children:"Limit"}),(0,O.jsx)(v.II,w({type:"number",placeholder:"Number of tokens to display."},P("limit")))]})}),(0,O.jsx)(h.NI,{children:(0,O.jsxs)(f.kC,{align:"center",maxW:"200px",my:4,children:[(0,O.jsx)(h.lX,{_after:{content:'":"'},children:"Offset"}),(0,O.jsx)(v.II,w({type:"number",placeholder:"Number of tokens offset from Token 1."},P("offset")))]})}),(0,O.jsx)(h.NI,{children:(0,O.jsxs)(f.kC,{align:"center",maxW:"600px",my:1,children:[(0,O.jsx)(h.lX,{_after:{content:'":"'},children:"Visible\xa0List"}),(0,O.jsx)(v.II,w({placeholder:"Comma separated list of token IDs."},P("visibleList")))]})}),(0,O.jsx)(g.zx,{type:"submit",size:"lg",colorScheme:"green",ml:"0px",mt:"20px",children:"View"}),(0,O.jsx)(x.R6,{})]})};function P(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?P(Object(r),!0).forEach((function(t){(0,s.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):P(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var N=function(){var e=(0,u.useState)([]),t=e[0],r=e[1],s=(0,b.useRouter)().query,a=s.gating,h=void 0!==a&&a,j=s.visible,v=s.limit,g=void 0===v?100:v,y=s.offset,k=void 0===y?0:y,w=(0,u.useState)(Number(g)),P=w[0],N=w[1],I=(0,u.useState)(Number(k)),_=I[0],C=I[1],D=(0,u.useState)(!!h),V=D[0],L=D[1],T=(0,u.useState)([]),B=T[0],W=T[1],Z=(0,d.$6)(),A=Z.roContract,z=Z.constsContract,M=function(e,t){r((function(r){return[].concat((0,o.Z)(r.slice(0,e)),[E(E({},r[e]),t)],(0,o.Z)(r.slice(e+1)))}))};return(0,u.useEffect)((function(){L(!!h)}),[h]),(0,u.useEffect)((function(){C(Number(k))}),[k]),(0,u.useEffect)((function(){N(Number(g))}),[g]),(0,u.useEffect)((function(){var e=j;if(e){if(Array.isArray(e)){var t=e;e=(0,i.Z)(t,1)[0]}W(e.split(/\s*,\s*/).filter((function(e){return""!==e})))}}),[j]),(0,u.useEffect)((function(){var e=function(){var e=(0,n.Z)(c().mark((function e(){var t,i,s,o,a,u,l;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!A||!z){e.next=23;break}return e.t0=Number,e.next=4,A.typeSupply();case 4:return e.t1=e.sent,t=(0,e.t0)(e.t1),e.next=8,z.GATING_TYPE();case 8:return i=e.sent,e.next=11,z.TYPE_WIDTH();case 11:return s=e.sent,e.next=14,z.TYPE_BOUNDARY();case 14:return o=e.sent,a=Math.min(P,t),u=_<0?t+_:_,e.next=19,Promise.all(Array.from({length:a}).map(function(){var e=(0,n.Z)(c().mark((function e(t,r){var n,a,l;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=u+r+1,e.next=4,A.tokenByIndex(n);case 4:return a=e.sent,l=!V&&(a.toBigInt()&BigInt(Math.pow(2,s)-1)<<BigInt(o))===i.toBigInt()||B.length>0&&!B.includes(n.toString()),e.abrupt("return",{id:a.toHexString(),hide:l,index:n});case 9:return e.prev=9,e.t0=e.catch(0),e.abrupt("return",null);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t,r){return e.apply(this,arguments)}}()));case 19:return l=e.sent.filter((function(e){return Boolean(e)})),r(l),e.next=23,Promise.all(l.map(function(){var e=(0,n.Z)(c().mark((function e(t,r){var n,i,s,o,a,u,l,f;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.id,!t.hide){e.next=3;break}return e.abrupt("return",null);case 3:return i=null,e.prev=4,e.next=7,A.uri(n);case 7:return""===(s=e.sent)&&(s=null),M(r,{uri:s}),o=(0,m._m)(s),e.next=13,fetch(o);case 13:return a=e.sent,e.next=16,a.text();case 16:if((u=e.sent)&&""!==u){e.next=19;break}throw new Error("No Data");case 19:try{i=JSON.parse(u)}catch(c){console.error("JSON Error",{error:c,data:u})}e.next=25;break;case 22:e.prev=22,e.t0=e.catch(4),M(r,{error:null!==(l=e.t0.message)&&void 0!==l?l:e.t0});case 25:return e.prev=25,M(r,{metadata:i}),e.finish(25);case 28:return e.next=30,A["totalSupply(uint256)"](n);case 30:f=e.sent,M(r,{total:f});case 32:case"end":return e.stop()}}),e,null,[[4,22,25,28]])})));return function(t,r){return e.apply(this,arguments)}}()));case 23:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[A,z,V,B,P]),(0,O.jsxs)(f.W2,{maxW:"full",children:[(0,O.jsxs)(l.default,{children:[(0,O.jsx)("title",{children:"SmartLaw Cred Tokens"}),(0,O.jsx)("meta",{name:"description",content:"SmartLaw Cred Tokens"})]}),(0,O.jsxs)(p.m$.main,{children:[(0,O.jsx)(S,{limit:P,setLimit:N,offset:_,setOffset:C,gatingVisible:V,setGatingVisible:L,visibleList:B,setVisibleList:W}),(0,O.jsx)(x.jq,{tokens:t})]})]})}},8738:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(19842)}])}},function(e){e.O(0,[730,338,286,774,888,179],(function(){return t=8738,e(e.s=t);var t}));var t=e.O();_N_E=t}]);