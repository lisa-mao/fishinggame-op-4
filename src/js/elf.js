import { Actor, Engine, Vector, DisplayMode, CollisionType, Keys, Animation, SpriteSheet, range, AnimationStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Platform } from "./platform.js"
import { Triggercircle } from "./triggercircle.js"

export class Elf extends Actor {
    
    state
    score
    #fishingEnabled

    constructor() {
        super({
            width: Resources.Elf.width,
            height: Resources.Elf.height,

        })

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.ElfFishing,
            grid: { rows: 1, columns: 12, spriteWidth: 64, spriteHeight: 60 }
        })

        //unique properties
        this.#fishingEnabled = "no" //private so it cant be changed elsewhere
        this.state = "idle"
        this.score = 0

        // fishing, battling
        this.graphics.use(Resources.Elf.toSprite())
        const fishing = Animation.fromSpriteSheet(runSheet, range(1, 10), 60, AnimationStrategy.Freeze)
        this.graphics.add("fishing", fishing)

        //basic properties
        this.pos = new Vector(420, 600)
        this.scale = new Vector(1.5, 1.5)
        this.body.collisionType = CollisionType.Active
    }

    //states with their according methods
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

    //unable to press e again when in this state
    fishingMovement(engine) {
        this.#fishingEnabled = "no"
    }


    //battling method activating a battlingbar 
    battleReeling(engine) {
        let kb = engine.input.keyboard
        this.#fishingEnabled = "no"
        if (kb.wasPressed(Keys.Space)) {

            if (engine.battlingBar.select.fishHitsSelectbox) {
                console.log("YOU CAUGHT THE FISH~!!!!!! ")
                this.scene.engine.battlingBar.barDeactive()

                this.state = 'idle'

                this.score++
                this.scene.engine.ui.showScore(this.score)

            } else {
                console.log("you were too slow!!!")
            }
        }
    }


    //walking movement & triggers the triggerCircle to enable fishing
    idleMovement(engine) {
        let xspeed = 0
        let yspeed = 0

        let kb = engine.input.keyboard

        if (kb.isHeld(Keys.A)) {
            xspeed = -300
            this.graphics.use(Resources.ElfSide.toSprite())
            this.graphics.flipHorizontal = true

        } else if (kb.isHeld(Keys.D)) {
            xspeed = 300
            this.graphics.use(Resources.ElfSide.toSprite())
            this.graphics.flipHorizontal = false

        } else if (kb.wasPressed(Keys.E) && this.#fishingEnabled === "yes") {
            this.graphics.use('fishing')

            this.state = 'fishing'

            this.scene.engine.dobbero.dobberActive()
        }

        this.vel = new Vector(xspeed, yspeed)
    }


    //collision events
    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.on('collisionend', (event) => this.leftSomething(event))
    }


    hitSomething(event) {
        //show text & enabling fishingenabled to yes
        if (event.other.owner instanceof Triggercircle && this.state === 'idle') {
            this.#fishingEnabled = "yes"
            this.scene.engine.ui.triggerText("Press E to fish", 400, 600)
        }

    }

    leftSomething(event) {

        //if player left triggerCircle fishingenabled goes disabled and the text 'disappears'
        if (event.other.owner instanceof Triggercircle && this.state === 'idle') {
            this.#fishingEnabled = "no"
            this.scene.engine.ui.triggerText("", 400, 600)
        }
    }

}
