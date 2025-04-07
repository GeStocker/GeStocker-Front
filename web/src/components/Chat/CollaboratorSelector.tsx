"use client";
import React, { useEffect, useState } from "react";

type Collaborator = {
    id: string;
    name: string;
};

interface CollaboratorSelectorProps {
    token: string;
    onSelect: (collaborator: Collaborator) => void;
}

const CollaboratorSelector: React.FC<CollaboratorSelectorProps> = ({
    token,
    onSelect,
}) => {
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCollaborators = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/collaborators`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) throw new Error("Error al obtener colaboradores");

            const data = await res.json();
            setCollaborators(data);
        } catch (err) {
            console.error("Error al traer colaboradores:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchCollaborators();
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const selected = collaborators.find((c) => c.id === selectedId);
        if (selected) {
            onSelect(selected);
        }
    };

    return (
        <div className="mb-4">
            {loading ? (
                <p>Cargando colaboradores...</p>
            ) : (
                <select
                    onChange={handleChange}
                    defaultValue=""
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                >
                    <option value="" disabled>
                        Selecciona un colaborador
                    </option>
                    {collaborators.map((collab) => (
                        <option key={collab.id} value={collab.id}>
                            {collab.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default CollaboratorSelector;
