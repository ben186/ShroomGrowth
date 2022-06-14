import * as ImagePicker from "expo-image-picker";

export async function process(mode: "CAPTURE" | "PICK"): Promise<ImagePicker.ImageInfo | null> {
    let result: ImagePicker.ImagePickerResult | null = null;
    const options = {
        aspect: [1, 1] as [number, number],
        allowsEditing: true,
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images
    };

    if (mode === 'CAPTURE') {
      result = await ImagePicker.launchCameraAsync(options);
    }
    else if (mode === 'PICK') {
      result = await ImagePicker.launchImageLibraryAsync(options);
    }

    if (!result || result?.cancelled) return null;

    return result as ImagePicker.ImageInfo;
}