export class AppRoute {
    constructor(type, collectionId = null, to, title, buttonIcon, buttonEmojiIcon, component) {
        this.type = type;
        this.collectionId = collectionId;
        this.to = to;
        this.title = title;
        this.buttonIcon = buttonIcon;
        this.buttonEmojiIcon = buttonEmojiIcon;
        this.component = component;
    }
}