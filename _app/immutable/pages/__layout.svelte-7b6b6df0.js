import{S as _e,i as ue,s as he,e as f,t as y,c,a as d,h as S,d as r,b as i,g as Q,F as t,j as de,n as X,G as we,x as M,k as j,y as T,m as A,z as K,H as ke,I as Ie,J as je,r as F,p as J,C as O}from"../chunks/index-c83d7424.js";function Ae(u){let e,l,_,a,o,s,z,v;return{c(){e=f("div"),l=f("div"),_=f("li"),a=f("a"),o=y(u[0]),s=f("span"),z=y(u[1]),v=f("a"),this.h()},l(h){e=c(h,"DIV",{class:!0});var p=d(e);l=c(p,"DIV",{class:!0});var P=d(l);_=c(P,"LI",{});var U=d(_);a=c(U,"A",{href:!0,class:!0});var E=d(a);o=S(E,u[0]),s=c(E,"SPAN",{class:!0});var b=d(s);z=S(b,u[1]),b.forEach(r),v=c(E,"A",{class:!0});var w=d(v);w.forEach(r),E.forEach(r),U.forEach(r),P.forEach(r),p.forEach(r),this.h()},h(){i(s,"class","endSocialItemSpan svelte-1dw1ji7"),i(v,"class","svelte-1dw1ji7"),i(a,"href",u[2]),i(a,"class","svelte-1dw1ji7"),i(l,"class","svelte-1dw1ji7"),i(e,"class","svelte-1dw1ji7")},m(h,p){Q(h,e,p),t(e,l),t(l,_),t(_,a),t(a,o),t(a,s),t(s,z),t(a,v)},p(h,[p]){p&1&&de(o,h[0]),p&2&&de(z,h[1]),p&4&&i(a,"href",h[2])},i:X,o:X,d(h){h&&r(e)}}}function De(u,e,l){let{nameStart:_}=e,{nameEnd:a}=e,{link:o}=e;return u.$$set=s=>{"nameStart"in s&&l(0,_=s.nameStart),"nameEnd"in s&&l(1,a=s.nameEnd),"link"in s&&l(2,o=s.link)},[_,a,o]}class W extends _e{constructor(e){super(),ue(this,e,De,Ae,he,{nameStart:0,nameEnd:1,link:2})}}function xe(u){let e,l,_;return{c(){e=f("div"),l=f("div"),_=y(u[0]),this.h()},l(a){e=c(a,"DIV",{class:!0});var o=d(e);l=c(o,"DIV",{id:!0,class:!0});var s=d(l);_=S(s,u[0]),s.forEach(r),o.forEach(r),this.h()},h(){i(l,"id","currecny_rate_USD"),i(l,"class","navbar_currency_rate"),i(e,"class","navbar_currency")},m(a,o){Q(a,e,o),t(e,l),t(l,_)},p(a,[o]){o&1&&de(_,a[0])},i:X,o:X,d(a){a&&r(e)}}}function Ve(u,e,l){let _="wait..";function a(){fetch("https://api.coindesk.com/v1/bpi/currentprice.json").then(s=>s.json()).then(s=>{l(0,_=`BTC/USD ${s.bpi.USD.rate_float}`)})}return a(),[_]}class Le extends _e{constructor(e){super(),ue(this,e,Ve,xe,he,{})}}function Ce(u){let e,l,_,a,o,s,z,v,h,p,P,U,E,b,w,Y,Z,ee,H,k,N,te,ae,se,G,$,D,ne,x,le,V,re,L,R,C,q;l=new Le({}),D=new W({props:{nameStart:"Linked",nameEnd:"in",link:"https://www.linkedin.com/in/bulat-kutlugallyamov-86506921b/"}}),x=new W({props:{nameStart:"Git",nameEnd:"Hub",link:"https://github.com/bulatok"}}),V=new W({props:{nameStart:"Habr",nameEnd:"Career",link:"https://career.habr.com/bulatok"}}),L=new W({props:{nameStart:"bulat2020205",nameEnd:"@gmail.com",link:"mailto:bulat2020205@gmail.com"}});const ie=u[1].default,m=we(ie,u,u[0],null);return{c(){e=f("nav"),M(l.$$.fragment),_=j(),a=f("div"),o=f("div"),s=f("ul"),z=f("li"),v=f("a"),h=f("span"),p=y("01. "),P=y("Home"),U=j(),E=f("li"),b=f("a"),w=f("span"),Y=y("02. "),Z=y("Projects"),ee=j(),H=f("li"),k=f("a"),N=f("span"),te=y("03."),ae=y(`
					   Articles`),se=j(),G=f("div"),$=f("ul"),M(D.$$.fragment),ne=j(),M(x.$$.fragment),le=j(),M(V.$$.fragment),re=j(),M(L.$$.fragment),R=j(),C=f("div"),m&&m.c(),this.h()},l(n){e=c(n,"NAV",{});var g=d(e);T(l.$$.fragment,g),_=A(g),a=c(g,"DIV",{class:!0});var ve=d(a);o=c(ve,"DIV",{class:!0});var me=d(o);s=c(me,"UL",{class:!0});var B=d(s);z=c(B,"LI",{class:!0});var ge=d(z);v=c(ge,"A",{href:!0,class:!0});var oe=d(v);h=c(oe,"SPAN",{class:!0});var pe=d(h);p=S(pe,"01. "),pe.forEach(r),P=S(oe,"Home"),oe.forEach(r),ge.forEach(r),U=A(B),E=c(B,"LI",{class:!0});var $e=d(E);b=c($e,"A",{href:!0,class:!0});var fe=d(b);w=c(fe,"SPAN",{class:!0});var ze=d(w);Y=S(ze,"02. "),ze.forEach(r),Z=S(fe,"Projects"),fe.forEach(r),$e.forEach(r),ee=A(B),H=c(B,"LI",{class:!0});var Ee=d(H);k=c(Ee,"A",{href:!0,class:!0});var ce=d(k);N=c(ce,"SPAN",{class:!0});var be=d(N);te=S(be,"03."),be.forEach(r),ae=S(ce,`
					   Articles`),ce.forEach(r),Ee.forEach(r),B.forEach(r),me.forEach(r),ve.forEach(r),se=A(g),G=c(g,"DIV",{class:!0});var ye=d(G);$=c(ye,"UL",{class:!0});var I=d($);T(D.$$.fragment,I),ne=A(I),T(x.$$.fragment,I),le=A(I),T(V.$$.fragment,I),re=A(I),T(L.$$.fragment,I),I.forEach(r),ye.forEach(r),g.forEach(r),R=A(n),C=c(n,"DIV",{class:!0});var Se=d(C);m&&m.l(Se),Se.forEach(r),this.h()},h(){i(h,"class","header_counter_1 svelte-60fnzg"),i(v,"href","/"),i(v,"class","first svelte-60fnzg"),i(z,"class","header_item_0 svelte-60fnzg"),i(w,"class","header_counter_1 svelte-60fnzg"),i(b,"href","/projects"),i(b,"class","first svelte-60fnzg"),i(E,"class","header_item_1 svelte-60fnzg"),i(N,"class","header_counter_2 svelte-60fnzg"),i(k,"href","/homies"),i(k,"class","second svelte-60fnzg"),i(H,"class","header_item_2 svelte-60fnzg"),i(s,"class","header_list svelte-60fnzg"),i(o,"class","header_header svelte-60fnzg"),i(a,"class","container_inner"),i($,"class","socials_list svelte-60fnzg"),i(G,"class","my_list svelte-60fnzg"),i(C,"class","conatainer")},m(n,g){Q(n,e,g),K(l,e,null),t(e,_),t(e,a),t(a,o),t(o,s),t(s,z),t(z,v),t(v,h),t(h,p),t(v,P),t(s,U),t(s,E),t(E,b),t(b,w),t(w,Y),t(b,Z),t(s,ee),t(s,H),t(H,k),t(k,N),t(N,te),t(k,ae),t(e,se),t(e,G),t(G,$),K(D,$,null),t($,ne),K(x,$,null),t($,le),K(V,$,null),t($,re),K(L,$,null),Q(n,R,g),Q(n,C,g),m&&m.m(C,null),q=!0},p(n,[g]){m&&m.p&&(!q||g&1)&&ke(m,ie,n,n[0],q?je(ie,n[0],g,null):Ie(n[0]),null)},i(n){q||(F(l.$$.fragment,n),F(D.$$.fragment,n),F(x.$$.fragment,n),F(V.$$.fragment,n),F(L.$$.fragment,n),F(m,n),q=!0)},o(n){J(l.$$.fragment,n),J(D.$$.fragment,n),J(x.$$.fragment,n),J(V.$$.fragment,n),J(L.$$.fragment,n),J(m,n),q=!1},d(n){n&&r(e),O(l),O(D),O(x),O(V),O(L),n&&r(R),n&&r(C),m&&m.d(n)}}}function Pe(u,e,l){let{$$slots:_={},$$scope:a}=e;return u.$$set=o=>{"$$scope"in o&&l(0,a=o.$$scope)},[a,_]}class He extends _e{constructor(e){super(),ue(this,e,Pe,Ce,he,{})}}export{He as default};
