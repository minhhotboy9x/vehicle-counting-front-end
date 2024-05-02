import React from 'react';
import { Table } from 'react-bootstrap';

const DragLineProps = ({ props }) => {
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Prop</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(props).map(([key, value]) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DragLineProps;
