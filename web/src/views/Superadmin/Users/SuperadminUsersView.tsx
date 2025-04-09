"use client";
import React, { useEffect, useState } from "react";
import { IUserListItem } from "../types";
import { getAllUsersList } from "@/services/user/superadmin";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { routes } from "@/routes/routes";
import BanUnbanUser from "./BanUnbanuser";

const SuperadminUsersView = () => {
  const [users, setUsers] = useState<IUserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);
  const planOptions = ["basic", "professional", "business"];
  const [selectedUser, setSelectedUser] = useState<IUserListItem | null>(null);

  const router = useRouter();

  const fetchUsers = async () => {
    if (!token) return;
    try {
      const users = await getAllUsersList(
        token,
        isActive,
        selectedPlan ?? undefined
      );
      setUsers(users);
    } catch (error) {
      console.warn(error);
      toast.error("No se pudo traer a los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const onClickGetBusiness = (userId: string, userName: string) => {
    router.push(
      `${
        routes.superadminDashboard
      }/business/${userId}?name=${encodeURIComponent(userName)}`
    );
  };

  useEffect(() => {
    fetchUsers();
  }, [token, selectedPlan, isActive]);

  return (
    <div className="p-4">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">Usuarios</h1>
            <h2 className="text-xl text-custom-textGris">
              Usuarios Registrados en el Sistema
            </h2>
          </div>
          <div>
            <span className="mx-2 font-bold">Filtrar Por </span>
            <DropdownMenu>
              <span className="mx-2">Plan: </span>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{selectedPlan ?? "Todos"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedPlan(null)}>
                  Todos
                </DropdownMenuItem>
                {planOptions.map((plan) => (
                  <DropdownMenuItem
                    key={plan}
                    onClick={() => setSelectedPlan(plan)}
                    className={
                      plan === selectedPlan ? "font-bold bg-accent" : ""
                    }
                  >
                    {plan}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <span className="mx-2">Estado: </span>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {isActive ? "Activos" : "Inactivos"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setIsActive(true)}>
                  Activos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsActive(false)}>
                  Inactivos
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-7 text-lg gap-1 text-center p-2 bg-custom-grisClarito ">
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            ID Usuario
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Nombre Usuario
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Correo Electrónico
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Suscripcion
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Estado
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Cantidad de Negocios
          </span>
        </div>
        {loading ? (
          <span>Cargando lista de usuarios</span>
        ) : users.length > 0 ? (
          <>
            {" "}
            {users.map((user) => {
              return (
                <div
                  key={user.id}
                  className="grid grid-cols-7 text-base gap-1 text-center p-4"
                >
                  <span className="break-words">{user.id}</span>
                  <span className="break-words">{user.name}</span>
                  <span className="break-words">{user.email}</span>
                  <span className="break-words">{user.subscriptionPlan}</span>
                  <span
                    className={`text-center font-semibold ${
                      user.isActive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user.isActive ? "Activo" : "Inactivo"}
                  </span>
                  <div
                    onClick={() => {
                      onClickGetBusiness(user.id, user.name);
                    }}
                    className="cursor-pointer"
                  >
                    <span className="break-words">{user.businessCount}</span>
                    <br />
                    <span className="hover:underline">Ver negocios</span>
                  </div>
                  <button
                    className={`cursor-pointer w-fit px-4 py-2 m-auto border rounded-md ${
                      isActive
                        ? "text-red-400 cursor-pointer hover:bg-red-100"
                        : "text-blue-400  hover:bg-blue-100"
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    {isActive ? "Banear" : "Desbanear"}
                  </button>
                </div>
              );
            })}
            {selectedUser && (
              <BanUnbanUser
                name={selectedUser.name}
                type={isActive ? "ban" : "unban"}
                token={token ?? ""}
                userId={selectedUser.id}
                onClose={() => setSelectedUser(null)}
                onSuccess={() => {
                  setSelectedUser(null);
                  fetchUsers();
                }}
              />
            )}{" "}
          </>
        ) : (
          <span className="text-center">No hay usuarios para mostrar</span>
        )}
      </div>
    </div>
  );
};

export default SuperadminUsersView;
