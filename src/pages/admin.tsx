import allPlayers from '../assets/players.json';
import { useLocalStorage } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const [deadPlayers, setDeadPlayers] = useLocalStorage<string[]>({
        key: 'dead-players',
        defaultValue: [],
    });

    const navigate = useNavigate();

    const kill = (player: string) => {
        setDeadPlayers([...deadPlayers, player]);
    };

    const revive = (player: string) => {
        setDeadPlayers(deadPlayers.filter((p) => p !== player));
    };

    const getStatus = (player: string) => {
        return deadPlayers.includes(player) ? 'Morto' : 'Vivo';
    };

    const goto = (path: string) => {
        navigate('/' + path);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center ">
                <h1 className="text-4xl font-bold mb-10">Admin</h1>
                <h2 className="text-2xl font-bold mb-10">Votazioni</h2>
                <div className="flex flex-row w-full p-2 m-2">
                    <button onClick={() => goto('empress')} className="m-3 p-3 bg-red-600 flex-grow">
                        Empress
                    </button>
                    <button onClick={() => goto('chariot')} className="m-3 p-3 bg-red-600 flex-grow">
                        Chariot
                    </button>
                    <button onClick={() => goto('lovers')} className="m-3 p-3 bg-red-600 flex-grow">
                        Lovers
                    </button>
                    <button onClick={() => goto('final')} className="m-3 p-3 bg-red-600 flex-grow">
                        Final
                    </button>
                </div>
                <h2 className="text-2xl font-bold mb-10">Giocatori</h2>
                <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                #
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Giocatore
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPlayers.map((player, index) => {
                            const isDead = deadPlayers.includes(player);
                            return (
                                <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{player}</td>
                                    <td className={`whitespace-nowrap px-6 py-4 ${isDead ? 'bg-red-600' : 'bg-green-600'}`}>{getStatus(player)}</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {!isDead && <button onClick={() => kill(player)}>Uccidi</button>}
                                        {isDead && <button onClick={() => revive(player)}>Revivi</button>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};
