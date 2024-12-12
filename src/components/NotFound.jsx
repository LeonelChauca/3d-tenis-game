import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="page-wrap d-flex flex-row align-items-center"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">La Pagina no se encuentra</div>
            <Link to="/login" className="btn btn-link">
              Regresar al Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
