import React from "react";
import { Link } from "react-router-dom";

export default function KarakterItem({
  karakter: { id, name, gender, status, image },
}) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-3">
          <img style={{ width: 100 }} src={image} alt={image}></img>
        </div>
        <div className="col-md-6">{name}</div>
        <div className="col-md-3">
          <Link to={`/karakter/${id}`} className="btn btn-primary">
            Detay
          </Link>
        </div>
      </div>
    </div>
  );
}
