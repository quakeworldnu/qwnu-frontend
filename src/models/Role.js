import moment from 'moment';

export class Role {
    constructor({
        id,
        name,
        created_at,
        updated_at
    } = {}) {
        this.id = id;
        this.name = name;
        this.created_at = moment(created_at);
        this.updated_at = moment(updated_at);
    }
}

export default Role;
