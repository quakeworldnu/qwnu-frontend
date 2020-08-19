import BaseModel from "@/models/BaseModel";
import Comment from "@/models/Comment";
import Forum from "@/models/Forum";
import User from '@/models/User';
import moment from 'moment';

export class ForumTopic extends BaseModel {
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
        forum,
        forum_id,
        comment,
        comment_id,
        last_author
    } = {}) {
        super();

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
        this.forum = forum ? new Forum(forum) : null;
        this.comment_id = comment_id;
        this.comment = comment ? new Comment(comment) : null;
        this.last_author = last_author ? new User(last_author) : null;
    }
}

export default ForumTopic;
