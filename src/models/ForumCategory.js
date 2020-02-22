import BaseModel from "@/models/BaseModel";
import Forum from "@/models/Forum";


export class ForumCategory extends BaseModel {
    constructor({
        id,
        name,
        position,
        is_private,
        forums = []
    } = {}) {
        super();

        this.id = id;
        this.name = name;
        this.position = position;
        this.is_private = is_private;
        this.forums = forums.map(f => new Forum(f));
    }
}

export default ForumCategory;
