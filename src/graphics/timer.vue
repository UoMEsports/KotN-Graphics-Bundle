<template>
	<div>
		<h1 v-if="!hidden">{{time}}</h1>
		<hr class="line"/>
		<h1 class="text">{{text}}</h1>
	</div>
</template>

<script>
const timerRep = nodecg.Replicant('timer');

export default {
	data() {
		return {
			time: '00:00',
			hidden: 'false'
			text: ''
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
				this.hidden = newVal.hidden;
				this.text = String(newVal.text).toUpperCase();
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import url("https://use.typekit.net/mah1qnl.css");
@import '../../shared/style/main.scss';

h1 {
	font-size: 360px;
}
</style>
