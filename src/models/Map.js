import BaseModel from "@/models/BaseModel";
import moment from 'moment';

export class Map extends BaseModel {
    constructor({
        created_at,
        description,
        id,
        mapFile,
        mapLocFile,
        mapReadmeFile,
        mod,
        name,
        nextMap,
        num_cells_big,
        num_cells_small,
        num_env_suit,
        num_ga,
        num_gl,
        num_health_big,
        num_health_small,
        num_lg,
        num_mega_health,
        num_nails_big,
        num_nails_small,
        num_ng,
        num_pent,
        num_quad,
        num_ra,
        num_ring,
        num_rl,
        num_rockets_big,
        num_rockets_small,
        num_secret_doors,
        num_secrets,
        num_shells_big,
        num_shells_small,
        num_sng,
        num_spawns,
        num_ssg,
        num_teleports,
        num_ya,
        prevMap,
        screenshots,
        updated_at
    } = {}) {
        super();

        this.created_at = moment.unix(created_at);
        this.description = description;
        this.id = id;
        this.mapFile = mapFile;
        this.mapLocFile = mapLocFile;
        this.mapReadmeFile = mapReadmeFile;
        this.mod = mod;
        this.name = name;
        this.nextMap = nextMap;
        this.num_cells_big = num_cells_big;
        this.num_cells_small = num_cells_small;
        this.num_env_suit = num_env_suit;
        this.num_ga = num_ga;
        this.num_gl = num_gl;
        this.num_health_big = num_health_big;
        this.num_health_small = num_health_small;
        this.num_lg = num_lg;
        this.num_mega_health = num_mega_health;
        this.num_nails_big = num_nails_big;
        this.num_nails_small = num_nails_small;
        this.num_ng = num_ng;
        this.num_pent = num_pent;
        this.num_quad = num_quad;
        this.num_ra = num_ra;
        this.num_ring = num_ring;
        this.num_rl = num_rl;
        this.num_rockets_big = num_rockets_big;
        this.num_rockets_small = num_rockets_small;
        this.num_secret_doors = num_secret_doors;
        this.num_secrets = num_secrets;
        this.num_shells_big = num_shells_big;
        this.num_shells_small = num_shells_small;
        this.num_sng = num_sng;
        this.num_spawns = num_spawns;
        this.num_ssg = num_ssg;
        this.num_teleports = num_teleports;
        this.num_ya = num_ya;
        this.prevMap = prevMap;
        this.screenshots = screenshots;
        this.updated_at = moment.unix(updated_at);
    }
}

export default Map;
