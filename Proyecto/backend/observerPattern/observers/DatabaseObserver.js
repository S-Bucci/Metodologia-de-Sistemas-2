class DatabaseObserver {
  constructor(packageModel) {
    this.Package = packageModel;
  }

  async update(data) {
    const { adjustmentType, value } = data;
    
    console.log(`💾 DatabaseObserver: Iniciando actualización de precios...`);
    
    try {
      // Obtener todos los paquetes
      const packages = await this.Package.findAll();
      
      if (packages.length === 0) {
        console.log('⚠️  No hay paquetes para actualizar');
        return { success: true, packagesUpdated: 0 };
      }
      
      // Actualizar cada paquete
      const updatePromises = packages.map(pkg => {
        let newPrice;
        const currentPrice = parseFloat(pkg.price);
        
        if (adjustmentType === 'percentage') {
          // Incremento/decremento porcentual
          newPrice = currentPrice * (1 + value / 100);
        } else if (adjustmentType === 'fixed') {
          // Incremento/decremento fijo
          newPrice = currentPrice + value;
        } else {
          throw new Error('Tipo de ajuste no válido');
        }
        
        // Asegurar que el precio no sea negativo
        newPrice = Math.max(0, newPrice);
        // Redondear a 2 decimales
        newPrice = Math.round(newPrice * 100) / 100;
        
        return pkg.update({ price: newPrice });
      });
      
      await Promise.all(updatePromises);
      
      console.log(`✅ DatabaseObserver: ${packages.length} paquetes actualizados exitosamente`);
      return { success: true, packagesUpdated: packages.length };
      
    } catch (error) {
      console.error('❌ Error en DatabaseObserver:', error);
      throw error;
    }
  }
}

module.exports = DatabaseObserver;
