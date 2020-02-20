import User from '@/models/User';
import moment from 'moment';

export class Config {
    constructor({
        id,
        title,
        description,
        version,
        ruleset,
        custom,
        res,
        font,
        engine = 1, // 1 = ezQuake
        mode = 2, // 2 = OpenGL
        modi,
        type = 1, // 1 = Play
        cfg,
        user,
        user_id,
        create_time,
        update_time,
        comments_count
    } = {}) {
        this.id = id;
        this.title = title,
        this.description = description;
        this.version = version;
        this.ruleset = ruleset;
        this.custom = custom;
        this.res = res;
        this.font = font;
        this.engine = engine;
        this.mode = mode;
        this.modi = modi;
        this.type = type;
        this.cfg = cfg;
        this.user = user ? new User(user) : null;
        this.user_id = user_id;
        this.create_time = moment.unix(create_time);
        this.update_time = moment.unix(update_time);
        this.comments_count = comments_count;
    }

    static get ENGINE_TYPES() {
        return {
            1: "ezQuake",
            2: "Fuhquake",
            3: "ZQuake",
            4: "MQWCL",
            5: "FTE",
            6: "QRACK",
            7: "Darkplaces",
            8: "FTESV",
            9: "MVDSV",
            10: "QTV",
            11: "Other",
            12: "FodQuake"
        };
    }

    static get MODE_TYPES() {
        return {
            1: "Software",
            2: "OpenGL",
            3: "Other"
        };
    }

    static get MOD_TYPES() {
        return {
            1: "KTX",
            2: "KTeams",
            3: "KTPro",
            4: "Clan Arena",
            5: "Rocket Arena",
            6: "Pro-X",
            7: "Team Fortress",
            8: "Capture The Flag",
            9: "None",
            10: "Other"
        };
    }

    static get TYPE_TYPES() {
        return {
            1: "Play",
            2: "Spectator",
            3: "Team",
            4: "HUD",
            5: "Script",
            6: "Particles",
            7: "Server",
            8: "Eyecandy",
            9: "Other"
        };
    }

    get engineName() {
        if (Config.ENGINE_TYPES[this.engine] === undefined) {
            throw "Undefined config engine type: "+ this.engine;
        }

        return Config.ENGINE_TYPES[this.engine];
    }

    get modeName() {
        if (Config.MODE_TYPES[this.mode] === undefined) {
            throw "Undefined config mode type: " + this.mode;
        }

        return Config.MODE_TYPES[this.mode];
    }

    get modName() {
        if (Config.MOD_TYPES[this.modi] === undefined) {
            throw "Undefined config mod type: " + this.modi;
        }

        return Config.MOD_TYPES[this.modi];
    }

    get typeName() {
        if (Config.TYPE_TYPES[this.type] === undefined) {
            throw "Undefined config type type: " + this.type;
        }

        return Config.TYPE_TYPES[this.type];
    }

    get isNew() {
        return this.id === null || this.id === undefined;
    }

    download() {
        var link = document.createElement("a");
        link.download = this.title +".cfg";
        var blob = new Blob([this.cfg], { type: "text/plain" });
        link.href = window.URL.createObjectURL(blob);
        link.click();
    }
}

export default Config;
