import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings2 } from "lucide-react";
import { Button } from "../ui/button";

const ButtonGestionar = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="flex">
          <Settings2 size={18} />
          Gestionar productos
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Añadir, editar o importar productos desde Excel</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default ButtonGestionar;

