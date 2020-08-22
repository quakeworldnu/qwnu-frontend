import parseBbCode from "@/helpers/BbCode";
import BaseModel from "@/models/BaseModel";
import User from '@/models/User';
import moment from 'moment';

export class Comment extends BaseModel {
    constructor({
        id = null,
        author,
        author_id,
        commentable = null,
        content,
        status,
        create_time,
        update_time,
        author_ip,
        type,
        post_id
    } = {}) {
        super();

        this.UPDATE_GRACE_PERIOD = 300;

        this.id = id;
        this.author = author ? new User(author) : null;
        this.author_id = author_id;
        this.author_ip = author_ip;
        this.commentable = commentable;
        this.content = content;
        this.status = status;
        this.create_time = moment.unix(create_time);
        this.update_time = moment.unix(update_time);
        this.type = type;
        this.post_id = post_id;

        this._isEditing = false;

        this.STATUS_TYPES = {
            0: "Deleted",
            1: "Draft",
            2: "Published"
        };
    }

    bodyBbCode() {
        return parseBbCode(this.body);
    }

    hasBeenUpdated() {
        const endOfGracePeriod = moment(this.create_time).add(this.UPDATE_GRACE_PERIOD, 'second');
        return this.update_time.isAfter(endOfGracePeriod);
    }

    contentBbCode() {
        return parseBbCode(this.content);
    }

    isCreatedBy(user) {
        return this.author.id === user.id;
    }

    statusName() {
        if (this.STATUS_TYPES[this.status] === undefined) {
            throw "Undefined article status type";
        }

        return this.STATUS_TYPES[this.status];
    }
}

export default Comment;
