import { v4 as uuidv4 } from 'uuid';

export default class CustomCollection {
    constructor(title) {
        this.id = uuidv4();
        this.icon = null;
        this.title = title;
    }
}