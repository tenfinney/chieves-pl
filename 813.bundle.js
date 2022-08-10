"use strict";(self.webpackChunk_chievemints_ui=self.webpackChunk_chievemints_ui||[]).push([[813,772],{4772:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r="0xa77e11B845e31e2c24dDc004fb8f93759C097274"},30813:(e,t,n)=>{n.r(t),n.d(t,{Owners:()=>E,default:()=>$});var r=n(97301),a=n(70618),s=n(33541),o=n(64033),l=n(14738),i=n(2784),c=n(60146),u=n(44341),f=n(4772),d=n(10289),m=n(62833),w=n(18671);const g=(0,s.m$)(m.rU),h=r.Ps`
  query NFTOwners(
    $tokenId: String
    $contractAddress: String
    $startAfter: String
  ) {
    nfts(where:{ 
      contract: $contractAddress,
      tokenID: $tokenId
    }) {
      ownership(where: {
        id_gt: $startAfter
      }) {
        id
        owner
        quantity
      }
    }
  }
`,E=()=>{const{nftId:e}=(0,d.UO)(),[t]=(0,m.lr)(),n=t.get("start_after")??"",r=t.get("offset")??0,s=(0,i.useMemo)((()=>(0,c.Ke)(Array.isArray(e)?e[0]:e)),[e]),[E,$]=(0,i.useState)([]),k=s?BigInt(s).toString(10):null,{loading:y,error:S,data:p}=(0,a.a)(h,{variables:{tokenId:k,contractAddress:f.default.toLowerCase(),startAfter:n}});console.log({data:p});const[A,_]=(0,i.useState)("𝘜𝘯𝘬𝘯𝘰𝘸𝘯"),{ensProvider:C,roContract:I}=(0,l.$6)();return(0,i.useEffect)((()=>{(async()=>{if(s){const e=await(I?.uri(s));if(!e)return;const t=await fetch((0,c._m)(e)),n=await t.json();_(n.name)}})()}),[s,I]),(0,i.useEffect)((()=>{(async()=>{if(p){if(p.nfts.length>1)throw new Error(`Got ${p.nfts.length} Digital Token`);1===p.nfts.length&&$(await Promise.all(p.nfts[0].ownership.map((async e=>{let{owner:t}=e;const n=await(C?.lookupAddress(t));n&&(t=n);const{quantity:r,id:a}=e;return{owner:t,quantity:r,id:a}}))))}})()}),[p,C]),y?i.createElement(i.Fragment,null,"Loading…"):S?i.createElement(i.Fragment,null,`Error! ${S.message}`):i.createElement(o.xu,{ml:8},i.createElement(w.q,null,i.createElement("title",null,"Owners")),i.createElement(u.dL,null),i.createElement(o.X6,{mt:10,fontSize:20},A),0===E.length?i.createElement(o.xv,null,"Could not find an NFT with id ",e,"."):i.createElement(o.GS,{start:Number(r)+1},E.map((({owner:e,quantity:t},n)=>i.createElement(o.HC,{key:n,ml:6},`${e} (${t})`)))),100===E.length&&i.createElement(g,{to:{pathname:`/owners?${new URLSearchParams({nftId:e,start_after:E.slice(-1)[0].id,offset:(Number(r)+100).toString()})}`}},"Next"))},$=E}}]);