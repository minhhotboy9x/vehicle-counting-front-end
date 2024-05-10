import React from "react";
import { getRoiProperty } from "../api/DragRoiApi";
import { Form, Row, Col, Button } from "react-bootstrap";

const DragRoiProps = ({ props, setProperty }) => {
    const keys = ["type", "camId", "points"];

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
        // console.log(roi);
        setProperty(roi);
    };

    const parsePoint = (point) => {
        return `x: ${point.x}   y: ${point.y}`;
    }

    return (
        <Form style={{ marginTop: "20px", marginLeft: "100px" }}>
            {Object.entries(props).map(
                ([key, value]) =>
                    keys.includes(key) && (
                        <React.Fragment key={key}>
                            <Form.Label>{key}:</Form.Label>
                            {Array.isArray(value) ? (
                                value.map((item, index) => (
                                    <>
                                    <Form.Control
                                        key={index}
                                        type="text"
                                        value={
                                            typeof item === "object" ? parsePoint(item) : item
                                        }
                                        readOnly
                                    />
                                    <br />
                                    </>
                                ))
                            ) : (
                                <Form.Control
                                    type="text"
                                    value={
                                        typeof value === "object" ? JSON.stringify(value) : value
                                    }
                                    readOnly
                                />
                            )}
                        </React.Fragment>
                    )
            )}
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
