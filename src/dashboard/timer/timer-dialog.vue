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
		<v-time-picker v-model="picker" :min="min" :landscape="landscape" full-width format="24hr" :dark="true" color="blue lighten-1"></v-time-picker>
	</div>
</template>

<script>
const timerRep = nodecg.Replicant('timer');

export default {
	data () {
      return {
		landscape: true,
		min: this.getMinTime(),
        picker: this.getMinTime().split(' ')[0]
      }
	},
	created() {
		document.addEventListener('dialog-opened', () => {
			this.min = this.getMinTime();
			this.picker = this.getMinTime().split(' ')[0];
		});

		document.addEventListener('dialog-confirmed', () => {
			var time = this.picker.split(':');  

			var d = new Date(); // creates a Date Object using the clients current time

			d.setHours  (+time[0]); // set Time accordingly, using implicit type coercion
			d.setMinutes( time[1]); // you can pass Number or String, it doesn't matter
			d.setSeconds(0);

			nodecg.sendMessage('setTimerEnd', d.getTime() / 1000);
		});
	},
	methods: {
		getMinTime: () => {
			let d = new Date;
			d.setMinutes(d.getMinutes() + 1);
			return d.toTimeString();
		}
	}
};
</script>

