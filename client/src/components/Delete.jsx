import Swal from 'sweetalert2';

export function Delete({ studentid, funcs }) {
  const { handelDeleteStudent } = funcs;

  const handleDelete = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success  mr-2',
        cancelButton: 'btn btn-danger  mr-2'
      },
      buttonsStyling: false
    });

    const result = await swalWithBootstrapButtons.fire({
      title: 'آیا از حذف مطمعن هستید ؟',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'حذف ',
      cancelButtonText: 'بستن',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      const success = await handelDeleteStudent(studentid);
      if (success) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'اطلاعات با موفقیت حذف گردید ',
          'success'
        );
      } else {
        swalWithBootstrapButtons.fire(
          'Error',
          'خطایی پیش امده است ',
          'error'
        );
      }
    
    }
  };

  return (
    <button type="button" className="btn btn-danger" onClick={handleDelete}>
      حذف
    </button>
  );
}