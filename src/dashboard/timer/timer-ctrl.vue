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
	<div>
		<h1 class="time">{{time}}</h1>
		<h1 class="text">{{text}}</h1>
		<v-btn @click="toggleTimer" :color="startStopColour">{{startStopContent}}</v-btn>
		<v-btn @click="toggleHidden" :color="showHideColour">{{showHideContent}}</v-btn>
		<v-btn color="orange" nodecg-dialog="timer-dialog">Run to</v-btn>
		<v-btn color="orange" nodecg-dialog="timer-dialog-exact">Run for</v-btn>
		
		<v-text-field
			label="New Text"
			v-model="newText"
			dark
		></v-text-field>
		<v-btn @click="setText" color="green">Update Text</v-btn>
	</div>
</template>

<script>
const timerRep = nodecg.Replicant('timer');

export default {
	data() {
		return {
			time: "0:00",
			timerRunning: false,
			hidden: false,
			text: 'UP NEXT',
			newText: ''
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
		setText() {
			timerRep.value.text = this.newText;
		},
		listen() {
			this.newText = timerRep.value.text;

			timerRep.on('change', newVal => {
				this.time = newVal.formatted;
				this.timerRunning = newVal.running;
				this.hidden = newVal.hidden;
				this.text = newVal.text;
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
.time {
	font-size: 96px;
}

.text {
	width: 100%;
	text-align: center;
}
</style>
