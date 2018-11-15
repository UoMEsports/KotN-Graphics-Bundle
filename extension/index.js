'use strict';

module.exports = function (nodecg) {
	const timer = require('./timer')(nodecg);
	const playerStats = require('./player-stats')(nodecg);
};
