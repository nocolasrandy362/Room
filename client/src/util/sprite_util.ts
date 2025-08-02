// utils/createSpritesheet.ts
import * as PIXI from 'pixi.js'

export async function createSpritesheetFromStrip(
  imageUrl: string,
  frameWidth: number,
  frameHeight: number,
  frameCount: number,
  heightIndex: number = 0
) {
  const texture = await PIXI.Assets.load(imageUrl)
  const baseTexture = texture.source

  const frames: PIXI.Texture[] = []
  for (let i = 0; i < frameCount; i++) {
    const frame = new PIXI.Rectangle(i * frameWidth, heightIndex * frameHeight, frameWidth, frameHeight)
    const texture = new PIXI.Texture({ source: baseTexture, frame: frame })
    frames.push(texture)
  }

  return Object.values(frames)
}