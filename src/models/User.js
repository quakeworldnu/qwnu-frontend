import BaseModel from "@/models/BaseModel";
import Profile from '@/models/Profile';
import Role from '@/models/Role';
import moment from 'moment';

export class User extends BaseModel {
    constructor({
        id,
        username,
        createtime,
        lastvisit,
        status = 1, // 1 = Active
        superuser,
        profile = {},
        roles = []
    } = {}) {
        super();

        this.id = id;
        this.username = username;
        this.createtime = createtime ? moment.unix(createtime) : null;
        this.lastvisit = lastvisit ? moment.unix(lastvisit) : null;
        this.status = status;
        this.superuser = superuser;
        this.profile = new Profile(profile);
        this.roles = roles.map(r => new Role(r));
    }
}

export default User;
