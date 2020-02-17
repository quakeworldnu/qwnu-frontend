import ForumCategory from '@/models/ForumCategory';
import ForumTopic from '@/models/ForumTopic';

export class Forum {
    constructor({
        id,
        name,
        description,
        num_topics,
        num_posts,
        position,
        cat_id,
        category = {},
        is_private,
        latest_updated_topic
    } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.num_topics = num_topics;
        this.num_posts = num_posts;
        this.position = position;
        this.cat_id = cat_id;
        this.category = new ForumCategory(category);
        this.is_private = is_private;

        if (latest_updated_topic) {
            this.latest_updated_topic = new ForumTopic(latest_updated_topic);
        }
    }
}

export default Forum;
