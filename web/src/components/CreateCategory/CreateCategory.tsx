"use client";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { getAllBusiness } from "@/services/user/business";
import { getAllCategories } from "@/services/user/category";
import { ICategory } from "@/types/interface";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CreateCategory = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const {businessId} = useBusiness()

  const fetchCategories = async () => {
    if (!token) return;
    try {
      // const business = await getAllBusiness(token);
      // const categories = await getAllCategories(business[0].id, token);
      if (!businessId) return;
      const categories = await getAllCategories(businessId, token);
      setCategories(categories);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer las categorias:", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer las categorias:", e);
        toast.error("Error al traer las categorias");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [businessId]);

  return (
    <div>
      <div>
        {categories?.map((category) => (
          <span className="m-4" key={category.id}>{category.name}</span>
        ))}
      </div>
    </div>
  );
};

export default CreateCategory;
