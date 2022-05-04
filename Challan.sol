//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

contract Ticket{

    address owner;
    uint256 challanAmount = 0.01 ether;
    mapping (address => uint256) public ticketHolders;

    constructor(){
            owner = msg.sender;
    }



    function issueTicketsPolice(address _user, uint256 _amount) public {
        issueTickets(_user, _amount);
    }

    function payTicketFine(address _user, uint256 _amount) payable public {
        require(msg.value >= challanAmount*_amount);
        payTicket(_user, _amount);
    }


    function issueTickets(address _user, uint256 _amount) internal{
        ticketHolders[_user] = ticketHolders[_user] + _amount;
    }

    function payTicket(address _user, uint256 _amount) internal{

        require(ticketHolders[_user] == _amount, "Please pay required amount");
        ticketHolders[_user] = ticketHolders[_user] - _amount;
    }

    function withdraw() public{
        require(msg.sender == owner, "You are not the owner.");
        (bool success, ) = payable(owner).call{value: address(this).balance}("");
        require(success);
    
    }
}