<template>
	<div class="casters">
		<div class="caster1 staff">
			<h1 class="name">{{caster1.fullName}}</h1>
			<h1 v-if="caster1.social" class="social">@{{caster1.social}}</h1>
		</div>
		
		<div class="divider"></div>

		<div class="caster2 staff">
			<h1 class="name">{{caster2.fullName}}</h1>
			<h1 v-if="caster2.social" class="social">@{{caster2.social}}</h1>
		</div>
	</div>
</template>

<script>
const clone = require('clone');

const caster1 = nodecg.Replicant('caster1');
const caster2 = nodecg.Replicant('caster2');

export default {
	name: 'Casters',
	data() {
		return {
			caster1: null,
			caster2: null
		}
	},
	created() {
		NodeCG.waitForReplicants(caster1, caster2).then(this.listen);
	},
	methods: {
		listen() {
			caster1.on('change', newVal => {
				this.caster1 = clone(newVal) || {};
			});
			caster2.on('change', newVal => {
				this.caster2 = clone(newVal) || {};
			});
		}
	}
}
</script>

<style lang="scss" scoped>
@import url("https://use.typekit.net/mah1qnl.css");
@import '../../../../shared/style/main.scss';

* {
	color: white;
}

.casters {
	width: 100%;
	height: 100%;

	.staff {
		display: inline-block;
		width: 48%;
		height: 100%;

		position: absolute;
		top: 0;

		white-space: normal;
		word-wrap:break-word;
		text-align: center;

		&.caster2 {
			right: 0;
		}

		.name {
			margin: 0;
			font-size: 48px;
			top: 5px;
		}
	}

	.divider {
		height: 120px;
		border-left: 1px solid white;
		display: inline-block;
	}
}

</style>

