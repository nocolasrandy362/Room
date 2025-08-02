import { Assets, Rectangle, SCALE_MODES, Sprite, Texture } from "pixi.js";

export enum SPRITE_TYPE {
    Terrain = 1,
};

export enum SPRITE_ID {
    EARTH = 0,
    TERRAIN_MAX = 1000,
};

export class SpriteManager {
    private sprites: Map<SPRITE_ID, Texture> = new Map();

    constructor() { }

    async preload() {
        // this.sprites.set(SPRITE_ID.EARTH,
        //     new Texture({ source: (await Assets.load("/texture/earth.png")).source }))

        const terrains = await Assets.load("/texture/terrain.png");
        const frameWidth = 32;
        const frameCount = Math.floor(terrains.source.width / frameWidth);
        for (let i = 0; i < frameCount; i++) {
            const frame = new Rectangle(i * frameWidth, 0, frameWidth, frameWidth);
            const texture = new Texture({
                source: terrains.source,
                frame: frame
            });
            texture.source.scaleMode = SCALE_MODES.NEAREST;
            this.sprites.set(i as SPRITE_ID, texture);
        }
    }

    getSrpite(type: SPRITE_ID): Sprite {
        return new Sprite(this.sprites.get(type));
    }

    getTexture(type: SPRITE_ID): Texture | undefined {
        return this.sprites.get(type);
    }

    getAllTerrains(): Map<SPRITE_ID, Texture> {
        const terrainMap = new Map<SPRITE_ID, Texture>();

        for (const [id, texture] of this.sprites.entries()) {
            if (typeof id === 'number' && id >= 0 && id < SPRITE_ID.TERRAIN_MAX) {
                terrainMap.set(id, texture);
            }
        }

        return terrainMap;
    }

    getSpriteType(spriteId: SPRITE_ID): SPRITE_TYPE | null {
        if (spriteId >= 0 && spriteId < SPRITE_ID.TERRAIN_MAX) {
            return SPRITE_TYPE.Terrain
        }
        return null
    }

}

export const spriteMager = new SpriteManager();