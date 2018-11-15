'use strict';

module.exports = function (nodecg) {
	nodecg.Replicant('spotlight', {
		defaultValue: {
			name: {
				title: 'Name',
				value: ''
			},
			champ: {
				title: 'Champion',
				value: ''
			},
			kda: {
				title: 'KDA',
				value: ''
			},
			damageDealt: {
				title: 'Damage Dealt',
				value: ''
			}
		}
	});
}

