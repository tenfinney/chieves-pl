(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[938],{82410:function(e,n,r){"use strict";r.r(n);var t=r(20406),s=r(28526),a=r.n(s),i=r(2784),c=r(41215),o=r(41135),u=r(64033),d=r(69204),l=r(91506),x=r(54997),f=r(97729),m=r(5632),h=r(75248),p=r(10508),v=r(83513),j=r(64618),_=r(52322),k=(0,c.m$)(h.D);n.default=function(){var e=(0,m.useRouter)().query.nftId,n=(0,i.useState)(),r=n[0],s=n[1],h=(0,i.useState)(),w=h[0],E=h[1],b=(0,j.$6)().roContract,C=Array.isArray(e)?e[0]:e;if((0,i.useEffect)((function(){var e=function(){var e=(0,t.Z)(a().mark((function e(){var n,r,t,i;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!b||!C){e.next=20;break}return e.prev=1,e.next=4,b.uri(x.O$.from(BigInt(C)));case 4:if(n=e.sent,r=(0,p._m)(n)){e.next=8;break}throw new Error("Couldn't find metadata for Cred Token #".concat(C,"."));case 8:return e.next=10,fetch(r);case 10:return t=e.sent,e.next=13,t.text();case 13:i=e.sent,s(JSON.parse(i)),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(1),E(e.t0.message);case 20:case"end":return e.stop()}}),e,null,[[1,17]])})));return function(){return e.apply(this,arguments)}}();e()}),[b,C]),w)return(0,_.jsxs)(o.bZ,{status:"error",children:[(0,_.jsx)(o.zM,{}),(0,_.jsx)(o.Cd,{mr:2,children:"Error: Loading NFT"}),(0,_.jsx)(o.X,{children:w})]});if(!r)return(0,_.jsxs)(u.kC,{align:"center",justify:"center",h:"100vh",children:[(0,_.jsx)(d.$,{thickness:"4px",speed:"1s",mr:2}),(0,_.jsxs)(u.xv,{children:["Loading Metadata For Token #",C]})]});var g=r.name,N=r.image,T=r.animation_url,$=r.description;return(0,_.jsxs)(u.Kq,{align:"center",position:"relative",children:[(0,_.jsxs)(f.default,{children:[(0,_.jsxs)("title",{children:["Cred View #",C]}),(0,_.jsx)("meta",{name:"description",content:"SmartLaw Cred Tokens"})]}),(0,_.jsx)(v.dL,{}),g&&(0,_.jsx)(u.X6,{children:g}),N&&(0,_.jsx)(c.m$.object,{data:(0,p._m)(N),title:g,pointerEvents:"none",maxW:72,maxH:72}),$&&(0,_.jsx)(k,{sx:{a:{textDecoration:"underline"}},linkTarget:"_blank",children:$}),(null===T||void 0===T?void 0:T.endsWith(".mp4"))&&(0,_.jsx)(c.m$.video,{maxW:96,maxH:96,controls:!0,autoPlay:!0,loop:!0,muted:!0,children:(0,_.jsx)(c.m$.source,{src:(0,p._m)(T)})}),(null===T||void 0===T?void 0:T.endsWith(".webp"))&&(0,_.jsx)(l.Ee,{src:(0,p._m)(T),alt:g,maxW:96,maxH:96})]})}},28657:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/view/[nftId]",function(){return r(82410)}])}},function(e){e.O(0,[730,513,774,888,179],(function(){return n=28657,e(e.s=n);var n}));var n=e.O();_N_E=n}]);