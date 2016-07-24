'use strict';

const ws = new WebSocket('ws://socket.sensor.unknown.name/');

const temperature = document.querySelector('#temperature');
const humidity = document.querySelector('#humidity');

const log = [];

ws.addEventListener('message', msg => {
    const info = JSON.parse(msg.data);

    temperature.textContent = info.temperature + '°C';
    humidity.textContent = info.humidity + '%';

    log.push(info);

    const data = {
        series: [
            log.map(item => item.temperature),
            log.map(item => item.humidity)
        ]
    };

    const options = {
        width: 800,
        height: 500,
        low: 0,
        high: 100,
        referenceValue: 0
    };

    new Chartist.Line('.ct-chart', data, options);
});
