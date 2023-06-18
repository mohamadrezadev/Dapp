import React from "react";
import { DatePicker } from "react-advance-jalaali-datepicker";
import moment from "jalali-moment";
import { NftPreview } from "./RenderNft";
function DatePickerInput(props) {
  return <input className="form-control" {...props} />;
}


function ModalDatanft({address, tokenid }) {
  
 
  return (
    <div
      className="modal fade"
      id="modaldatanft"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{direction:"ltr"}}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
                    اطلاعات گواهینامه
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
                    <div className="col-12">
                      <label htmlFor="firstName" className="form-label">
                       : آدرس گواهینامه {""}
                      </label>
                      <input
                        type="text"
                        className="form-control text-end"
                        id="firstName"
                        placeholder=""
                        required=""
                        disabled={true}
                        value={address}
                        
                      />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="firstName" className="form-label">
                        : NFT{"شماره"}
                      </label>
                      <input
                        type="text"
                        className="form-control text-end"
                        id="firstName"
                        placeholder=""
                        required=""
                        disabled={true}
                        value={tokenid}
               
                      />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                    <div className="col-12">
                              <NftPreview 
                                 nftId={tokenid}
                                 contractAddress={address}
                               />
                    </div>
                    </div>
                    
                  </div>

                </div>
              </div>
            </main>
          </div>
          <div className="modal-footer justify-content-start">
           
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              
            >
                    
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDatanft;
