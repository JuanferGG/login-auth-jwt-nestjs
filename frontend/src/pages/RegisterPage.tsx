import { Link } from "react-router-dom";


export default function RegisterPage() {
  return (
    <section className="flex bg-[#DFD0B8] h-full w-full items-center justify-center">
      <form
        className="bg-white p-8  rounded-lg shadow-md w-full h-max max-w-sm"
      >
       Register Form
       <p className="mt-5">¿Ya tienes cuenta? <Link to={'/login'} className="text-blue-500" >Iniciar sesion</Link></p>
      </form>
    </section>
  )
}
