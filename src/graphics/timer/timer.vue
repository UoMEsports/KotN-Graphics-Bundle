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
