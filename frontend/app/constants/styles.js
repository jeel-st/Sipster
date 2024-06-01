// Imports
import { classNames } from "../utils"

// CI Farben von Sipster
export const Colors = {
    primary: "#1A1B16",
    secondary: "#272727",
    tertiary: "#CDCDCD",
    yellow: "#DFFA54",
    white: "#FFFFFF",
    black: "#000000",
    purple: "#C0C1FF"
}


// H3 Überschriften: z.B: events, friends, games
export const H3Text = classNames('text-white font-bold text-l'); // styling
// H2 Überschriften: z.B: events, friends, games
export const categoryText = classNames('text-white font-bold text-xl tracking-widest'); // styling
// H1 Überschriften: z.B: sipster
export const brandingText = classNames('text-white font-bold text-3xl tracking-widest'); // styling
// Standartabstand zu den oberen Elementen
export const spaceText = classNames('mt-4 mx-6'); // spacing

export const uri = "https://cdn.discordapp.com/attachments/1223359277662736476/1228686303827071067/OIG1.jpg?ex=662cf24a&is=661a7d4a&hm=31b379ba522ff6edf841e51eeb0cdfc29f50eb027d9b2620f69ba9f7ad9b9a9e&"

export const styles = { Colors, categoryText, brandingText, spaceText, H3Text, uri }