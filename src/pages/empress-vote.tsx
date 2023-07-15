import { useChoice } from './hooks/choice';

export const EmpressVote = () => {
    const c = useChoice({
        choiceA: 'Roberto Govoni',
        choiceB: 'Monica De Angelis',
        key: 'model-vote',
        time: 20,
    });

    const { choice, choices, start, running, choose, timeLeft } = c;

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {!choice && !running && (
                <button onClick={start} className="m-10 p-10 text-5xl bg-red-700 flex-grow">
                    Inizia
                </button>
            )}

            {running && !choice && (
                <div className="flex flex-col items-center justify-center w-full">
                    <p className="text-5xl">Chi vuoi uccidere?</p>
                    <div className="flex flex-row gap-5  w-full p-2 m-2">
                        <button onClick={() => choose(choices[0])} className="m-10 p-10 text-5xl bg-red-700 flex-grow disabled:bg-slate-400">
                            {choices[0]}
                        </button>

                        <button disabled className="m-10 p-10 text-5xl bg-red-700 flex-grow disabled:bg-slate-400">
                            {timeLeft}
                        </button>

                        <button onClick={() => choose(choices[0])} className="m-10 p-10 text-5xl bg-red-700 flex-grow disabled:bg-slate-400">
                            {choices[1]}
                        </button>
                    </div>
                </div>
            )}

            {choice && (
                <>
                    <div className="flex flex-row gap-5  w-full p-2 m-2">
                        <div className="m-10 p-10 text-5xl bg-red-700 flex-grow disabled:bg-slate-400">Hai scelto {choice}</div>
                    </div>
                </>
            )}
        </div>
    );
};
