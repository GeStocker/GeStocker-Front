import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function NotificationSettings() {
  const [lowStock, setLowStock] = useState(false);
  const [noStock, setNoStock] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [email, setEmail] = useState("admin@tiendaprincipal.com");
  const [stockbajo, setStockbajo] = useState(0);
  const [summaryFrequency, setSummaryFrequency] = useState("daily");

  return (
    <div className="w-full mx-auto bg-background p-6 rounded-xl shadow-md">
      <div className="flex flex-col mb-4">
        <h2 className="text-2xl font-semibold">Notificaciones del sistema</h2>
        <span className="text-sm text-custom-casiNegro">Configura cuándo quieres recibir notificaciones sobre cambios en tu inventario</span>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">Notificar cuando haya stock bajo</label>
            <span className="text-sm text-custom-casiNegro">Recibirás una notificación cuando algun producto alcance el umbral de stock bajo</span>
          </div>
          <Switch checked={lowStock} onCheckedChange={setLowStock} className="rustic:data-[state=unchecked]:bg-custom-marronClarito"/>
        </div>
        {lowStock && (
          <div>
            <label  htmlFor="umbral" className="text-sm">Umbral stock bajo</label>
            <div className="flex items-center gap-2">
              <Input id="umbral" type="number" min="0" value={stockbajo} onChange={(e) => setStockbajo(Number(e.target.value))} className="mt-1 w-24 text-center"/> 
              <span className="text-sm text-custom-casiNegro">unidades</span>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">Notificar cuando no haya stock</label>
            <span className="text-sm text-custom-casiNegro">Recibirás una notificación cuando algún producto se quede sin existencias</span>
          </div>
          <Switch checked={noStock} onCheckedChange={setNoStock} className="rustic:data-[state=unchecked]:bg-custom-marronClarito"/>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Notificaciones por correo electrónico</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm">Activar notificaciones por correo</label>
          <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} className="rustic:data-[state=unchecked]:bg-custom-marronClarito"/>
        </div>
        {emailNotifications && (
          <div>
            <label  htmlFor="email" className="text-sm">Correo electrónico para notificaciones</label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full" />
          </div>
        )}
        <div>
          <label className="text-sm">Frecuencia de resumen por correo</label>
          <RadioGroup value={summaryFrequency} onValueChange={setSummaryFrequency} className="flex flex-col gap-2 mt-1">
            <label className="flex items-center space-x-2 text-sm">
              <RadioGroupItem value="real" />
              <span>Tiempo real</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <RadioGroupItem value="daily" />
              <span>Resumen diario</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <RadioGroupItem value="weekly" />
              <span>Resumen semanal</span>
            </label>
          </RadioGroup>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline">Cancelar</Button>
        <Button>Guardar configuración</Button>
      </div>
    </div>
  );
}
