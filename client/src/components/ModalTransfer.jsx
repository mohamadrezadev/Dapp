import React from "react";

function ModalTransfer({ transfer, funcs }) {
  const { from, setFrom, to, setTo, tokenId, setTokenId } = funcs;
  return (
    <div
      className="modal fade"
      id="exampleModal2"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Modal title
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <main className="container">
              <div className="col-md-7 col-lg-8 mx-auto">
                <div className="row g-5">
                  <form className="needs-validation was-validated" />
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="firstName" className="form-label">
                        ادرس فرستنده
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder=""
                        required=""
                        onChange={(e) => {
                          setFrom( e.target.value)
                        }}
                      />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="lastName" className="form-label">
                        ادرس گیرنده
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder=""
                        required=""
                        onChange={(e) => {
                            setTo (e.target.value);
                        }}
                      />
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        شماره گواهینامه
                        <span className="text-body-secondary"></span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="date"
                        placeholder=""
                        onChange={(e) => {
                          setTokenId(e.target.value)
                          // setTokenId = e.target.value;
                        }}
                      />
                    </div>
                  </div>

                  <hr className="my-4" />
                </div>
              </div>
            </main>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                transfer(from, to, tokenId);
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalTransfer;
