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
				<v-form v-model="valid" ref="form">
					<v-text-field
						v-model="firstName"
						label="First Name"
						:rules="[required]"
						dark
					></v-text-field>

					<v-text-field
						v-model="lastName"
						label="Last Name"
						:rules="[required]"
						dark
					></v-text-field>

					<v-text-field
						v-model="alias"
						label="Alias"
						dark
					></v-text-field>

					<v-text-field
						prepend-icon="alternate_email"
						v-model="social"
						label="Twitter Handle"
						dark
					></v-text-field>
					<v-btn @click="add" color="green">Add</v-btn>
				</v-form>
			</v-flex>

			<template v-for="(item, index) in staff">
				<v-flex xs12 :key="index">
					<v-card class="current" :color="runningColour" dark>
						<v-card-title primary-title>
							<div>
								<h3 class="headline mb-0">{{item.fullName}}</h3>
								<h3>{{item.alias}}</h3>
								<h5 v-if="item.social">@{{item.social}}</h5>
							</div>
						</v-card-title>

						<v-btn fab
							dark
							small
							color="red"
							@click="del(item.id)"
						>
							<v-icon>delete</v-icon>
						</v-btn>
					</v-card>
				</v-flex>
			</template>
		</v-layout>
	</v-container>
</template>

<script>
const staff = nodecg.Replicant('staff');

export default {
	data() {
		return {
			staff: [],
			firstName: '',
			lastName: '',
			alias: '',
			social: '',
			valid: false,
			required: value => !!value || 'Required.'
		};
	},
	created() {
		NodeCG.waitForReplicants(staff).then(this.listen);
	},
	methods: {
		listen() {
			staff.on('change', newVal => {
				this.staff = newVal;
			});
		},
		add() {
			if (this.$refs.form.validate()) {
				const fullName = this.firstName + ' ' + (this.alias ? `"${this.alias}" ` : '') + this.lastName;
				const realName = this.firstName + ' ' + this.lastName;

				nodecg.sendMessage('addStaff', {
					realName,
					fullName,
					alias: this.alias,
					social: this.social
				});
			}
		},
		del(id) {
			nodecg.sendMessage('delStaff', id);
		}
	},
	computed: {
		runningColour() {
		}
	}
};

</script>

<style lang="scss" scoped>
.time {
	font-size: 96px;
}

.text {
	width: 100%;
	text-align: center;
}
</style>
