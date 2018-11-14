<template>
	<div>
		<number-input v-model="mins" :min="0" :max="60" inline controls rounded></number-input>
		<number-input v-model="seconds" :min="0" :max="59" inline controls rounded :step="10"></number-input>
	</div>
</template>

<script>
const timerRep = nodecg.Replicant('timer');

export default {
	data () {
      return {
		mins: 10,
        seconds: 0
      }
	},
	created() {
		document.addEventListener('dialog-confirmed', () => {
			let time = (this.mins * 60) + this.seconds;
			nodecg.sendMessage('setTimer', time)
		});
	}
};
</script>

