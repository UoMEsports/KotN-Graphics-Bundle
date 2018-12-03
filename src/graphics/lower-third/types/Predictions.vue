<!-- Copyright (C) 2018 Daniel Shields
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
	<div class="predictions">
		<div class="staff">
			<h1 class="prediction" v-if="guest1 && guest1.prediction">{{guest1.prediction}}</h1>
			<h1 class="name" v-if="guest1 && guest1.alias">{{guest1.alias}}</h1>
			<h1 class="name" v-else-if="guest1">{{guest1.realName}}</h1>
		</div>

		<div class="divider-container">
			<div class="divider"></div>
		</div>

		<div class="staff">
			<h1 class="prediction" v-if="guest2 && guest2.prediction">{{guest2.prediction}}</h1>
			<h1 class="name" v-if="guest2 && guest2.alias">{{guest2.alias}}</h1>
			<h1 class="name" v-else-if="guest2">{{guest2.realName}}</h1>
		</div>

		<div class="divider-container">
			<div class="divider"></div>
		</div>

		<div class="staff">
			<h1 class="prediction" v-if="host && host.prediction">{{host.prediction}}</h1>
			<h1 class="name" v-if="host && host.alias">{{host.alias}}</h1>
			<h1 class="name" v-else-if="host">{{host.realName}}</h1>
		</div>

		<div class="divider-container">
			<div class="divider"></div>
		</div>

		<div class="staff">
			<h1 class="prediction" v-if="caster1 && caster1.prediction">{{caster1.prediction}}</h1>
			<h1 class="name" v-if="caster1 && caster1.alias">{{caster1.alias}}</h1>
			<h1 class="name" v-else-if="caster1">{{caster1.realName}}</h1>
		</div>

		<div class="divider-container">
			<div class="divider"></div>
		</div>

		<div class="staff">
			<h1 class="prediction" v-if="caster2 && caster2.prediction">{{caster2.prediction}}</h1>
			<h1 class="name" v-if="caster2 && caster2.alias">{{caster2.alias}}</h1>
			<h1 class="name" v-else-if="caster2">{{caster2.realName}}</h1>
		</div>
	</div>
</template>

<script>
const clone = require('clone');

const host = nodecg.Replicant('host');
const guest1 = nodecg.Replicant('guest1');
const guest2 = nodecg.Replicant('guest2');
const caster1 = nodecg.Replicant('caster1');
const caster2 = nodecg.Replicant('caster2');

export default {
	name: 'Desk',
	data() {
		return {
			host: null,
			guest1: null,
			guest2: null,
			caster1: null,
			caster2: null
		}
	},
	created() {
		NodeCG.waitForReplicants(host, guest1, guest2, caster1, caster2).then(this.listen);
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

.predictions {
	width: 1440px;
	margin-left: 140px;
	display: flex;

	justify-content:space-evenly;
	align-items: flex-end;

	.staff {
		white-space: normal;
		word-wrap:break-word;
		text-align: center;
		flex-basis: 33%;

		.prediction {
			font-size: 48px;
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

