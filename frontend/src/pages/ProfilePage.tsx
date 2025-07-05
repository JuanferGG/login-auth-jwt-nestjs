import { useState } from "react";
import { useUserStore } from "../hooks/useUserStore";

//TODO Icon's
import { BiMailSend, BiPencil, BiSolidCalendar, BiUser } from "react-icons/bi";
import EditUserMe from "../components/modals/Users/EditUserMe";

export default function ProfilePage() {
  const { user } = useUserStore();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const handleEdit = () => {
    setIsOpenEditModal(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">No user data available</div>
      </div>
    );
  }

  const { firstName, lastName, email, image, createdAt, role } = user;
  const joinDate = new Date(createdAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <section className="mx-auto w-[100vw] mt-6 max-w-4xl">
      <h1 className="flex items-center text-4xl font-bold text-[#222831] mb-6 border-b-2 pb-1 border-[#393E46] rounded-b-[4px] ">
        {" "}
        <BiUser className="text-[#222831]" />
        Perfil
      </h1>
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Cover Section */}
        <div className="h-28 bg-gradient-to-r from-[#948979] to-[#393E46] relative">
          <button
            onClick={handleEdit}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
          >
            <BiPencil className="text-white text-xl" />

            {/* //TODO ModalEditUserMe */}
            <EditUserMe 
              IsOpenView={isOpenEditModal}
              setOpenView={setIsOpenEditModal}
              user={user}
            />
          </button>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="flex justify-center -mt-16 mb-4">
            <div className="relative">
              {image ? (
                <img
                  src={`${import.meta.env.VITE_BASE_API}${image}`}
                  alt={`${firstName} ${lastName}`}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-[#393E46] to-[#222831] flex items-center justify-center">
                  <span className="text-white text-3xl font-bold capitalize">
                    {initials}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 capitalize">
              {firstName} {lastName}
            </h2>
            <p className="text-gray-600">{email}</p>
            <div className="inline-flex items-center px-3 py-1 mt-2 gap- rounded-full text-sm bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <b className="mr-1">Estado: </b>Active
              <b className="ml-5 mr-1">Rol: </b>
              {role}
            </div>
          </div>

          {/** //TODO User Info   */}
          <div className="flex flex-col w-full gap-2 items-center justify-center ">
            <div className="flex w-full flex-wrap justify-around gap-1">
              <h3 className="font-bold text-xl text-gray-900 text-center sm:text-left">
                Nombre Usuario{" "}
                <p className="text-gray-600 capitalize flex items-center gap-1 font-light">
                  <BiUser className="text-[#222831]" />{" "}
                  {firstName + " " + lastName}
                </p>
              </h3>

              <h3 className="font-bold text-xl text-gray-900 text-center sm:text-left">
                Correo{" "}
                <p className="text-gray-600 capitalize flex items-center gap-1 font-light">
                  <BiMailSend className="text-[#222831]" /> {email}
                </p>
              </h3>
            </div>

            <div className="flex w-full flex-wrap justify-around gap-1">
              <h3 className="font-bold text-xl text-gray-900 text-center sm:text-left">
                Miembro Desde{" "}
                <p className="text-gray-600 capitalize flex items-center gap-1 font-light">
                  <BiSolidCalendar className="text-[#222831]" /> {joinDate}
                </p>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
