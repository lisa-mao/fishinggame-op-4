import { Actor, Random, Engine, Vector, DisplayMode, SolverStrategy, CollisionType, Keys, Trigger } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { BattlingFish } from "./battlingFish.js"

export class Select extends Actor {

    fishHitsSelectbox

    constructor() {

        super({

            width: Resources.Select.width,
            height: Resources.Select.height,
            selector: false
        })

        this.sfishHitsSelectbox = false

        this.graphics.use(Resources.Select.toSprite())
        this.pos = new Vector(0, 0)
        this.CollisionType = CollisionType.Passive
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.on('collisionend', (event) => this.unhitSomething(event))
    }

    hitSomething(event) {

        if (event.other.owner instanceof BattlingFish) {
            this.fishHitsSelectbox = true
        } 
    }

    unhitSomething(event) {

        if (event.other.owner instanceof BattlingFish) {
            this.fishHitsSelectbox = false
        } 
    }
}
