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
	<div>
		<v-list two-line dark>
          <template v-for="field in fields">
            <v-subheader
              v-if="field.header"
              :key="field.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-list-tile
              v-else
              :key="field.title"
            >

              <v-list-tile-content>
                <v-list-tile-title v-html="field.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="field.value"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>

		<v-list class="transparent" two-line dark>
          <template v-for="(field, index) in newFields">
            <v-subheader
              v-if="field.header"
              :key="field.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-list-tile
              v-else
              :key="field.title"
            >

              <v-list-tile-content>
                <v-text-field
					:ref="index"
					:label="field.title"
					v-model="field.value"
				>
				</v-text-field>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>

		<v-btn @click="update" :color="'orange'">Update</v-btn>
		<v-btn @click="run" :color="'green'">RUN</v-btn>

	</div>
</template>

<script>
const spotlightRep = nodecg.Replicant('spotlight');
const clone = require('clone');

export default {
	data() {
		return {
			fields: {},
			newFields: {}
		};
	},
	created() {
		NodeCG.waitForReplicants(spotlightRep).then(this.listen);
	},
	methods: {
		listen() {
			this.newFields = clone(spotlightRep.value);

			spotlightRep.on('change', newVal => {
				// update display fields
				this.fields = newVal;

				// now check if stored list of fields was changed and update input form accordingly
				const oldKeys = Object.keys(this.newFields);
				const newKeys = Object.keys(newVal);

				// check each old field and delete if not present in new list
				oldKeys.filter(field => {
					return !newKeys.includes(field);
				}).forEach(key => delete this.newFields[key]);

				// check each new field and add to list of fields if not present
				newKeys.filter(field => {
					return !oldKeys.includes(field);
				}).forEach(key => this.newFields[key] = newVal[key]);

			});
		},
		update() {
			spotlightRep.value = this.newFields;
		},
		run() {
			return;
		},
	}
};

</script>

<style lang="scss" scoped>
.transparent {
	background-color: rgba(0,0,0,0)
}
</style>
