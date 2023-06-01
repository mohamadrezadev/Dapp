pragma solidity ^0.8.0;

contract StudentRegistry2 {

struct Education {
    string degree;
    string major;
    uint256 year;
}

struct Student {
    string firstName;
    string lastName;
    Education education;
    bool isExecuted;
    //mapping (address => bool) isConfirmed;
    uint256 confirmationCount;
}

address[] public owners;
uint public numConfirmationsRequired;
mapping (address => bool) public isOwner;

mapping(uint256 => Student) public students;
uint public studentCount;

event StudentCreated(uint256 indexed studentId, string firstName, string lastName, string degree, string major, uint256 year);
event StudentUpdated(uint256 indexed studentId, string firstName, string lastName, string degree, string major, uint256 year);
event StudentDeleted(uint256 indexed studentId);
event Confirmation(uint256 indexed studentId, address indexed sender);
event Execution(uint256 indexed studentId);

constructor(address[] memory _owners, uint _numConfirmationsRequired) {
    require(_owners.length > 0, "Owners required");
    require(_numConfirmationsRequired > 0 && _numConfirmationsRequired <= _owners.length, "Invalid number of confirmations required");

    for (uint i = 0; i < _owners.length; i++) {
        address owner = _owners[i];
        require(owner !=address(0), "Invalid owner");
        require(!isOwner[owner], "Owner already added");
        isOwner[owner] = true;
        owners.push(owner);
    }

    numConfirmationsRequired = _numConfirmationsRequired;
}

function createStudent(string memory _firstName, string memory _lastName,string memory _degree, string memory _major, uint256 _year) public {
    require(bytes(_firstName).length > 0, "First name cannot be empty");
    require(bytes(_lastName).length > 0, "Last name cannot be empty");
    require(bytes(_degree).length > 0, "Degree cannot be empty");
    require(bytes(_major).length > 0, "Major cannot be empty");

    Education memory education = Education(_degree, _major, _year);
    Student memory student = Student(_firstName, _lastName, education,false,0);
    studentCount++;
    students[studentCount] = student;
    emit StudentCreated(studentCount, _firstName, _lastName, _degree, _major, _year);
}

function readStudent(uint256 _studentId) public view returns (string memory, string memory, string memory, string memory, uint256) {
    Student memory student = students[_studentId];
    return (student.firstName, student.lastName, student.education.degree, student.education.major, student.education.year);
}

function updateStudent(uint256 _studentId, string memory _firstName, string memory _lastName, string memory _degree, string memory _major, uint256 _year) public {
    require(bytes(_firstName).length > 0, "First name cannot be empty");
    require(bytes(_lastName).length > 0, "Last name cannot be empty");
    require(bytes(_degree).length > 0, "Degree cannot be empty");
    require(bytes(_major).length > 0, "Major cannot be empty");

    Education memory education = Education(_degree, _major, _year);
    Student storage student = students[_studentId];
    student.firstName = _firstName;
    student.lastName = _lastName;
    student.education = education;
    emit StudentUpdated(_studentId, _firstName, _lastName, _degree, _major, _year);
}

function deleteStudent(uint256 _studentId) public {
    delete students[_studentId];
    emit StudentDeleted(_studentId);
}

function confirmCreateStudent(uint256 _studentId) public {
    Student storage student = students[_studentId];
    require(isOwner[msg.sender], "Not an owner");
    require(!student.isExecuted, "Task already executed");
 //   require(!student.isConfirmed[msg.sender], "Already confirmed");

   // student.isConfirmed[msg.sender] = true;
    student.confirmationCount++;
    emit Confirmation(_studentId, msg.sender);

    if (student.confirmationCount == numConfirmationsRequired) {
        student.isExecuted = true;
        emit Execution(_studentId);
    }
}

function issueCertificate(uint256 _studentId) public view returns (bytes memory) {
    Student memory student = students[_studentId];
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
