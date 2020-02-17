import Profile from '@/models/Profile';
import Role from '@/models/Role';
import moment from 'moment';

export class User {
    constructor({
        id,
        username,
        createtime,
        lastvisit,
        status,
        superuser,
        profile = {},
        roles = []
    } = {}) {
        this.id = id;
        this.username = username;
        this.createtime = moment.unix(createtime);
        this.lastvisit = moment.unix(lastvisit);
        this.status = status;
        this.superuser = superuser;
        this.profile = new Profile(profile);
        this.roles = roles.map(r => new Role(r));
    }
}

export default User;
