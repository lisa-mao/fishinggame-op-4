import { Actor, Engine, Vector, DisplayMode, CollisionType, Keys, randomIntInRange, Random } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { BattlingFish } from './battlingFish.js'
import { Select } from './select.js'

export class BattlingBar extends Actor {

    select          // het boxje waar de vis onder door zwemt
    battlingFish   // the fish that moves in the bar

    constructor() {
        super()

        this.graphics.use(Resources.BattlingBar.toSprite())
        this.barDeactive()

        this.scale = new Vector(3, 3)
    }

   

    onInitialize() {
        this.battlingFish = new BattlingFish()
        this.addChild(this.battlingFish)

        this.select = new Select()
        this.addChild(this.select)
    }

    barActive() {
        this.pos = new Vector(650, 440)
    }

    barDeactive() {
        this.pos = new Vector(-2700, 2440)
    }

}
