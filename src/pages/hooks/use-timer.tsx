import React, { useState, useEffect } from 'react';

// Definisci l'interfaccia del valore di ritorno del hook useTimer
interface UseTimer {
    timeLeft: number;
    isCompleted: () => boolean;
    isRunning: () => boolean;
    isNotStarted: () => boolean;
    isPaused: () => boolean;
    start: () => void;
    pause: () => void;
    reset: () => void;
}

// Crea un hook personalizzato chiamato useTimer
export function useTimer(seconds: number): UseTimer {
    // Usa useState per memorizzare il tempo rimanente
    const [timeLeft, setTimeLeft] = useState<number>(seconds);

    // Usa useState per memorizzare il timer
    const [timer, setTimer] = useState<number | null>(null);

    // Usa useState per memorizzare se il timer è in pausa o no
    const [paused, setPaused] = useState<boolean>(false);

    // Usa useEffect per gestire il countdown e la pulizia del timer
    useEffect(() => {
        // Se il tempo rimanente è zero, ferma il timer e ritorna
        if (timeLeft === 0) {
            clearInterval(timer as number);
            return;
        }

        // Altrimenti, crea un timer che decrementa il tempo rimanente ogni secondo solo se non è in pausa
        if (!paused) {
            setTimer(
                setInterval(() => {
                    setTimeLeft((prevTime) => prevTime - 1);
                }, 1000) as unknown as number,
            );
        }

        // Pulisci il timer quando la componente si smonta o quando cambia il tempo rimanente o lo stato di pausa
        return () => {
            clearInterval(timer as number);
        };
    }, [timeLeft, paused]);

    // Crea una funzione per far partire il timer
    const start = () => {
        // Se il timer non è ancora partito o è in pausa, cambia lo stato di pausa a falso
        if (isNotStarted() || isPaused()) {
            setPaused(false);
        }
    };

    // Crea una funzione per mettere in pausa il timer
    const pause = () => {
        // Se il timer è in corso, cambia lo stato di pausa a vero e ferma il timer
        if (isRunning()) {
            setPaused(true);
            clearInterval(timer as number);
        }
    };

    // Crea una funzione per resettare il timer
    const reset = () => {
        // Se il timer è in corso o in pausa, ferma il timer e cambia lo stato di pausa a falso
        if (isRunning() || isPaused()) {
            clearInterval(timer as number);
            setPaused(false);
        }
        // Ripristina il tempo rimanente al valore iniziale
        setTimeLeft(seconds);
    };

    // Esporta le funzioni per sapere se il timer è stato completato, se è in corso, se non è ancora stato avviato, se è in pausa
    const isCompleted = (): boolean => timeLeft === 0;
    const isRunning = (): boolean => timeLeft > 0 && timer !== null;
    const isNotStarted = (): boolean => timeLeft === seconds && timer === null;
    const isPaused = (): boolean => paused;

    // Ritorna il tempo rimanente e le funzioni esportate
    return { timeLeft, isCompleted, isRunning, isNotStarted, isPaused, start, pause, reset };
}
