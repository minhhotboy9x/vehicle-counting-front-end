import React, { useState } from "react";
import { getRoiProperty, updateInsertRoi } from "../api/DragRoiApi";
import { Form, Row, Col, Button } from "react-bootstrap";

const DragRoiProps = ({ props, setProperty }) => {
    const keys = ["type", "camId", "mapping points"];
    const [formModified, setFormModified] = useState(false);

    const handleClose = (event) => {
        setProperty(null);
    };

    const handleRefresh = async (event) => {
        const res = await getRoiProperty({
            id: props.id,
            camId: props.camId,
        });
        let roi = res["rois"][0];
        roi = { ...{ type: "roi" }, ...roi };
        setProperty(roi);
    };

    const handleChange = (index, field, newValue) => {
        // Create a copy of the formData array
        const updatedFormData = { ...props };
        // Update the specific field in the copied array
        updatedFormData["mapping points"][index][field] = parseInt(newValue);
        // Update the state with the new formData
        setProperty(updatedFormData);
        setFormModified(true);
    };

    const handleSaveChanges = async () => {
        // Implement your logic to save changes here
        const res = await updateInsertRoi(props);
        console.log("Changes saved!", res.message);
        setFormModified(false);
    };

    return (
        <Form style={{ marginTop: "20px", marginLeft: "100px" }}>
            {Object.entries(props).map(
                ([key, value]) =>
                    keys.includes(key) && (
                        <React.Fragment key={key}>
                            <Form.Label>{key}: {key === 'mapping points' ? '(meter)' : null}</Form.Label>
                            {Array.isArray(value) ? (
                                value.map((item, index) => (
                                    <Row key={index}>
                                        <Form.Group as={Row} >
                                            <Form.Label column sm={1}>
                                                x:
                                            </Form.Label>
                                            <Col sm={3}>
                                                <Form.Control
                                                    key={index}
                                                    type="number"
                                                    value={item.x}
                                                    onChange={e => handleChange(index, 'x', e.target.value)}
                                                />
                                            </Col>
                                            <Form.Label column sm={1}>
                                                y:
                                            </Form.Label>
                                            <Col sm={3}>
                                                <Form.Control
                                                    key={index}
                                                    type="number"
                                                    value={item.y}
                                                    onChange={e => handleChange(index, 'y', e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>
                                )))
                                : (
                                    <Col sm={2}>
                                        <Form.Control
                                            type="text"
                                            value={
                                                typeof value === "object" ? JSON.stringify(value) : value
                                            }
                                            readOnly
                                        />
                                    </Col>
                                )}

                            <br key={Date.now()} />
                        </React.Fragment>
                    )
            )}
            <Button
                variant="success"
                className="m-2"
                onClick={handleSaveChanges}
                disabled={!formModified}               
            >
                Save Changes
            </Button>
            <Button variant="secondary" className="m-2" onClick={handleRefresh}>
                Refesh
            </Button>
            <Button variant="danger" onClick={handleClose}>
                Close
            </Button>
        </Form>
    );
};

export default DragRoiProps;
