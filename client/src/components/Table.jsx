import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import moment from 'jalali-moment'
import '../components/Frame'
import "./table.css";

function Table({ students ,funcs}) {
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
  const {handelCreatenft} = funcs;
    
  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(filteredStudents.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  return (
    <>
      
        <input
          type="text"
          className="form-control text-end mb-3 w-50 mx-auto shadow"
          placeholder="... جستجو"
          value={filterText}
          onChange={(event) => setFilterText(event.target.value)}
        />
      <div className="table-responsive w-100 "  style={{borderRadius:"2rem"}}>
      <table className="table table-light shadow  w-100 p-5" style={{borderRadius:"2rem"}}>
        <thead>
          <tr>
            <th scope="col">ردیف</th>
            <th scope="col">نام</th>
            <th scope="col">نام خانوادگی</th>
            <th scope="col">رشته تحصیلی </th>
            <th scope="col">مقطع تحصیلی</th>
            <th scope="col">سال فارغ تحصیلی </th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>

          {filteredStudents
            .slice(offset, offset + PER_PAGE)
            .map((student, index) => (
              console.log("student index:"+ student[index]+index),
              <tr key={index}>
                
                <th scope="row">{index + 1 + offset}</th>
                <th scope="col">{student.firstName}</th>
                <th scope="col">{student.lastName}</th>
                <th scope="col">{student.education.major}</th>
                <th scope="col">{student.education.degree}</th>
                {/* <th scope="col">{moment.from(student.education.year, 'fa', 'jYYYY').format('jYYYY/jMM/jDD')}</th> */}
                <th scope="col">{student.education.year}</th>
                <td>
                {!student.isissued ? (
                  <button className="btn btn-success" onClick={() => handelCreatenft(students[index],index)}>
                    صدور گواهینامه
                  </button>
                ) : (
                  <button className="btn btn-primery" >
                    صادر شده
                  </button>
                )}
                </td>
                
              </tr>
            ))}
        </tbody>
      </table>
      </div>
      <div className="mx-auto">
        <ReactPaginate
          previousLabel={"قبلی"}
          className="pagination"
          nextLabel={"بعدی"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"page-link btn btn-primary text-primary "}
          nextLinkClassName={"page-link  btn btn-primary text-primary"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
        />
      </div>
      
    </>
  );
}

export default Table;
