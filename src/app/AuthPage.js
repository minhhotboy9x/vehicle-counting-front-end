import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import bcrypt from 'bcryptjs'; 

const AuthPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const historyRef = useRef(null); // Khởi tạo history với useRef
  const BACKEND = process.env.REACT_APP_BACKEND;
  
  useEffect(() => {
    historyRef.current = history; // Gán giá trị cho historyRef sau khi component được render
  }, [history]);


  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Hiển thị màn hình chờ

    try {
      const response = await fetch(`${BACKEND}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: password }), // Gửi dữ liệu đăng nhập
      });

      const data = await response.json();
      if (response.ok) {
        // Xử lý logic khi đăng nhập thành công
        console.log(data.message); // Thông báo từ backend
        onLogin();
        historyRef.current.push('/homepage');
      } else {
        // Xử lý logic khi đăng nhập không thành công
        setAlertMessage(data.message);
        setShowAlert(true);
      }} 
    catch (error) {
        console.error('Error:', error);
        setAlertMessage('Đã xảy ra lỗi khi đăng nhập');
        setShowAlert(true);
        } 
    finally {
        setIsLoading(false); // Ẩn màn hình chờ
        }
    };



  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlertMessage("Mật khẩu xác nhận không khớp!");
      setShowAlert(true);
      return;
    }
    setIsLoading(true); // Hiển thị màn hình chờ
    try {
      const response = await fetch(`${BACKEND}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: password }), // Gửi dữ liệu đăng ký
      });

      const data = await response.json();
      if (response.ok) {
        // Xử lý logic khi đăng ký thành công
        console.log(data.message); // Thông báo từ backend
        setIsLogin(!isLogin);
      } else {
        // Không thành công
        setAlertMessage(data.message);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('Đã xảy ra lỗi khi đăng ký', error);
      setShowAlert(true);
    } finally {
      setIsLoading(false); // Ẩn màn hình chờ
    }
  };

  return (
    <div className="login-out">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
            <Form onSubmit={isLogin ? handleLogin : handleRegister}>

              {showAlert && <Alert variant="danger">{alertMessage}</Alert>}

              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Form.Label className=''>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {!isLogin && (
                <Form.Group className="mt-2" controlId="formBasicConfirmPassword">
                  <Form.Label>Xác nhận mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
              )}
              <Button className="mt-3 btn-danger" variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
              </Button>
            </Form>
            <p className="mt-5">
              {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
              <Button className="text-danger" variant="link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
              </Button>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthPage;
