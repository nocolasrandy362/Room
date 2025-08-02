import { Container, AnimatedSprite, SCALE_MODES, Texture, Sprite, Graphics } from 'pixi.js'
import { AnimShowType, animManager, Character } from '@/game/resource_mgr/anim_mgr'
import { View } from './view'
import { SPRITE_ID } from '../resource_mgr/sprite_mgr'

export enum Direction {
    UP = 1,
    DOWN = 2,
    LEFT = 3,
    RIGHT = 4,
}

export enum MoveType {
    IDLE = 0,
    WALK = 1,
    RUN = 2,
}

export class Player extends Container {
    private isLocal: boolean
    private character: Character = Character.HUMAN1
    public sprite: AnimatedSprite | undefined
    private carriedItem: Sprite | null = null;
    private carriedItemId: SPRITE_ID | null = null;

    public moveStatus: MoveType = MoveType.IDLE;
    public currentFacing: Direction = Direction.DOWN

    private currentAnimKey: string | null = null
    private keysPressed = new Set<string>()
    private keyPressed: string = ''

    constructor(isLocal = false) {
        super()
        this.isLocal = isLocal

        this.setAnim(AnimShowType.IDLE_FRONT)

        if (isLocal) {
            window.addEventListener('keydown', this.onKeyDown)
            window.addEventListener('keyup', this.onKeyUp)
        }
    }

    destroy(options?: any): void {
        if (this.isLocal) {
            window.removeEventListener('keydown', this.onKeyDown)
            window.removeEventListener('keyup', this.onKeyUp)
        }
        super.destroy(options)
    }
    private onKeyDown = (e: KeyboardEvent) => {
        this.keysPressed.add(e.key)
        this.keyPressed = e.key
    }

    private onKeyUp = (e: KeyboardEvent) => {
        this.keysPressed.delete(e.key)
        if (e.key == this.keyPressed) {
            this.keyPressed = ''
        }
    }

    updateMe(): boolean {
        if (!this.isLocal) return false
        const lastStatus = this.moveStatus
        const lastDir = this.currentFacing

        this.moveStatus = MoveType.WALK
        if (this.keyPressed === 'ArrowLeft' ||
            this.keyPressed === 'a' ||
            this.keyPressed === 'A') {
            this.currentFacing = Direction.LEFT
        } else if (this.keyPressed === 'ArrowRight' ||
            this.keyPressed === 'd' ||
            this.keyPressed === 'D') {
            this.currentFacing = Direction.RIGHT
        } else if (this.keyPressed === 'ArrowUp' ||
            this.keyPressed === 'w' ||
            this.keyPressed === 'W') {
            this.currentFacing = Direction.UP
        } else if (this.keyPressed === 'ArrowDown' ||
            this.keyPressed === 's' ||
            this.keyPressed === 'S') {
            this.currentFacing = Direction.DOWN
        } else {
            this.moveStatus = MoveType.IDLE
        }
        if (lastStatus === this.moveStatus &&
            lastDir === this.currentFacing) {
            return false
        }
        return true
    }
    update(x: number, y: number, dir: number, move: number) {
        this.moveStatus = move
        this.currentFacing = dir

        if (this.currentFacing == Direction.LEFT) {
            this.setDirection(-1)
        }
        if (this.currentFacing == Direction.RIGHT) {
            this.setDirection(1)
        }

        this.x = x
        this.y = y
        this.updateAnimation()
    }

    private setAnim(animKey: AnimShowType) {
        if (this.currentAnimKey === animKey) return
        this.currentAnimKey = animKey

        const textures = animManager.get(this.character, animKey)
        if (!textures) return

        if (!this.sprite) {
            this.sprite = new AnimatedSprite(textures)
            this.sprite.anchor.set(0.5)
            this.sprite.animationSpeed = 0.07
            this.sprite.loop = true
            // this.sprite.scale.set(2)
            this.sprite.setSize(View.PLAYER_SIZE, View.PLAYER_SIZE)
            this.sprite.texture.source.scaleMode = SCALE_MODES.NEAREST;
            this.addChild(this.sprite)
        } else {
            this.sprite.textures = textures
            this.sprite.texture.source.scaleMode = SCALE_MODES.NEAREST;
        }

        this.sprite.play()
    }

    private updateAnimation() {
        let anim: AnimShowType = AnimShowType.IDLE_FRONT

        if (this.moveStatus != MoveType.IDLE) {
            switch (this.currentFacing) {
                case Direction.DOWN: anim = AnimShowType.WALK_FRONT; break
                case Direction.UP: anim = AnimShowType.WALK_BACK; break
                case Direction.RIGHT: case Direction.LEFT: anim = AnimShowType.WALK_RIGHT; break
            }
        } else {
            switch (this.currentFacing) {
                case Direction.DOWN: anim = AnimShowType.IDLE_FRONT; break
                case Direction.UP: anim = AnimShowType.IDLE_BACK; break
                case Direction.RIGHT: case Direction.LEFT: anim = AnimShowType.IDLE_RIGHT; break
            }
        }

        this.setAnim(anim)
    }

    setDirection(dir: number) {
        if (this.sprite) {
            this.sprite.scale.x = Math.abs(this.sprite.scale.x) * dir
        }
    }

    setPosition(x: number, y: number) {
        this.position.set(x, y)
    }

    isLocalPlayer() {
        return this.isLocal
    }

    public setCarriedItem(itemType: SPRITE_ID, texture: Texture) {
        // 移除旧物品
        if (this.carriedItem) {
            this.removeChild(this.carriedItem);
            this.carriedItem.destroy();
            this.carriedItem = null;
        }

        // 添加新物品
        if (texture && this.sprite) {
            const itemSprite = new Sprite(texture);
            itemSprite.anchor.set(0.5, 1); // 底部中心对齐
            itemSprite.width = View.PLAYER_SIZE / 3;
            itemSprite.height = View.PLAYER_SIZE / 3;

            itemSprite.position.set(this.sprite.x, this.sprite.y - View.PLAYER_SIZE / 3);
            this.addChild(itemSprite);
            this.carriedItem = itemSprite;
            this.carriedItemId = itemType;
        }
    }

    public removeCarriedItem() {
        if (this.carriedItem) {
            this.removeChild(this.carriedItem);
            this.carriedItem.destroy();
            this.carriedItem = null;
            this.carriedItemId = null;
        }
    }

    public getCarriedItem(): [SPRITE_ID | null, Sprite | null] {
        return [this.carriedItemId, this.carriedItem];
    }
}