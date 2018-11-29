<template>
	<div class="desk">
		<div class="staff">
			<h1 v-if="guest1" class="name">{{guest1.realName}}</h1>
			<h1 v-if="guest1 && guest1.alias" class="alias">{{guest1.alias}}</h1>
			<h2 v-if="guest1 && guest1.social"  class="social">@{{guest1.social}}</h2>
		</div>

		<div class="divider-container">
			<div class="divider"></div>
		</div>

		<div class="staff">
			<h1 v-if="guest2"  class="name">{{guest2.realName}}</h1>
			<h1 v-if="guest2 && guest2.alias" class="alias">{{guest2.alias}}</h1>
			<h2 v-if="guest2 && guest2.social" class="social">@{{guest2.social}}</h2>
		</div>

		<div class="divider-container">
			<div class="divider"></div>
		</div>

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
const guest1 = nodecg.Replicant('guest1');
const guest2 = nodecg.Replicant('guest2');

export default {
	name: 'Desk',
	data() {
		return {
			host: null,
			guest1: null,
			guest2: null
		}
	},
	created() {
		NodeCG.waitForReplicants(host, guest1, guest2).then(this.listen);
	},
	methods: {
		listen() {
			host.on('change', newVal => {
				this.host = clone(newVal) || {};
			});
			guest1.on('change', newVal => {
				this.guest1 = clone(newVal) || {};
			});
			guest2.on('change', newVal => {
				this.guest2 = clone(newVal) || {};
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

.desk {
	width: 1440px;
	margin-left: 140px;
	display: flex;

	justify-content:space-evenly;
	align-items: center;

	.staff {
		white-space: normal;
		word-wrap:break-word;
		text-align: center;
		flex-basis: 33%;

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

