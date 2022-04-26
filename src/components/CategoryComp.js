import React, { useState } from 'react'
import { Form, ListGroup } from 'react-bootstrap'



const CategoryComp = ({id, cat, onSubmit, onChange}) => {

    const [value, setValue] = useState()

    const manageValue = (e) => {
        e.preventDefault()
        onSubmit(e,cat,value)
        setValue("")
    }

    return (
        <ListGroup.Item className="border d-flex flex-row align-items-bottom" key={id}>
            <p>{cat}</p>
            <Form className="ml-2 mr-2 align-top" onSubmit={e=>manageValue(e)}>
                <Form.Control type="text" value={value} style={{ width: '4rem', height: '1.5rem' }} onChange={e=>setValue(e.target.value)} placeholder="€" />
            </Form>
            <p>€</p>
        </ListGroup.Item>
    )
}

export default CategoryComp