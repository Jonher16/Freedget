import React, { useEffect, useState } from 'react'
import { Card, Form, ListGroup, Button } from 'react-bootstrap'
import ExpenseComp from '../components/ExpenseComp'
import Plot from 'react-plotly.js';
import months from "../mockdata/expenses"

const ExpenseList = () => {

    const [selection, setSelection] = useState()
    const [data, setData] = useState()
    const [balance, setBalance] = useState()
    const [expenses, setExpenses] = useState()
    const [categories, setCategories] = useState()
    const [newEntry, setNewEntry] = useState({
        title: "",
        desc: "",
        date: "",
        cat: "",
        income: "",
        expense: "",
    })

    const manageSelection = (e) => {
        e.preventDefault()
        setSelection(e.target.value)
        let index = null
        for (let i = 0; i < months.length; i++) {
            if (months[i].id === e.target.value) {
                index = i;
            }
        }
        setData(months[index])
        var total_balance = 0
        var expenseList = []
        var catList = []
        for (let j = 0; j < months[index].list.length; j++) {
            var item_balance = months[index].list[j].income - months[index].list[j].expense
            if (item_balance < 0) {
                expenseList.push(-item_balance)
                catList.push(months[index].list[j].cat)
            }
            total_balance += item_balance
        }
        setCategories(catList)
        setExpenses(expenseList)
        setBalance(total_balance)
        console.log("Balance = ", total_balance)
        console.log("Cat list", catList)
        console.log(expenseList)
    }

   const submitEntry = (e) => {
        e.preventDefault()
        var temp_selection = selection
        var temp_newEntry = newEntry
        var temp_balance = temp_newEntry.income - temp_newEntry.expense
        setData(prevData=> ({
            ...prevData,
            list: [...prevData.list, temp_newEntry],
        }))
        if (temp_balance < 0){
        setExpenses(prev=>([...prev, -temp_balance]))
        setCategories(prev=>([...prev, temp_newEntry.cat]))}
        setBalance(prev=>(prev+temp_balance))
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {console.log("Expenses ", expenses)},[expenses])

    return (
        <div className="m-3 d-flex flex-row">

            <div className="w-50">
                <h2>ExpenseList</h2>
                <Form>
                    <Form.Select onChange={e => manageSelection(e)} aria-label="Default select example">
                        <option value="nono">Select month</option>
                        {months.map(item => <option value={`${item.month}${item.year}`}>{item.month} {item.year}</option>)}
                    </Form.Select>
                    {selection &&
                        <>
                            <Form className="w-100 mt-3" >
                                    <Form.Label>Add new expense</Form.Label>
                                    <div className="d-flex flex-row justify-content-between">
                                        <Form.Control value={newEntry.title} type="text" className="w-50" placeholder="Title" onChange={e=>setNewEntry({...newEntry, title: e.target.value})} />
                                        <Form.Control value={newEntry.desc} type="text" className="w-50" placeholder="Description" onChange={e=>setNewEntry({...newEntry, desc: e.target.value})} />
                                    </div>
                                    <div className="d-flex flex-row justify-content-between">
                                        <Form.Control value={newEntry.date} type="date" className="w-50" placeholder="Date" onChange={e=>setNewEntry({...newEntry, date: e.target.value})} />
                                        <Form.Control value={newEntry.cat} type="text" className="w-50" placeholder="Category" onChange={e=>setNewEntry({...newEntry, cat: e.target.value})} />
                                    </div>
                                    <div className="d-flex flex-row justify-content-between">
                                        <Form.Control value={newEntry.income} type="text" className="w-50" placeholder="Income" onChange={e=>setNewEntry({...newEntry, income: e.target.value})}/>
                                        <Form.Control value={newEntry.expense} type="text" className="w-50" placeholder="Expense" onChange={e=>setNewEntry({...newEntry, expense: e.target.value})} />
                                    </div>
                                    <Button onClick={e=>submitEntry(e)}>Add entry</Button>
                            </Form>
                            <Card className="w-100 mt-3">
                                <Card.Header className="d-flex flex-row justify-content-between"><p>Expense List</p><div className="d-flex flex-row"><p className="mr-2">Total Balance: </p><p style={balance < 0 ? { color: 'red' } : { color: 'green' }}>{balance}</p></div></Card.Header>
                                <ListGroup variant="flush">
                                    {data.list.map(item => <ExpenseComp title={item.title} desc={item.desc} date={item.date} income={item.income} expense={item.expense} />)}
                                </ListGroup>
                            </Card>
                        </>
                    }
                </Form>

            </div>
            <Plot
                data={[{
                    values: expenses,
                    labels: categories,
                    type: "pie"
                }]}
                layout={{
                    width: 500,
                    height: 500,
                    title: 'Expense Division',
                    paper_bgcolor: "#1E3D58",
                    font: {
                        color: "#43B0F1",
                    },
                }} />
        </div>
    )
}

export default ExpenseList