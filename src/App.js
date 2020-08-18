import React from 'react';
import { Form, Media, Button, Alert, Row, Col } from 'react-bootstrap';
import { roll } from './Games/dice.js';
import { getRoll } from './Games/hashdice.js';
import { handlePlinko } from './Games/plinko.js';
import { handleLimbo } from './Games/limbo.js';
import { handleHilo } from './Games/hilo.js';
import { handleVideoPoker } from './Games/videopoker.js';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ServerSeed: '',
      ClientSeed: '',
      Nonce: 0,
      result: 0,
      showResult: false,
      classicDice: true,
      hashDice: false,
      validated: false,
      plinko: false,
      limbo: false,
      hilo: false,
      videoPoker: false,
      round: 0
    }
  }

  handleSubmit = (event) => {

    const { ServerSeed, ClientSeed, Nonce, classicDice, hashDice, plinko, limbo, hilo, videoPoker, round } = this.state;

    const form = event.currentTarget;
    if (form.checkValidity() === false || ServerSeed === '' || ClientSeed === '') {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ validated: true })
    }
    else
      this.setState({
        result: classicDice ? roll(`${ServerSeed}:${ClientSeed}:${Nonce}`)
          : hashDice ? getRoll(`${ServerSeed}${ClientSeed}${Nonce}`)
            : plinko ? handlePlinko(ServerSeed, ClientSeed, Nonce)
              : limbo ? handleLimbo(`${ServerSeed}:${ClientSeed}:${Nonce}`)
                : hilo ? handleHilo(ServerSeed, ClientSeed, Nonce, round)
                  : videoPoker ? handleVideoPoker(`${ServerSeed}${ClientSeed}${Nonce}`)
                    : 0,
        showResult: true,
        validated: true
      })
  }

  render() {
    const { ServerSeed, ClientSeed, Nonce, result, showResult, classicDice, hashDice, plinko, limbo, hilo, videoPoker, validated } = this.state;
    return (
      <div className="container pt-5">
        <Row>
          <Col>
            <Media>
              <img
                width={128}
                height={128}
                className="mr-3"
                src="logo192.png"
                alt="Bc.Game"
              />
              <Media.Body>
                <br /><br />
                <h5>Provably Fair Verify Tool (BC.GAME)</h5>
              </Media.Body>
            </Media>
            <Row className="mt-3 ml-3">
              <Button variant={classicDice ? 'primary' : 'light'} onClick={() => {
                this.setState({
                  classicDice: true, hashDice: false, plinko: false, limbo: false, hilo: false, videoPoker: false,
                  showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                })
              }} >
                Classic Dice
            </Button>
              <Button variant={hashDice ? 'primary' : 'light'} className="ml-2" onClick={() => {
                this.setState({
                  hashDice: true, classicDice: false, plinko: false, limbo: false, hilo: false, videoPoker: false,
                  showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                })
              }} >
                Hash Dice
            </Button>
              <Button variant={plinko ? 'primary' : 'light'} className="ml-2" onClick={() => {
                this.setState({
                  hashDice: false, classicDice: false, plinko: true, limbo: false, hilo: false, videoPoker: false,
                  showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                })
              }} >
                Plinko
            </Button>
              <Button variant={limbo ? 'primary' : 'light'} className="ml-2" onClick={() => {
                this.setState({
                  hashDice: false, classicDice: false, plinko: false, limbo: true, hilo: false, videoPoker: false,
                  showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                })
              }} >
                Limbo
            </Button>
              <Button variant={hilo ? 'primary' : 'light'} className="ml-2" onClick={() => {
                this.setState({
                  hashDice: false, classicDice: false, plinko: false, limbo: false, hilo: true, videoPoker: false,
                  result: 0, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                })
              }} >
                Hilo
            </Button>
              <Button variant={videoPoker ? 'primary' : 'light'} className="mt-2" onClick={() => {
                this.setState({
                  hashDice: false, classicDice: false, plinko: false, limbo: false, hilo: false, videoPoker: true,
                  result: 0, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                })
              }} >
                Video Poker
            </Button>
            </Row>
            <Form className="mt-5" noValidate validated={validated} >
              <Form.Group controlId="formBasicServerSeed">
                <Form.Label>Server Seed</Form.Label>
                <Form.Control type="text" required placeholder="Enter Server Seed" value={ServerSeed} onChange={(e) => {
                  this.setState({ ServerSeed: e.target.value })
                }} />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Server Seed.
          </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicClientSeed">
                <Form.Label>Client Seed</Form.Label>
                <Form.Control type="text" required placeholder="Enter Client Seed" value={ClientSeed} onChange={(e) => {
                  this.setState({ ClientSeed: e.target.value })
                }} />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Client Seed.
          </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicNonce">
                <Form.Label>Nonce</Form.Label>
                <Form.Control type="number" required placeholder="Nonce" value={Nonce} onChange={(e) => {
                  this.setState({ Nonce: e.target.value })
                }} />
              </Form.Group>
              <Button variant="primary" type="button" onClick={this.handleSubmit}>
                Submit
        </Button>
              {showResult && validated && !hilo && !videoPoker && <Alert className="mt-3" variant="success">
                The result is : {result} !
        </Alert>
              }
            </Form>
          </Col>
          <Col><div style={{ margin: '8%' }}>

          </div>
            {result && (hilo || videoPoker) ? <h5>Player Cards</h5> : ''}
            {result && (hilo || videoPoker) ? result.map((card, i) => {
              return <img width="15%" key={i} src={require('./cards-png/' + card + '.png')} alt={result} />;
            })
              : ''}
          </Col>
        </Row>
      </div >
    );
  }
}

export default App;
