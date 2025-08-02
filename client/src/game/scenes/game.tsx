import { useApplication } from '@pixi/react'
import { Container } from "pixi.js";
import { MapView } from '../view/map_view';
import { PlayerView } from '../view/player_view';
import { Camera } from '@/game/model/camera';
import { View } from '../model/view';
import { uiManager } from '../data_mgr/ui_mgr';


export function GameScene() {
    const { app } = useApplication();

    const worldWidth = app.screen.width;
    const worldHeight = app.screen.height;
    View.Resize(worldWidth, worldHeight);

    const cameraContainer = new Container();
    const mapLayer = new Container();
    const playerLayer = new Container();
    cameraContainer.addChild(mapLayer, playerLayer);
    app.stage.addChild(cameraContainer);

    const bagContainer = new Container();
    app.stage.addChild(bagContainer);
    const editModeContainer = new Container();
    app.stage.addChild(editModeContainer);
    const camera = new Camera(
        cameraContainer,
        worldWidth,
        worldHeight,
        worldWidth,
        worldHeight
    );

    uiManager.init(app)

    // 添加帧循环
    app.ticker.add(() => {
        camera.update();
    });

    return (
        <>
            <MapView container={mapLayer} />
            <PlayerView container={playerLayer} camera={camera} />
        </>
    );
}