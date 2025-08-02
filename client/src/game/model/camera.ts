import * as PIXI from 'pixi.js';

export enum Layer {
    BACKGROUND = -2,
    MAP = -1,
    DEFAULT = 0,
    PLAYER = 2,
}

export class Camera {
    private container: PIXI.Container;
    private screenWidth: number;
    private screenHeight: number;
    private worldWidth: number;
    private worldHeight: number;

    private target: PIXI.Container | null = null;
    private followSpeed = 1; // 1 = 瞬间追踪，0.1 = 平滑追踪

    constructor(
        container: PIXI.Container,
        screenWidth: number,
        screenHeight: number,
        worldWidth: number,
        worldHeight: number
    ) {
        this.container = container;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
    }

    // 每帧调用
    update() {
        if (!this.target) return;

        const targetX = this.target.x;
        const targetY = this.target.y;

        const centerX = this.screenWidth / 2;
        const centerY = this.screenHeight / 2;

        // 想要移动到的位置
        const desiredX = centerX - targetX;
        const desiredY = centerY - targetY;
        this.container.position.set(desiredX, desiredY);
        return;

        // 限制在边界内
        const minX = -(this.worldWidth - this.screenWidth);
        const minY = -(this.worldHeight - this.screenHeight);
        const maxX = 0;
        const maxY = 0;

        const newX = this.clamp(
            this.lerp(this.container.position.x, desiredX, this.followSpeed),
            minX,
            maxX
        );
        const newY = this.clamp(
            this.lerp(this.container.position.y, desiredY, this.followSpeed),
            minY,
            maxY
        );

        console.log(newX, newY);
        this.container.position.set(newX, newY);
    }

    setZoom(scale: number) {
        this.container.scale.set(scale);
    }

    private clamp(value: number, min: number, max: number) {
        return Math.max(min, Math.min(max, value));
    }

    private lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    
    public setFollowTarget(target: PIXI.Container, followSpeed = 1) {
        this.target = target;
        this.followSpeed = followSpeed;
    }
}
