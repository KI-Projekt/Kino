export function findDifference(oldArray: string[], newArray: string[]): string | null {
    // Element, das im neuen Array hinzugefügt wurde
    for (let item of newArray) {
        if (!oldArray.includes(item)) {
            return item;
        }
    }
    
    // Element, das im alten Array entfernt wurde
    for (let item of oldArray) {
        if (!newArray.includes(item)) {
            return item;
        }
    }
    
    // Keine Unterschiede gefunden
    return null;
}
