import { Player } from '../model/player';

export class PlayerManager {
    private players = new Map<number, Player>();
    private self: Player | null = null;

    constructor() { }

    setSelf(player: Player | null) {
        this.self = player
    }

    getSelf(): Player | null {
        return this.self
    }

    getPlayers(): Player[] {
        return Array.from(this.players.values())
    }

    hasPlayer(id: number): boolean {
        return this.players.has(id)
    }

    findPlayer(id: number): Player | null {
        return this.players.get(id) || null
    }

    addPlayer(id: number, player: Player) {
        this.players.set(id, player)
    }

    removePlayer(id: number) {
        this.players.delete(id)
    }

}

export const playerMager = new PlayerManager();