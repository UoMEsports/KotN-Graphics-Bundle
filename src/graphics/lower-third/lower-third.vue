<template>
	<div class="lower-third">
		<img ref="logo" class="logo" src="./Logo_no_mask_small.png">
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

		//this.tl.timeScale(0.1);

		nodecg.listenFor('startLowerThird', type => {
			this.start(type);
		});
		nodecg.listenFor('endLowerThird', this.stop);
	},
	mounted() {
		this.tl.to(this.$refs.logo, 0.8, {'filter': "grayscale(0%)", scale: 1.2, opacity: 1});
		this.tl.to(this.$refs.content, 1.5, {width: '75%', ease: Power2.easeOut}, '-=0.3');

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
	height: 100%;
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
}

.content {
	position: absolute;
	bottom: 50px;
	left: 175px;
	height: 150px;
	width: 0;
	background-color: $background;
	z-index: -4;
	overflow: hidden;
	white-space: nowrap;

	* {
		margin-left: 100px;
	}
}

</style>
