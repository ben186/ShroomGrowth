import type { Frame } from "react-native-vision-camera";

declare function __processWithTFLite(frame: Frame): { day: number, contaminated: boolean };

export function processWithTFLite(frame: Frame): { day: number, contaminated: boolean } {
    'worklet';
    return __processWithTFLite(frame);
}