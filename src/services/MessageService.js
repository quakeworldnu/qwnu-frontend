import Message from "@/models/Message";
import BaseService from './BaseService';

class MessageService extends BaseService {
    constructor() {
        super();
    }

    getMyConversations() {
        return this.get(`my/conversations`)
                    .then(response => response.data.map(ft => new Message(ft)));
    }

    getMyConversationByUserId(userId) {
        return this.get(`my/conversations/${userId}`)
                    .then(response => response.data.map(ft => new Message(ft)));
    }

    createMessageForUser(userId, message) {
        return this.post(`my/conversations/${userId}`, message).then(
            response => new Message(response.data)
        );
    }
}

export default new MessageService();
