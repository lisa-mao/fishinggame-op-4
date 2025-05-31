import { Actor, Engine, Vector, DisplayMode, CollisionType, Keys, randomIntInRange, Random } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class BattlingFish extends Actor {
    constructor() {
        super({
            
            width: Resources.BattlingFish.width,
            height: Resources.BattlingFish.height
        })

        this.graphics.use(Resources.BattlingFish.toSprite())

        this.pos = new Vector(30, 0)
        this.speed = 150

        this.CollisionType = CollisionType.Passive

        this.actions.repeatForever(builder => {

            builder.moveBy(-60, 0, this.speed)
            this.graphics.flipHorizontal = true     // flip de sprite

            builder.moveBy(60, 0, this.speed)
            this.graphics.flipHorizontal = false     // flip de sprite

            builder.moveBy(-60, 0, this.speed)

            builder.moveBy(60, 0, this.speed)

        }
        )
    }
}