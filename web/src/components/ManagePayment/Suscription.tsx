import { CheckIcon, InfoIcon, Trash2Icon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Switch } from '../ui/switch';
import { useAuth } from '@/context/AuthContext';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { cancelSubscription, suscripcionActive } from '@/services/user/user';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Plan = {
  plan: string;
  title: string;
  price: string;
  features: string[];
  selected: boolean;
};

interface Purchase {
  id: string;
  amount: string;
  paymentMethod: string;
  status: 'completed' | 'failed' | 'pending';
  stripeSessionId: string;
  purchaseDate: string;
  expirationDate: string;
  stripeSubscriptionId: string | null;
}

const SubscriptionPlans = () => {
  const { getUserRol } = useAuth();
  const [userRol, setUserRol] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { token, resetUserData } = useAuth();
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const router = useRouter();

  console.log("Token:", token);
  
  useEffect(() => {
    const rol = getUserRol() ?? null;
    setUserRol(rol);
    
    if (rol) {
      setPlans([
        {
          plan: "basic",
          title: "Básico",
          price: "20€/mes",
          features: [
            "Prueba gratuita por 7 días",
            "Hasta 500 productos",
            "1 usuario",
            "Soporte por correo",
          ],
          selected: rol === "basic"
        },
        {
          plan: "professional",
          title: "Profesional",
          price: "50€/mes",
          features: [
            "Hasta 5000 productos",
            "5 usuarios",
            "Soporte prioritario",
            "Informes avanzados",
          ],
          selected: rol === "professional"
        },
        {
          plan: "business",
          title: "Empresarial",
          price: "99,99€/mes",
          features: [
            "Productos ilimitados",
            "Usuarios ilimitados",
            "Soporte 24/7",
            "Chat entre colaboradores",
          ],
          selected: rol === "business"
        }
      ]);
    }
  }, [getUserRol]);

  const currentPlan = plans.find(plan => plan.selected);
  const renewalDate = new Date();
  renewalDate.setMonth(renewalDate.getMonth() + 1);
  
  useEffect(() => {
    const fetchActiveSubscription = async () => {
      try {
        if (!token) {
          throw new Error('Token is null');
        }
        const response = await suscripcionActive(token);
        setPurchase(response);
      } catch (err) {
        console.warn('Error fetching active subscription:', err);
      } 
    };
  
    if (token) {
      fetchActiveSubscription();
    }
  }, [token]);

  const handleCancelSubscription = async () => {
    setIsProcessing(true);
    try {
      // Verificar los valores de token y purchase.id
      console.log("Token de la pagina:", token);
      console.log("Purchase ID:", purchase?.id);
  
      if (token && purchase?.id) {
        await cancelSubscription( purchase.id, token);
        toast.success("Suscripción cancelada con éxito");
        resetUserData();
        setTimeout(() => {  
        router.push("/login");
        }
        , 3000);
        setShowCancelDialog(false);
      } else {
        throw new Error("Token or purchase ID is null");
      }
    } catch (error) {
      console.error("Error cancelando suscripción:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlanChange = async (selectedPlan: string) => {
    setIsProcessing(true);
    try {
      console.log("Plan cambiado a:", selectedPlan);
    } catch (error) {
      console.error("Error cambiando de plan:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!userRol) {
    return (
      <div className="w-full p-8 flex flex-col items-center justify-center rounded-lg">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-custom-casiNegro"></div>
        <p className="mt-4 text-custom-textSubtitle">Cargando tu plan...</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 bg-background rounded-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-custom-casiNegro mb-2">Plan actual</h2>
        <p className="text-custom-textGris mb-6">Detalles de tu suscripción actual</p>
        
        {currentPlan && (
          <div className="bg-background border border-custom-grisClarito rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-custom-casiNegro">{currentPlan.title}</h3>
                <p className="text-custom-textGris mt-1">{currentPlan.price}</p>
              </div>
              <span className="bg-custom-casiNegro text-background px-3 py-1 rounded-full text-sm font-medium">
                Activo
              </span>
            </div>
            
            <div className="space-y-3 mt-4">
              <h4 className="font-medium text-custom-textSubtitle">Características incluidas:</h4>
              {currentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-custom-casiNegro mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-custom-textSubtitle">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-custom-grisClarito">
              <div>
                <p className="font-medium text-custom-textSubtitle">Renovación automática</p>
                <p className="text-sm text-custom-textGris">
                  Próxima renovación: {purchase?.expirationDate ? new Date(purchase.expirationDate).toLocaleDateString('es-ES', {
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric'
                  }) : 'No disponible'}
                </p>
              </div>
              <Switch checked={true} className="data-[state=checked]:bg-custom-casiNegro" />
            </div>

              <div className="mt-6 pt-4 border-t border-custom-grisClarito">
                <Button 
                  variant="outline"
                  className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => setShowCancelDialog(true)}
                >
                  <Trash2Icon className="h-4 w-4 mr-2" />
                  Cancelar suscripción
                </Button>
              </div>
          </div>
        )}
      </div>

      {userRol !== 'business' && (
        <div>
          <h2 className="text-2xl font-bold text-custom-casiNegro mb-2">Cambiar plan</h2>
          <p className="text-custom-textGris mb-6">Elige el plan que mejor se adapte a tus necesidades</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans
              .filter(plan => plan.plan !== userRol)
              .map((plan) => (
                <div 
                  key={plan.plan}
                  onClick={() => handlePlanChange(plan.plan)}
                  className={`border rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${
                    plan.selected 
                      ? 'border-custom-casiNegro bg-custom-grisClarito/30 ring-1 ring-custom-casiNegro' 
                      : 'border-custom-grisClarito hover:border-custom-casiNegro'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className={`h-4 w-4 rounded-full border mr-3 ${
                      plan.selected 
                        ? 'bg-custom-casiNegro border-custom-casiNegro' 
                        : 'border-custom-textGris'
                    }`} />
                    <div>
                      <h3 className="text-lg font-semibold text-custom-casiNegro">{plan.title}</h3>
                      <p className="font-bold text-custom-casiNegro">{plan.price}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2.5 mt-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-custom-casiNegro mt-1 mr-2 flex-shrink-0" />
                        <span className="text-custom-textSubtitle text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      )}

      {userRol === 'business'  && (
        <div className="mt-8 p-5 bg-custom-grisClarito border-l-4 border-custom-casiNegro rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <InfoIcon className="h-5 w-5 text-custom-casiNegro" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-custom-casiNegro">Plan Empresarial</h3>
              <div className="mt-2 text-sm text-custom-textSubtitle">
                <p>
                  Disfruta de todas las ventajas de nuestro plan premium. 
                  Para modificaciones, contacta a nuestro equipo especializado.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-custom-casiNegro">
              ¿Confirmar cancelación?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
            <div className="space-y-3 mt-2">
                <p>Al cancelar perderás acceso a:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {currentPlan?.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <p className="font-medium mt-2">
                 La cancelación de tu plan se aplicará de inmediato. Esto significa que ya no tendrás acceso a los beneficios del plan actual.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="border-custom-casiNegro hover:bg-custom-grisClarito"
              disabled={isProcessing}
            >
              Mantener mi plan
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 text-white hover:bg-red-500"
              onClick={handleCancelSubscription}
              disabled={isProcessing}
            >
              {isProcessing ? 'Procesando...' : 'Confirmar cancelación'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SubscriptionPlans;
