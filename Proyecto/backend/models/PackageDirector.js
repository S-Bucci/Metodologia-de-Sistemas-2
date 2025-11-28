class PackageDirector {
    constructor(builder) {
        this.builder = builder;
    }

    // Paquete básico
    createBasicPackage(data) {
        return this.builder
            .setTitle(data.title)
            .setDescription(data.description)
            .setLocation(data.location)
            .setPrice(data.price)
            .setImage(data.image_url)
            .build();
    }

    // Ejemplo de paquete "premium" usando variaciones (opcional)
    createPremiumPackage(data) {
        return this.builder
            .setTitle(data.title)
            .setDescription(data.description)
            .setLocation(data.location)
            .setPrice(data.price * 1.25)
            .setImage(data.image_url)
            .add("includesHotel", true)
            .add("includesTransport", true)
            .build();
    }
}

module.exports = PackageDirector;
