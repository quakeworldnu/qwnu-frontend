import BaseModel from "@/models/BaseModel";
import User from "@/models/User";
import moment from "moment";

export class Message extends BaseModel {
    constructor({
        id,
        subject,
        message,
        sender_id,
        sender,
        recipient_id,
        recipient,
        sender_ip,
        create_time
    } = {}) {
        super();

        this.id = id;
        this.subject = subject;
        this.message = message;
        this.sender_id = sender_id;
        this.sender = new User(sender);
        this.recipient_id = recipient_id;
        this.recipient = new User(recipient);
        this.sender_ip = sender_ip;

        this.create_time = moment.unix(create_time);
    }

    getCounterpart(user) {
        return this.sender_id === user.id ? this.recipient : this.sender;
    }
}

export default Message;
