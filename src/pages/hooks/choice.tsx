import { useLocalStorage } from '@mantine/hooks';
import { useTimer } from 'react-timer-hook';

export interface ChoiceProps {
    key: string;
    choiceA: string;
    choiceB: string;
    time: number;
}

export const useChoice = (props: ChoiceProps) => {
    const [choice, setChoice] = useLocalStorage<string>({
        key: props.key,
        defaultValue: '',
    });

    const onExpire = () => {
        if (choice == '') {
            setChoice('Nessuno');
        }
    };

    const t = useTimer({
        autoStart: false,
        expiryTimestamp: new Date(new Date().setSeconds(new Date().getSeconds() + props.time)),
        onExpire,
    });

    return {
        choose: (value: string) => {
            setChoice(value);
            t.pause();
        },
        choice,
        start: t.start,
        running: t.isRunning,
        choices: [props.choiceA, props.choiceB],
        timeLeft: t.seconds,
        stop: t.pause,
    };
};
