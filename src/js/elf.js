import { Actor, Engine, Vector, DisplayMode, CollisionType, Keys, Animation, SpriteSheet, range, AnimationStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Platform } from "./platform.js"
import { Triggercircle } from "./triggercircle.js"

export class Elf extends Actor {

    state
    score

    constructor() {


        super({
            width: Resources.Elf.width,
            height: Resources.Elf.height,
            fishingEnabled: false
        })
        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.ElfFishing,
            grid: { rows: 1, columns: 12, spriteWidth: 64, spriteHeight: 60 }
        })

        this.state = "idle"
        this.score = 0
        // fishing, battling
        this.graphics.use(Resources.Elf.toSprite())
        const fishing = Animation.fromSpriteSheet(runSheet, range(1, 10), 60, AnimationStrategy.Freeze)
        this.graphics.add("fishing", fishing)


       

        this.pos = new Vector(420, 600)
        this.scale = new Vector(1.5, 1.5)
        this.body.collisionType = CollisionType.Active
    }

    onPreUpdate(engine) {
        if (this.state === 'idle') {
            this.idleMovement(engine)
        }
        if (this.state === 'fishing') {
            this.fishingMovement(engine)
        }

        if (this.state === 'fishreeling') {
            this.battleReeling(engine)
        }

    }

    fishingMovement(engine) {
        this.fishingEnabled = false

    }

    

    battleReeling(engine) {
        let kb = engine.input.keyboard
        this.fishingEnabled = false
        if (kb.wasPressed(Keys.Space)) {
           

            console.log(engine.battlingBar.select.fishHitsSelectbox)
            if(engine.battlingBar.select.fishHitsSelectbox) {
                console.log("YOU CAUGHT THE FISH~!!!!!! ")
                 this.scene.engine.battlingBar.barDeactive()
                 this.state = 'idle'
                 this.score++
                 this.scene.engine.ui.showScore(this.score)
                 
            } else {
                console.log("you were too slow!!!")
            }



        //    if (selectbox.fishHitsSelectbox) {

        //    }
        }
    }



    idleMovement(engine) {
        let xspeed = 0
        let yspeed = 0
        
        let kb = engine.input.keyboard

        if (kb.isHeld(Keys.A)) {
            xspeed = -300
            this.graphics.use(Resources.ElfSide.toSprite())
            this.graphics.flipHorizontal = true     // flip de sprite

        } else if (kb.isHeld(Keys.D)) {
            xspeed = 300
            this.graphics.use(Resources.ElfSide.toSprite())
            this.graphics.flipHorizontal = false
            // flip de sprite
        } else if (kb.wasPressed(Keys.E)) {
            console.log('fish')
            this.graphics.use('fishing')
            // Animation.reset
            this.state = 'fishing'

            this.scene.engine.dobbero.dobberActive()

        }
        this.vel = new Vector(xspeed, yspeed)

    }



    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.on('collisionend', (event) => this.leftSomething(event))
    }

    hitSomething(event) {


        if (event.other.owner instanceof Platform) {
            // Je kan `instanceof` gebruiken om te zien waar je tegenaan botst.


        }

        if (event.other.owner instanceof Triggercircle && this.state === 'idle') {
            this.fishingEnabled = true

            this.scene.engine.ui.triggerText("Hold E to fish", 400, 600)
        }

    }

    leftSomething(event) {
        if (event.other.owner instanceof Triggercircle && this.state === 'idle') {

            this.fishingEnabled = false
            this.scene.engine.ui.triggerText("", 400, 600)
        }
    }

}
