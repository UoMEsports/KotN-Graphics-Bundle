'use strict';

module.exports = function (nodecg) {
	const current = nodecg.Replicant('lowerThirdCurrent', { defaultValue: false });
	const next = nodecg.Replicant('lowerThirdNext', { defaultValue: false });

	nodecg.listenFor('requestLowerThird', run);
	nodecg.listenFor('finishedLowerThird', finished);

	function run(type) {
		if (current.value) {
			if (current.value != type) {
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
}

