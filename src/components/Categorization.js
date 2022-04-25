import { Button, Card, ListGroup } from 'react-bootstrap'
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { AiOutlineEdit } from "react-icons/ai"
import { useState } from 'react'
import Plot from 'react-plotly.js';
import CategoryComp from './CategoryComp'
const Categorization = () => {

    const [categories, setCategories] = useState([])
    const [showInput, setShowInput] = useState(false)
    const [category, setCategory] = useState("")
    const [value, setValue] = useState()
    const [data, setData] = useState(
        {
            values: [],
            labels: [],
            type: "pie",
        }
    )
    const [sum, setSum] = useState(0)

    useEffect(() => {
    var tempdata = data
    var tempsum = tempdata.values.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    setSum(tempsum)
    console.log(tempsum)
    }, [data])
    

    const toggleShowInput = () => {
        setShowInput(true)
    }

    const addToCatList = (e) => {
        e.preventDefault()
        var temp_cat = category
        setCategories([...categories, temp_cat])
        setShowInput(false)
        setCategory("")
        setData(prevData=>({
            ...prevData,
            labels: [...prevData.labels, temp_cat],
            values: [...prevData.values, 25]
        }))
    }

    const addValue = (e, cat) => {
        e.preventDefault()
        var tempvalue = value
        var tempdata = data
        var index = tempdata.labels.indexOf(cat)
        setData(prevData=>({
            ...prevData,
            values: [...prevData.values, prevData.values[index] = tempvalue]
        }))
    }

    return (

        <div className="m-3 d-flex flex-row">
            <div className="w-50">
                <h2>Categorization</h2>
                <Form className="w-50 mt-3" onSubmit={e => addToCatList(e)}>
                    <div className="bprder d-flex flex-row w-100">
                        <Button className="mr-3" onClick={toggleShowInput}>Add Category</Button>
                        {showInput ?
                            (<Form.Control type="text" className="w-50" onChange={e => setCategory(e.target.value)} placeholder="Category name" />) : ""
                        }
                    </div>
                </Form>
                <Card className="mt-3" style={{ width: '18rem' }}>
                    <Card.Header>Category list</Card.Header>
                    <ListGroup variant="flush">
                        {categories.map((cat, i) =>
                            <CategoryComp key={i} id={i} cat={cat} onSubmit={e => addValue(e, cat)} onChange={e => setValue(e.target.value)} />
                        )
                        }
                    </ListGroup>
                </Card>
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