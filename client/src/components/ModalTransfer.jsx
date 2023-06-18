import React from "react";
import Swal from "sweetalert2";

function ModalTransfer({ transfer, funcs }) {
  const { from, setFrom, to, setTo, tokenId, setTokenId } = funcs;

  const handleTransfer = async () => {
    // Call the transfer function
    const res = await transfer(from, to, tokenId);
    if (res) {
      // Display a success alert
      Swal.fire("انتقال انجام شد", "توکن مورد نظر ارسال گردید", "success");
    }
   
    else if(!res) {
      // Display an error alert
      Swal.fire("انتقال انجام نشد", "دوباره سعی کنید", "error");
    }
    else (res===null) 
    {
      Swal.fire("تمامی فیلد ها باید پر شود ","همه فیلد هارا پر کنید","error");
    }
  };

  return (
    <div
      className="modal fade"
      style={{ direction: "ltr" }}
      id="exampleModal2"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {"انتقال "}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row g-5">
                <div className="col-md-7 col-lg-8 mx-auto">
                  <form className="needs-validation" noValidate>
                    <div className="row g-1">
                      <div className="col-12">
                        <label htmlFor="fromInput" className="form-label">
                        {": آدرس فرستنده "}
                        </label>
                        <input
                          type="text"
                          className="form-control text-end"
                          id="fromInput"
                          value={from}
                          onChange={(e) => {
                            setFrom(e.target.value);
                          }}
                          required
                        />
                        <div className="invalid-feedback">
                          Sender address is required.
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="toInput" className="form-label">
                          {": آدرس گیرنده "}
                        </label>
                        <input
                          type="text"
                          className="form-control text-end"
                          id="toInput"
                          value={to}
                          onChange={(e) => {
                            setTo(e.target.value);
                          }}
                          required
                        />
                        <div className="invalid-feedback">
                          Recipient address is required.
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="tokenIdInput" className="form-label">
                        {":  NFT  شماره"}
                        </label>
                        <input
                          type="text"
                          className="form-control text-end"
                          id="tokenIdInput"
                          value={tokenId}
                          onChange={(e) => {
                            setTokenId(e.target.value);
                          }}
                          required
                        />
                        <div className="invalid-feedback">
                          Token ID is required.
                        </div>
                      </div>
                    </div>
                  </form>
                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer" style={{ direction: "rtl" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleTransfer}
            >
              {"انتقال "}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {"بستن "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalTransfer;