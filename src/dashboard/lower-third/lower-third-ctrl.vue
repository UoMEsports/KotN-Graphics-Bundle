<template>
	<v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
			<v-flex xs12>
				<v-card class="current" :color="runningColour" dark>
					<h4 class="text">Currently Running:</h4>
					<h1 class="text">{{running}}</h1>
				</v-card>
			</v-flex>
			<v-btn v-if="running != 'Nothing'" @click="end" color="red">End {{running}}</v-btn>

          	<v-flex xs12>
				<v-card class="next" dark>
					<h4 class="text">Up Next:</h4>
					<h1 class="text">{{next}}</h1>
				</v-card>
			</v-flex>
			<v-btn @click="run('casters')" color="green">Run Casters</v-btn>
			<v-btn @click="run('desk')" color="green">Run Desk</v-btn>
			<v-btn @click="run('predictions')" color="green">Run Predictions</v-btn>
			<v-btn @click="clearNext" color="yellow">Clear Next</v-btn>
			<v-btn @click="reset" color="red">Hard Reset</v-btn>
		</v-layout>
	</v-container>
</template>

<script>
const running = nodecg.Replicant('lowerThirdCurrent');
const next = nodecg.Replicant('lowerThirdNext');

export default {
	data() {
		return {
			running: 'Nothing',
			next: 'Nothing'
		};
	},
	created() {
		NodeCG.waitForReplicants(running, next).then(this.listen);
	},
	methods: {
		listen() {
			this.running = running.value ? this.ucFirst(running.value) : 'Nothing';
			this.next = next.value ? this.ucFirst(next.value) : 'Nothing';

			running.on('change', newVal => {
				this.running = newVal ? this.ucFirst(newVal) : 'Nothing';
			});
			next.on('change', newVal => {
				this.next = newVal ? this.ucFirst(newVal) : 'Nothing';
			});
		},
		run(type) {
			nodecg.sendMessage('requestLowerThird', type);
		},
		end() {
			nodecg.sendMessage('endLowerThird');
		},
		clearNext() {
			next.value = false;
		},
		reset() {
			running.value = false;
			next.value = false;
			nodecg.sendMessage('endLowerThird');
		},
		ucFirst(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	},
	computed: {
		runningColour() {
			return this.running != 'Nothing' ? 'green' : undefined
		}
	}
};

</script>

<style lang="scss" scoped>
.time {
	font-size: 96px;
}

.text {
	width: 100%;
	text-align: center;
}
</style>
