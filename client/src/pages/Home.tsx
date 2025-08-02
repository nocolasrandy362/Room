import { Application } from '@pixi/react'
import { GameEntry } from '@/game/scenes/enrty'
export default function Home() {
  return (
    <div className="game-container">
      <Application background={0xffffff} autoStart={true} resizeTo={window}>
        <GameEntry />
      </Application>
    </div>
  )
}