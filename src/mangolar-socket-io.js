(function() {
    "use strict";

    angular
        .module('mangolar-socket.io', [])
        .provider("$mangolarSocketIo", $mangoSocketProvider);

    function $mangoSocketProvider() {

        var self = this;

        var ioUrl = 'http://localhost:4000';
        var ioConfig = {};

        self.setConnectionUrl = setConnectionUrl;
        self.setResource = setResource;
        self.setConnectTimeout = setConnectTimeout;
        self.setTryMultipleTransports = setTryMultipleTransports;
        self.setReconnect = setReconnect;
        self.setReconnectionDelay = setReconnectionDelay;
        self.setReconnectionLimit = setReconnectionLimit;
        self.setMaxReconnectionAttempts = setMaxReconnectionAttempts;
        self.setSyncDisconnectOnUnload = setSyncDisconnectOnUnload;
        self.setAutoConnect = setAutoConnect;
        self.setFlashPolicyPort = setFlashPolicyPort;
        self.setForceNewConnection = setForceNewConnection;
        self.$get = $socketFactory;

        function setConnectionUrl(value) {
            if (typeof value != 'string') {
                throw new TypeError("'%s' must be of type '%s'", name, type);
            }

            ioUrl = value;
        }

        function setResource(value) {
            setOption('resource', value, 'string');
        }

        function setConnectTimeout(value) {
            setOption('connect timeout', value, 'number');
        }

        function setTryMultipleTransports(value) {
            setOption('try multiple transports', value, 'boolean');
        }

        function setReconnect(value) {
            setOption('reconnect', value, 'boolean');
        }

        function setReconnectionDelay(value) {
            setOption('reconnection delay', value, 'number');
        }

        function setReconnectionLimit(value) {
            setOption('reconnection limit', value, 'number');
        }

        function setMaxReconnectionAttempts(value) {
            setOption('max reconnection attempts', value, 'number');
        }

        function setSyncDisconnectOnUnload(value) {
            setOption('sync disconnect on unload', value, 'boolean');
        }

        function setAutoConnect(value) {
            setOption('auto connect', value, 'boolean');
        }

        function setFlashPolicyPort(value) {
            setOption('flash policy port', value, 'number');
        }

        function setForceNewConnection(value) {
            setOption('force new connection', value, 'boolean');
        }

        function setOption(name, value, type) {
            if (typeof value != type) {
                throw new TypeError("'%s' must be of type '%s'", name, type);
            }

            ioConfig[name] = value;
        }

        function $socketFactory($rootScope) {

            var socket = io(ioUrl, ioConfig);

            return {
                on: on,
                off: off,
                emit: emit
            };

            function on(event, callback) {
                socket.on(event, function() {
                    var args = arguments;

                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            }

            function off(event, callback) {
                if (typeof callback == 'function') {
                    socket.removeListener(event, callback);
                } else {
                    socket.removeAllListeners(event);
                }
            }

            function emit(event, data, callback) {
                if (typeof callback == 'function') {
                    socket.emit(event, data, function() {
                        var args = arguments;

                        $rootScope.$apply(function() {
                            callback.apply(socket, args);
                        });
                    });
                } else {
                    socket.emit(event, data);
                }
            }
        }
    }
})();
