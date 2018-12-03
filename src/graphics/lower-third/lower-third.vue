<template>
	<div class="lower-third">
		<img ref="logo" class="logo" src="./Logo_no_mask_small.png">
		<video ref="loop" class="loop" preload="auto" autoplay loop muted>
			<source src="../assets/loop.webm" type="video/webm">
		</video>
		<div ref="content" class="content">
			<template v-if="running == 'casters'">
				<casters :style="'opacity: ' + contentOpacity"/>
			</template>
			<template v-else-if="running === 'desk'">
				<desk :style="'opacity: ' + contentOpacity"/>
			</template>
			<template v-else-if="running === 'host'">
				<host :style="'opacity: ' + contentOpacity"/>
			</template>			
			<template v-else-if="running === 'analysts'">
				<analysts :style="'opacity: ' + contentOpacity"/>
			</template>			
			<!--<generic v-else-if="running == 'generic'" :style="'opacity: ' + contentOpacity"/>-->
		</div>
	</div>
</template>

<script>
import {TimelineMax, CSSPlugin, Power2, Power4} from "gsap/TweenMax";
import Casters from './types/Casters.vue';
import Desk from './types/Desk.vue';
import Predictions from './types/Predictions.vue';
import Host from './types/Host.vue';
import Analysts from './types/Analysts.vue';
import Generic from './types/Generic.vue';

export default {
	data() {
		return {
			tl: new TimelineMax({paused: true, onReverseComplete: this.finish, onReverseCompleteScope: this}),
			running: false,
			contentOpacity: 0
		};
	},
	created() {
		nodecg.listenFor('startLowerThird', type => {
			this.start(type);
		});
		nodecg.listenFor('endLowerThird', this.stop);
	},
	mounted() {
		this.tl.set(this, {contentOpacity: 0})
		this.tl.to(this.$refs.logo, 0.7, {'filter': "grayscale(0%)", scale: 1.2, opacity: 1});
		this.tl.to(this.$refs.loop, 0.4, {opacity: 1}, '-=0.6');
		this.tl.set(this.$refs.content, {opacity: 1}, '-=0.3');
		this.tl.to(this.$refs.content, 1.5, {width: '1580px', ease: Power2.easeOut});
		this.tl.to(this, 0.5, {contentOpacity: 1}, '-=0.5')

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

			console.log(this.running);
		},
		stop() {
			this.tl.reverse();
		},
		finish() {
			this.tl.pause();
			this.running = false;
			nodecg.sendMessage('finishedLowerThird');
		}
	},
	components: {
		Casters,
		Desk,
		Predictions,
		Generic,
		Host,
		Analysts
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
}

</style>
