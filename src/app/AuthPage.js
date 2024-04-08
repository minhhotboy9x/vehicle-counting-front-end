import Auth from '../components/Auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AuthPage = ({ setUserSession }) => {

  return (
    <div className='sign-in'>
      <Container className='sign-in-container'>
      <Row>
        <Col className='sign-in-title'>
          <b> WELCOME TO VEHICLE COUNTING PROJECT</b>
        </Col>
      </Row>
      <Row className='sign-in-title'>
        <Col className='sign-in-title'>
          <p> By continue, you will review my graduating project of 20214 semester</p>
        </Col>
      </Row>
      <Row>
        <Col><Auth setUserSession={setUserSession} /></Col>
      </Row>
      <Row className='sign-in-title'>
        <Col className='sign-in-title'>
          <p> © 2024 Minh Nguyen Quoc Nhat</p>
        </Col>
      </Row>
    </Container>
    </div>
    
  )
};

export default AuthPage;
