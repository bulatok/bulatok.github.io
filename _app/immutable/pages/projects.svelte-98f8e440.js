import{S as C,i as E,s as S,e as p,t as w,k as y,c as u,a as h,h as z,d as m,m as L,b as g,g as j,F as c,j as A,n as q,x as _,y as d,z as v,r as k,p as b,C as I}from"../chunks/index-c83d7424.js";function V(l){let t,r,a,i,o,n,e;return{c(){t=p("div"),r=p("h1"),a=p("a"),i=w(l[0]),o=y(),n=p("p"),e=w(l[2]),this.h()},l(s){t=u(s,"DIV",{class:!0});var f=h(t);r=u(f,"H1",{});var N=h(r);a=u(N,"A",{href:!0,class:!0});var x=h(a);i=z(x,l[0]),x.forEach(m),N.forEach(m),o=L(f),n=u(f,"P",{});var P=h(n);e=z(P,l[2]),P.forEach(m),f.forEach(m),this.h()},h(){g(a,"href",l[1]),g(a,"class","svelte-1nsq0sa"),g(t,"class","glop svelte-1nsq0sa")},m(s,f){j(s,t,f),c(t,r),c(r,a),c(a,i),c(t,o),c(t,n),c(n,e)},p(s,[f]){f&1&&A(i,s[0]),f&2&&g(a,"href",s[1]),f&4&&A(e,s[2])},i:q,o:q,d(s){s&&m(t)}}}function D(l,t,r){let{Name:a}=t,{Link:i}=t,{Info:o}=t;return l.$$set=n=>{"Name"in n&&r(0,a=n.Name),"Link"in n&&r(1,i=n.Link),"Info"in n&&r(2,o=n.Info)},[a,i,o]}class $ extends C{constructor(t){super(),E(this,t,D,V,S,{Name:0,Link:1,Info:2})}}function F(l){let t,r,a,i,o,n;return t=new $({props:{Name:"Ozon intern task",Link:"https://github.com/bulatok/ozon-task",Info:"API that makes links shorter. I used golang, docker-compose, postgreSQL."}}),a=new $({props:{Name:"Cryptocurrency exchange rates API wrapper",Link:"https://github.com/bulatok/bestchange-api",Info:"Wrapped the private API, which parses zip file containing all cryptocurrency exchange rates. Used golang and CI tools from github"}}),o=new $({props:{Name:"Telegram and VK bots",Link:"https://github.com/bulatok",Info:"Most of them are in private repo"}}),{c(){_(t.$$.fragment),r=y(),_(a.$$.fragment),i=y(),_(o.$$.fragment)},l(e){d(t.$$.fragment,e),r=L(e),d(a.$$.fragment,e),i=L(e),d(o.$$.fragment,e)},m(e,s){v(t,e,s),j(e,r,s),v(a,e,s),j(e,i,s),v(o,e,s),n=!0},p:q,i(e){n||(k(t.$$.fragment,e),k(a.$$.fragment,e),k(o.$$.fragment,e),n=!0)},o(e){b(t.$$.fragment,e),b(a.$$.fragment,e),b(o.$$.fragment,e),n=!1},d(e){I(t,e),e&&m(r),I(a,e),e&&m(i),I(o,e)}}}class K extends C{constructor(t){super(),E(this,t,null,F,S,{})}}export{K as default};
