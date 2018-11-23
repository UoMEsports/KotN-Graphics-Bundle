<template>
	<div class="lower-third">
		<img ref="logo" class="logo" src="./Logo_no_mask_small.png">
		<div ref="content" class="content"></div>
	</div>
</template>

<script>
import {TweenMax, TimelineLite, CSSPlugin, Power2, Power4} from "gsap/TweenMax";

export default {
	data() {
		return {
			tl: new TimelineLite({paused: true, onReverseComplete: this.tellEnd}),
			running: false
		};
	},
	created() {
		nodecg.listenFor('startLowerThird', type => {
			this.start(type);
		});
		nodecg.listenFor('endLowerThird', this.end);
	},
	mounted() {
		this.tl.to(this.$refs.logo, 0.5, {'filter': "grayscale(0%)", scale: 1.2, opacity: 1});
		this.tl.to(this.$refs.content, 1.5, {width: '75%', ease: Power2.easeOut}, '-=0.3');
	},
	methods: {
		start(type) {
			this.running = type;
			this.tl.play();
		},
		end() {
			this.running = false;
			this.tl.reverse();
		},
		tellEnd() {
			nodecg.sendMessage('finishedLowerThird');
		}
	}
};
</script>

<style lang="scss" scoped>
@import url("https://use.typekit.net/mah1qnl.css");
@import '../../../shared/style/main.scss';

.lower-third {
	width: 100%;
	position: fixed;
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
}

</style>
