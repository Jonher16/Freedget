import { Button, Card, ListGroup } from 'react-bootstrap'
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { AiOutlineEdit } from "react-icons/ai"
import { useState } from 'react'
import Plot from 'react-plotly.js';
import CategoryComp from '../components/CategoryComp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Categorization = () => {

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [tempIncome, setTempIncome] = useState()
    const [income, setIncome] = useState()
    const [data, setData] = useState(
        {
            values: [100],
            labels: ["No Category"],
            type: "pie",
        }
    )

    const addToCatList = (e) => {
        e.preventDefault()
        var temp_cat = category
        setCategories([...categories, temp_cat])
        var tempdata = data
        setData(prevData => ({
            ...prevData,
            labels: [...prevData.labels, temp_cat],
            values: [...prevData.values, 0]
        }))
        setCategory("")
    }

    const addValue = (e, cat, value) => {
        e.preventDefault()
        var tempvalue = parseInt(value)
        var tempdata = data
        var temp_income = income
        var index = tempdata.labels.indexOf(cat)
        tempdata.values[index] = tempvalue
        tempdata.values.shift()
        var tempsum = tempdata.values.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        console.log(tempsum)
        tempdata.values.unshift(temp_income - tempsum)
        if (temp_income - tempsum >= 0) {
            toast(`${cat} value set to ${value}€ !`)
            setData(prevData => ({
                ...prevData,
                values: [...tempdata.values],
            }))
        } else if (temp_income - tempsum < 0) {
            toast("Sum of categories is greater than income :(")
        } else {
            toast("Error: Sum is not int")
        }
    }

    const addIncome = (e) => {
        e.preventDefault()
        setIncome(tempIncome)
        toast(`Income set to ${tempIncome}€ !`)
        var tempdata = data
        console.log("Tempdatavaluesbeforeshift", tempdata.values)
        tempdata.values.shift()
        var tempsum = tempdata.values.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        console.log("TempSum", tempsum)
        tempdata.values.unshift(tempIncome - tempsum)
        console.log("TempdataValues =>", tempdata.values)
        setData(prevData => ({
            ...prevData,
            labels: [...prevData.labels],
            values: [...tempdata.values]
        }))
    }

    useEffect(() => {
        console.log("Data =>", data)
    }, [data])


    return (

        <div className="m-3 d-flex flex-row">
            <ToastContainer></ToastContainer>
            <div className="w-50">
                <h2>Categorization</h2>
                <Form className="w-50 mt-3" onSubmit={e => addIncome(e)}>
                    <div className="w-100">
                        <Form.Label>Set income</Form.Label>
                        <Form.Control type="number" className="w-50" onChange={e => setTempIncome(e.target.value)} placeholder="Set income €" />
                    </div>
                </Form>
                {income &&
                    <>
                        <Form className="w-50 mt-3" onSubmit={e => addToCatList(e)}>
                            <div className="w-100">
                                <Form.Label>Add new category</Form.Label>
                                <Form.Control value={category} type="text" className="w-50" onChange={e => setCategory(e.target.value)} placeholder="Category name" />
                            </div>
                        </Form>
                        <Card className="border mt-3 w-100">
                            <Card.Header>Category list</Card.Header>
                            <ListGroup variant="flush">
                                {categories.map((cat, i) =>
                                    <CategoryComp key={i} id={i} cat={cat} onSubmit={addValue} />
                                )
                                }
                            </ListGroup>
                        </Card>
                    </>
                }
            </div>
            <Plot
                data={[data]}
                layout={{
                    width: 500,
                    height: 500,
                    title: 'Category Division',
                    paper_bgcolor: "#1E3D58",
                    font: {
                        color: "#43B0F1",
                    },
                }} />
        </div>
    )
}

export default Categorization