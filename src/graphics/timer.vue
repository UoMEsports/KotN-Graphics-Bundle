<template>
	<div>
		<h1>{{time}}</h1>
	</div>
</template>

<script>
const timerRep = nodecg.Replicant('timer');

export default {
	data() {
		return {
			time: '00:00'
		};
	},
	created() {
		NodeCG.waitForReplicants(timerRep).then(this.listen);
	},
	methods: {
		listen() {
			console.log("listening for timer changes");
			timerRep.on('change', newVal => {
				this.time = newVal.formatted;
			});
		}
	}
};
</script>

<style scoped>
@import '../../shared/fonts/stylesheet.css';

h1 {
	font-size: 360px;
}
</style>
