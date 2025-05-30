import { Actor, Engine, Vector, DisplayMode, CollisionType, Keys, randomIntInRange, Random } from "excalibur"

import { Resources, ResourceLoader } from './resources.js'

export class ShadowFish extends Actor {
    constructor(x, y, speed) {
        speed
        super({

            width: Resources.Fish.width,
            height: Resources.Fish.height
        })

        this.graphics.use(Resources.Fish.toSprite())
     
        this.speed = speed
        this.pos = new Vector(x, y)

        this.body.collisionType = CollisionType.Fixed

        this.actions.repeatForever(builder => {


            builder.moveBy(-600, 0, this.speed)
            this.graphics.flipHorizontal = true     // flip de sprite

            builder.moveBy(600, 0, this.speed)
            this.graphics.flipHorizontal = false     // flip de sprite

            builder.moveBy(-600, 0, this.speed)

            builder.moveBy(600, 0, this.speed)
        }
        )
    }

    resetposition() {
        let x = Math.random() + 1300
        this.pos = new Vector(x, this.pos.y)
    }
}