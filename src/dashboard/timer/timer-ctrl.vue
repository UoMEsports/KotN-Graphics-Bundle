<template>
	<div>
		<h3>Current Time</h3>
		<h1>{{time}}</h1>
		<v-btn @click="toggleTimer" :color="startStopColour">{{startStopContent}}</v-btn>
		<v-btn style="background-color: orange" nodecg-dialog="timer-dialog">Set to time</v-btn>
		<v-btn style="background-color: orange" nodecg-dialog="timer-dialog-exact">Set exact duration</v-btn>
	</div>
</template>

<script>
const timerRep = nodecg.Replicant('timer');

export default {
	data() {
		return {
			time: "0:00",
			timerRunning: false
		};
	},
	created() {
		NodeCG.waitForReplicants(timerRep).then(this.listen);
	},
	methods: {
		toggleTimer() {
			if (timerRep.value.running) {
				nodecg.sendMessage('stopTimer');
			} else {
				nodecg.sendMessage('startTimer');
			}
		},
		listen() {
			timerRep.on('change', newVal => {
				this.time = newVal.formatted;
				this.timerRunning = newVal.running;
			});
		}
	},
	computed: {
		startStopContent() {
			return this.timerRunning ? 'STOP' : 'START';
		},
		startStopColour() {
			return this.timerRunning ? 'red' : 'green';
		}
	}
};

</script>

<style lang="scss" scoped>
h1 {
	font-size: 96px;
}
</style>
