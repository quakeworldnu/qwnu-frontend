import Comment from "@/models/Comment";
import User from '@/models/User';
import moment from 'moment';

export class ForumTopic {
    constructor({
        id,
        name,
        status,
        create_time,
        update_time,
        num_posts,
        last_post_time,
        last_post_id,
        last_author_id,
        closed,
        sticky,
        type,
        forum_id,
        comment,
        comment_id,
        last_author
    } = {}) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.create_time = moment.unix(create_time);
        this.update_time = moment.unix(update_time);
        this.num_posts = num_posts;
        this.last_post_time = moment.unix(last_post_time);
        this.last_post_id = last_post_id;
        this.last_author_id = last_author_id;
        this.closed = closed;
        this.sticky = sticky;
        this.type = type;
        this.forum_id = forum_id;
        this.comment_id = comment_id;
        this.comment = new Comment(comment);
        this.last_author = new User(last_author);
    }
}

export default ForumTopic;
