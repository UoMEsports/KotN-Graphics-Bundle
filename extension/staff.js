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

const clone = require('clone');

module.exports = function (nodecg) {
	const casters = nodecg.Replicant('casters', {defaultValue: []});
	const desk = nodecg.Replicant('desk', {defaultValue: []});
	const staffNextID = nodecg.Replicant('staffNextID', {defaultValue: 1});
	const staff = nodecg.Replicant('staff', {defaultValue: []});

	nodecg.listenFor('addStaff', addStaff);
	nodecg.listenFor('delStaff', delStaff);

	function addStaff(obj) {
		obj.id = staffNextID.value;

		let newList = clone(staff.value);

		if (!newList || newList.length < 1) {
			newList = [];
		}

		nodecg.log.debug('staff to be added: ' + obj);
		newList.push(obj);
		staff.value = newList;
		nodecg.log.debug('staff after addition: ' + staff.value);

		console.log(staff.value);

		staffNextID.value++;
	}

	function delStaff(id) {
		const newList = clone(staff.value);

		const index = newList.findIndex(x => x.id === id);

		// Check id found
		if (index > -1) {
			newList.splice(index, 1);
			staff.value = newList;
		}
	}
};
