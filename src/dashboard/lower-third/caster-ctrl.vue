<template>
	<v-container
        fluid
        grid-list-lg
      	>
        <v-layout row wrap>
			<v-flex xs12>
				<v-card v-if="caster1" class="current" dark>
					<h4 class="text">Left Caster</h4>
					<h1 class="text">{{caster1.fullName}}</h1>
				</v-card>
			</v-flex>
			<v-flex xs12 sm6 d-flex class="light">
				<v-select2
					v-model="caster1Select"
					:options="staffList"
					label="fullName"
					value="id">
				</v-select2>
			</v-flex>
          	<v-flex v-if="caster2" xs12>
				<v-card class="next" dark>
					<h4 class="text">Right Caster</h4>
					<h1 class="text">{{caster2.fullName}}</h1>
				</v-card>
			</v-flex>

			<v-flex xs12 sm6 d-flex class="light">
				<v-select2 
					v-model="caster2Select"
					:options="staffList"
					label="fullName"
					value="id">
				</v-select2>
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
			staffList2: ['banter', 'ayy', 'lmao'],
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
				console.log(JSON.stringify(newVal));
			});
			caster2.on('change', newVal => {
				this.caster2 = clone(newVal) || {};
			});
		},
		set() {
			if (this.caster1Select && this.caster2Select) {
				caster1.value = this.caster1Select;
				caster2.value = this.caster2Select;
			}

			return;
		}
	},
	watch: {
		caster1Select: val => {
			console.log(val);
		}
	}
};

</script>

<style lang="scss">
.time {
	font-size: 96px;
}

.text {
	width: 100%;
	text-align: center;
}

.light {
	background-color: white;
}
</style>
