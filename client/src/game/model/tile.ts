import { Container, Sprite } from "pixi.js";
import { View } from "./view";
import { SPRITE_ID, spriteMager } from "../resource_mgr/sprite_mgr";

export class Tile extends Container {
    public sprite: Sprite | null = null
    public terrainType: SPRITE_ID = SPRITE_ID.EARTH
    private size: number

    constructor(type: SPRITE_ID = SPRITE_ID.EARTH) {
        super()
        this.size = View.TILE_SIZE

        const earth = spriteMager.getSrpite(SPRITE_ID.EARTH)
        earth.setSize(this.size, this.size)
        this.addChild(earth);

        if (type !== SPRITE_ID.EARTH) {
            const sprite = spriteMager.getSrpite(type)
            this.sprite = sprite
            this.sprite.setSize(this.size, this.size)
            this.terrainType = type
            this.addChild(sprite);
        }
    }

    updateSprite(sprite: Sprite) {
        if (this.sprite) {
            this.removeChild(this.sprite)
            this.sprite.destroy()
            this.sprite = null
        }
        sprite.setSize(this.size, this.size)
        this.addChild(sprite)
        this.sprite = sprite
    }
}