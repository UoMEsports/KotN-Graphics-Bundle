# KotN Showdown Graphics

kotn-graphics-bundle is a [NodeCG](http://github.com/nodecg/nodecg) bundle. It was developed and run in version 1.3.0. It may work with future versions, but there's no guarantee that it will work on anything else.

## Examples
Only two graphics were ready in time for the event, the lower third and the timer. If you do some digging you can find the remnants of other planned features.

### Timer
#### Dashboard
![timer dashboard](https://raw.githubusercontent.com/UoMEsports/kotn-graphics-bundle/master/media/timer_dashboard.png)
#### Graphic
![timer graphic](https://raw.githubusercontent.com/UoMEsports/kotn-graphics-bundle/master/media/timer_graphic.png)

### Lower Third
#### Dashboard
![lower third dashboard](https://raw.githubusercontent.com/UoMEsports/kotn-graphics-bundle/master/media/lower_third_dashboard.png)
#### Graphic
![lower third graphic](https://raw.githubusercontent.com/UoMEsports/kotn-graphics-bundle/master/media/lower_third_graphic.png)

## Setup

Once that's done, and you've got NodeCG setup do:
1. [Install NodeCG](https://nodecg.com/tutorial-3_quick-start.html)
2. `git clone https://github.com/UoMEsports/kotn-graphics-bundle.git <nodecg_install_directory>/bundles/kotn-graphics-bundle`
3. `npm install`
4. `npm run build`
5. Download the [TimeObject class](https://github.com/GamesDoneQuick/sgdq17-layouts/blob/master/shared/classes/time-object.js) from SGDQ17 and put it in `shared/lib/vendor`
