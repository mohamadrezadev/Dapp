import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import moment from 'jalali-moment'
import '../components/Frame'
import "./table.css";
import Frame from "../components/Frame";
function Table({ students }) {
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
          className="form-control text-end mb-3 w-50 mx-auto"
          placeholder="... جستجو"
          value={filterText}
          onChange={(event) => setFilterText(event.target.value)}
        />
      <table className="table">
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
              
              <tr key={index}>
                
                <th scope="row">{index + 1 + offset}</th>
                <th scope="col">{student.firstName}</th>
                <th scope="col">{student.lastName}</th>
                <th scope="col">{student.education.major}</th>
                <th scope="col">{student.education.degree}</th>
                <th scope="col">{moment(student.education.year*1000).format('jYYYY/jMM/jDD')}</th>
                <td>
                  <button onClick={() => handelCreatenft(students[index])}>
                    صدور گواهینامه{" "}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mx-auto">
        <ReactPaginate
          previousLabel={"قبلی"}
          className="pagination"
          nextLabel={"بعدی"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"page-link btn btn-primary"}
          nextLinkClassName={"page-link  btn btn-primary"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
        />
      </div>
      
    </>
  );
}

export default Table;
