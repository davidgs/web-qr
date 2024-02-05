import React from "react";
function Card(props) {
  return (
    <>
      <div className="col-lg-4">
        <div className="card mb-5 mb-lg-0">
          <div className="card-body">
            <h5 className="card-title text-muted text-uppercase text-center">
              {props.data.plan}
            </h5>{" "}
            {/* plan is title of card */}
            <h6 className="card-price text-center">{props.data.price}</h6>{" "}
            {/*this line  is price of card */}
            <hr />
            <ul className="fa-ul">
              {props.data.features.map((feature) => {
                return (
                  <li className={feature.isEnabled ? "" : "text-muted"}>
                    {" "}
                    {/* this line is to disable the text (text-muted) */}
                    <span className="fa-li">
                      <i
                        className={`fa ${
                          feature.isEnabled ? "fa-check" : "fa-times"
                        }`}
                      ></i>{" "}
                      {/* this line to font awesome icon ✔ and ✖ icon */}
                    </span>
                    {feature.name}{" "}
                    {/* this line is to other content in card  */}
                  </li>
                );
              })}
            </ul>
            <button
              href="#"
              className="btn btn-block btn-primary text-uppercase"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
