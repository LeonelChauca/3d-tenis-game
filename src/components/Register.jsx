import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";

export const Register = () => {
  const [loadingRegister, registerUser] = useLogin();
  const { register, handleSubmit } = useForm();
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          //registerUser(data);
          console.log(data);
        })}
        style={{
          minWidth: "400px",
          maxWidth: "550px",
          width: "40%",
          margin: "0 auto",
          padding: "40px 80px ",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          color: "#000",
        }}
      >
        <p className="h4 mb-4 text-primary ">Registro de Usuario</p>
        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="text"
            id="username"
            className="form-control"
            {...register("username")}
          />
          <label className="form-label" htmlFor="form2Example1">
            Nombre de Usuario
          </label>
        </div>
        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="email"
            id="correo"
            className="form-control"
            {...register("correo")}
          />
          <label className="form-label" htmlFor="form2Example1">
            Correo
          </label>
        </div>
        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            {...register("password")}
          />
          <label className="form-label" htmlFor="form2Example2">
            Contraseña
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block mb-4"
          disabled={loadingRegister}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};
