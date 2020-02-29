import BaseModel from "@/models/BaseModel";
import moment from 'moment';

export class Permission extends BaseModel {
    constructor({
        id,
        name,
        created_at,
        updated_at
    } = {}) {
        super();

        this.id = id;
        this.name = name;
        this.created_at = moment(created_at);
        this.updated_at = moment(updated_at);
    }
}

export default Permission;
