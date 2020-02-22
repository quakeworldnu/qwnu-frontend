import BaseModel from "@/models/BaseModel";

export class Category extends BaseModel {
    constructor({
        id,
        name
        } = {}) {
        super();

        this.id = id;
        this.name = name;
    }
}

export default Category;
