<template>
	<div class="desk">
		<div class="host staff">
			<h1 class="name">{{host.fullName}}</h1>
			<h1 v-if="host.social" class="social">@{{host.social}}</h1>
		</div>
		<div class="divider"></div>
		<div class="guest1 staff">
			<h1 class="name">{{guest1.fullName}}</h1>
			<h1 v-if="guest1.social" class="social">@{{guest1.social}}</h1>
		</div>
		<div class="divider"></div>
		<div class="guest2 staff">
			<h1 class="name">{{guest2.fullName}}</h1>
			<h1 v-if="guest2.social" class="social">@{{guest2.social}}</h1>
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
	width: 1470px;
	height: 100%;
}

.list {
	list-style: none;
	text-align: center;
	padding: 0;

	li {
		display: inline-block;

		.staff {
			width: 433px;
			white-space: normal;
			word-wrap:break-word;
			.name {
				margin: 0;
				font-size: 36px;
				top: 5px;
			}
		}
	}
}

.divider {
	height: 120px;
	border-left: 1px solid white;
}
</style>

