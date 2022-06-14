export function dayToPhase(day: number) {
    let phase = 0;
    if (day < 6) {
        phase = 1;
    }
    else if (day > 5 && day < 11) {
        phase = 2;
    }
    else {
        phase = 3;
    }

    return phase;
}