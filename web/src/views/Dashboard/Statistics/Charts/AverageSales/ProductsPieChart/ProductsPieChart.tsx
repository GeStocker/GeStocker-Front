import React from "react";
import { IProductSales } from "../../../Types";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

const ProductsPieChart: React.FC<{ products: IProductSales[] }> = ({
  products,
}) => {
  const COLORS = ["var(--color-custom-marronClarito",  "var(--color-custom-GrisOscuro)" ,"var(--color-custom-textGris", "var(--color-custom-textSubtitle)", "var(--color-custom-casiNegro", ];

  const chartConfig: ChartConfig = {
    avgMonthlySales: {
      label: "Ventas Mensuales",
      color: "#6FCF97",
    },
  };
  console.log(products);

  const validProducts = products
    .map((p, i) => ({
      ...p,
      avgMonthlySales: Number(p.avgMonthlySales),
      fill: COLORS[i % COLORS.length],
    }))
    .filter((p) => !isNaN(p.avgMonthlySales) && p.avgMonthlySales > 0);

  return (
    <div className="p-2">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground" 
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={validProducts}
            dataKey="avgMonthlySales"
            label
            nameKey="productName"
          />
        </PieChart>
      </ChartContainer>
      <div className="flex flex-wrap justify-center mt-2 gap-2 text-sm">
        {validProducts.map((product, index) => (
          <div key={product.productId} className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span>{product.productName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPieChart;
