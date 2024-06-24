// Import
import { logger, consoleTransport, fileAsyncTransport } from "react-native-logs";
import * as FileSystem from 'expo-file-system';

/*
    Method to generate the file name for the log file based on the current date

    @return: string -> the generated file name
*/
const generateLogFileName = () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `app_logs_${year}-${month}-${date}.txt`;
};

/*
    Method to print the files in the document directory

    @return: void
*/
const printFilesInDocumentDirectory = async () => {
    try {
        // Document-Verzeichnis abrufen
        const documentDirectory = FileSystem.documentDirectory;

        // Alle Dateien im Document-Verzeichnis lesen
        const files = await FileSystem.readDirectoryAsync(documentDirectory);

        // Drucke die Liste der Dateien
        console.log('Files in document directory:', files);
    } catch (error) {
        console.error('Error printing files in document directory:', error);
    }
};

// Configuration of the logger
const config = {
    transport: __DEV__ ? [consoleTransport] : [fileAsyncTransport], // Choose transport based on DEV mode
    severity: "debug", // Default severity level for logs
    transportOptions: {
        FS: FileSystem, // File system module for Expo
        fileName: generateLogFileName(), // Generate file name for log file
        levels: {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
        },
        colors: {
            debug: "white",
            info: "green",
            warn: "yellow",
            error: "red",
        },
        extensionColors: {
            root: "magenta",
            user: "cyan",
            friend: "green",
            game: "yellow",
            event: "blue",
            activity: "red",
        },
    },
};

// Create the logger and extend with various extensions
const LOG = logger.createLogger(config);
const rootLog = LOG.extend("root");
const userLog = LOG.extend("user");
const friendLog = LOG.extend("friend");
const gameLog = LOG.extend("game");
const eventLog = LOG.extend("event");
const activityLog = LOG.extend("activity");

export { rootLog, userLog, friendLog, gameLog, eventLog, activityLog };