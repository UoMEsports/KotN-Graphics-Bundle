<template>
	<div>
		<h1>{{time}}</h1>
		<v-btn @click="toggleTimer" :color="startStopColour">{{startStopContent}}</v-btn>
		<v-btn @click="toggleHidden" :color="showHideColour">{{showHideContent}}</v-btn>
		<v-btn style="background-color: orange" nodecg-dialog="timer-dialog">Run to</v-btn>
		<v-btn style="background-color: orange" nodecg-dialog="timer-dialog-exact">Run for</v-btn>
	</div>
</template>

<script>
const timerRep = nodecg.Replicant('timer');

export default {
	data() {
		return {
			time: "0:00",
			timerRunning: false,
			hidden: false
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
		toggleHidden() {
			nodecg.sendMessage('showHideTimer');
		},
		listen() {
			timerRep.on('change', newVal => {
				this.time = newVal.formatted;
				this.timerRunning = newVal.running;
				this.hidden = newVal.hidden;
			});
		}
	},
	computed: {
		startStopContent() {
			return this.timerRunning ? 'STOP' : 'START';
		},
		startStopColour() {
			return this.timerRunning ? 'red' : 'green';
		},
		showHideContent() {
			return this.hidden ? 'SHOW' : 'HIDE';
		},
		showHideColour() {
			return !this.hidden ? 'red' : 'green';
		}
	}
};

</script>

<style lang="scss" scoped>
h1 {
	font-size: 96px;
}
</style>
