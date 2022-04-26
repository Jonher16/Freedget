import React from 'react'
import { ListGroup } from 'react-bootstrap'

const ExpenseComp = ({ title, desc, income, expense, date }) => {

    let balance = income - expense
    return (
        <ListGroup.Item className="border d-flex flex-column">
            <div className="d-flex flex-row justify-content-between"><h6>{title}</h6><p>{date}</p></div>
            <div className="d-flex flex-row justify-content-between"><p>{desc}</p><div style={balance<0 ? {color: 'red'} :{color:'green'}}>{balance}</div></div>
            
        </ListGroup.Item>
    )
}

export default ExpenseComp