'use strict';

const note = require('note-log');
const express = require('express');

module.exports = function() {
    const app = express();

    app.use(express.static('public'));

    app.listen(5000, () => {
        note('server', 0, 'Listening on port 5000');
    });
};
