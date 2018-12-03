<template>
	<div class="casters">
		<div class="staff">
			<h1 v-if="host" class="name">{{host.realName}}</h1>
			<h1 v-if="host && host.alias" class="alias">{{host.alias}}</h1>
			<h2 v-if="host && host.social" class="social">@{{host.social}}</h2>
		</div>
	</div>
</template>

<script>
const clone = require('clone');

const host = nodecg.Replicant('host');

export default {
	name: 'Host',
	data() {
		return {
			host: null
		}
	},
	created() {
		NodeCG.waitForReplicants(host).then(this.listen);
	},
	methods: {
		listen() {
			host.on('change', newVal => {
				this.host = clone(newVal) || {};
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
	margin-left: 140px;
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

	.divider-container {
		height: 150px;

		.divider {
			margin-top: 13px;
			height: 120px;
			border-left: 1px solid white;
		}
	}
}

</style>

