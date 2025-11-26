class LogObserver {
  update(data) {
    const { adjustmentType, value, admin } = data;
    const timestamp = new Date().toISOString();
    
    const logEntry = {
      timestamp,
      event: 'PRICE_UPDATE',
      adjustmentType,
      value,
      admin: admin ? {
        id: admin.id,
        email: admin.email
      } : null
    };
    
    console.log(`
╔════════════════════════════════════════════════════════════╗
║           📝 REGISTRO DE ACTUALIZACIÓN DE PRECIOS          ║
╠════════════════════════════════════════════════════════════╣
║ Fecha/Hora: ${timestamp}                                  
║ Administrador: ${admin?.email || 'N/A'}                    
║ Tipo de Ajuste: ${adjustmentType === 'percentage' ? 'Porcentual' : 'Fijo'}
║ Valor: ${value}${adjustmentType === 'percentage' ? '%' : '$'}                                      
╚════════════════════════════════════════════════════════════╝
    `);
    
    return { success: true, logged: true };
  }
}

module.exports = LogObserver;