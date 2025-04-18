class Report {
    constructor({id, idUser, title, detail, address, type, image, createdAt, updatedAt}) {
        this.id = id;
        this.idUser = idUser;
        this.title = title;
        this.detail = detail;
        this.address = address;
        this.type = type;
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(json) {
        return new Report({
            id: json.id,
            idUser: json.id_user,
            title: json.title,
            detail: json.detail,
            address: json.address,
            type: json.type,
            image: json.image,
            createdAt: json.created_at,
            updatedAt: json.updated_at
        });
    }
    static fromJsonList(jsonList) {
        return jsonList.map(Report.fromJson);
    }
}

export default Report;