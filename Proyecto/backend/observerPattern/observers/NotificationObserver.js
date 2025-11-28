class NotificationObserver {
  async update(data) {
    const { adjustmentType, value, admin } = data;
    
    console.log(`🔔 NotificationObserver: Preparando notificaciones...`);
    
    const message = adjustmentType === 'percentage'
      ? `Los precios han sido ${value > 0 ? 'incrementados' : 'reducidos'} en un ${Math.abs(value)}%`
      : `Los precios han sido ${value > 0 ? 'incrementados' : 'reducidos'} en $${Math.abs(value)}`;
    
    console.log(`📧 Mensaje: ${message}`);
    console.log(`👤 Realizado por: ${admin?.email || 'Sistema'}`);
    
    return { success: true, notificationSent: true };
  }
}

module.exports = NotificationObserver;