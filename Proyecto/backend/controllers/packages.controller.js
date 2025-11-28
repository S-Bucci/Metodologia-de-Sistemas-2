const PackageFacade = require("../services/packages.facade");

// GET ALL
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await PackageFacade.getAllPackages();
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error al obtener paquetes:", error);
    res.status(500).json({ message: "Error al obtener paquetes" });
  }
};

// GET BY ID
exports.getPackageById = async (req, res) => {
  try {
    const pkg = await PackageFacade.getPackageById(req.params.id);
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
    const newPackage = await PackageFacade.createPackage(req.body);

    res.status(201).json({
      status: "success",
      message: "Paquete creado exitosamente",
      newPackage
    });
  } catch (error) {
    console.error("Error al crear paquete:", error);
    res.status(500).json({ message: "Error al crear paquete" });
  }
};

// UPDATE
exports.updatePackage = async (req, res) => {
  try {
    const updated = await PackageFacade.updatePackage(req.params.id, req.body);

    if (!updated) return res.status(404).json({ message: "Paquete no encontrado" });

    res.status(200).json({
      status: "success",
      message: "Paquete actualizado exitosamente",
      updated
    });
  } catch (error) {
    console.error("Error al actualizar paquete:", error);
    res.status(500).json({ message: "Error al actualizar paquete" });
  }
};

// DELETE
exports.deletePackage = async (req, res) => {
  try {
    const deleted = await PackageFacade.deletePackage(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Paquete no encontrado" });

    res.status(200).json({ message: "Paquete eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar paquete:", error);
    res.status(500).json({ message: "Error al eliminar paquete" });
  }
};
