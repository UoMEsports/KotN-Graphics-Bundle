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

