import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { BattlingBar } from './battlingbar'

// voeg hier jouw eigen resources toe
const Resources = {
    MainBackground: new ImageSource('images/mainBackground.png'),
    Elf: new ImageSource('images/elf.png'),
    ElfSide: new ImageSource('images/elf-sideview.png'),
    Platform: new ImageSource('images/platform2Background.png'),
    Fish: new ImageSource('images/fishShadow.png'),
    Trigger: new ImageSource('images/trigger.png'),
    ElfFishing: new ImageSource('images/elf-move-spritesheet.png'),
    Dobber: new ImageSource('images/dobber.png'),
    BattlingBar: new ImageSource('images/battlingBar.png'),
    BattlingFish: new ImageSource('images/battlingFish.png'),
    Select: new ImageSource('images/select.png')
    
}


const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }