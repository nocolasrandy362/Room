import { ethers } from "ethers";

const roomAbi = [
    'function createRoom(string calldata _name) external returns (uint256)',
    'function getAllRooms() external view returns (uint256[] memory ids_, string[] memory names_)',
];
const roomContractAddress = import.meta.env.VITE_ROOMS_ADDRESS || '';

const rpcUrl = import.meta.env.VITE_ETH_URL;
const testPrivateKey = import.meta.env.VITE_PRIVATE_KEY;

export class ContractManager {
    private roomContract: ethers.Contract;
    private roomId: number = 0;
    constructor() {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        this.roomContract = new ethers.Contract(roomContractAddress, roomAbi, provider);
    }

    reload(privateKey: string) {
        if (testPrivateKey) {
            privateKey = testPrivateKey;
        }
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const wallet = new ethers.Wallet(privateKey, provider);
        this.roomContract = new ethers.Contract(roomContractAddress, roomAbi, wallet);
    }

    enterRoom(roomId: number) {
        this.roomId = roomId;
    }

    async getAllRooms() {
        return await this.roomContract.getAllRooms();
    }
}

export const contractMgr = new ContractManager();
