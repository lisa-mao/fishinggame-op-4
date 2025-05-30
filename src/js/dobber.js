import { Actor, Engine, Vector, DisplayMode, CollisionType, Keys, Animation, SpriteSheet, range, AnimationStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Platform } from "./platform.js"
import { Triggercircle } from "./trigger.js"
import { ShadowFish } from "./shadowfish.js"

export class Dobber extends Actor {
   
    constructor(){
         super({

            width: Resources.Dobber.width,
            height: Resources.Dobber.height,
            
            
        })
        
        this.graphics.use(Resources.Dobber.toSprite())
       
    }

    dobberActive(){
        
        this.pos = new Vector(700, 630)
        this.scale = new Vector(3,3)
        
    }

    dobberDeactive(){
        
        this.pos = new Vector(700, 830)
        this.scale = new Vector(3,3)
        
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
        
    }

    hitSomething(event) {


        if (event.other.owner instanceof ShadowFish) {
            this.scene.engine.ui.triggerText("Press space when the fish aligns in the rectangle", 50, 650)

            event.other.owner.resetposition()
            // Je kan `instanceof` gebruiken om te zien waar je tegenaan botst.
            
            this.dobberDeactive()
            this.scene.engine.battlingBar.barActive()
            this.scene.engine.player.state = "fishreeling"
            
            // this.scene.engine.player.state = "battling"
            
            
        }


    }
   
}