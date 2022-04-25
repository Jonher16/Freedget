import React from 'react'
import { Form, ListGroup } from 'react-bootstrap'

const CategoryComp = ({id, cat, onSubmit, onChange}) => {
    return (
        <ListGroup.Item key={id}>
            <h6>{cat}</h6>
            <Form onSubmit={onSubmit}>
                <Form.Control type="text" style={{ width: '3rem' }} onChange={onChange} placeholder="%" />
            </Form>
        </ListGroup.Item>
    )
}

export default CategoryComp