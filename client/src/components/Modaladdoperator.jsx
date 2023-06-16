import React from "react";
import { DatePicker } from "react-advance-jalaali-datepicker";
import moment from "jalali-moment";
function DatePickerInput(props) {
  return <input className="form-control" {...props} />;
}


function ModalAddOwner({ handelAddoperator, loading, funcs }) {
  const {
    setaddress,
    address,
    setLoading
  } = funcs;
 console.log(address)
  return (
    <div
      className="modal fade"
      id="exampleModal3"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{direction:"ltr"}}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
                    افزدون آدرس کیف پول برای تایید کردن 
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
                  <div className="row g-3 text-end">
                    <div className="col-12 text-end">
                      <label htmlFor="firstName" className="form-label">
                        آدرس
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder=""
                        required=""
                        onChange={(e) => {
                          // console.log(e.target.value)
                          setaddress(e.target.value);
                        }}
                      />
                      <div className="invalid-feedback">
                        Valid Addres is required.
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </main>
          </div>
          <div className="modal-footer justify-content-start">
            {loading && (
              <div className="spinner-border text-primary " role="status" />
            )}
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setLoading(false)}
            >
              بستن
            </button>

            <button
              type="button"
              className="btn btn-primary "
              disabled={loading}
              onClick={() => {
                handelAddoperator(address);
              }}
            >
              افزودن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddOwner;
