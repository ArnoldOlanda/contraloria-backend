if(!self.define){let e,i={};const c=(c,n)=>(c=new URL(c+".js",n).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,r)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let a={};const o=e=>c(e,s),l={module:{uri:s},exports:a,require:o};i[s]=Promise.all(n.map((e=>l[e]||o(e)))).then((e=>(r(...e),a)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"5de54b7b61d8bb13bd9a9c0aec0cca50"},{url:"assets/index-4sK4E3Wk.css",revision:null},{url:"assets/index-YnIXOLyF.js",revision:null},{url:"assets/react-h3aPdYU7.svg",revision:null},{url:"favicon-16x16.png",revision:"4ee7c962e542d284edc985ed30a08f7e"},{url:"favicon-32x32.png",revision:"99afd8f026d480fae898f9d894c97d53"},{url:"favicon.ico",revision:"020f612d4e954f3e917673913e0bbf92"},{url:"index.html",revision:"399914a0ffdac2ab58301f3aeb5b3b6d"},{url:"pwa-192x192.png",revision:"22ce9784ca878ee34ad19896b6ccef16"},{url:"pwa-512x512.png",revision:"8e66c4a30393ec850c68b13331c020ec"},{url:"pwa-maskable-192x192.png",revision:"9b42e7e6c3524e800c6b2216ebad1f9c"},{url:"pwa-maskable-512x512.png",revision:"bc0bec3038109befd7a40c1cb8532575"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"favicon.ico",revision:"020f612d4e954f3e917673913e0bbf92"},{url:"apple-touch-icon.png",revision:"5de54b7b61d8bb13bd9a9c0aec0cca50"},{url:"pwa-192x192.png",revision:"22ce9784ca878ee34ad19896b6ccef16"},{url:"pwa-512x512.png",revision:"8e66c4a30393ec850c68b13331c020ec"},{url:"manifest.webmanifest",revision:"0841c6aea677d68142a4a3820a237acc"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));