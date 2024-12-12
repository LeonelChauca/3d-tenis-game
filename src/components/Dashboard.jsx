import store from "../store/store";
import "../assets/tennis/script";
import { useEffect, useRef, useState } from "react";

export const Dashboard = () => {
  const logout = store((state) => state.logout);
  const iframeRef = useRef(null);
  const [score, setScore] = useState({ player: 0, opponent: 0 });
  useEffect(() => {
    const handleMessage = (event) => {
      const { type, scores } = event.data;
      if (type === "scoreUpdate") {
        console.log("Puntaje recibido desde el iframe:", scores);
        setScore(scores);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Barra lateral */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "250px", minWidth: "250px" }}
      >
        <h2 className="text-center">Tennis 3D</h2>
        <ul className="nav flex-column">
          <hr style={{ height: "2px" }} />
          <li className="nav-item">
            <h5 className="text-white">SCORE</h5>
          </li>
          <hr style={{ height: "2px" }} />
        </ul>
        {/* Botón de Logout */}
        <div className="mt-auto">
          <button onClick={logout} className="btn btn-danger w-100 mt-3">
            Cerrar Sesion
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1">
        {/* Encabezado */}
        <div className="bg-light p-3">
          <h3>Bienvenido al Juego</h3>
        </div>
        {/* Contenido */}
        <div className="p-4">
          <div className="row">
            <div className="col-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Instrucciones del juego</h5>
                  <p className="card-text">Some quick example text.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <iframe
          ref={iframeRef}
          src="/tennis/index.html"
          title="Tennis 3D"
          style={{ width: "100%", height: "80vh" }}
        ></iframe>
      </div>
    </div>
  );
};
