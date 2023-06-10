//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract StudentRegistry {
    struct Education {
        string degree;
        string major;
        uint256 year;
    }

    struct Student {
        string firstName;
        string lastName;
        Education education;
    }

    mapping(address => Student) public students;
    Student[]  public Students ;
    
    event StudentCreated(uint256 id, string firstName, string lastName, string degree, string major, uint256 year,string Message);
    event StudentUpdated(uint id, string firstName, string lastName, string degree, string major, uint256 year,string Message);
    event StudentDeleted(string Message);

    function createStudent(string memory _firstName, string memory _lastName,string memory _degree, string memory _major, uint256 _year) 
    public returns(uint) {
        require(bytes(_firstName).length > 0, "First name cannot be empty");
        require(bytes(_lastName).length > 0, "Last name cannot be empty");
        require(bytes(_degree).length > 0, "Degree cannot be empty");
        require(bytes(_major).length > 0, "Major cannot be empty");

        Education memory education = Education(_degree, _major, _year);
        Student memory student = Student(_firstName, _lastName, education);
        Students.push(student);
        emit StudentCreated(Students.length-1, _firstName, _lastName, _degree, _major, _year,"Information has been successfully registered");
        return Students.length - 1;
    }
    function getAallStudents() public view returns (Student[] memory) {
        return Students;
    }
  

    function updateStudent(uint256 _studentId,string memory _firstName, string memory _lastName, string memory _degree, string memory _major, uint256 _year) public {
        require(bytes(_firstName).length > 0, "First name cannot be empty");
        require(bytes(_lastName).length > 0, "Last name cannot be empty");
        require(bytes(_degree).length > 0, "Degree cannot be empty");
        require(bytes(_major).length > 0, "Major cannot be empty");

        Education memory education = Education(_degree, _major, _year);
        Student storage student = Students[_studentId];
        student.firstName = _firstName;
        student.lastName = _lastName;
        student.education = education;
        emit StudentUpdated(_studentId, _firstName, _lastName, _degree, _major, _year,"Information has been successfully Updated");
    }
    function deleteStudent(uint _studentId) public {
        delete Students[_studentId];
        emit StudentDeleted("Information has been successfully Deleted");
    }
   

}