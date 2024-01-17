'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "181e62fe1f1c1155257a85bbdf203b7b",
"assets/AssetManifest.bin.json": "26f4fbdb5b83d3ee3fcd9216f97960b0",
"assets/AssetManifest.json": "ed5c9266dd609f7b3f8f79372a389cee",
"assets/assets/fonts/myFont.ttf": "c3191f3b933ae0bd46335e178744326e",
"assets/assets/fonts/myFont2.ttf": "e936c2ac07d7faf3d4b459633e1e174f",
"assets/assets/fonts/myfont3.ttf": "e936c2ac07d7faf3d4b459633e1e174f",
"assets/assets/images/facebook%2520(1).png": "8c89ef8ab45d47ae9a954822532889f7",
"assets/assets/images/facebook.png": "b462b644826c64fe9fc4f5ded2d4a190",
"assets/assets/images/img.png": "e6bcdcd29466e5fd302949b2ac0b2066",
"assets/assets/images/img3.jpg": "77f6969c16a1a1802a890c796d6992e2",
"assets/assets/images/img_1.png": "e1a2d3eed4bf61e6fa4c919d8ad4ccab",
"assets/assets/images/img_2.png": "50cd98d1040f44e9db3a4d75b54f8eb4",
"assets/assets/images/insta.png": "e649739d7cf28f2cc36e3c3c5edbd3bc",
"assets/assets/images/instagram%2520(1).png": "5c570427ee23f69853d28aec805eee79",
"assets/assets/images/linkedin%2520(1).png": "d492efc706db983e74258dbd348f2208",
"assets/assets/images/myImage.jpg": "6bb90278cd2b361062083dca86612dca",
"assets/assets/images/myImage1.jpg": "45284b1dcdbb5dc525d48c603f4d630f",
"assets/assets/images/newImage.jpg": "0ae92fd9e7ed525ca05f06e8067d2530",
"assets/assets/images/pic1.jpg": "9e6fec58e1a610d118592b4321700ebf",
"assets/assets/images/pic2.jpg": "9b28c80a4e4521d1c17427f185f8a326",
"assets/assets/images/pic3.jpg": "53afe3693fb27ce50a4213049eab4855",
"assets/assets/images/pic4.jpg": "2a2ecb5b40a21cc713daa318ccd89dbf",
"assets/assets/images/pic5.jpg": "ff5622ed97faebc8bca75d045e117824",
"assets/assets/images/pic6.jpg": "d360ed379538a8f6f24d4ef892c2b742",
"assets/assets/images/watsapp.png": "f515116295769d67a99bbb7b6600fa69",
"assets/assets/images/watsapp1.png": "8bc198303253612887ea60b41f696fca",
"assets/assets/images/whatsapp%2520(1).png": "704b06004a3879651f5a4002c606115d",
"assets/FontManifest.json": "287bf2dc4e38a1b0b4390e04f66da37e",
"assets/fonts/MaterialIcons-Regular.otf": "6411eabc195371832500e382a69efe93",
"assets/NOTICES": "87c586f9f2ce988775d913f504d3ac54",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "06dff8159044a695e7ae62675292c0a8",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "96318dfdde1bfd30e3d03128371ee16f",
"/": "96318dfdde1bfd30e3d03128371ee16f",
"main.dart.js": "744c6d84807aceafac966e6c1a7c3a80",
"manifest.json": "bcabe0c3a7634f9b6e73855557ab0d9f",
"version.json": "90e7c1a89725cc7aefce734268207eee"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
