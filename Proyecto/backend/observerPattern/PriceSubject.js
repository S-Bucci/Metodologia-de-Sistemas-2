class PriceSubject {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
    console.log(`✅ Observer ${observer.constructor.name} adjuntado`);
  }

  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      console.log(`❌ Observer ${observer.constructor.name} removido`);
    }
  }

  async notify(data) {
    console.log(`📢 Notificando a ${this.observers.length} observadores...`);
    
    const results = [];
    for (const observer of this.observers) {
      try {
        const result = await observer.update(data);
        results.push({ observer: observer.constructor.name, result });
      } catch (error) {
        console.error(`❌ Error en ${observer.constructor.name}:`, error);
        results.push({ observer: observer.constructor.name, error: error.message });
      }
    }
    
    return results;
  }
}

module.exports = PriceSubject;