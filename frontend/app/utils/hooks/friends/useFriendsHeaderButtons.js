// Imports
import { useState } from "react";
import { Keyboard } from "react-native";

/*
    Custom hook to handle the friends header buttons

    @param onSearchTextChange: function -> the function to call when the search text changes
    @param inputRef: object -> the reference to the input field
    @return: object -> the object containing the hook methods
*/
export function useFriendsHeaderButtons({ onSearchTextChange, inputRef}) {
    const [buttonVisible, setButtonVisible] = useState(false);

    /*
        Method to handle the text change

        @param inputText: string -> the input text
        @return: void
    */
    const handleTextChange = (inputText) => {
        onSearchTextChange(inputText)
        // Check if the input text is empty to set the close search button visible
        setButtonVisible(inputText.length > 0)
    }

    /*
        Method to handle the close button press

        @return: void
    */
    const handleCloseButtonPress = () => {
        // reset the input field and close the keyboard when the close button is pressed
        Keyboard.dismiss()
        inputRef.current.clear()
        onSearchTextChange('')
        setButtonVisible(false)
    };

    // Return the hook methods
    return { handleTextChange, handleCloseButtonPress, buttonVisible }
}