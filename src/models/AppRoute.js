export class AppRoute {
    constructor(type, collectionId = null, to, title, buttonIcon, component) {
        this.type = type;
        this.collectionId = collectionId;
        this.to = to;
        this.title = title;
        this.buttonIcon = buttonIcon;
        this.component = component;
    }

    static fromCustomCollection(customCollection, to, buttonIcon, component) {
        return new AppRoute('custom-collection', customCollection.id, to, customCollection.title, buttonIcon, component);
    }
}