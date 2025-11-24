const { Package } = require("../models");
const PackageBuilder = require('../models/PackageBuilder');
const PackageDirector = require('../models/PackageDirector');

// GET ALL
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.findAll();
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error al obtener paquetes:", error);
    res.status(500).json({ message: "Error al obtener paquetes" });
  }
};

// GET BY ID
exports.getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findByPk(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Paquete no encontrado" });

    res.status(200).json(pkg);
  } catch (error) {
    console.error("Error al obtener paquete:", error);
    res.status(500).json({ message: "Error al obtener paquete" });
  }
};

// CREATE
exports.createPackage = async (req, res) => {
  try {
    const builder = new PackageBuilder();
    const director = new PackageDirector(builder);

    const packageData = director.createBasicPackage(req.body);
    const newPackage = await Package.create(packageData);

    res.status(201).json({
      status: "success",
      message: "Paquete creado exitosamente",
      newpackage: newPackage
    });
  } catch (error) {
    console.error("Error al crear paquete:", error);
    res.status(500).json({ message: "Error al crear paquete" });
  }
};

// UPDATE
exports.updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByPk(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Paquete no encontrado" });

    const builder = new PackageBuilder();
    const director = new PackageDirector(builder);
    const packageData = director.createBasicPackage(req.body);

    await pkg.update(packageData);

    res.status(200).json({
      status: "success",
      message: "Paquete actualizado exitosamente",
      updated: pkg
    });
  } catch (error) {
    console.error("Error al actualizar paquete:", error);
    res.status(500).json({ message: "Error al actualizar paquete" });
  }
};

// DELETE
exports.deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByPk(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Paquete no encontrado" });

    await pkg.destroy();
    res.status(200).json({ message: "Paquete eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar paquete:", error);
    res.status(500).json({ message: "Error al eliminar paquete" });
  }
};
