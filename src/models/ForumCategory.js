import Forum from "@/models/Forum";

export class ForumCategory {
    constructor({
        id,
        name,
        position,
        is_private,
        forums = []
    } = {}) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.is_private = is_private;
        this.forums = forums.map(f => new Forum(f));
    }
}

export default ForumCategory;
