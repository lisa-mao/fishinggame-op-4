import { Actor, Keys, Engine, Vector, DisplayMode, CollisionType} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Background extends Actor {
    constructor() {
        super()
        this.graphics.use(Resources.MainBackground.toSprite())
        this.pos = new Vector(640, 360)
        this.body.collisionType = CollisionType.PreventCollision
    }
}