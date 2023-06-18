import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import moment from "jalali-moment";
import "../components/Frame";
import "./table.css";
import { Delete } from "./Delete";
import ModalUpdate from "./ModalUpdate";
// import Delete from '../components/Delete.jsx';
function Table({ students, funcs }) {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
      student.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
      student.education.major
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      student.education.degree
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      student.education.year
        .toString()
        .toLowerCase()
        .includes(filterText.toLowerCase())
  );
  const { handelCreatenft,loading, loadingNft,handelDeleteStudent,handelUpdatestudent,setLoading
   } = funcs;

  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(filteredStudents.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
const [id, setid] = useState(0)
  return (
    <>
      <input
        type="text"
        className="form-control text-end mb-3 w-50 me-3 shadow"
        placeholder=" جستجو..."
        value={filterText}
        onChange={(event) => setFilterText(event.target.value)}
      />
      <div className="table-responsive w-100 " style={{ borderRadius: "2rem" }}>
        <table
          className="table table-light shadow  w-100"
          style={{ borderRadius: "2rem" }}
        >
          <thead>
            <tr>
              <th scope="col">ردیف</th>
              <th scope="col">نام</th>
              <th scope="col">نام خانوادگی</th>
              <th scope="col">رشته تحصیلی </th>
              <th scope="col">مقطع تحصیلی</th>
              <th scope="col">سال فارغ تحصیلی </th>
              <th scope="col"></th>
              <th scope="col"> عملیات </th>
              <th scope="col"></th>
            </tr>
          </thead>
          {filteredStudents.length > 0 ? (
          <tbody>
            {filteredStudents.slice(offset, offset + PER_PAGE).map(
              (student, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1 + offset}</th>
                  <th scope="col">{student.firstName}</th>
                  <th scope="col">{student.lastName}</th>
                  <th scope="col">{student.education.major}</th>
                  <th scope="col">{student.education.degree}</th>
                  <th scope="col">{student.education.year}</th>
                  <td>
                  <button
                      type="button"
                      className="btn btn-primary border d-flex align-items-center  shadow"
                      data-bs-toggle="modal"
                      data-bs-target="#modalledit"
                      onClick={()=>setid(index) }
                      
                    >
                       ویرایش
                              
                    </button>
                    <ModalUpdate 
                    handelUpdatestudent={handelUpdatestudent}
                    loading={loading}
                    setLoading={setLoading}
                    student={students}
                    studentid={id}
                    // funcs={{
                    //   setnewFirstName,
                    //   newfirstName,
                    //   newlastName,
                    //   setnewLastName,
                    //   newdegree,
                    //   setnewDegree,
                    //   newmajor,
                    //   setnewMajor,
                    //   newyear,
                    //   setnewYear,
                    //   setLoading,
                    //   loading
                    // }}
                    />
                    
                  </td>
                  <td>
                    <Delete studentid={index} 
                    funcs={{ handelDeleteStudent,loading }} />
                  </td>
                  <td>
                    <div>
                      {!student.isissued ? (
                        <button
                          className="btn btn-success d-flex align-middle"
                          disabled={loadingNft}
                          onClick={(e) => handelCreatenft(students[index], index)}
                        >
                          صدورگواهینامه
                          {loadingNft && (
                            <div
                              className="spinner-border m-2"
                              style={{ width: '10px', height: '10px' }}
                              role="status"
                            />
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          disabled={true}
                        >
                          صادرشده
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="8">هیچ دانشجویی یافت نشد.</td>
            </tr>
          </tbody>
        )}
        </table>
      </div>
      <div className="mx-auto" style={{ direction: "ltr" }}>
        <ReactPaginate
          previousLabel={"قبلی"}
          className="pagination"
          nextLabel={"بعدی"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination shadow"}
          previousLinkClassName={
            "page-link btn btn-primary text-primary  shadow "
          }
          nextLinkClassName={"page-link  btn btn-primary text-primary shadow"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}

export default Table;



