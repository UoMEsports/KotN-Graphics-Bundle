'use strict';

module.exports = function (nodecg) {
	const NanoTimer = require('nanotimer');
	const TimeObject = require('../shared/classes/time-object');

	const timer = new NanoTimer();
	const timerRep = nodecg.Replicant('timer', {
		defaultValue: (function () {
			const to = new TimeObject(60);
			to.running = false;
			return to;
		})()
	});

	// Load the existing time and start the timerRep at that.
	if (timerRep.value.running) {
		start();
	}

	nodecg.listenFor('startTimer', start);
	nodecg.listenFor('stopTimer', stop);
	nodecg.listenFor('resetTimer', reset);
	nodecg.listenFor('setTimer', setEnd);

	/**
	 * Starts the timer.
	 * @returns {undefined}
	 */
	function start() {
		timer.clearInterval();
		timerRep.value.running = true;
		timer.setInterval(tick, '', '1s');
	}

	/**
	 * Decrements the timer by one second.
	 * @returns {undefined}
	 */
	function tick() {
		TimeObject.decrement(timerRep.value);
		if (timerRep.value.raw <= 0) {
			stop();
		}
	}

	/**
	 * Stops the timer.
	 * @returns {undefined}
	 */
	function stop() {
		timer.clearInterval();
		timerRep.value.running = false;
	}

	/**
	 * Stops and resets the timer
	 * @returns {undefined}
	 */
	function reset() {
		stop();
		TimeObject.setSeconds(timerRep.value, 0);
	}

	function setEnd(ts) {
		timer.clearInterval();
		TimeObject.setSeconds(ts - (new Date).getTime());
		timer.setInterval(tick, '', '1s');
	}
}