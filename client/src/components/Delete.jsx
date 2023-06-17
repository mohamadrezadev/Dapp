import Swal from "sweetalert2";

export function Delete({ studentid, funcs }) {
  const { handelDeleteStudent, loading } = funcs;

  const handleDelete = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success  mr-2",
        cancelButton: "btn btn-danger  mr-2",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "آیا از حذف مطمعن هستید ؟",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف ",
      cancelButtonText: "بستن",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const success = await handelDeleteStudent(studentid);
      if (success) {
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "اطلاعات با موفقیت حذف گردید ",
          "success"
        );
      } else {
        swalWithBootstrapButtons.fire("Error", "خطایی پیش امده است ", "error");
      }
    }
  };

  return (
    <button type="button" className="btn btn-danger d-flex align-middle" disabled={loading} onClick={handleDelete}>
      
      حذف
      {loading && (
        <div
          className="spinner-border m-2"
          style={{ width: "10px", height: "10px" }}
          role="status"
        />
      )}
    </button>
  );
}
