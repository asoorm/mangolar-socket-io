# mangolar-socket.io
Socket.io Provider for AngularJS

## Installation

`bower install mangolar-socket-io`

## How to use

```javascript
angular
    .module("myApp", ['mangolar-socket.io'])
    .config(function($mangolarSocketIoProvider) {
        $mangolarSocketIoProvider.setConnectionUrl("http://localhost:4000");
    })
    .controller("MyController", MyController)
    .service("SpotService", SpotService);

function MyController($mangolarSocketIo) {
    
    $mangolarSocketIo.on("ping", function(data) {
        console.log('ping:', data);
    });
}
```