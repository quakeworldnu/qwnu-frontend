import parseBbCode from "@/helpers/BbCode";
import BaseModel from "@/models/BaseModel";
import Category from '@/models/Category';
import User from '@/models/User';
import moment from 'moment';

export class BlogPost extends BaseModel {
    constructor({
        id,
        author,
        content,
        body,
        comments_count,
        title,
        create_time,
        update_time,
        category,
        status
    } = {}) {
        super();

        this.id = id;
        this.author = new User(author);
        this.body = body;
        this.content = content;
        this.comments_count = comments_count;
        this.title = title;
        this.create_time = moment.unix(create_time);
        this.update_time = moment.unix(update_time);
        this.category = new Category(category);
        this.status = status;
    }

    bodyBbCode() {
        return parseBbCode(this.body);
    }

    contentBbCode() {
        return parseBbCode(this.content);
    }
}

export default BlogPost;
