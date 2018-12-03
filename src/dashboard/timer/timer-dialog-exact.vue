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
		<h2>Minutes</h2>
		<number-input v-model="mins" :min="0" :max="60" inline controls rounded></number-input>
		<h2>Seconds</h2>
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

