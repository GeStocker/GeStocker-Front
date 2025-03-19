"use client";    
import React, { useEffect, useState }  from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { registerUser } from "@/services/user/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

const registerSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/, "El correo debe contener '@' y terminar en '.com'")
    .required("El correo es obligatorio"),
    city: Yup.string().required("La ciudad es obligatoria"),
    country: Yup.string().required("El país es obligatorio"),
    address: Yup.string().required("La dirección es obligatoria"),
    phone: Yup.string()
        .matches(/^\d+$/, "Debe ser un número válido")
        .min(10, "Debe tener al menos 10 dígitos")
        .required("El teléfono es obligatorio"),
    password: Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Debe tener una mayúscula, una minúscula, un número, un carácter especial (@!-), y mínimo 8 caracteres")
    .required("La contraseña es obligatoria"),
});

interface FormData{
    name: string;
    email: string;
    city: string;
    country: string;
    address: string;
    phone: string;
    password: string;
}

const RegisterView: React.FC = () => {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const [countries, setCountries] = useState<string[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get('https://restcountries.com/v3.1/all?fields=name');
        const countryList = res.data.map((c: { name: { common: string } }) => c.name.common);
        countryList.sort((a: string, b: string): number => a.localeCompare(b));

        setCountries(countryList);
        setFilteredCountries(countryList);
      } catch (error) {
        console.error('Error al cargar los países:', error);
      }
    };
    fetchCountries();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = countries.filter(c => c.toLowerCase().includes(value));
    setFilteredCountries(filtered);
  };

  const handleSelect = (country: string) => {
    setSelectedCountry(country);
    setSearch('');
    setIsOpen(false);
  };

    const handleToggleBasic = () => {
        setSelectedPlan(selectedPlan === "basic" ? null : "basic");
    };
    
    const handleToggleProfessional = () => {
        setSelectedPlan(selectedPlan === "professional" ? null : "professional");
    };
    
    const handleToggleBusiness = () => {
        setSelectedPlan(selectedPlan === "business" ? null : "business");
    };

    const handleOnSubmit = async (values: FormData) => {
        try {
            await registerUser(values);

            toast.success("✅ Registro exitoso");

            setTimeout(() => {
                router.push(routes.login);
              }, 2000);

        } catch (e: unknown) {
            if (e instanceof Error) {
                console.warn("Error al registrar el usuario:", e.message);

                toast.error(`❌ Error: ${e.message}`);
            } else {
                console.warn("Error al registrar el usuario:", e);
                toast.error("❌ Error al registrar el usuario");
            }
        }
    };

    return(
        <div>
            <Formik
            initialValues={{
                name: '',
                email: '',
                city: '',
                country: '',
                address: '',
                phone: '',
                password: ''
            }}
            validationSchema={registerSchema}
            onSubmit={handleOnSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <form onSubmit={handleSubmit}>
                    <div className="flex gap-16">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="font-semibold text-xl">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className=" w-[350px] p-3 mb-4 border border-black bg-gray-100 rounded-lg"/>
                            {errors.name && touched.name && <p className=" text-red-500  text-sm">{errors.name}</p>} 
                        </div>
                        <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold text-xl">Correo</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className=" w-[350px] p-3 mb-4 border border-black bg-gray-100 rounded-lg"
                            />
                        {errors.email && touched.email && <p className=" text-red-500  text-sm">{errors.email}</p>}
                        </div>
                        </div>
                        <div className="flex gap-16">
                            <div className="flex flex-col">
                                <label htmlFor="city" className="font-semibold text-xl">Ciudad</label>
                                <input
                                type="text"
                                name="city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                                className="w-[350px] p-3 mb-4 border border-black bg-gray-100 rounded-lg"
                                />
                                {errors.city && touched.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                            </div>
                            
                            <div className="flex flex-col">
                                <label htmlFor="country" className="font-semibold text-xl">País</label>
                                <div className="relative w-[350px] mb-4">
                                <div 
                                    className="border border-black rounded-lg p-3 bg-gray-100 cursor-pointer text-gray-900 flex justify-between items-center"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {selectedCountry || 'Selecciona un país'}
                                    <span className="text-gray-500">▼</span>
                                </div>

                                {isOpen && (
                                    <div className="absolute top-full left-0 w-full bg-white border rounded-lg mt-1 shadow-md z-10">
                                    <input
                                        type="text"
                                        placeholder="Buscar país..."
                                        value={search}
                                        onChange={handleSearch}
                                        className="w-full p-3 border-b text-gray-900 outline-none"
                                    />
                                    <div className="max-h-60 overflow-y-auto">
                                        {filteredCountries.map((country) => (
                                        <div
                                            key={country}
                                            className="p-3 hover:bg-blue-100 cursor-pointer"
                                            onClick={() => {
                                            handleSelect(country); // Actualizamos el país seleccionado
                                            setFieldValue('country', country); // Actualizamos el valor de Formik
                                            }}
                                        >
                                            {country}
                                        </div>
                                        ))}
                                    </div>
                                    </div>
                                )}
                                </div>
                                {errors.country && touched.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                            </div>
                            </div>


                    <div className="flex gap-16">
                        <div className="flex flex-col">
                            <label htmlFor="address" className="font-semibold text-xl">Dirección</label>
                            <input
                                type="text"
                                name="address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                className=" w-[350px] p-3 mb-4 border border-black bg-gray-100 rounded-lg"/>
                            {errors.address && touched.address && <p className=" text-red-500  text-sm">{errors.address}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone" className="font-semibold text-xl">Télefono</label>
                            <input
                                type="text"
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                className=" w-[350px] p-3 mb-4 border border-black bg-gray-100 rounded-lg"/>
                            {errors.phone && touched.phone && <p className=" text-red-500  text-sm">{errors.phone}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-semibold text-xl">Contraseña</label>
                        <input
                        type={"password"}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className=" w-[350px] p-3 mb-4 border border-black bg-gray-100 rounded-lg"/>
                    </div>
                    {errors.password && touched.password && <p className=" text-red-500  text-sm">{errors.password}</p>}
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl">Selecciona tu plan:</h3>
                <div className="h-[200px]">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex bg-gray-100 w-64 rounded-sm p-1"> 
                    <div className="flex gap-2 cursor-pointer pt-1" onClick={handleToggleBasic}>
                    {selectedPlan === "basic" ? (
                        <MdRadioButtonChecked className="w-6 h-6 text-black text-2xl" />
                    ) : (
                        <MdRadioButtonUnchecked className="w-6 h-6 text-black text-2xl" />
                    )}
                    </div>
                    <div className="ml-2 text-lg">
                    <h3>Básico</h3>
                    <h3 className="font-semibold">$19/mes</h3>
                    <div className="w-full max-w-md">
                        <div className="flex items-center cursor-pointer">
                        <h2>Características</h2>
                        </div>
                        <div>
                            <div className="text-base text-black">
                            <div className="flex justify-center items-center gap-1">
                                <MdCheck />
                                <p>
                                Prueba gratuita por 7 días
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <MdCheck />
                                <p>
                                Hasta 500 productos
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <MdCheck />
                                <p>
                                1 usuario
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <MdCheck />
                                <p>
                                Soporte por correo
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="flex bg-gray-100 w-64 rounded-sm p-1"> 
                <div className="flex gap-2 cursor-pointer pt-1" onClick={handleToggleProfessional}>
                    {selectedPlan === "professional" ?  (
                        <MdRadioButtonChecked className="w-6 h-6 text-black text-2xl" />
                    ) : (
                        <MdRadioButtonUnchecked className="w-6 h-6 text-black text-2xl" />
                    )}
                </div>
                <div className="ml-2 text-lg">
                    <h3>Profesional</h3>
                    <h3 className="font-semibold">$49/mes</h3>
                    <div className="w-full max-w-md">
                        <div className="flex items-center cursor-pointer">
                            <h2>Características</h2>
                        </div>
                        <div>
                            <div className="text-base text-black">
                                <div className="flex justify-center items-center gap-1">
                                    <MdCheck />
                                    <p>
                                        Hasta 5000 productos
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MdCheck />
                                    <p>
                                        5 usuarios
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MdCheck />
                                    <p>
                                        Soporte prioritario
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MdCheck />
                                    <p>
                                        Informes avanzados
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <div className="flex bg-gray-100 w-64 rounded-sm p-1"> 
                <div className="flex gap-2 cursor-pointer pt-1" onClick={handleToggleBusiness}>
                    {selectedPlan === "business" ?  (
                        <MdRadioButtonChecked className="w-6 h-6 text-black text-2xl" />
                    ) : (
                        <MdRadioButtonUnchecked className="w-6 h-6 text-black text-2xl" />
                    )}
                </div>
                <div className="ml-2 text-lg">
                    <h3>Empresarial</h3>
                    <h3 className="font-semibold">$99/mes</h3>
                    <div className="w-full max-w-md">
                        <div className="flex items-center cursor-pointer">
                            <h2>Características</h2>
                        </div>
                        <div>
                            <div className="text-base text-black">
                                <div className="flex justify-center items-center gap-1">
                                    <MdCheck />
                                    <p>
                                        Productos ilimitados
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MdCheck />
                                    <p>
                                        Usuarios ilimitados
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MdCheck />
                                    <p>
                                        Soporte 24/7
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MdCheck />
                                    <p>
                                        ChatBot con IA
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
              </div>
              </div>
            </div>
                <div className="w-full flex justify-center items-center mt-4">
                    <button
                        type="submit"
                        className="w-[350px] bg-black text-center text-white font-normal py-3 rounded-sm transition duration-300"
                    >
                        Registrarse
                    </button>
                </div>
                </form>
            )}
            </Formik>
                <div className="flex items-center justify-center text-center gap-2 text-black-600">
                    <h4>¿Ya tienes una cuenta? Iniciar sesión</h4>
                    <Link href={routes.login}>
                    <h4 className="text-green-500">Aquí</h4>
                    </Link>
                </div>
            </div>
    )
};

export default RegisterView;

