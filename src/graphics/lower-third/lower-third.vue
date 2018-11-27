<template>
	<div class="lower-third">
		<img ref="logo" class="logo" src="./Logo_no_mask_small.png">
		<video ref="loop" class="loop" :height="vidHeight" preload="auto" autoplay loop muted>
			<source src="../assets/loop.webm" type="video/webm">
		</video>
		<div ref="content" class="content">
			<casters v-if="running=='casters'"/>
		</div>
	</div>
</template>

<script>
import {TweenMax, TimelineMax, CSSPlugin, Power2, Power4} from "gsap/TweenMax";
import Casters from './types/Casters.vue';

export default {
	data() {
		return {
			tl: new TimelineMax({paused: true, onReverseComplete: this.finish, onReverseCompleteScope: this}),
			running: false
		};
	},
	created() {
		TweenMax.ticker.useRAF(false);
		TweenMax.ticker.fps(60);

		nodecg.listenFor('startLowerThird', type => {
			this.start(type);
		});
		nodecg.listenFor('endLowerThird', this.stop);
	},
	mounted() {
		this.tl.to(this.$refs.logo, 0.7, {'filter': "grayscale(0%)", scale: 1.2, opacity: 1});
		this.tl.to(this.$refs.loop, 0.4, {opacity: 1}, '-=0.6');
		this.tl.set(this.$refs.content, {opacity: 1}, '-=0.3');
		this.tl.to(this.$refs.content, 1.5, {width: '1570px', ease: Power2.easeOut});

		nodecg.readReplicant('lowerThirdCurrent', val => {
			if (val) {
				this.running = val;
				this.tl.seek('-=0');
				this.tl.play();
			}
		});
	},
	methods: {
		start(type) {
			this.running = type;
			this.tl.play();
		},
		stop() {
			this.tl.reverse();
		},
		finish() {
			this.running = false;
			nodecg.sendMessage('finishedLowerThird');
		}
	},
	components: {
		Casters
	}
};
</script>

<style lang="scss" scoped>
@import url("https://use.typekit.net/mah1qnl.css");
@import '../../../shared/style/main.scss';

.lower-third {
	width: 100%;
	height: 40%;
	position: absolute;
	bottom: 100px;
}

.logo {
	filter: grayscale(80%);
	opacity: 0.6;
	height: 250px;
	position: absolute;
	bottom: 0px;
	left: 100px;
	z-index: 50;
}

.loop {
	opacity: 0;
	height: 450px;
	display: block;
	position: absolute;
	bottom: -110px;
	left: 0px;
}

.content {
	position: absolute;
	bottom: 50px;
	left: 175px;
	height: 150px;
	width: 0;
	background-color: rgba(0, 0, 0, 0.8);
	border: 5px solid $primary;
	border-radius: 15px;
	z-index: -4;
	overflow: hidden;
	white-space: nowrap;
	opacity: 0;

	* {
		margin-left: 100px;
	}
}

</style>
