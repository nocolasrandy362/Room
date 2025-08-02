import { useState, useLayoutEffect } from 'react';
import { contractMgr } from '@/game/data_mgr/contract_mgr';

export default function RoomList() {
    const [showList, setShowList] = useState(true);
    const [show, setShow] = useState(false);
    const [townIds, setTownIds] = useState<number[]>([]);
    const [names, setNames] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    
    useLayoutEffect(() => {

        openRoomList();
    }, []);

    const openRoomList = async () => {
        setShow(true);

        try {
            const [fetchRoomIds, fetchedNames] = await contractMgr.getAllRooms();
            
            setTownIds(fetchRoomIds);
            setNames(fetchedNames);
        } catch (err) {
            console.error('get room error:', err);
        }
    };

    const confirmSelection = () => {
        if (selectedIndex !== null) {
            const id = townIds[selectedIndex];
            const name = names[selectedIndex];
            console.log(`choose the room: ${id}, ${name}`);

            enterRoom(id);
            // localStorage.setItem('town_id', id.toString());
        } else {
            alert('please enter a room first');
        }
    };

    const enterRoom = (roomId :number): boolean => {
        //todo 请求合约进入房间
        console.log(`enter room: ${roomId}`);

        return true
    };

    const createRoom = () => {
        //todo 请求合约创建房间

    };

    return (
        <div>
            {showList && (
                <div className="p-0">
                    {show && (
                        <div className="fixed inset-0 bg-gray-300/25 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
                            <div className="relative bg-white rounded-lg shadow-lg p-6 w-[32rem] h-[60vh] flex flex-col">

                                <button
                                    onClick={createRoom}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                                    aria-label="创建"
                                >
                                    +
                                </button>
                                <h2 className="text-xl font-semibold mb-4 text-center"></h2>
                                {/* <h2 className="text-xl font-semibold mb-4 text-center"></h2> */}

                                {/* 滚动列表区域 */}
                                <div className="flex-1 overflow-y-auto mb-4">
                                    {names.length > 0 ? (
                                        <ul className="grid gap-2">
                                            {names.map((name, idx) => (
                                                <li
                                                    key={idx}
                                                    onClick={() => setSelectedIndex(idx)}
                                                    className={`cursor-pointer p-2 rounded border ${selectedIndex === idx
                                                        ? 'bg-indigo-100 border-indigo-500 text-indigo-800'
                                                        : 'hover:bg-gray-100 border-gray-300'
                                                        }`}
                                                >
                                                    {name}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="text-gray-500">暂无数据</div>
                                    )}
                                </div>

                                {/* 确认按钮 */}
                                <button
                                    onClick={confirmSelection}
                                    className="w-[120px] h-8 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-base font-medium self-center"
                                >
                                    进入
                                </button>

                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}
