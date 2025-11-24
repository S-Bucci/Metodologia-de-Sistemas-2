class PackageBuilder {
    constructor() {
        this.packageData = {};
    }

    setTitle(title) {
        this.packageData.title = title;
        return this;
    }

    setDescription(description) {
        this.packageData.description = description;
        return this;
    }

    setLocation(location) {
        this.packageData.location = location;
        return this;
    }

    setPrice(price) {
        this.packageData.price = price;
        return this;
    }

    setImage(image_url) {
        this.packageData.image_url = image_url;
        return this;
    }

    // Permite agregar parámetros opcionales o futuros
    add(key, value) {
        this.packageData[key] = value;
        return this;
    }

    build() {
        return this.packageData;
    }
}

module.exports = PackageBuilder;
