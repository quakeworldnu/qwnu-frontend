export class Pagination {
    // Constructor arguments are different than body params
    // due to receiving constructor argument style from API. The
    // body style would be preferred...
    constructor({
        current_page = 1,
        per_page = 0,
        total = 0
    } = {}) {
        this.page = current_page;
        this.totalRecords = total;
        this.pageSize = per_page;
    }
}

export default Pagination;
