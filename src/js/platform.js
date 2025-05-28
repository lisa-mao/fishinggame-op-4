import { Actor, Keys, Engine, Vector, DisplayMode, CollisionType} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'


export class Platform extends Actor{

    constructor() {
        super({
            //assign hitbox
            width: Resources.Platform.width,
            height: Resources.Platform.height
        })

        this.graphics.use(Resources.Platform.toSprite())
        this.pos = new Vector(310, 638)
        this.body.collisionType = CollisionType.Fixed
    }
    
}