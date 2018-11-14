<template>
	<div>
		<header>Wanna start or stop the clock!?</header>
		<v-btn @click="toggleClock" :color="buttonColor">{{buttonContent}}</v-btn>
	</div>
</template>

<script>
const clockRep = nodecg.Replicant('clock');

export default {
	data() {
		return {
			clockRunning: false,
		};
	},
	computed: {
		buttonContent() {
			return this.clockRunning ? 'STOP' : 'START';
		},
		buttonColor() {
			return this.clockRunning ? 'red' : 'green';
		},
	},
	created() {
		clockRep.on('change', newVal => {
			if (this.clockRunning === newVal) {
				return;
			}
			this.clockRunning = newVal;
		});
	},
	methods: {
		toggleClock() {
			clockRep.value = !this.clockRunning;
		},
	},
};
</script>

