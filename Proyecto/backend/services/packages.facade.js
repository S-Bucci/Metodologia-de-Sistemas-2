const { Package } = require("../models");
const PackageBuilder = require("../models/PackageBuilder");
const PackageDirector = require("../models/PackageDirector");


class PackageFacade {
    
    async getAllPackages() {
        return await Package.findAll();
    }

    async getPackageById(id) {
        return await Package.findByPk(id);
    }

    async createPackage(data) {
        const builder = new PackageBuilder();
        const director = new PackageDirector(builder);

        const packageData = director.createBasicPackage(data);
        return await Package.create(packageData);
    }

    async updatePackage(id, data) {
        const pkg = await Package.findByPk(id);
        if (!pkg) return null;

        const builder = new PackageBuilder();
        const director = new PackageDirector(builder);

        const packageData = director.createBasicPackage(data);
        await pkg.update(packageData);
        return pkg;
    }

    async deletePackage(id) {
        const pkg = await Package.findByPk(id);
        if (!pkg) return null;

        await pkg.destroy();
        return true;
    }
}

module.exports = new PackageFacade();
