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
	<div v-if="!hidden" class="timer">
		<ul class="list">
			<li><h1 class="mins">{{mins}}</h1>
			<li><h1 class="separator">:</h1>
			<li><h1 class="secs">{{secs}}</h1>
		</ul>
		<hr class="line"/>
		<h1 class="text">{{text}}</h1>
	</div>
</template>

<script>
const timerRep = nodecg.Replicant('timer');

export default {
	data() {
		return {
			mins: null,
			secs: null,
			hidden: 'false',
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
				this.mins = this.pad(newVal.minutes);
				this.secs = this.pad(newVal.seconds);
				this.hidden = newVal.hidden;
				this.text = String(newVal.text).toUpperCase();
			});
		},
		pad(num) {
			return num < 10 ? `0${num}` : `${num}`;
		}
	}
};
</script>

<style lang="scss" scoped>
@import url("https://use.typekit.net/mah1qnl.css");
@import '../../../shared/style/main.scss';

.timer {
	position: absolute;
	left: $width / 2;
	width: 600px;
	bottom: 26px;
	transform: translateX(-50%);

	* {
		text-align: center;
		margin: 0;
		color: $primary;
	}

	.list {
		list-style: none;
		margin-bottom: 160px;
		li {
			h1 {
				display: inline;
				line-height: 1em;
				font-size: 140px;
				font-family: futura-pt, sans-serif;
				position: absolute;
			}

			.mins {
				right: 55%;
			}			
			.separator {
				left: 50%;
				transform: translateX(-50%);
			}
			.secs {
				left: 55%;
			}
		}
	}
	.line {
		margin: 10px auto;
		border: none;
    	height: 4px;
		background-color: white;
		width: 525px;
	}
	.text {
		line-height: 1em;
		font-size: 67px;
	}
}

</style>
