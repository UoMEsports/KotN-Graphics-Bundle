<template>
	<div>
		<header>Current time</header>
		<h1>{{time}}</h1>
		<v-btn @click="toggleTimer" :color="startStopColour">{{startStopContent}}</v-btn>
		<v-btn @click="setTimer" style="background-color: orange">Set</v-btn>
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
		setTimer() {
			
		},
		listen() {
			console.log("listening for timer changes");
			timerRep.on('change', newVal => {
				this.time = newVal.formatted;
				this.timerRunning = newVal.running;
				console.log(newVal);
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

function pad(num){ return ('000000000' + num).substr(-size);}
</script>

