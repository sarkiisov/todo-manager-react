import { v4 as uuidv4 } from 'uuid';

export default class Todo {
    constructor(title, isImportant, collectionId) {
        this.id = uuidv4();
        this.dateCreated = Date.now();
        this.title = title;
        this.isImportant = isImportant;
        this.isCompleted = false;
        this.collectionId = collectionId;
    }
}