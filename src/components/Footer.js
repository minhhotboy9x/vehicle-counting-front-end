import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
    return (
        <footer className="bg-light text-dark mt-5"> {/* Thêm lớp mt-5 để tạo khoảng cách dịch chuyển footer xuống */}
            <Container>
                <Row>
                    <Col>
                        <h5 style={{ textDecoration: 'none', margin:'15px', color: '#FF6347', fontWeight: 'bold'}}>Company</h5>
                        <ul >
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </Col>
                    <Col>
                        <h5 style={{ textDecoration: 'none', margin:'15px', color: '#FF6347', fontWeight: 'bold'}}>Products</h5>
                        <ul >
                            <li><a href="#">Product 1</a></li>
                            <li><a href="#">Product 2</a></li>
                            <li><a href="#">Product 3</a></li>
                        </ul>
                    </Col>
                    <Col>
                        <h5 style={{ textDecoration: 'none', margin:'15px', color: '#FF6347', fontWeight: 'bold'}}>Follow Us</h5>
                        <ul >
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Github</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                &copy; {new Date().getFullYear()} Minh Nguyen Quoc Nhat
            </div>
        </footer>
    );
}

export default Footer;
