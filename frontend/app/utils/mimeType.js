/*
    Mehtod to get the MIME type of a file based on its extension.

    Example:
    getMimeType('image.jpg') -> 'image/jpeg'

    @param string -> fileUri: Dateipfad
    @return: string -> der MIME-Typ der Datei
*/
export async function getMimeType(fileUri) {
    const extensionIndex = fileUri.lastIndexOf('.');
    if (extensionIndex !== -1) {
        const extension = fileUri.substring(extensionIndex + 1);
        switch (extension.toLowerCase()) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            // Weitere Dateitypen können hier hinzugefügt werden
            default:
                return 'application/octet-stream'; // Standard MIME-Typ für andere Dateitypen
        }
    } else {
        return 'application/octet-stream'; // Standard MIME-Typ, falls die Erweiterung nicht gefunden wird
    }
}