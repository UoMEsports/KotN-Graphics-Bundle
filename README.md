kotn-graphics-bundle is a [NodeCG](http://github.com/nodecg/nodecg) bundle. 
It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `^1.3.0`
You will need to have an appropriate version of NodeCG installed to use it.

## Setup

The bundle currently depends on the TimeObject class from SGDQ17. Hopefully this can be changed in the future. You can grab it [here](https://github.com/GamesDoneQuick/sgdq17-layouts/blob/master/shared/classes/time-object.js). Put it in `shared/lib/vendor`.

1. `npm install`
2. `npm run bundle`
3. `cd ../.. && npm start`
