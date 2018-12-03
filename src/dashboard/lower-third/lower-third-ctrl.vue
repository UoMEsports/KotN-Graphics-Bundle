<!-- Copyright (C) 2018 Daniel Shields
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
	<v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
			<v-flex xs12>
				<v-card class="current" :color="runningColour" dark>
					<h4 class="text">Currently Showing:</h4>
					<h1 class="text">{{running}}</h1>
				</v-card>
			</v-flex>
			<v-btn v-if="running != 'Nothing'" @click="end" color="red">Hide {{running}}</v-btn>

          	<v-flex xs12>
				<v-card class="next" dark>
					<h4 class="text">Up Next:</h4>
					<h1 class="text">{{next}}</h1>
				</v-card>
			</v-flex>
			<v-btn @click="run('casters')" color="green">Show Casters</v-btn>
			<v-btn @click="run('host')" color="green">Show Host</v-btn>
			<v-btn @click="run('analysts')" color="green">Show Analysts</v-btn>
			<v-btn @click="run('desk')" color="green">Show Full Desk</v-btn>
			<!--<v-btn @click="run('predictions')" color="green">Show Predictions</v-btn>-->
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
