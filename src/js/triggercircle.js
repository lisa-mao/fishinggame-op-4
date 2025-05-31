import { Actor, Engine, Vector, DisplayMode, CollisionType, Keys, randomIntInRange, Random } from "excalibur"

import { Resources, ResourceLoader } from './resources.js'

export class Triggercircle extends Actor {

    constructor(){
        super({

            width: Resources.Trigger.width,
            height: Resources.Trigger.height
        })

        this.graphics.use(Resources.Trigger.toSprite())
        this.pos = new Vector(555,535)
        this.scale = new Vector(2,2)
        this.body.collisionType = CollisionType.Passive
    }
}