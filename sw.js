


self.addEventListener('fetch', event => {

    const offlineResp = new Response(`
    
        Bienvenido a mi Página Web

        Disculpa, pero para usarla, necesitas internet
    
    `);

    // const offlineResp = new Response(`
    
    // <!DOCTYPE html>
    // <html lang="en">
    // <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //     <title>Mi PWA</title>

    // </head>
    // <body class="container p-3">
    
    // <h1>Offline Mode</h1>
    
    // </body>
    // </html>
    // `, {
    //     headers: {
    //         'Content-Type':'text/html'
    //     }
    // });


    // const offlineResp = fetch( 'pages/offline.html' );


    const resp = fetch(event.request)
                    .catch( () => offlineResp );


    event.respondWith( resp  );

});

 self.addEventListener('fetch',e=>{
      //   2- Cache with Network Fallback
      const respuesta = caches.match( e.request )
      .then( res => {

          if ( res ) return res;

           return fetch( e.request ).then( newResp => {

              caches.open( CACHE_DYNAMIC_NAME )
                  .then( cache => {
                      cache.put( e.request, newResp );
                      limpiarCache( CACHE_DYNAMIC_NAME, 50 );
                  });

              return newResp.clone();
         }).catch(err =>{
          if(e.request.headres.get('acept').includes('text/html')){
            return caches.match('/pages/offline.html');
          }
         });
     });
    });