import BaseModel from "@/models/BaseModel";

export class File extends BaseModel {
    constructor({
        id,
        name,
        filename,
        extension,
        file = null // The binary file, only populated before upload
        } = {}) {
        super();

        this.id = id;
        this.name = name;
        this.filename = filename;
        this.extension = extension;
        this.file = file;
    }
}

export default File;
