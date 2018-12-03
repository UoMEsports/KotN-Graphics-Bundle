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
		<ul class="list">
			<li>
				<div class="caster1 staff">
					<h1 class="name">{{caster1.fullName}}</h1>
					<h1 v-if="caster1.social" class="social">@{{caster1.social}}</h1>
				</div>
			</li>
			<li>
				<div class="divider"></div>
			</li>
			<li>
				<div class="caster2 staff">
					<h1 class="name">{{caster2.fullName}}</h1>
					<h1 v-if="caster2.social" class="social">@{{caster2.social}}</h1>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
const clone = require('clone');

const caster1 = nodecg.Replicant('caster1');
const caster2 = nodecg.Replicant('caster2');

export default {
	name: 'Generic',
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
			width: 650px;
			white-space: normal;
			word-wrap:break-word;
			.name {
				margin: 0;
				font-size: 48px;
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

