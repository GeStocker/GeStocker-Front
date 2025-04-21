interface StatCardProps {
    title: string;
    value: number | string;
    description: string;
    isCurrency?: boolean;
  }
  
  function StatCard({ title, value, description, isCurrency = false }: StatCardProps) {
    return (
      <div className="flex flex-col border border-custom-GrisOscuro rounded-md p-4">
        <h2 className="font-semibold">{title}</h2>
        <span className="font-bold">{isCurrency ? `$ ${value}` : value}</span>
        <span className="text-custom-textOscuro">{description}</span>
      </div>
    );
  }
  
  export default StatCard;
  