<template>
	<div>
		<h1>Hello World!</h1>
		<h2>Current time is {{now}}</h2>
	</div>
</template>

<script>
const clockRep = nodecg.Replicant('clock');

export default {
	data() {
		return {
			now: isoNow(),
			interval: null,
		};
	},
	created() {
		clockRep.on('change', newVal => {
			if (newVal) {
				this.startClock();
			} else {
				clearInterval(this.interval);
			}
		});
	},
	methods: {
		startClock() {
			this.interval = setInterval(() => {
				this.now = isoNow();
			}, 10);
		},
	},
};

function isoNow() {
	return new Date().toISOString();
}
</script>

