import { Application, Container } from "pixi.js";

// 定义UI标识的枚举
export enum UIType {
    BagBar = 'BagBar',
    EditMode = 'EditMode',
}

class UIManager {
    private uis: Map<UIType, Container> = new Map(); // 存储多个 UI
    private app: Application | null = null; // 当前应用

    constructor() {}

    public init(app: Application) {
        this.app = app;
    }

    // 添加新的 UI
    public addUI(uiType: UIType, ui: Container) {
        if (!this.app) return;
        
        // 如果这个 UI 已经存在，直接返回
        if (this.uis.has(uiType)) return;

        // 添加 UI 到容器中
        this.uis.set(uiType, ui);
        this.app.stage.addChild(ui);
    }

    // 移除指定的 UI
    public removeUI(uiType: UIType) {
        if (!this.app) return;
        
        const ui = this.uis.get(uiType);
        if (ui && ui.parent) {
            ui.parent.removeChild(ui); // 从舞台移除该 UI
            this.uis.delete(uiType); // 从管理列表中删除
        }
    }

    public hideUI(uiType: UIType) {
        if (!this.app) return;
        
        const ui = this.uis.get(uiType);
        if (ui && ui.parent) {
            ui.visible = false;
        }
    }

    public showUI(uiType: UIType) {
        if (!this.app) return;
        
        const ui = this.uis.get(uiType);
        if (ui && ui.parent) {
            ui.visible = true;
        }
    }

    // 切换到指定 UI
    public switchUI(uiType: UIType, ui: Container) {
        this.removeUI(uiType); // 先移除当前 UI
        this.addUI(uiType, ui); // 添加新的 UI
    }

    // 获取指定类型的 UI
    public getUI(uiType: UIType): Container | undefined {
        return this.uis.get(uiType);
    }

    // 手动关闭指定类型的 UI
    public closeUI(uiType: UIType) {
        this.removeUI(uiType);
    }

    // 获取所有 UI
    public getAllUIs(): Map<UIType, Container> {
        return this.uis;
    }
}

export const uiManager = new UIManager();
