/**
 * Copyright (C) 2018 Daniel Shields
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

module.exports = function (nodecg) {
	const NanoTimer = require('nanotimer');
	const TimeObject = require('../shared/lib/vendor/time-object');

	const timer = new NanoTimer();
	const timerRep = nodecg.Replicant('timer', {
		defaultValue: (function () {
			const to = new TimeObject(300);
			to.running = false;
			to.hidden = false;
			to.text = 'UP NEXT';
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
	nodecg.listenFor('setTimer', setDuration);
	nodecg.listenFor('setTimerEnd', setEnd);
	nodecg.listenFor('showHideTimer', showHide);
	nodecg.listenFor('setTimerText', setText);

	/**
	 * Starts the timer.
	 * @returns {undefined}
	 */
	function start() {
		timer.clearInterval();
		if (timerRep.value.raw <= 0) {
			timerRep.value.running = false;
			return;
		}
		timerRep.value.running = true;
		timer.setInterval(tick, '', '1s');
	}

	/**
	 * Decrements the timer by one second.
	 * @returns {undefined}
	 */
	function tick() {
		TimeObject.decrement(timerRep.value);
		if (timerRep.value.raw < 1) {
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

	/**
	 * Sets the timer to end at a specific timestamp
	 * @param {number} ts - Unix timestamp at which to end timer
	 * @returns {undefined}
	 */
	function setEnd(ts) {
		const timeDiff = Math.max(ts - ((new Date).getTime() / 1000), 0);
		if (timeDiff < 1) {
			stop();
		}

		TimeObject.setSeconds(timerRep.value, timeDiff);
	}

	/**
	 * Sets the timer to end at a specific timestamp
	 * @param {number} time - Number of seconds to set the timer to
	 * @returns {undefined}
	 */
	function setDuration(time) {
		if (time < 1) {
			stop();
		}
		TimeObject.setSeconds(timerRep.value, time);
	}

	function showHide() {
		timerRep.value.hidden = !timerRep.value.hidden;
	}

	function setText(text) {
		timerRep.value.text = text;
	}
}
