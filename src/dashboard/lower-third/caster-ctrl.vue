<template>
	<v-container
        fluid
        grid-list-lg
      	>
        <v-layout row wrap>
			<v-flex xs12>
				<v-card class="current" dark>
					<h4 class="text">Left Caster</h4>
					<h1 class="text">{{caster1.fullName}}</h1>
				</v-card>
			</v-flex>
			<v-flex xs12 sm6 d-flex>
				<select class="dropdown" v-model="caster1Select">
					<option v-for="staff in staffList" :value="staff.id" :key="staff.id">
						{{ staff.fullName }}
					</option>
				</select>
			</v-flex>
          	<v-flex xs12>
				<v-card class="next" dark>
					<h4 class="text">Right Caster</h4>
					<h1 class="text">{{caster2.fullName}}</h1>
				</v-card>
			</v-flex>

			<v-flex xs12 sm6 d-flex>
				<select class="dropdown" v-model="caster2Select">
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

const caster1 = nodecg.Replicant('caster1');
const caster2 = nodecg.Replicant('caster2');
const staff = nodecg.Replicant('staff');

export default {
	data() {
		return {
			staffList: [],
			caster1: null,
			caster2: null,
			caster1Select: null,
			caster2Select: null
		};
	},
	created() {
		NodeCG.waitForReplicants(caster1, caster2, staff).then(this.listen);
	},
	methods: {
		listen() {
			staff.on('change', newVal => {
				if (!Array.isArray(newVal)) {
					this.staffList = [];
				} else {
					this.staffList = clone(newVal);
				}
			});
			caster1.on('change', newVal => {
				this.caster1 = clone(newVal) || {};
			});
			caster2.on('change', newVal => {
				this.caster2 = clone(newVal) || {};
			});
		},
		set() {
			if (this.caster1Select && this.caster2Select) {
				caster1.value = this.staffList.find(staff => staff.id == this.caster1Select);
				caster2.value = this.staffList.find(staff => staff.id == this.caster2Select);
			}

			return;
		}
	}
};

</script>

<style lang="scss">
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
