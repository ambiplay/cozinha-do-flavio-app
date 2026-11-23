// Gerado por montar-app.mjs. Guarda tudo no aparelho e responde primeiro do que está guardado.
const VERSAO="cozinha-17ea484f8c";
const ARQUIVOS=["./","index.html","manifest.webmanifest","fontes/figtree.woff2","fontes/young-serif.woff2","icone-192.png","icone-512.png","icone-maskable-512.png"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(VERSAO).then(c=>c.addAll(ARQUIVOS.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("cozinha-")&&k!==VERSAO).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.open(VERSAO).then(async c=>{
    const achou=await c.match(r,{ignoreSearch:true})||(r.mode==="navigate"?await c.match("index.html"):null);
    if(achou)return achou;
    try{return await fetch(r)}catch{return new Response("Sem internet.",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8"}})}
  }));
});
