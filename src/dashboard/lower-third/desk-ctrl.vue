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
	<v-container
        fluid
        grid-list-lg
      	>
        <v-layout row wrap>
			<v-flex xs12>
				<v-card class="current" dark>
					<h4 class="text">Host</h4>
					<h1 v-if="host" class="text">{{host.fullName}}</h1>
				</v-card>
			</v-flex>
			<v-flex xs12 sm6 d-flex>
				<select class="dropdown" v-model="hostSelect">
					<option v-for="staff in staffList" :value="staff.id" :key="staff.id">
						{{ staff.fullName }}
					</option>
				</select>
			</v-flex>
			<v-flex xs12>
				<v-card class="current" dark>
					<h4 class="text">Left Guest</h4>
					<h1 v-if="guest1" class="text">{{guest1.fullName}}</h1>
				</v-card>
			</v-flex>
			<v-flex xs12 sm6 d-flex>
				<select class="dropdown" v-model="guest1Select">
					<option v-for="staff in staffList" :value="staff.id" :key="staff.id">
						{{ staff.fullName }}
					</option>
				</select>
			</v-flex>
          	<v-flex xs12>
				<v-card class="next" dark>
					<h4 class="text">Right Guest</h4>
					<h1 v-if="guest2" class="text">{{guest2.fullName}}</h1>
				</v-card>
			</v-flex>

			<v-flex xs12 sm6 d-flex>
				<select class="dropdown" v-model="guest2Select">
					<option v-for="staff in staffList" :value="staff.id" :key="staff.id">
						{{ staff.fullName }}
					</option>
				</select>
			</v-flex>
			<v-btn @click="set" color="green">Set</v-btn>
		</v-layout>
	</v-container>
</template>

<script>
const clone = require('clone');

const host = nodecg.Replicant('host');
const guest1 = nodecg.Replicant('guest1');
const guest2 = nodecg.Replicant('guest2');
const staff = nodecg.Replicant('staff');

export default {
	data() {
		return {
			staffList: [],
			host: null,
			guest1: null,
			guest2: null,
			hostSelect: null,
			guest1Select: null,
			guest2Select: null
		};
	},
	created() {
		NodeCG.waitForReplicants(host, guest1, guest2, staff).then(this.listen);
	},
	methods: {
		listen() {
			staff.on('change', newVal => {
				if (!Array.isArray(newVal)) {
					this.staffList = [];
				} else {
					let newList = clone(newVal);
					
					// sort by value
					newList.sort(function(a, b) {
						return a.realName.localeCompare(b.realName);
					});

					this.staffList = newList;
				}
			});
			host.on('change', newVal => {
				this.host = clone(newVal) || {};
			});
			guest1.on('change', newVal => {
				this.guest1 = clone(newVal) || {};
			});
			guest2.on('change', newVal => {
				this.guest2 = clone(newVal) || {};
			});
		},
		set() {
			if (this.hostSelect &&this.guest1Select && this.guest2Select) {
				host.value = this.staffList.find(staff => staff.id == this.hostSelect);
				guest1.value = this.staffList.find(staff => staff.id == this.guest1Select);
				guest2.value = this.staffList.find(staff => staff.id == this.guest2Select);
			}

			return;
		}
	}
};

</script>

<style lang="scss" scoped>
.text {
	width: 100%;
	text-align: center;
}

.light {
	background-color: white;
}

.dropdown {
	// the reason I have to do this is why Javascript is shite
	color: black;
	-webkit-appearance: menulist;
	background-color: white;
	border-style: solid;
}
</style>
