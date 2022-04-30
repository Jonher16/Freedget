import React, { useEffect, useState } from 'react'
import { Card, Form, ListGroup, Button } from 'react-bootstrap'
import ExpenseComp from '../components/ExpenseComp'
import Plot from 'react-plotly.js';
import axios from 'axios';

const ExpenseList = () => {

    const [selection, setSelection] = useState()
    const [data, setData] = useState()
    const [months, setMonths] = useState([])
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

    const postEntry = async (e) => {
        var temp_newEntry = newEntry
        const URL = "http://localhost:4000/newentry"
        const res = await axios.post(URL, temp_newEntry)
        getMonths()
        var monthArray = temp_newEntry.date.split("-")
        var month = monthArray[0] + "-" + monthArray[1]
        getEntries(month)
    }

    useEffect(() => {
        getMonths()
    }, [])

    const getMonths = async (e) => {
        const monthsURL = "http://localhost:4000/months"
        const res = await axios.get(monthsURL)
        setMonths(res.data)
    }

    const getEntries = async (month) => {
        setSelection(month)
        const dataURL = `http://localhost:4000/getdata/${month}`
        const res = await axios.get(dataURL)
        setData(res.data)

        //Calculting balance and creating graph arrays

        var total_balance = 0
        var expenseList = []
        var catList = []
        for (let j = 0; j < res.data.length; j++) {
            var item_balance = parseFloat(res.data[j].income) - parseFloat(res.data[j].expense)
            if (item_balance < 0) {
                expenseList.push(-item_balance)
                catList.push(res.data[j].cat)
            }
            total_balance += item_balance
        }
        total_balance = total_balance < 0 ? Math.floor(Math.abs(total_balance) * 100) * -1 / 100 : total_balance.toFixed(2)
        setCategories(catList)
        setExpenses(expenseList)
        setBalance(total_balance)
    }

    const deleteEntry = async (e, id) => {
        e.preventDefault()
        const deleteURL = `http://localhost:4000/deleteentry/${id}`
        const res = await axios.delete(deleteURL)
        getMonths()
        var temp_selection = selection
        getEntries(temp_selection)
    }

    return (
        <div className="m-3 d-flex flex-row">

            <div className="w-50">
                <h2>ExpenseList</h2>
                <Form>
                    <Form.Select onChange={e => getEntries(e.target.value)} aria-label="Default select example">
                        <option value="nono">Select month</option>
                        {months && months.map(item => <option value={item}>{item}</option>)}
                    </Form.Select>
                </Form>
                <Form className="w-100 mt-3" >
                    <Form.Label>Add new expense</Form.Label>
                    <div className="d-flex flex-row justify-content-between">
                        <Form.Control value={newEntry.title} type="text" className="w-50" placeholder="Title" onChange={e => setNewEntry({ ...newEntry, title: e.target.value })} />
                        <Form.Control value={newEntry.desc} type="text" className="w-50" placeholder="Description" onChange={e => setNewEntry({ ...newEntry, desc: e.target.value })} />
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <Form.Control value={newEntry.date} type="date" className="w-50" placeholder="Date" onChange={e => setNewEntry({ ...newEntry, date: e.target.value })} />
                        <Form.Control value={newEntry.cat} type="text" className="w-50" placeholder="Category" onChange={e => setNewEntry({ ...newEntry, cat: e.target.value })} />
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <Form.Control value={newEntry.income} type="text" className="w-50" placeholder="Income" onChange={e => setNewEntry({ ...newEntry, income: e.target.value })} />
                        <Form.Control value={newEntry.expense} type="text" className="w-50" placeholder="Expense" onChange={e => setNewEntry({ ...newEntry, expense: e.target.value })} />
                    </div>
                    <Button onClick={e => postEntry(e)}>Add entry</Button>
                </Form>
                {selection &&
                    <>
                        <Card className="w-100 mt-3">
                            <Card.Header className="d-flex flex-row justify-content-between"><p>Expense List</p><div className="d-flex flex-row"><p className="mr-2">Total Balance: </p><p style={balance < 0 ? { color: 'red' } : { color: 'green' }}>{balance}</p></div></Card.Header>
                            <ListGroup variant="flush">
                                {data && data.map(item => <ExpenseComp title={item.title} desc={item.desc} date={item.date} income={item.income} expense={item.expense} onClick={e=>deleteEntry(e, item._id)}/>)}
                            </ListGroup>
                        </Card>
                    </>
                }


            </div>
            <div className="d-flex flex-column align-items-center">
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
                {/* <h1>Total expenses: {expenses.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)}</h1> */}
                <Button value={"2022-04"} onClick={e => getEntries(e)}>Get shit</Button>
            </div>
        </div>
    )
}

export default ExpenseList