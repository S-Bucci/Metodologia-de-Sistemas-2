const PriceSubject = require('../observerPattern/PriceSubject');
const DatabaseObserver = require('../observerPattern/observers/DatabaseObserver');
const LogObserver = require('../observerPattern/observers/LogObserver');
const NotificationObserver = require('../observerPattern/observers/NotificationObserver');
const CacheObserver = require('../observerPattern/observers/CacheObserver');
const { Package } = require('../models');

class PriceService {
  constructor() {
    // Crear el Subject (Observable)
    this.priceSubject = new PriceSubject();
    
    // Adjuntar todos los observadores
    this.priceSubject.attach(new DatabaseObserver(Package));
    this.priceSubject.attach(new LogObserver());
    this.priceSubject.attach(new NotificationObserver());
    this.priceSubject.attach(new CacheObserver());
    
    console.log('✅ PriceService inicializado con patrón Observer');
  }

  async updateAllPrices(adjustmentType, value, admin) {
    try {
      console.log(`\n🚀 Iniciando actualización masiva de precios...`);
      console.log(`   Tipo: ${adjustmentType}`);
      console.log(`   Valor: ${value}`);
      console.log(`   Admin: ${admin?.email || 'N/A'}\n`);
      
      const data = { adjustmentType, value, admin };
      
      // Notificar a todos los observadores (patrón Observer en acción)
      const results = await this.priceSubject.notify(data);
      
      console.log('\n✅ Actualización completada exitosamente\n');
      
      return {
        success: true,
        message: 'Precios actualizados correctamente',
        results
      };
    } catch (error) {
      console.error('\n❌ Error al actualizar precios:', error);
      throw error;
    }
  }

  async getPriceHistory() {

    return { message: 'Funcionalidad de historial no implementada aún' };
  }
}

module.exports = new PriceService();