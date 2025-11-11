import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCreateUserByAdmin } from "../../../hooks/useUsers";
import type { AxiosError } from "axios";
import * as Yup from "yup";

import { NotyfComponent } from "../../UI/NotyfComponent";
import type { UserRegisterAdmin } from "../../../Api/users";
// TODO: Icons
import { BiUser, BiIdCard } from "react-icons/bi";
import { MdOutlineEmail, MdKey } from "react-icons/md";

// ✅ Validación con Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("El nombre es obligatorio")
    .min(2, "Mínimo 2 caracteres"),
  lastName: Yup.string()
    .required("El apellido es obligatorio")
    .min(2, "Mínimo 2 caracteres"),
  email: Yup.string()
    .required("El correo es obligatorio")
    .email("Correo inválido"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(8, "Mínimo 8 caracteres"),
  role: Yup.string()
    .required("El rol es obligatorio")
    .oneOf(["admin", "user"], "Rol no válido"),
});

interface CreateUserAdminProps {
  IsOpenView: boolean;
  setOpenView: (value: boolean) => void;
}

export default function CreateUserAdmin({
  IsOpenView,
  setOpenView,
}: CreateUserAdminProps) {
  const { mutate: createUser, isPending } = useCreateUserByAdmin();

  const handleSubmit = (userData: UserRegisterAdmin) => {
    createUser(userData, {
      onSuccess: () => {
        NotyfComponent.success("Usuario creado con éxito");
        setOpenView(false);
      },
      onError: (err) => {
        const axiosError = err as AxiosError<{ message?: string }>;
        const messageError =
          axiosError.response?.data?.message || "Algo ha salido mal";
        NotyfComponent.error(messageError);
      },
    });
  };

  return (
    <Dialog
      open={IsOpenView}
      onClose={() => setOpenView(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center p-2">
        <div className="max-w-3xl w-full">
          <DialogPanel className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-primary">
              Crear Usuario
            </h1>
            <h2 className="text-[17px] text-center text-gray-700 mb-6">
              Completa la información para agregar un nuevo usuario.
            </h2>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                role: "admin",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form
                className="flex flex-col sm:flex-row gap-4"
                id="createUserAdminForm"
              >
                {/* 🧍 Datos Personales */}
                <div className="left w-full">
                  <label className=" font-semibold my-2 flex items-center gap-1">
                    <BiUser /> Nombre:
                  </label>
                  <div className="relative">
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="Nombre completo"
                      className="w-full border border-gray-300 rounded px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <BiUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />

                  <label className=" font-semibold my-2 flex items-center gap-1">
                    <BiIdCard /> Apellido:
                  </label>
                  <div className="relative">
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Apellido completo"
                      className="w-full border border-gray-300 rounded px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <BiIdCard className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />

                  <label className="flex font-semibold my-2 items-center gap-1">
                    <MdOutlineEmail /> Correo:
                  </label>
                  <div className="relative">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      className="w-full border border-gray-300 rounded px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <MdOutlineEmail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* 🔐 Datos de acceso */}
                <div className="right w-full">
                  <label className=" font-semibold my-2 flex items-center gap-1">
                    <MdKey /> Contraseña:
                  </label>
                  <div className="relative">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      className="w-full border border-gray-300 rounded px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <MdKey className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />

                  <label className="block font-semibold my-2">Rol:</label>
                  <Field
                    as="select"
                    name="role"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </Form>
            </Formik>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setOpenView(false)}
                className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="createUserAdminForm"
                disabled={isPending}
                className={`cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition-colors ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Guardar
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
