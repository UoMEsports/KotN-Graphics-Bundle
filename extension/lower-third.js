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
	require('./staff')(nodecg);

	const current = nodecg.Replicant('lowerThirdCurrent', {defaultValue: false});
	const next = nodecg.Replicant('lowerThirdNext', {defaultValue: false});

	nodecg.listenFor('requestLowerThird', run);
	nodecg.listenFor('finishedLowerThird', finished);

	function run(type) {
		if (current.value) {
			if (current.value !== type) {
				next.value = type;
				nodecg.sendMessage('endLowerThird');
			}
		} else {
			current.value = type;
			nodecg.sendMessage('startLowerThird', type);
		}
	}

	function finished() {
		current.value = false;
		if (next.value) {
			run(next.value);
			next.value = false;
		}
	}
};
