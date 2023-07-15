import { useLocalStorage } from '@mantine/hooks';
import allPlayers from '../../assets/players.json';
import { useEffect, useState } from 'react';

export type PlayerVotes = { kill: string[]; save: string[] };
export type PlayerVoteResults = { kill: number; save: number };

export const useFinalVote = () => {
    const [deadPlayers] = useLocalStorage<string[]>({
        key: 'dead-players',
        defaultValue: [],
    });

    const [playerVotes, setPlayerVotes] = useLocalStorage<Record<string, PlayerVotes>>({
        key: 'player-votes',
        defaultValue: {},
    });

    const [donePlayers, setDonePlayers] = useState<string[]>([]);

    const alivePlayers = allPlayers.filter((player) => !deadPlayers.includes(player));
    const [currentPlayer, setCurrentPlayer] = useState<string>(() => {
        console.log(deadPlayers);

        return allPlayers.filter((player) => !deadPlayers.includes(player))[0];
    });

    const [started, setStarted] = useState(false);

    const votablePlayers = alivePlayers.filter((player) => player !== currentPlayer);

    const done = alivePlayers.every((player) => donePlayers.includes(player));

    const calculateVotes = () => {
        const result: Record<string, PlayerVoteResults> = {};
        for (const player of alivePlayers) {
            result[player] = { kill: 0, save: 0 };
        }

        for (const [voter, vote] of Object.entries(playerVotes)) {
            for (const player of vote.kill) {
                if (voter === 'Gabriele Piersanti') {
                    result[player].kill++;
                }
                if (player === 'Gabriele Piersanti') {
                    result[player].kill++;
                }
                result[player].kill++;
            }
            for (const player of vote.save) {
                if (voter === 'Gabriele Piersanti') {
                    result[player].save++;
                }
                result[player].save++;
            }
        }
        return result;
    };

    const start = () => {
        setCurrentPlayer(alivePlayers[0]);
        setStarted(true);
    };

    const nextPlayer = () => {
        setDonePlayers((old) => [...new Set([...old, currentPlayer])]);
        const nextPlayer = alivePlayers.filter((player) => !donePlayers.includes(player) && player != currentPlayer)[0];
        if (!nextPlayer) {
            return;
        }
        setCurrentPlayer(nextPlayer);
    };

    const isKilling = (player: string) => {
        return playerVotes[currentPlayer]?.kill.includes(player);
    };

    const toggleKill = (player: string) => {
        if (isKilling(player)) {
            setPlayerVotes((old) => ({
                ...old,
                [currentPlayer]: {
                    ...old[currentPlayer],
                    kill: old[currentPlayer].kill.filter((p) => p !== player),
                    save: [...old[currentPlayer].save, player],
                },
            }));
        } else {
            setPlayerVotes((old) => ({
                ...old,
                [currentPlayer]: {
                    ...old[currentPlayer],
                    kill: [...old[currentPlayer].kill, player],
                    save: old[currentPlayer].save.filter((p) => p !== player),
                },
            }));
        }
    };

    useEffect(() => {
        for (const p of alivePlayers) {
            setPlayerVotes((old) => ({
                ...old,
                [p]: {
                    ...old[currentPlayer],
                    kill: [],
                    save: alivePlayers.filter((player) => player != p),
                },
            }));
            // alivePlayers.filter((player) => player != p);
        }

        setCurrentPlayer(alivePlayers[0]);
    }, []);

    return {
        partecipants: alivePlayers,
        votablePlayers,
        currentPlayer,
        donePlayers,
        deadPlayers,
        started,
        done,
        nextPlayer,
        isKilling,
        toggleKill,
        start,
        voteResults: calculateVotes(),
    };
};
