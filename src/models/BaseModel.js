export class BaseModel {
    constructor() {}

    get isNew() {
        return this.id === null || this.id === undefined;
    }

    copy() {
        return JSON.parse(JSON.stringify(this));
    }
}

export default BaseModel;
