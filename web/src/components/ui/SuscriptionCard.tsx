import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { routes } from "@/routes/routes";

const SuscriptionCard: React.FC<{
  title: string;
  price: string;
  items: string[];
}> = ({ title, price, items }) => {
  return (
    <div className="flex flex-col gap-2 bg-white min-h-80 h-fit w-full md:w-96 rounded-md items-start p-5 border justify-between">
      <div className="flex flex-col gap-1 p-1">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex gap-1 items-center">
          <span className="text-3xl font-bold">{`$`+price}</span>
          <span className="text-base text-textGris">/mes</span>
        </div>
        <p className="text-lg text-custom-textSubtitle text-start flex flex-col gap-0.5">
          {items.map((item, idx) => {
            return <span key={idx}>{`✓ ` + item}</span>;
          })}
        </p>
      </div>
      <Link href={routes.register} className="w-full">
        <Button className="w-full" size="lg">
          Seleccionar un plan
        </Button>
      </Link>
    </div>
  );
};

export default SuscriptionCard;
