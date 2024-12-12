import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";
import { Link, useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const { loadingGet, login } = useLogin();
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
          login(data);
          navigate("/dashboard");
        })}
        style={{
          minWidth: "400px",
          maxWidth: "800px",
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
        <p className="h4 mb-4 text-primary ">Tennis 3D - INICIAR SESION</p>
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
          disabled={loadingGet}
        >
          Iniciar Sesion
        </button>
        <div className="text-center">
          <p>
            No estas registrado ? <Link to="/register">registro</Link>
          </p>
        </div>
      </form>
    </div>
  );
};
