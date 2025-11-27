import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import api from "../../services/api";
import "../../styles/AdminPriceUpdate.css";

function AdminPriceUpdate() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [adjustmentType, setAdjustmentType] = useState("percentage");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState(null);
  const [previewPrices, setPreviewPrices] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoadingPackages(true);
    try {
      const response = await api.get("/prices/packages");
      setPackages(response.data);
    } catch (error) {
      console.error("Error al cargar paquetes:", error);
      setMessage({
        type: "error",
        text: "Error al cargar paquetes: " + (error.response?.data?.error || error.message),
      });
    } finally {
      setLoadingPackages(false);
    }
  };

  const calculatePreviewPrices = () => {
    if (!value || isNaN(value)) {
      setPreviewPrices([]);
      return;
    }

    const numValue = parseFloat(value);
    const previews = packages.map((pkg) => {
      let newPrice;
      const currentPrice = parseFloat(pkg.price);

      if (adjustmentType === "percentage") {
        newPrice = currentPrice * (1 + numValue / 100);
      } else {
        newPrice = currentPrice + numValue;
      }

      newPrice = Math.max(0, newPrice);
      newPrice = parseFloat(newPrice.toFixed(2));

      return {
        id: pkg.id,
        title: pkg.title,
        location: pkg.location,
        oldPrice: currentPrice,
        newPrice: newPrice,
        difference: parseFloat((newPrice - currentPrice).toFixed(2)),
      };
    });

    setPreviewPrices(previews);
  };

  useEffect(() => {
    calculatePreviewPrices();
  }, [value, adjustmentType, packages]);

  const handleUpdatePrices = async () => {
    if (!value || isNaN(value)) {
      setMessage({
        type: "error",
        text: "Por favor ingresa un valor válido",
      });
      return;
    }

    const numValue = parseFloat(value);

    // Validación adicional
    if (adjustmentType === "percentage" && Math.abs(numValue) > 100) {
      setMessage({
        type: "error",
        text: "El ajuste porcentual no puede ser mayor a ±100%",
      });
      return;
    }

    // Confirmación
    const confirmMessage =
      adjustmentType === "percentage"
        ? `¿Confirmas que quieres ${numValue > 0 ? "aumentar" : "reducir"} los precios en un ${Math.abs(numValue)}%?`
        : `¿Confirmas que quieres ${numValue > 0 ? "aumentar" : "reducir"} los precios en $${Math.abs(numValue)}?`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await api.post("/prices/update-all", {
        adjustmentType,
        value: numValue,
      });

      if (response.data.success) {
        setMessage({
          type: "success",
          text: `✅ ${response.data.message} - ${response.data.results?.find((r) => r.observer === "DatabaseObserver")?.result?.packagesUpdated || 0} paquetes actualizados`,
        });
        setValue("");
        setPreviewPrices([]);
        await fetchPackages();
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        text: "Error al actualizar precios: " + (error.response?.data?.error || error.message),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-price-update">
        {/* Header */}
        <div className="price-header">
          <div className="header-content">
            <div className="header-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
              </svg>
            </div>
            <div>
              <h1>Actualización Masiva de Precios</h1>
              <p>Modifica los precios de todos los paquetes simultáneamente</p>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="control-panel">
          <h2>⚙️ Panel de Control</h2>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="adjustmentType">Tipo de Ajuste</label>
              <select
                id="adjustmentType"
                value={adjustmentType}
                onChange={(e) => setAdjustmentType(e.target.value)}
                className="form-select"
              >
                <option value="percentage">Porcentaje (%)</option>
                <option value="fixed">Monto Fijo ($)</option>
              </select>
              <small className="form-help">
                {adjustmentType === "percentage"
                  ? "Ejemplo: 10 para aumentar 10%, -15 para reducir 15%"
                  : "Ejemplo: 50 para aumentar $50, -20 para reducir $20"}
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="value">
                Valor {adjustmentType === "percentage" ? "(%)" : "($)"}
              </label>
              <input
                id="value"
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={
                  adjustmentType === "percentage"
                    ? "Ej: 10 o -15"
                    : "Ej: 50 o -20"
                }
                className="form-input"
              />
              <small className="form-help">Usa valores negativos para reducir precios</small>
            </div>
          </div>

          <button
            onClick={handleUpdatePrices}
            disabled={loading || !value || packages.length === 0}
            className="btn-update"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Actualizando...
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Actualizar Todos los Precios ({packages.length} paquetes)
              </>
            )}
          </button>

          {/* Message */}
          {message && (
            <div className={`alert alert-${message.type}`}>
              <span className="alert-icon">
                {message.type === "success" ? "✓" : "⚠"}
              </span>
              <span>{message.text}</span>
            </div>
          )}
        </div>

        {/* Preview Section */}
        {previewPrices.length > 0 && (
          <div className="preview-section">
            <h2>👁️ Vista Previa de Cambios</h2>
            <p className="preview-description">
              Así quedarán los precios después de aplicar el ajuste:
            </p>

            <div className="table-container">
              <table className="preview-table">
                <thead>
                  <tr>
                    <th>Paquete</th>
                    <th>Destino</th>
                    <th className="text-right">Precio Actual</th>
                    <th className="text-right">Precio Nuevo</th>
                    <th className="text-right">Diferencia</th>
                  </tr>
                </thead>
                <tbody>
                  {previewPrices.map((pkg) => (
                    <tr key={pkg.id}>
                      <td className="package-title">{pkg.title}</td>
                      <td className="package-location">{pkg.location}</td>
                      <td className="text-right price-old">
                        ${pkg.oldPrice.toFixed(2)}
                      </td>
                      <td className="text-right price-new">
                        ${pkg.newPrice.toFixed(2)}
                      </td>
                      <td
                        className={`text-right price-diff ${
                          pkg.difference >= 0 ? "positive" : "negative"
                        }`}
                      >
                        {pkg.difference >= 0 ? "+" : ""}$
                        {pkg.difference.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="preview-summary">
              <strong>Resumen:</strong>
              <span>
                {previewPrices.filter((p) => p.difference > 0).length} paquetes
                aumentarán de precio
              </span>
              <span>•</span>
              <span>
                {previewPrices.filter((p) => p.difference < 0).length} paquetes
                reducirán de precio
              </span>
              <span>•</span>
              <span>
                {previewPrices.filter((p) => p.difference === 0).length}{" "}
                permanecerán igual
              </span>
            </div>
          </div>
        )}

        {/* Current Packages */}
        <div className="packages-section">
          <h2>📦 Paquetes Actuales ({packages.length})</h2>

          {loadingPackages ? (
            <div className="loading-state">
              <span className="spinner"></span>
              <p>Cargando paquetes...</p>
            </div>
          ) : packages.length === 0 ? (
            <div className="empty-state">
              <p>No hay paquetes disponibles</p>
            </div>
          ) : (
            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className="package-card">
                  {pkg.image_url && (
                    <div
                      className="package-image"
                      style={{ backgroundImage: `url(${pkg.image_url})` }}
                    />
                  )}
                  <div className="package-content">
                    <h3>{pkg.title}</h3>
                    <p className="package-location">📍 {pkg.location}</p>
                    <p className="package-description">{pkg.description}</p>
                    <div className="package-footer">
                      <span className="package-price">
                        ${parseFloat(pkg.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPriceUpdate;