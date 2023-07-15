import {useEffect, useState} from 'react';
import {useLocalStorage} from '@mantine/hooks';

export const LoversVote = () => {
    const players = ['Monica', 'Roberto'] as const;
    const answares = ['Ci Lasciamo', 'Rimaniamo insieme ma non teniamo il bambino', 'Rimaniamo insieme e teniamo il bambino'];
    const [currentPlayer, setCurrentPlayer] = useState<string>('');

    const [selezionato, setSelezionato] = useLocalStorage<{ Monica: string, Roberto: string, [key: string]: string }>({
        key: 'lover-choice',
        defaultValue: {Monica: '', Roberto: ''},
    });

    const [done, setDone] = useState(false);


    const onStart = () => {
        setCurrentPlayer(players[0]);
    };

    const onSelect = (answare: string) => {
        if (currentPlayer === players[0])
            setCurrentPlayer(players[1]);
        if(currentPlayer === players[1]) {
            setDone(true);
            setCurrentPlayer('');
        }

        setSelezionato((old) => ({...old, [currentPlayer]: answare}) )
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full">
                {!currentPlayer && !done && (
                    <div className="flex flex-row gap-10 w-full p-2 m-2">
                        <button onClick={onStart} className="m-10 p-10 text-5xl bg-red-700 flex-grow">
                            Start
                        </button>
                    </div>
                )}
                {done && (<>
                    <div className="flex flex-col gap-5  w-full p-2 m-2">
                        {Object.keys(selezionato).map(value => (
                            <button
                                    className="m-10 p-10  text-5xl bg-red-700 flex-grow disabled:bg-slate-400">
                                {value} ha scelto {selezionato[value]}
                            </button>
                        ))}
                    </div>
                </>)}

                {currentPlayer && (
                    <>
                        <p className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent">
                            Che cosa vuoi fare {currentPlayer.split(' ')[0]}?
                        </p>
                        <div className="flex flex-col gap-5  w-full p-2 m-2">
                            {answares.map((answare) => (
                                <button onClick={() => onSelect(answare)}
                                        className="m-10 p-10  text-3xl bg-red-700 flex-grow disabled:bg-slate-400">
                                    {answare}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
