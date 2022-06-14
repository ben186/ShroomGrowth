import { NativeModules } from 'react-native';
const { TFLiteModule } = NativeModules;

interface TFLiteInterface {
    isLoaded(): boolean;
    loadModels(mNetUri: string, mConNetUri: string): Promise<string>;
    predictAllFromImage(imageUri: string): Promise<{ day: number, contaminated: boolean }>;
}
export default TFLiteModule as TFLiteInterface;