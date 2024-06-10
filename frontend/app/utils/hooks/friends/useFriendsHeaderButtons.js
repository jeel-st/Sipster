import { useState } from "react";
import { Keyboard } from "react-native";

export function useFriendsHeaderButtons({ onSearchTextChange, inputRef}) {
    const [buttonVisible, setButtonVisible] = useState(false);

    const handleTextChange = (inputText) => {
        onSearchTextChange(inputText)
        setButtonVisible(inputText.length > 0)
    }

    const handleCloseButtonPress = () => {
        Keyboard.dismiss()
        inputRef.current.clear()
        onSearchTextChange('')
        setButtonVisible(false)
    };
    return { handleTextChange, handleCloseButtonPress, buttonVisible }
}