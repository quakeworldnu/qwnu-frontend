import parseBbCode from "@/helpers/BbCode";
import BaseModel from '@/models/BaseModel';
import Category from '@/models/Category';
import User from '@/models/User';
import moment from 'moment';

export class Article extends BaseModel {
    constructor({
        id = null,
        author = null,
        category = null,
        category_id,
        content = "",
        body = "",
        comments_count,
        title,
        create_time,
        update_time,
        status = 2 // 2 = Published
    } = {}) {
        super();

        this.id = id;
        this.author = author ? new User(author) : null;
        this.category = category ? new Category(category) : null;
        this.category_id = category_id;
        this.body = body;
        this.content = content;
        this.comments_count = comments_count;
        this.title = title;
        this.create_time = moment.unix(create_time);
        this.update_time = moment.unix(update_time);
        this.status = status;

        this.STATUS_TYPES = {
            0: "Deleted",
            1: "Draft",
            2: "Published"
        };
    }

    bodyBbCode() {
        return parseBbCode(this.body);
    }

    contentBbCode() {
        return parseBbCode(this.content);
    }

    statusName() {
        if (this.STATUS_TYPES[this.status] === undefined) {
            throw "Undefined article status type";
        }

        return this.STATUS_TYPES[this.status];
    }
}

export default Article;
