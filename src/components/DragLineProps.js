import React from 'react';
import { getBoundaryProperty } from "../api/DragLineApi";
import { Form, Row, Col, Button } from 'react-bootstrap';

const DragLineProps = ({ props, setProperty }) => {
    const keys = ["type", "camId", "in", "out"];

    const handleClose = (event) => {
        setProperty(null);
    }

    const handleRefresh = async (event) => {
        const res = await getBoundaryProperty({
            "id": props.id,
            "camId": props.camId
        })
        let boundary = res['boundaries'][0];
        boundary = { ...{ type: "boundary" }, ...boundary }
        // console.log(boundary);
        setProperty(boundary);
    }

    const parsePoint = (key, value) => {
        if (key === 'pointL' || key === "pointR") {
            return `x: ${value.x}   y: ${value.y}`;
        }
        else {
            return JSON.stringify(value);
        }
    }

    return (
        <Form style={{ marginTop: '20px', marginLeft: '100px' }}>
            {Object.entries(props).map(([key, value]) => (
                keys.includes(key) &&
                <Form.Group as={Row} className="mb-2" key={key}>
                    <Form.Label column sm={3} >{key}:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={typeof value === 'object' ? parsePoint(key, value) : value}
                            readOnly
                        />
                    </Col>
                </Form.Group>
            ))}
            <Button variant="secondary" className="m-2" onClick={handleRefresh}>
                Refesh
            </Button>
            <Button variant="danger" onClick={handleClose}>
                Close
            </Button>
        </Form>
    );
};

export default DragLineProps;
