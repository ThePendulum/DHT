'use strict';

const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyACM0');
const WebSocket = require('ws').Server;
const fs = require('fs');

require('./server.js')();

const wss = new WebSocket({port: 5001});

const info = {
    temperature: 0,
    humidity: 0
};

port.on('data', data => {
    Object.assign(info, JSON.parse(data.toString()));
});

wss.on('connection', ws => {
    const update = function() {
        if(ws.readyState === 1) {
            ws.send(JSON.stringify(info));

            setTimeout(() => {
                update();
            }, 1000);
        }
    };

    update();
});

port.on('error', error => {
    console.log(error);
});
