import '../css/style.css'
import { Actor, Random, Engine, Vector, DisplayMode, SolverStrategy, CollisionType, Keys, Trigger } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Elf } from './elf.js'
import { Platform } from './platform.js'
import { Background } from './background.js'
import { ShadowFish } from './fish.js'
import { Triggercircle } from './trigger.js'
import { UI } from './ui.js'
import { Dobber } from './dobber.js'
import { BattlingBar } from './battlingbar.js'
import { BattlingFish } from './battlingFish.js'
import { Select } from './select.js'




export class Game extends Engine {

    player
    ui

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            physics: {
                solver: SolverStrategy.Arcade,
                gravity: new Vector(0, 900),
            },
            displayMode: DisplayMode.FitScreen,
        })
        this.showDebug(true)
        this.start(ResourceLoader).then(() => this.startGame())
    }



    startGame() {
        console.log("start de game!")
        const mainB = new Background()
        this.add(mainB)

        const trigger = new Triggercircle()
        this.add(trigger)

        this.player = new Elf()
        this.add(this.player)

        this.dobbero = new Dobber()
        this.add(this.dobbero)

        const platform = new Platform()
        this.add(platform)






        let ypositions = [638, 620, 643, 675, 690, 700]
        ypositions = ypositions.sort(() => Math.random() * 0.5)

        for (let i = 0; i < ypositions.length; i++) {
            let x = Math.random() + 1300
            let speed = Math.random() * 125 + 50

            const fish = new ShadowFish(x, ypositions[i], speed)
            this.add(fish)
        }


        this.battlingBar = new BattlingBar()
        this.add(this.battlingBar)

        this.ui = new UI()
        this.add(this.ui)


    }

    resetYOnHit() {
        let ypositions = [638, 620, 643, 675, 690, 700]
        ypositions = ypositions.sort(() => Math.random() * 0.5)

        for (let i = 0; i < ypositions.length; i++) {

            console.log(ypositions[i])
        }
    }

}

new Game()
