const staticCacheName= 's-app-v1'
const assetsUrls = [
	"/metronome/favicon.ico",
	"/metronome/browserconfig.xml",

	"/metronome/manifest.webmanifest",
	"/metronome/index.html",

	"/metronome/media/sounds/hi-hat/0.mp3",
	"/metronome/media/sounds/hi-hat/1.mp3",
	"/metronome/media/sounds/hi-hat2/0.mp3",
	"/metronome/media/sounds/hi-hat2/1.mp3",
	"/metronome/media/sounds/rim-shot/0.mp3",
	"/metronome/media/sounds/rim-shot/1.mp3",
	"/metronome/media/sounds/rim-shot2/0.mp3",
	"/metronome/media/sounds/rim-shot2/1.mp3",
	"/metronome/js/app.js",
	"/metronome/js/app.js.map",
	"/metronome/js/chunk-vendors.js",
	"/metronome/js/chunk-vendors.js.map",
	"/metronome/css/app.css",
	"/metronome/css/app.css.map",
	"/metronome/img/volume.png",
]
self.addEventListener('install', async event=>{
	console.log('sw install');
	const cache = await caches.open(staticCacheName)
	await cache.addAll(assetsUrls)
})

self.addEventListener('activate', async event=>{
	console.log('sw activate');
	const cacheNames = await caches.keys();
	await Promise.all(cacheNames.filter(name=>name !== staticCacheName).map(name=>caches.delete(name)))
})

self.addEventListener('fetch', async event=>{
	if(event.request.url != "https://ketjo.github.io/metronome/") event.respondWith(cacheFirst(event.request));
})

async function cacheFirst(request){
	const cached = await caches.match(request);
	return cached ?? fetch(request);
}
