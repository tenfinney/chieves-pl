"use strict";(self.webpackChunk_chievemints_ui=self.webpackChunk_chievemints_ui||[]).push([[341],{44341:(e,t,n)=>{n.d(t,{h4:()=>o,R6:()=>i,zV:()=>m,BB:()=>c,OE:()=>s,dL:()=>H,Pj:()=>J,Px:()=>U,xj:()=>ee,h_:()=>q,g_:()=>v,Mm:()=>Z,$B:()=>ne,jq:()=>P,NN:()=>G});var a=n(64033),r=n(70691),l=n(2784);const o=({links:e={cup:"/new",sign:"/"},...t})=>l.createElement(a.kC,{grow:1,...t},l.createElement(r.u,{hasArrow:!0,label:"Create A New Token Type"},l.createElement(U,{w:"min(40%, 75vh)",h:"auto",svg:"logo.svg",href:e.cup,title:"Create a new Token"})),l.createElement(r.u,{hasArrow:!0,label:"List Existing Tokens"},l.createElement(U,{w:"75%",h:"auto",ml:"-15%",svg:"header.svg",href:e.sign,title:"View Existing Tokens"}))),i=({links:e={cup:"/new",sign:"/"},...t})=>l.createElement(a.kC,{grow:1,...t},l.createElement(U,{w:"min(40%, 20vh)",h:"40",mt:"1px",ml:"-5%",svg:"glow_line-green-tr.png",href:e.cup,title:"Create A New Token"}),l.createElement(U,{w:"min(40%, 20vh)",h:"40",mt:"1px",ml:"10%",svg:"glow_line-purple-tr.png",href:e.sign,title:"Create A New Token"})),m=({links:e={cup:"/new",sign:"/"},...t})=>l.createElement(a.kC,{grow:1,...t},l.createElement(U,{w:"min(40%, 20vh)",h:"40",mt:"1px",ml:"5%",svg:"header.png",href:e.cup,title:"Create A New Token"}),l.createElement(U,{w:"min(40%, 20vh)",h:"40",mt:"1px",ml:"10%",svg:"scott-stevenson-tenfinney-profile-002.png",href:e.sign,title:"Create A New Token"})),c=({links:e={cup:"/new",sign:"/"},...t})=>l.createElement(a.kC,{grow:1,...t},l.createElement(U,{w:"min(40%, 20vh)",h:"40",mt:"1px",ml:"5%",svg:"reserve-green-800v.png",href:e.cup,title:"Create A New Token"}),l.createElement(U,{w:"min(40%, 20vh)",h:"40",mt:"1px",ml:"10%",svg:"token-tools-800w.png",href:e.sign,title:"Create A New Token"})),s=({links:e={cup:"/new",sign:"/"},...t})=>l.createElement(a.kC,{grow:1,...t},l.createElement(U,{w:"min(30%, 10vh)",h:"40",mt:"1px",ml:"2%",svg:"smartlaw-w.png",href:e.cup,title:"Create A New Token"}));var u=n(54805),E=n(96035),p=n(60146),d=n(14738),g=n(63955),h=n(96111),b=n.n(h),f=n(10289);const v=({purpose:e="create",tokenId:t,metadata:n})=>{const{rwContract:r}=(0,d.$6)(),o=(0,f.s0)(),{register:i,handleSubmit:m,watch:c,setValue:s,formState:{errors:h,isSubmitting:v,isDirty:w}}=(0,g.cI)(),[S,C]=(0,l.useState)(0),_=(0,u.pm)(),k=(0,l.useCallback)((async({metadata:n})=>{if(!r)throw new Error(`Cannot connect to contract to ${e} metadata.`);if(null==t)throw new Error("Token id is unset.");try{if(null!=t){const e=await r.setURI(BigInt(t),n);await e.wait()}o(`/view/${(0,p.pc)(t)}`)}catch(e){_({title:"Contract Error",description:(0,p.B9)(e),status:"error",isClosable:!0,duration:1e4})}}),[r,t,e,o,_]),I=async e=>{const{name:t,description:n,homepage:a,color:r,images:l,animation:o,attributes:i}=e,m={name:(0,p.DM)(t)?t:"𝙐𝙣𝙩𝙞𝙩𝙡𝙚𝙙",decimals:0};return(0,p.DM)(n)&&(m.description=n),(0,p.DM)(a)&&(m.external_url=a),Array.isArray(l)?m.image=(await(0,p.hY)(l))[0]:null!=l&&console.warn("Unknown Image Type: "+typeof l),o instanceof File||"string"==typeof o?m.animation_url=(await(0,p.hY)(o))[0]:null!=o&&console.warn("Unknown Animation Type: "+typeof o),r?.startsWith("#")&&(m.background_color=r.substring(1).toUpperCase()),(0,p.DM)(i)&&!(0,p.xb)(i)&&(m.attributes=i.map((({name:e,value:t,type:n})=>{const a={trait_type:e,value:t};return"string"!==n&&(a.display_type=n),a}))),m};return l.createElement(a.Kq,{align:"center"},l.createElement(a.xu,{as:"form",onSubmit:m((async e=>{try{const t=`metadata.${(new Date).toISOString()}.json`;let n=await(async()=>{switch(S){case 0:return{name:t,content:JSON.stringify(await I(e),null,2)};case 1:return e.uri;case 2:if(!(0,p.DM)(e.json5))throw new Error("JSON5 isn’t set.");return{name:t,content:JSON.stringify(b().parse(e.json5),null,2)};default:throw new Error(`Unknown Tab: ${S}`)}})();if(!n)throw new Error("Metadata is undefined.");[n]=await(0,p.hY)(n),await k({metadata:n})}catch(e){_({title:"Metadata Error",description:(0,p.B9)(e),status:"error",isClosable:!0,duration:1e4}),console.debug(e.stack)}})),mt:10,w:["100%","min(85vw, 40em)"],sx:{a:{textDecoration:"underline"}}},l.createElement(Z,{purpose:e,processing:v,mb:3}),l.createElement(E.mQ,{mx:[0,5],isFitted:!0,variant:"enclosed",onChange:e=>C(e)},l.createElement(E.td,{mb:"1em"},l.createElement(E.OK,null,"Fields"),l.createElement(E.OK,null,"URI"),l.createElement(E.OK,null,"JSON5")),l.createElement(E.nP,null,[q,G,J].map(((e,a)=>l.createElement(E.x4,{key:a,p:0},l.createElement(e,{register:i,watch:c,setValue:s,tokenId:t,metadata:n})))))),l.createElement(Z,{purpose:e,processing:v,mb:3})),l.createElement(ee,{colorScheme:"blue",tokenId:t,purpose:e}))};var w=n(33541),S=n(86915),C=n(69204),_=n(89975),k=n(62833);const I=(0,w.m$)(k.rU),x=({token:e,index:t})=>l.createElement(S.Td,null,l.createElement(r.u,{label:null!=e.id?(0,p.pc)(`0x${BigInt(e.id).toString(16)}`):"𝚄𝚗𝚔𝚗𝚘𝚠𝚗"},l.createElement(a.xv,null,e.index))),T=({token:e})=>l.createElement(S.Td,{colSpan:4},l.createElement(a.kC,{justify:"center"},l.createElement(a.xv,{color:"red",fontStyle:"italic"},e.error))),y=()=>l.createElement(S.Td,{colSpan:4},l.createElement(a.kC,{justify:"center"},l.createElement(C.$,{thickness:"4px"}),l.createElement(a.xv,{ml:3},"Loading Metadata…"))),N=({token:e})=>l.createElement(S.Td,null,l.createElement(a.Kq,null,l.createElement(I,{to:`/view/${(0,p.pc)(e.id)}`},l.createElement(a.xu,{bg:e.metadata?.background_color?`#${e.metadata.background_color}`:"transparent"},e.metadata?.image&&l.createElement(w.m$.object,{data:(0,p._m)(e.metadata.image)??void 0,title:e.metadata?.name??"Untitled",maxW:32,maxH:32,objectFit:"contain",margin:"auto"})),l.createElement(a.xv,null,e.metadata?.name??l.createElement(a.xv,{as:"em"},"Untitled"))))),A=({token:e})=>l.createElement(S.Td,{flexGrow:1,sx:{a:{textDecoration:"underline"}}},l.createElement(_.D,{linkTarget:"_blank"},e.metadata?.description??"*No Description*")),D=({token:e})=>l.createElement(S.Td,null,e.metadata?.external_url&&l.createElement(a.rU,{href:e.metadata.external_url,isExternal:!0,fontSize:"150%"},l.createElement(r.u,{label:e.metadata.external_url,hasArrow:!0},"🔗"))),R=({token:e})=>l.createElement(S.Td,null,e.uri&&l.createElement(a.kC,{justify:"center",fontSize:"150%"},l.createElement(a.rU,{href:(0,p._m)(e.uri)??void 0,isExternal:!0},l.createElement(r.u,{label:e.uri,hasArrow:!0},"👑")),l.createElement(a.rU,{ml:2,onClick:()=>{e.uri&&navigator.clipboard.writeText(e.uri)}},l.createElement(r.u,{label:"Copy to Clipboard",hasArrow:!0},"📋")))),O=({token:e})=>l.createElement(S.Td,null,l.createElement(I,{to:`/owners/${e.id}`},null==e.total?l.createElement(C.$,null):`${e.total} ⁄ ${e.max}`)),M=({token:e})=>{const t=(0,p.pc)(e.id);return l.createElement(S.Td,null,l.createElement(a.kC,{justify:"center",fontSize:"150%"},l.createElement(I,{to:`/edit/${t}`},l.createElement(r.u,{label:"Edit Metadata",hasArrow:!0},"✏️")),l.createElement(I,{ml:2,to:`/view/${t}`},l.createElement(r.u,{label:"View This NFT",hasArrow:!0},"👁")),l.createElement(I,{ml:2,to:`/disburse/${t}`},l.createElement(r.u,{label:"Disburse This NFT",hasArrow:!0},"💸"))))},P=({tokens:e})=>l.createElement(S.iA,{sx:{"th, td":{textAlign:"center"},a:{borderBottom:"2px dotted transparent"},"a:hover":{textDecoration:"none",borderBottom:"2px dotted"}}},l.createElement(S.hr,null,l.createElement(S.Tr,null,l.createElement(S.Th,null,"Id"),l.createElement(S.Th,null,"Display"),l.createElement(S.Th,{flexGrow:1},"Description"),l.createElement(S.Th,null,"Link"),l.createElement(S.Th,null,"Metadata"),l.createElement(S.Th,null,"Total"),l.createElement(S.Th,null,"Token Actions"))),l.createElement(S.p3,null,e.map(((e,t)=>e.is?.hidden?null:l.createElement(S.Tr,{key:t},l.createElement(x,{token:e,index:t}),!e.uri&&e.error?l.createElement(T,{token:e}):e.metadata?l.createElement(l.Fragment,null,l.createElement(N,{token:e}),l.createElement(A,{token:e}),l.createElement(D,{token:e})):l.createElement(y,{token:e}),e.uri&&l.createElement(R,{token:e}),l.createElement(O,{token:e}),l.createElement(M,{token:e})))))),L=(0,w.m$)(k.rU),U=l.forwardRef((({href:e="#",svg:t,...n},r)=>l.createElement(L,{position:"relative",zIndex:1,to:e,...n},l.createElement(a.xu,{display:"inline-block",w:"full",h:"full"},l.createElement(w.m$.object,{maxH:"100%",data:t,ref:r,position:"relative",zIndex:-1})))));U.displayName="LinkedSVG";const H=()=>l.createElement(U,{href:"/",svg:"../favicon.svg",h:"3rem",w:"2rem",position:"fixed",left:"0.25rem",top:"0.25rem"});var z=n(80038);const G=({register:e})=>l.createElement(z.II,{placeholder:"Enter a URI for the token…",...e("uri")});var $=n(39680),V=n(90028),j=n(26106),F=n(42840),X=n(1525),B=n(91506),K=n(46652),W=n(51002);const Y=({attributes:e=[],setValue:t,index:n})=>{const{name:a="",value:o="",type:i="string"}=e[n],m=(0,l.useCallback)((a=>r=>{t("attributes",[...e.slice(0,n),{...e[n],[a]:r},...e.slice(n+1)])}),[t,n,e]),c=m("name"),s=m("value"),u=m("type");return l.createElement(S.Tr,null,l.createElement(S.Td,null,l.createElement(z.II,{value:a,onChange:({target:{value:e}})=>{c(e)}})),l.createElement(S.Td,null,(()=>{switch(i){case"date":return l.createElement(z.II,{type:"date",value:(0,p.xb)(o)?"":new Date(o).toISOString().split("T")[0],onChange:({target:{value:e}})=>{s(new Date(e).getTime())}});case"string":return l.createElement(z.II,{value:o,onChange:({target:{value:e}})=>{s(e)}});default:return l.createElement(z.II,{type:"number",value:o,onChange:({target:{value:e}})=>{s(null!=e?Number(e):"")}})}})()),l.createElement(S.Td,null,l.createElement(V.Ph,{value:i,onChange:({target:{value:e}})=>{u(e)}},l.createElement(w.m$.option,{value:"string"},"String"),l.createElement(w.m$.option,{value:"date"},"Date"),l.createElement(w.m$.option,{value:"number"},"Number"),l.createElement(w.m$.option,{value:"boost_percentage"},"Boost Percentage"),l.createElement(w.m$.option,{value:"boost_number"},"Boost Number"))),l.createElement(S.Td,null,l.createElement(r.u,{label:"Remove",hasArrow:!0},l.createElement(j.zx,{size:"sm",ml:2,colorScheme:"red",onClick:()=>t("attributes",[...e.slice(0,n),...e.slice(n+1)])},l.createElement($.Tw,null)))))},q=({register:e,watch:t,setValue:n,tokenId:o="𝘜𝘯𝘬𝘯𝘰𝘸𝘯",metadata:i})=>{const[m,c]=(0,l.useState)(0),s=(0,l.useRef)(null),{homepage:u,description:d,color:g,images:h,attributes:b,animation:f}=t();return(0,l.useEffect)((()=>{if(i){Object.entries({name:null,description:null,external_url:"homepage",animation_url:"animation"}).forEach((([e,t])=>{n(t??e,i[e])})),n("images",[i.image]);const{attributes:e}=i;(0,p.xb)(e)||n("attributes",(e??[]).map((({trait_type:e,value:t,display_type:n="string"})=>({name:e,value:t,type:n}))));const t=i.background_color;t&&!(0,p.xb)(t)&&n("color",`#${t}`)}}),[i,n]),(0,l.useEffect)((()=>{(!u||(0,p.xb)(u)||u.endsWith("𝘜𝘯𝘬𝘯𝘰𝘸𝘯"))&&n("homepage",`${W.U}/${(0,p.pc)(o)}`)}),[u,n,o]),(0,l.useEffect)((()=>{if(window.location.hash){const e=document.getElementById(window.location.hash.substring(1));window.scroll({top:(e?.offsetTop??0)-120,behavior:"smooth"})}}),[]),l.createElement(a.QI,{listStyleType:"none"},l.createElement(a.HC,null,l.createElement(F.NI,{mt:3},l.createElement(a.kC,{direction:{base:"column",md:"row"}},l.createElement(F.lX,{_after:{content:'":"'}},"Name"),l.createElement(z.II,{autoFocus:!0,ml:{base:0,md:4},...e("name")})))),l.createElement(a.HC,null,l.createElement(F.NI,{mt:3},l.createElement(a.kC,{direction:{base:"column",md:"row"}},l.createElement(F.lX,{_after:{content:'":"'}},"Images"),l.createElement(z.II,{type:"file",accept:"image/*",ref:s,onChange:({target:{files:e}})=>{e?.length&&e?.length>=1&&n("images",[...h??[],...Array.from(e)])},display:"none",multiple:!0})),h?.length&&l.createElement(X.Ee,{value:m,onChange:e=>{c(Number(e))}},l.createElement(a.MI,{columns:3,templateColumns:"6rem 1fr 2rem"},h.map(((e,t)=>{const o=e instanceof File?e.name:e.replace(/^.*\//g,"");return l.createElement(l.Fragment,{key:t},l.createElement(a.kC,{w:16},l.createElement(X.Y8,{value:t},"Display Image")),l.createElement(a.kC,{justify:"center",bg:t===m?g:"transparent"},l.createElement(r.u,{label:o,hasArrow:!0},l.createElement(B.Ee,{alt:o,src:e instanceof File?URL.createObjectURL(e):(0,p._m)(e)??void 0,maxH:60,mt:0,onClick:()=>s.current?.click()}))),l.createElement(a.M5,null,l.createElement(j.zx,{size:"xs",colorScheme:"red",onClick:()=>(e=>{const t=[...h.slice(0,e),...h.slice(e+1)];n("images",t),m===e&&c(t.length>0?0:void 0)})(t)},l.createElement($.Tw,null))))})))),l.createElement(j.zx,{w:"full",mt:3,colorScheme:"teal",onClick:()=>s.current?.click()},l.createElement($.dt,null)))),l.createElement(a.HC,null,l.createElement(F.NI,{mt:3},l.createElement(a.kC,{direction:{base:"column",md:"row"}},l.createElement(F.lX,{_after:{content:'":"'}},"Background"),l.createElement(z.II,{type:"color",...e("color")})))),l.createElement(a.HC,null,l.createElement(F.NI,{mt:3},l.createElement(a.kC,{direction:{base:"column",md:"row"}},l.createElement(F.lX,{_after:{content:'":"'}},"Homepage"),l.createElement(a.kC,{grow:1},l.createElement(z.II,{...e("homepage")}),u?.length>0&&l.createElement(a.rU,{ml:2,href:u,isExternal:!0},l.createElement($.h0,null)))))),l.createElement(a.HC,null,l.createElement(F.NI,{mt:3},l.createElement(a.Kq,null,l.createElement(F.lX,{_after:{content:'":"'}},"Description"),l.createElement(E.mQ,{ml:5,isFitted:!0,variant:"enclosed"},l.createElement(E.td,{mb:"1em"},l.createElement(E.OK,null,"Markdown"),l.createElement(E.OK,null,"Preview")),l.createElement(E.nP,null,l.createElement(E.x4,null,l.createElement(K.g,{placeholder:"Enter a markdown formatted description.",minH:32,...e("description")})),l.createElement(E.x4,null,l.createElement(_.D,null,d))))))),l.createElement(a.HC,null,l.createElement(F.NI,{mt:3},l.createElement(a.kC,{direction:{base:"column",md:"row"}},l.createElement(F.lX,{_after:{content:'":"'}},"Animation"),"string"==typeof f&&l.createElement(a.kC,null,l.createElement(a.xv,null,decodeURI(f.replace(/^ipfs:\/\/[^/]+\//,""))),l.createElement(a.rU,{href:(0,p._m)(f),ml:3,mb:5,isExternal:!0},l.createElement($.h0,null))),"undefined"!=typeof File&&f instanceof File&&l.createElement(a.kC,null,l.createElement(a.xv,null,f.name),l.createElement(a.rU,{ml:3,mb:5,isExternal:!0,href:URL.createObjectURL(f)},l.createElement($.h0,null))),l.createElement(z.II,{type:"file",accept:"model/gltf+json,model/gltf-binary,video/*,.gltf,.glb",onChange:e=>{const{target:{files:t}}=e;n("animation",1===t?.length?t[0]:null),e.preventDefault()},h:"auto"})))),l.createElement(a.HC,{id:"attributes"},l.createElement(F.NI,{mt:3},l.createElement(a.Kq,null,l.createElement(a.kC,null,l.createElement(F.lX,{_after:{content:'":"'}},"Attributes"),l.createElement(j.zx,{ml:2,size:"xs",onClick:()=>{console.log({attributes:b}),n("attributes",[...b??[],{}])},colorScheme:"teal"},l.createElement($.dt,null))),b?.length>0&&l.createElement(S.iA,{sx:{"th, td":{textAlign:"center",px:2}}},l.createElement(S.hr,null,l.createElement(S.Tr,null,l.createElement(S.Th,null,"Name"),l.createElement(S.Th,null,"Value"),l.createElement(S.Th,null,"Type"))),l.createElement(S.p3,null,b.map(((e,t)=>l.createElement(Y,{key:t,attributes:b,setValue:n,index:t})))))))))},J=({register:e})=>l.createElement(K.g,{placeholder:"Enter JSON5 token metadata…",h:"75vh",...e("json5")});var Q=n(4301);const Z=({purpose:e,processing:t=!1,onClick:n,label:r=`${(0,p.kC)(e)} NFT`,...o})=>{const{chain:i,userProvider:m,connect:c,rwContract:s}=(0,d.$6)(),u=(0,l.useMemo)((()=>i!==Q.g.contract.chainId),[i]),[E,g]=(0,l.useState)(t),h=u?Q.g.contract.name:null;return l.createElement(j.zx,{type:"submit",variant:"solid",colorScheme:!s||u?"blue":"green",isDisabled:u&&!!s||t||E,w:"full",onClick:async e=>{try{g(!0),m?u?(e.preventDefault(),(0,p.gu)(Q.g.contract.chainId)):n?.apply(null,[e]):(e.preventDefault(),c())}finally{g(!1)}},...o},t||E?l.createElement(a.kC,null,l.createElement(C.$,null),l.createElement(a.xv,{ml:2},(0,p.kC)(e).slice(0,-1),"ing…")):m?u?`Connect To The ${h} Network`:s?r:"Contract Not Connected":"Connect To Continue")},ee=({tokenId:e,purpose:t="create",...n})=>{const[r,o]=(0,l.useState)(null),[i,m]=(0,l.useState)(!1),{roContract:c,rwContract:s}=(0,d.$6)(),E=(0,u.pm)();(0,l.useEffect)((()=>{(async()=>{c&&e&&o(await c.getMax(BigInt(e)))})()}),[e,c]);const g=(0,l.useCallback)((async t=>{if(t.preventDefault(),!s)throw new Error("`rwContract` is not defined");try{m(!0);const t=await s.setMax(e,r);await t.wait()}catch(e){E({title:"Contract Error",description:(0,p.B9)(e),status:"error",isClosable:!0,duration:1e4})}finally{m(!1)}}),[r,s,E,e]);return l.createElement(a.kC,{as:"form",onSubmit:g,alignItems:"flex-end"},l.createElement(F.NI,{display:"flex",w:"auto",alignItems:"baseline",mt:3},l.createElement(F.lX,{whiteSpace:"pre",_after:{content:'":"'}},"Maximum Mintable"),null==r?l.createElement(a.kC,null,l.createElement(C.$,null),l.createElement(a.xv,{ml:3},"Loading…")):l.createElement(z.II,{type:"number",mx:{base:0,md:4},w:32,textAlign:"center",value:r,onChange:({target:{value:e}})=>{o(Number(e))}})),l.createElement(Z,{label:"Set Max",...{purpose:t,processing:i,...n}}))};var te=n(79338);const ne=({limit:e=100,setLimit:t,offset:n=0,setOffset:r,gatingVisible:o=!1,setGatingVisible:u,visibleList:E=[],setVisibleList:d})=>{const[h,b]=(0,l.useState)(null),{register:f,handleSubmit:v,control:w,setValue:S}=(0,g.cI)();return(0,l.useEffect)((()=>{S("limit",e),S("offset",n),S("visible",h),S("gatingVisible",o)}),[e,n,h,o,S]),l.createElement(a.xu,{as:"form",onSubmit:v((async e=>{t(Number(e.limit)),r(Number(e.offset)),u(e.gatingVisible),b(e.visible),d((0,p.YC)(e.visible))})),mt:10,ml:20,mb:"1rem",maxW:['100%", "min(85vw, 50em)'],sx:{a:{textDecoration:"underline"}}},l.createElement(i,null),l.createElement(s,null),l.createElement(m,null),l.createElement(c,null),l.createElement(i,null),l.createElement(a.xv,{fontSize:"24pt",mt:"1rem",fontWeight:"bold"},"ERC-1155 Access and Achievment Token Minting"),l.createElement(a.xv,{ml:"20px",fontSize:"18pt",fontWeight:"bold"},"Digital Tokens on the Polygon EVM Blockchain using IPFS"),l.createElement(a.xv,{ml:"50px",fontSize:"12pt",fontWeight:"regular"},"Each token reservation mints one (1) master token and up to (11) role tokens. Superuser, Minter, Caster, Transferer, Configurer, Maintainer, Creator, Limiter, Burner, Destroyer, and/or Oracle can be automatically minted with the master token and can be assigned to third-parties for administration."),l.createElement("br",null),l.createElement("hr",null),l.createElement("br",null),l.createElement(F.NI,null,l.createElement(a.kC,{align:"center",my:1},l.createElement(g.Qr,{control:w,name:"gatingVisible",defaultValue:o,render:({field:{onChange:e,value:t,ref:n}})=>l.createElement(te.XZ,{onChange:e,ref:n,isChecked:t},"View Permission Tokens")}))),l.createElement(F.NI,null,l.createElement(a.kC,{align:"center",maxW:"200px",my:4},l.createElement(F.lX,{_after:{content:'":"'}},"Limit"),l.createElement(z.II,{type:"number",placeholder:"Number of tokens to display.",...f("limit")}))),l.createElement(F.NI,null,l.createElement(a.kC,{align:"center",maxW:"200px",my:4},l.createElement(F.lX,{_after:{content:'":"'}},"Offset"),l.createElement(z.II,{type:"number",placeholder:"Number of tokens offset from Token 1.",...f("offset")}))),l.createElement(F.NI,null,l.createElement(a.kC,{align:"center",maxW:"600px",my:1},l.createElement(F.lX,{_after:{content:'":"'}},"Visible List"),l.createElement(z.II,{placeholder:"Comma, space and dash separated list of indices.",...f("visible")}))),l.createElement(j.zx,{type:"submit",size:"lg",colorScheme:"green",ml:"0px",mt:"20px"},"View"),l.createElement(i,null))}},51002:(e,t,n)=>{n.d(t,{F:()=>a,U:()=>r});const a={LESSOPEN:"| /usr/bin/lesspipe %s",LANGUAGE:"en_US",USER:"tarvos",CVS_RSH:"ssh",__HASHDIR:".../hashes/",npm_config_user_agent:"yarn/3.2.0 npm/? node/v16.15.1 linux x64",XDG_SEAT:"seat0",STARSHIP_SHELL:"bash",SSH_AGENT_PID:"3580",XDG_SESSION_TYPE:"x11",npm_node_execpath:"/tmp/xfs-9a7cf67b/node",SHLVL:"1",LD_LIBRARY_PATH:"/tmp/.mount_Hyper-kMrj9H/usr/lib:",HOME:"/home/tarvos",REACT_EDITOR:"code",CHROME_DESKTOP:"Hyper.desktop",APPDIR:"/tmp/.mount_Hyper-kMrj9H",OLDPWD:"/home/tarvos",TERM_PROGRAM_VERSION:"3.1.4",DESKTOP_SESSION:"ubuntustudio",PYTHON:"/usr/bin/python3",NVM_BIN:"/home/tarvos/.nvm/versions/node/v16.15.1/bin",NVM_INC:"/home/tarvos/.nvm/versions/node/v16.15.1/include/node",XIM:"htt",JAVACMD:"",XDG_SEAT_PATH:"/org/freedesktop/DisplayManager/Seat0",DBUS_SESSION_BUS_ADDRESS:"unix:path=/run/user/1000/bus",COLORTERM:"truecolor",NVM_DIR:"/home/tarvos/.nvm",QT_QPA_PLATFORMTHEME:"qt5ct",GTK_IM_MODULE:"iiim",RSYNC_RSH:"ssh",LOGNAME:"tarvos",OWD:"/home/tarvos",_:"/usr/bin/yarn",XDG_SESSION_CLASS:"user",REMOTE:"dys@madstones.com",CLUTTER_BACKEND:"x11",WEBSITE_DIR:"/home/tarvos/sites",TERM:"xterm-256color",GTK_OVERLAY_SCROLLING:"0",XDG_SESSION_ID:"c2",user:"wjh",LOCAL:".../hashes/",PATH:"/tmp/xfs-9a7cf67b:/tmp/xfs-a03c9b32:/home/tarvos/.local/bin:/home/tarvos/bin:/home/dys/.local/lib/anaconda/bin:/home/tarvos/bin:/usr/local/heroku/bin:/home/tarvos/.local/bin:/home/tarvos/.yarn/bin:/home/tarvos/.nvm/versions/node/v16.15.1/bin:/usr/local/bin:/home/tarvos/.nvm/versions/node/v16.15.1/bin:/tmp/.mount_Hyper-kMrj9H/resources/bin:/home/tarvos/.local/bin:/home/tarvos/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/local/go/bin:/usr/local/go/bin",SESSION_MANAGER:"local/tarvos:@/tmp/.ICE-unix/3508,unix/tarvos:/tmp/.ICE-unix/3508",GOBIN:"/home/tarvos/bin",GDM_LANG:"en_US",APPIMAGE:"/home/tarvos/Desktop/Hyper-3.1.4.AppImage",npm_package_name:"@chievemints/ui",XDG_SESSION_PATH:"/org/freedesktop/DisplayManager/Session0",XDG_MENU_PREFIX:"xfce-",XDG_RUNTIME_DIR:"/run/user/1000",GDK_BACKEND:"x11",DISPLAY:":0.0",LANG:"en_US.UTF-8",XDG_CURRENT_DESKTOP:"XFCE",XMODIFIERS:"@im=htt",XDG_SESSION_DESKTOP:"ubuntustudio",XAUTHORITY:"/home/tarvos/.Xauthority",LS_COLORS:"rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:",TERM_PROGRAM:"Hyper",SSH_AUTH_SOCK:"/run/user/1000/keyring/ssh",GSETTINGS_SCHEMA_DIR:"/tmp/.mount_Hyper-kMrj9H/usr/share/glib-2.0/schemas:",XDG_GREETER_DATA_DIR:"/var/lib/lightdm-data/tarvos",ORIGINAL_XDG_CURRENT_DESKTOP:"XFCE",PROJECT_CWD:"/media/tarvos/APP-DEV-2022/000-NODE-APPS/0-2022/00-CURRENT-SITES/00-CHIEVES-USE-CASE-SPECIFIC",SHELL:"/bin/bash",ARGV0:"/home/tarvos/Desktop/Hyper-3.1.4.AppImage",GOPATH:"/Users/tarvos/go",npm_package_version:"0.3.4",npm_lifecycle_event:"build",QT_ACCESSIBILITY:"1",PROMPT_COMMAND:"",GDMSESSION:"ubuntustudio",YARN_IGNORE_CWD:"1",LESSCLOSE:"/usr/bin/lesspipe %s %s",GPG_AGENT_INFO:"/run/user/1000/gnupg/S.gpg-agent:0:1",XDG_VTNR:"7",PWD:"/media/tarvos/APP-DEV-2022/000-NODE-APPS/0-2022/00-CURRENT-SITES/00-CHIEVES-USE-CASE-SPECIFIC/packages/ui",LC_ALL:"en_US.UTF-8",BERRY_BIN_FOLDER:"/tmp/xfs-9a7cf67b",npm_execpath:"/tmp/xfs-9a7cf67b/yarn",XDG_CONFIG_DIRS:"/etc/xdg/xdg-ubuntustudio:/etc/xdg:/etc/xdg",ANDROID_HOME:"/home/tarvos/code/adt/sdk/",NVM_CD_FLAGS:"",XDG_DATA_DIRS:"/tmp/.mount_Hyper-kMrj9H/usr/share/:./share/:/usr/share/gnome:/usr/local/share/:/usr/share/:/usr/share/ubuntustudio:/usr/share/xfce4:/usr/local/share:/usr/share:/var/lib/snapd/desktop:/usr/share:/usr/share/gnome/:/usr/local/share/:/usr/share/",STARSHIP_SESSION_KEY:"8681185514936528",EDITOR:"code --wait",VERBOSE:"t",INIT_CWD:"/media/tarvos/APP-DEV-2022/000-NODE-APPS/0-2022/00-CURRENT-SITES/00-CHIEVES-USE-CASE-SPECIFIC/packages/ui",NODE_ENV:"production"}.IPFS_LINK_PATTERN||"https://ipfs.io/ipfs/{cid}/{path}",r="https://cred.freeweb3.com/#/view"},60146:(e,t,n)=>{n.d(t,{B9:()=>b,DM:()=>E,Ke:()=>h,YC:()=>f,_m:()=>c,gu:()=>p,hY:()=>d,kC:()=>s,pc:()=>g,xb:()=>u});var a=n(75361),r=n(51002),l=n(4301),o=n(50725),i=n(96596),m=n.n(i);const c=e=>{const[,t,n]=e?.match(/^(?:ipfs|dweb):(?:\/\/)?([^/]+)(?:\/(.*))?$/)??[];if(t){const e=a.CID.parse(t),l=e.toV0().toString(),o=e.toV1().toString(),i=r.F;return encodeURI(i.replace(/{cid}/g,t).replace(/{v0cid}/g,l).replace(/{v1cid}/g,o).replace(/{path}/g,n??"")).replace(/#/g,"%23")}return e},s=e=>e?.split?e.trim().split(/\s+/g).map((e=>`${e[0]?.toUpperCase()??""}${e.substring(1)?.toLowerCase()??""}`)).join(" "):e,u=e=>Array.isArray(e)?0===e.length:e instanceof Object?0===Object.keys(e).length:""===e,E=e=>""!==e&&null!=e,p=async e=>{try{await(window.ethereum.request?.({method:"wallet_switchEthereumChain",params:[{chainId:e}]}))}catch(t){throw 4902===t.code?new Error(`The network “${l.g[e].name??"Unknown"}” is not yet available in your MetaMask.\n\n Please add it.`):t}},d=async e=>{let t=e;if(Array.isArray(t)&&"string"==typeof t[0]){const e=t.length;if(1!==e)throw new Error(`Unexpected ${e} entries in string array passed to ipfsify.`);t=t[0]}if("string"==typeof t){if(t.startsWith("ipfs://"))return[t];throw new Error(`Unknown File String: ${t}`)}const n=Array.isArray(t)?t:[t],a=await m()(o.Z.ipfs.addAll(n.map((e=>({path:e.name,content:e.content??e}))),{pin:!0,wrapWithDirectory:!0})),[{cid:r}]=a.slice(-1);return n.map((e=>`ipfs://${r.toString()}/`+e.name))},g=e=>{if(!e)return e;let t=e.split(/((\w)\2{3,})/g);for(let e=0;e<t.length-1;e++){const n=t[e],a=t[e+1];1===new Set([...n,...a]).size&&(t[e]+=a,t[e+1]="",e++)}return t=t.filter((e=>""!==e)),t.map((e=>{const[t]=e;return e.length>3&&/\w/.test(t)&&1===new Set(e).size?`${t}{${e.length-1}}`:e})).join("")},h=e=>e?e.split(/(\w\{\d+\})/).map((e=>{const[t,n,a]=e.match(/^(.)\{(\d+)\}/)??[];return n&&a?n.repeat(Number(a)):e})).join(""):e,b=e=>e?.error?.message??e?.data?.message??e?.message??e,f=e=>{if(null==e)return[];const t=e.split(/\s*(\s|,)\s*/).filter((e=>!["",","].includes(e.trim())));return t.map((e=>{const t=e.split(/-/);if(t.length>1){const[[e],[n]]=[t,t.slice(-1)];return Object.fromEntries(Object.entries({low:e,high:n}).map((([e,t])=>[e,Number(t)])))}return Number(e)}))}}}]);