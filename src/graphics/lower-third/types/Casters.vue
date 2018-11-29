<template>
	<div class="casters">
		<div class="staff">
			<h1 class="name">{{caster1.realName}}</h1>
			<h1 class="alias">{{caster1.alias}}</h1>
			<h2 v-if="caster1.social" class="social">@{{caster1.social}}</h2>
		</div>
		
		<div class="divider"></div>

		<div class="staff">
			<h1 class="name">{{caster2.realName}}</h1>
			<h1 class="alias">{{caster2.alias}}</h1>
			<h2 v-if="caster2.social" class="social">@{{caster2.social}}</h2>
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
	width: 1440px;
	display: flex;

	justify-content: space-evenly;
	align-items: center;

	.staff {
		white-space: normal;
		word-wrap:break-word;
		text-align: center;
		flex-basis: 50%;

		.name {
			margin: 0;
			font-size: 48px;
		}

		.alias, .social {
			margin: 0;
		}
	}

	.divider {
		height: 120px;
		border-left: 1px solid white;
	}
}

</style>

