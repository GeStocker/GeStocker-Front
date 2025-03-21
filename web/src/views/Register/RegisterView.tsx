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
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?&\-]{8,}$/,
        "Debe tener una mayúscula, una minúscula, un número, un carácter especial (@!%*?&-), y mínimo 8 caracteres"
    )
    .required("La contraseña es obligatoria"),
    passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], "Las contraseñas no coinciden")
    .required("Debes confirmar la contraseña"),
});
export enum UserRole {
    BASIC = "basic",
    PROFESIONAL = "profesional",
    BUSINESS = "business",
  }
  
  const roleByPlan: Record<string, UserRole> = {
    basic: UserRole.BASIC,
    profesional: UserRole.PROFESIONAL,
    business: UserRole.BUSINESS,
  };

interface FormData{
    name: string;
    email: string;
    city: string;
    country: string;
    address: string;
    phone: string;
    password: string;
    passwordConfirmation: string;
    roles: [];
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

    const handlePlanChange = (plan: string, setFieldValue: (field: string, value: string | number | boolean | string[] | undefined, shouldValidate?: boolean) => void) => {
        setSelectedPlan(plan);
        const roles = roleByPlan[plan];
        setFieldValue('roles', [roles]);
    };

    const handleOnSubmit = async (values: FormData) => {
        try {
            console.log("values", values);
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
                password: '',
                passwordConfirmation: '',
                roles: [],
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
                                className=" w-[350px] p-3 mb-4 border border-black bg-gray-100 rounded-md"/>
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
                            className=" w-[350px] p-3 mb-4 border border-black bg-gray-100 rounded-md"
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
                                className="w-[350px] p-3 mb-4 border border-black bg-gray-100 rounded-md"
                                />
                                {errors.city && touched.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                            </div>
                            
                            <div className="flex flex-col">
                                <label htmlFor="country" className="font-semibold text-xl">País</label>
                                <div className="relative w-[350px] mb-4">
                                <div 
                                    className="border border-black rounded-md p-3 bg-gray-100 cursor-pointer text-gray-900 flex justify-between items-center"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {selectedCountry || 'Selecciona un país'}
                                    <span className="text-gray-500">▼</span>
                                </div>

                                {isOpen && (
                                    <div className="absolute top-full left-0 w-full bg-white border rounded-md mt-1 shadow-md z-10">
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
                                            handleSelect(country);
                                            setFieldValue('country', country); 
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
                                className=" w-[350px] p-3 mb-4 border border-black bg-gray-100 rounded-md"/>
                            {errors.address && touched.address && <p className=" text-red-500  text-sm">{errors.address}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone" className="font-semibold text-xl">Télefono</label>
                            <input
                                type="string"
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                className=" w-[350px] p-3 mb-4 border border-black bg-gray-100 rounded-md"/>
                            {errors.phone && touched.phone && <p className=" text-red-500  text-sm">{errors.phone}</p>}
                        </div>
                    </div>
                    <div className="flex gap-16">
                        <div className="flex flex-col">
                            <label htmlFor="password" className="font-semibold text-xl">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className={`w-[350px] p-3 mb-4 border ${
                                    errors.password && touched.password ? "border-red-500" : "border-black"
                                } bg-gray-100 rounded-md`}
                            />
                            {errors.password && touched.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                            {values.password && !errors.password && (
                                <p className="text-green-500 text-sm">Contraseña válida</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="passwordConfirmation" className="font-semibold text-xl">Confirmar Contraseña</label>
                            <input
                                type="password"
                                name="passwordConfirmation"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.passwordConfirmation}
                                className={`w-[350px] p-3 mb-4 border ${
                                    errors.passwordConfirmation && touched.passwordConfirmation ? "border-red-500" : "border-black"
                                } bg-gray-100 rounded-md`}
                            />
                            {errors.passwordConfirmation && touched.passwordConfirmation && (
                                <p className="text-red-500 text-sm">{errors.passwordConfirmation}</p>
                            )}
                            {values.passwordConfirmation && values.passwordConfirmation === values.password && (
                                <p className="text-green-500 text-sm">Las contraseñas coinciden</p>
                            )}
                            {/* {values.passwordConfirmation && values.passwordConfirmation !== values.password && (
                                <p className="text-red-500 text-sm">Las contraseñas no coinciden</p>
                            )} */}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                            <h3 className="text-2xl">Selecciona tu plan:</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { plan: "basic", title: "Básico", price: "$19/mes", features: ["Prueba gratuita por 7 días", "Hasta 500 productos", "1 usuario", "Soporte por correo"] },
                                    { plan: "profesional", title: "Profesional", price: "$49/mes", features: ["Hasta 5000 productos", "5 usuarios", "Soporte prioritario", "Informes avanzados"] },
                                    { plan: "business", title: "Empresarial", price: "$99/mes", features: ["Productos ilimitados", "Usuarios ilimitados", "Soporte 24/7", "ChatBot con IA"] },
                                ].map(({ plan, title, price, features }) => (
                                    <div
                                        key={plan}
                                        className={`flex flex-col bg-gray-100 w-64 rounded-sm p-3 cursor-pointer ${selectedPlan === plan ? "border-2 border-black" : ""}`}
                                        onClick={() => handlePlanChange(plan, setFieldValue)}
                                    >
                                        <div className="flex gap-2">
                                            {selectedPlan === plan ? (
                                                <MdRadioButtonChecked className="w-6 h-6 text-black text-2xl" />
                                            ) : (
                                                <MdRadioButtonUnchecked className="w-6 h-6 text-gray-500 text-2xl" />
                                            )}
                                            <div className="ml-2 text-lg">
                                                <h3>{title}</h3>
                                                <h3 className="font-semibold">{price}</h3>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <h4>Características:</h4>
                                            <ul className="text-sm">
                                                {features.map((feature, index) => (
                                                    <li key={index} className="flex items-center gap-1">
                                                        <MdCheck className="text-black" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
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

