import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

const ExpenseComp = ({ title, desc, income, expense, date, onClick }) => {

    let balance = income - expense
    return (
        <ListGroup.Item className="border d-flex flex-column">
            <div className="d-flex flex-row justify-content-between"><h6>{title}</h6><p>{date}</p></div>
            <div className="d-flex flex-row justify-content-between"><p>{desc}</p><div style={balance<0 ? {color: 'red'} :{color:'green'}}>{balance}</div></div>
            <Button onClick={onClick}>Delete</Button>
        </ListGroup.Item>
    )
}

export default ExpenseComp