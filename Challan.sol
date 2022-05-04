//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

contract Ticket{

    address owner;
    uint256 challanAmount = 0.01 ether;
    mapping (address => ticket[]) public ticketHolder;

    constructor(){
            owner = msg.sender;
    }

    struct ticket {
        uint256 _id;
        string _offence;
        uint256 _amount;
    }

    function issueTicketsPolice(address _user, uint256 _id, string memory _offence, uint256 _amount) public {
        issueTickets(_user, _id, _offence, _amount);
    }

    function payTicketFine(address _user, uint256 _id, uint256 _amount) payable public {
        require(msg.value >= challanAmount*_amount);
        payTicket(_user, _id, _amount);
    }


    function issueTickets(address _user, uint256 _id, string memory _offence, uint256 _amount) internal{

        ticket memory tick;
        tick._id = _id;
        tick._offence = _offence;
        tick._amount = _amount;

        ticketHolder[_user].push(tick);

    }

    function getOffences(address _user) public view returns (ticket[] memory) {

        ticket[] memory ticketIDs = new ticket[](ticketHolder[_user].length);

        for(uint ticketNumber = 0; ticketNumber < ticketHolder[_user].length;  ticketNumber++) {
            ticketIDs[ticketNumber] = ticketHolder[_user][ticketNumber];
        }
        
        return ticketIDs;
    }

    function payTicket(address _user, uint256 _id, uint256 _amount) internal{

        ticket[] memory offences = getOffences(_user);
        
        for(uint ticketNumber = 0; ticketNumber < ticketHolder[_user].length;  ticketNumber++) {
            if (offences[ticketNumber]._id == _id){
                require(ticketHolder[_user][ticketNumber]._amount == _amount, "Please pay required amount");
                ticketHolder[_user][ticketNumber]._amount = ticketHolder[_user][ticketNumber]._amount - _amount;
            }
        }

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
  
    // Function to return current balance of owner
    function getBalance() public view returns(uint256){
        return owner.balance;
    }
}





