import { useState } from 'react';
import { useFinalVote } from './hooks/final-vote';

export const FinalVote = () => {
    const { partecipants, donePlayers, currentPlayer, votablePlayers, nextPlayer, isKilling, toggleKill, deadPlayers, started, start, voteResults } =
        useFinalVote();

    const [showResults, setShowResults] = useState(false);
    const showTable = donePlayers.length == partecipants.length && showResults;
    const showCheckResult = donePlayers.length == partecipants.length && !showResults;

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full">
                {started && !showCheckResult && !showTable && (
                    <>
                        <h1 className="text-5xl font-bold mb-10  text-slate-50">Turno di {currentPlayer}</h1>
                        <h1 className="text-3xl font-bold mb-10  text-slate-50">
                            Completati {donePlayers.length} di {partecipants.length}
                        </h1>
                        <div className="grid grid-cols-4 gap-4">
                            {votablePlayers.map((player, i) => {
                                return (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            toggleKill(player);
                                        }}
                                        key={i}
                                        className={`text-white text-xl m-5 p-5 rounded-md ${isKilling(player) ? 'bg-red-600' : 'bg-green-500'}`}
                                    >
                                        {player}
                                    </button>
                                );
                            })}
                            <div onClick={nextPlayer} className="bg-red-600 text-white text-xl m-5 p-5 rounded-md w-full col-span-4">
                                Vota
                            </div>
                        </div>
                    </>
                )}

                {!started && (
                    <div onClick={start} className="bg-red-600 text-white text-xl m-5 p-5 rounded-md w-full col-span-4">
                        Inizia
                    </div>
                )}

                {showCheckResult && (
                    <div onClick={() => setShowResults(true)} className="bg-red-600 text-white text-xl m-5 p-5 rounded-md w-full col-span-4">
                        Mostra risultati
                    </div>
                )}

                {showTable && (
                    <>
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
                                        Voti Morte
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Voti Vita
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(voteResults).map(([player, { kill, save }], index) => {
                                    const isDead = kill > save;
                                    return (
                                        <tr className={`border-b dark:border-neutral-500 ${isDead ? 'bg-red-600' : 'bg-green-600'}`} key={index}>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{player}</td>
                                            <td className={`whitespace-nowrap px-6 py-4`}>{kill}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{save}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </>
    );
};
