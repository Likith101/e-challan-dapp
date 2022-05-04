//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

contract Ticket{

    address owner;
    uint256 challanAmount = 0.01 ether;
    mapping (address => ticket) public ticketHolder;

    constructor(){
            owner = msg.sender;
    }

    struct ticket {
  
        // Declaring different data types
        // uint index;
        uint8 _id;
        string _offence;
        uint256 _amount;
    }

      // function add(address owner, uint arg1, uint arg2, uint arg3) external {
    //     ticketHolder[_user].push(Item(_id, _offence, _amount));
    // }

    function issueTicketsPolice(address _user, uint8 _id, string memory _offence, uint256 _amount) public {
        issueTickets(_user, _id, _offence, _amount);
    }

    function payTicketFine(address _user, uint256 _amount) payable public {
        require(msg.value >= challanAmount*_amount);
        payTicket(_user, _amount);
    }


    function issueTickets(address _user, uint8 _id, string memory _offence, uint256 _amount) internal{
        ticketHolder[_user]._id = _id;
        ticketHolder[_user]._offence = _offence;
        ticketHolder[_user]._amount = _amount;
        // ticket memory n;
        // n._id = _id;
        // n._offence = _offence;
        // n._amount = _amount;
        // ticketHolder[_user][index] = n;
    }

    function payTicket(address _user, uint256 _amount) internal{

        // require(ticketHolder[_user][] == _id, "Please choose correct ticket");
        require(ticketHolder[_user]._amount == _amount, "Please pay required amount");
        ticketHolder[_user]._amount = ticketHolder[_user]._amount - _amount;
    }

    function withdraw() public{
        require(msg.sender == owner, "You are not the owner.");
        (bool success, ) = payable(owner).call{value: address(this).balance}("");
        require(success);
    }

    // Function to return address of owner
    function getOwner() public view returns (address) {    
        return owner;
    }
  
    // Function to return current balance of Owner
    function getBalance() public view returns(uint256){
        return owner.balance;
    }

//     function getOffences() public view returns (ticket[]){
//       ticket[] id = new ticket[];
//       for (uint i = 0; i < memberCount; i++) {
//           Member storage member = members[i];
//           id[i] = member;
//       }
//       return id;
//   }
}





