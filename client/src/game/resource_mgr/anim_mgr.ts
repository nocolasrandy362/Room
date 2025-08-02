// lib/AnimationManager.ts

import { createSpritesheetFromStrip } from '@/util/sprite_util'
import { Texture } from 'pixi.js'

export enum Character {
    HUMAN1 = 'human1',
}

export enum AnimType {
    IDLE = 'idle',
    WALK = 'walk',
    RUN = 'run',
}

export enum AnimShowType {
    IDLE_FRONT = 'idle1',
    IDLE_BACK = 'idle2',
    IDLE_RIGHT = 'idle3',
    WALK_FRONT = 'walk1',
    WALK_BACK = 'walk2',
    WALK_RIGHT = 'walk3',
    RUN_FRONT = 'run1',
    RUN_BACK = 'run2',
    RUN_RIGHT = 'run3',
}



export class AnimationManager {
    private cache = new Map<string, Texture[]>()

    constructor() { }

    get(character: string, action: string): Texture[] | undefined {
        const key = `${character}_${action}`

        if (this.cache.has(key)) {
            return this.cache.get(key)!
        }

        return undefined
    }

    async preload() {
        const path = '/sprites/'
        for (const anim of [AnimType.IDLE, AnimType.WALK]) {
            let animFrameCount = 4
            if (anim === AnimType.WALK) {
                animFrameCount = 6
            }
            const pngPath = `${path}${Character.HUMAN1}_${anim}.png`
            console.log(`Preloading animation: ${pngPath}`)
            const idle1 = await createSpritesheetFromStrip(pngPath, 32, 32, animFrameCount)
            this.cache.set(`${Character.HUMAN1}_${anim}1`, idle1)

            const idle2 = await createSpritesheetFromStrip(pngPath, 32, 32, animFrameCount, 1)
            this.cache.set(`${Character.HUMAN1}_${anim}2`, idle2)

            const idle3 = await createSpritesheetFromStrip(pngPath, 32, 32, animFrameCount, 2)
            this.cache.set(`${Character.HUMAN1}_${anim}3`, idle3)
        }
    }
}

export const animManager = new AnimationManager()