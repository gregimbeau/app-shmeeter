if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let d={};const o=e=>s(e,t),c={module:{uri:t},exports:d,require:o};i[t]=Promise.all(r.map((e=>c[e]||o(e)))).then((e=>(n(...e),d)))}}define(["./workbox-56a10583"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-8b03cdce.css",revision:null},{url:"assets/index-bb884241.js",revision:null},{url:"index.html",revision:"f56e1af3443a2f09edeac5d51a1ddced"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"sw.js",revision:"937c262cce5f950d8e1af54bb04e4132"},{url:"vite.svg",revision:"f1339cb19d58dd2afc31ba4b876edf14"},{url:"workbox-56a10583.js",revision:null},{url:"vite.svg",revision:"f1339cb19d58dd2afc31ba4b876edf14"},{url:"manifest.webmanifest",revision:"acc40862b7f63f62b5e7d538041e412b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
