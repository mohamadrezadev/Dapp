//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract StudentRegistry {
    struct Education {
        string degree;
        string major;
        string year;
    }

    struct Student {
        string firstName;
        string lastName;
        Education education;
        bool isissued;
        string tokenurl;
        int tokenid;
    }

    mapping(address => Student) public students;
    Student[]  public Students ;
    
    event StudentCreated(uint256 id, string firstName, string lastName, string degree, string major, string year,string code );
    event StudentUpdated(uint id, string firstName, string lastName, string degree, string major, string year,string code);
    event StudentDeleted(string code);
    event CertificateIssued(uint id ,string code);
    function createStudent(string memory _firstName, string memory _lastName,string memory _degree, string memory _major, string memory _year) 
    public returns(uint) {
        require(bytes(_firstName).length > 0, "First name cannot be empty");
        require(bytes(_lastName).length > 0, "Last name cannot be empty");
        require(bytes(_degree).length > 0, "Degree cannot be empty");
        require(bytes(_major).length > 0, "Major cannot be empty");
        require(bytes(_year).length > 0, "yaer cannot be empty");

        Education memory education = Education(_degree, _major, _year);
        Student memory student = Student(_firstName, _lastName, education ,false," ",-1);
        Students.push(student);
        emit StudentCreated(Students.length-1, _firstName, _lastName, _degree, _major, _year,"ACTION_CONFIRME");
        return Students.length - 1;
    }
    function getAallStudents() public view returns (Student[] memory) {
        return Students;
    }
    function isissuedcertificate(uint studentId, bool isissued,string memory _tokenurl,int _tokenid) public {
        Student storage student = Students[studentId];
        student.isissued = isissued;
        student.tokenurl=_tokenurl;
        student.tokenid=_tokenid;
        emit CertificateIssued(studentId,"ACTION_CONFIRME");
    }

    function updateStudent(uint256 _studentId,string memory _firstName, string memory _lastName, string memory _degree, string memory _major, string memory _year) public {
        require(bytes(_firstName).length > 0, "Firstname cannot be empty");
        require(bytes(_lastName).length > 0, "Lastname cannot be empty");
        require(bytes(_degree).length > 0, "Degree cannot be empty");
        require(bytes(_major).length > 0, "Major cannot be empty");
        require(bytes(_year).length > 0, "year cannot be empty");

        Education memory education = Education(_degree, _major, _year);
        Student storage student = Students[_studentId];
        student.firstName = _firstName;
        student.lastName = _lastName;
        student.education = education;
        emit StudentUpdated(_studentId, _firstName, _lastName, _degree, _major, _year,"ACTION_CONFIRME");
    }
   
    function deleteStudent(uint _studentId) public {
        require(_studentId < Students.length, "Student ID out of range");

        for (uint i = _studentId; i < Students.length - 1; i++) {
            Students[i] = Students[i+1];
        }
        Students.pop();

    emit StudentDeleted("ACTION_CONFIRME");
}
   

}