
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
    event StudentCreated(address indexed studentAddress, string firstName, string lastName, string degree, string major, uint256 year);
    event StudentUpdated(address indexed studentAddress, string firstName, string lastName, string degree, string major, uint256 year);
    event StudentDeleted(address indexed studentAddress);

    function createStudent(string memory _firstName, string memory _lastName,string memory _degree, string memory _major, uint256 _year) public {
        require(bytes(_firstName).length > 0, "First name cannot be empty");
        require(bytes(_lastName).length > 0, "Last name cannot be empty");
        require(bytes(_degree).length > 0, "Degree cannot be empty");
        require(bytes(_major).length > 0, "Major cannot be empty");

        Education memory education = Education(_degree, _major, _year);
        Student memory student = Student(_firstName, _lastName, education);
        Students.push(student);
        emit StudentCreated(msg.sender, _firstName, _lastName, _degree, _major, _year);
    }
    function getAallStudents() public view returns (Student[] memory) {
        return Students;
    }
  

    function updateStudent(string memory _firstName, string memory _lastName, string memory _degree, string memory _major, uint256 _year) public {
        require(bytes(_firstName).length > 0, "First name cannot be empty");
        require(bytes(_lastName).length > 0, "Last name cannot be empty");
        require(bytes(_degree).length > 0, "Degree cannot be empty");
        require(bytes(_major).length > 0, "Major cannot be empty");

        Education memory education = Education(_degree, _major, _year);
        Student storage student = students[msg.sender];
        student.firstName = _firstName;
        student.lastName = _lastName;
        student.education = education;
        emit StudentUpdated(msg.sender, _firstName, _lastName, _degree, _major, _year);
    }
    function deleteStudent(uint index) public {
        // Delete does not change the array length.
        // It resets the value at index to it's default value,
        // in this case 0
        delete Students[index];
    }
    function issueCertificate() public view returns (bytes memory) {
        Student memory student = students[msg.sender];
        string memory certificate = string(abi.encodePacked(
            "Certificate of Graduation\n\n",
            "This is to certify that ", student.firstName, " ", student.lastName, " has successfully completed the requirements for the degree of ", student.education.degree, " in ", student.education.major, " on ", uint2str(student.education.year), ".\n\n",
            "Issued on ", block.timestamp , ".\n"
        ));
        bytes memory certificateBytes = bytes(certificate);
        return certificateBytes;
    }

    function uint2str(uint _i) internal pure returns (string memory) {
            if (_i == 0) {
            return "0";
            }
            uint j = _i;
            uint length;
            while (j != 0) {
            length++;
            j /= 10;
            }
            bytes memory  bstr = new bytes(length);
            uint k = length;
            j = _i;
            while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + j % 10));
            j /= 10;
            }
            return string(bstr);
    }
}