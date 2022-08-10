"use strict";(self.webpackChunk_chievemints_ui=self.webpackChunk_chievemints_ui||[]).push([[875],{82875:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var a=n(2784),r=n(64033),l=n(69204),s=n(54805),c=n(41135),i=n(96035),m=n(42840),o=n(46652),u=n(1525),E=n(79338),d=n(26106),v=n(60146),h=n(14738),w=n(44341),C=n(10289),y=n(18671);const b=({name:e})=>{const{ensProvider:t}=(0,h.$6)(),n=(0,a.useMemo)((()=>/^0x[a-z0-9]{40}$/i.test(e)),[e]),[s,c]=(0,a.useState)(n?void 0:null);return(0,a.useMemo)((()=>{n||(async()=>{const n=await(t?.resolveName(e));c(n??"Not Found")})()}),[n,t,e]),a.createElement(a.Fragment,null,a.createElement(r.xv,null,e,null!=s&&a.createElement(r.xv,{ml:2,as:"em"},"(",s,")")),null===s&&a.createElement(l.$,{size:"xs"}))},p=e=>e.split(/\s*[\s,;:/\\|]+\s*/).filter((e=>e&&""!==e)),f=()=>{let{nftId:e}=(0,C.UO)();Array.isArray(e)&&([e]=e);const[t,n]=(0,a.useState)(),[f,g]=(0,a.useState)(),[k,x]=(0,a.useState)(),[S,N]=(0,a.useState)(""),[$,F]=(0,a.useState)("whitelist"),{ensProvider:P,address:I,roContract:M,rwContract:T,connected:z,connect:A,userProvider:D}=(0,h.$6)(),[_,O]=(0,a.useState)([]),K=(0,s.pm)();(0,a.useEffect)((()=>{(async()=>{O(p(S).map(((e,t)=>a.createElement(b,{key:t,name:e}))))})()}),[P,S]);const L=(0,a.useMemo)((()=>f?.name??`#${e}`),[f,e]);(0,a.useEffect)((()=>{(async()=>{if(M&&I&&e)try{n(Number((await M.balanceOf(I,e)).toString()))}catch(e){x(e.message)}})()}),[I,M,e]),(0,a.useEffect)((()=>{(async()=>{if(M&&e)try{const t=await M.uri(e);if(t){const e=await fetch((0,v._m)(t));g(await e.json())}else g(null)}catch(e){x(e.message)}})()}),[M,e]),console.debug({rwContract:T,userProvider:D});const W=(0,a.useCallback)((async t=>{if(t.preventDefault(),T)try{const t=await Promise.all(p(S).map((async e=>{const t=await(P?.resolveName(e));if(!t)throw new Error(`Couldn't Resolve Name: “${e}”`);return t})));switch($){case"mint":{console.debug("minting",{addrs:t});const n=await(T?.["mint(address[],uint256,bytes)"](t,e,[]));await n.wait();break}case"whitelist":console.debug("whitelist",{addrs:t}),t.map((async t=>{await(M?.roleIndexForName("Minter")),await(T?.["mint(address,uint256,uint256,bytes)"](t,e,1,[]))}))}}catch(e){K({title:`${(0,v.kC)($)}ing Error`,description:e.message,status:"error",isClosable:!0,duration:1e4})}else K({title:"Contract Error!",description:"Token is not Connected.",status:"error",isClosable:!0,duration:1e4})}),[$,_,P,M,T,e]);return k?a.createElement(c.bZ,{status:"error"},a.createElement(c.zM,null),a.createElement(c.Cd,{mr:2},"Error: Loading NFT"),a.createElement(c.X,null,k)):a.createElement(r.W2,{maxW:"40rem"},a.createElement(y.q,null,a.createElement("title",null,"Disburse NFT #",e),a.createElement("meta",{name:"description",content:"Distribute A ’Chievemint NFT"})),a.createElement(w.dL,null),a.createElement(r.Kq,{as:"form",onSubmit:W},null===f?a.createElement(r.xv,{my:8},"Token ",L," does not exist."):I?null==t?a.createElement(r.kC,{my:8},a.createElement(l.$,null),a.createElement(r.xv,{ml:2},"Loading Balance…")):a.createElement(r.xv,{my:8},"Distribute up to ",t," “",L,"” tokens:"):a.createElement(r.xv,{my:8},"Connect your wallet to distribute “",L,"” tokens…"),a.createElement(i.mQ,{isFitted:!0,variant:"enclosed"},a.createElement(i.td,{mb:"1em"},a.createElement(i.OK,null,"CSV"),a.createElement(i.OK,null,"Parsed")),a.createElement(i.nP,null,a.createElement(i.x4,null,a.createElement(m.NI,null,a.createElement(m.lX,null,"Comma, Space, or Semicolon Separated ETH or ENS Addresses:"),a.createElement(o.g,{height:64,placeholder:"Enter space, semicolon, or comma separated eth addresses.",value:S,onChange:({target:{value:e}})=>{N(e)}}))),a.createElement(i.x4,null,a.createElement(r.GS,null,_.map(((e,t)=>a.createElement(r.HC,{key:t,justifyContent:"center"},e))))))),a.createElement(m.NI,null,a.createElement(u.Ee,{onChange:F,value:$},a.createElement(u.Y8,{value:"mint"},"Mint"),a.createElement(u.Y8,{value:"whitelist",ml:5},"Whitelist"))),a.createElement(m.NI,null,a.createElement(E.XZ,{name:"skip",value:"true"},"Skip existing holders")),a.createElement(m.NI,{textAlign:"center"},T?a.createElement(d.zx,{type:"submit",colorScheme:"green"},"Distribute"):a.createElement(d.zx,{onClick:A},"Connect"))))}}}]);