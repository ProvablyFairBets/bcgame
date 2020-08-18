import React from 'react';
import { Form, Media, Button, Alert, Row, Col } from 'react-bootstrap';
import { roll } from './Games/dice.js';
import { getRoll } from './Games/hashdice.js';
import { handlePlinko } from './Games/plinko.js';
import { handleLimbo } from './Games/limbo.js';
import { handleHilo } from './Games/hilo.js';
import { handleVideoPoker } from './Games/videopoker.js';
import { handleBlackjack } from './Games/blackjack.js';
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
      blackjack: false,
      round: 0
    }
  }

  handleSubmit = (event) => {

    const { ServerSeed, ClientSeed, Nonce, classicDice, hashDice, plinko, limbo, hilo, videoPoker, blackjack, round } = this.state;

    const form = event.currentTarget;
    if (form.checkValidity() === false || ServerSeed === '' || (!blackjack && ClientSeed === '')) {
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
                    : blackjack ? handleBlackjack(ServerSeed)
                      : 0,
        showResult: true,
        validated: true
      })
  }

  render() {
    const { ServerSeed, ClientSeed, Nonce, result, showResult, classicDice, hashDice, plinko, limbo, hilo, videoPoker, blackjack, validated } = this.state;
    return (
      <div className="container pt-5">
        <div>
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
                    classicDice: true, hashDice: false, plinko: false, limbo: false, hilo: false, videoPoker: false, blackjack: false,
                    showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Classic Dice
            </Button>
                <Button variant={hashDice ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: true, classicDice: false, plinko: false, limbo: false, hilo: false, videoPoker: false, blackjack: false,
                    showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Hash Dice
            </Button>
                <Button variant={plinko ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: true, limbo: false, hilo: false, videoPoker: false, blackjack: false,
                    showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Plinko
            </Button>
                <Button variant={limbo ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: false, limbo: true, hilo: false, videoPoker: false, blackjack: false,
                    showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Limbo
            </Button>
                <Button variant={hilo ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: false, limbo: false, hilo: true, videoPoker: false, blackjack: false,
                    result: 0, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Hilo
            </Button>
                <Button variant={videoPoker ? 'primary' : 'light'} className="mt-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: false, limbo: false, hilo: false, videoPoker: true, blackjack: false,
                    result: 0, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Video Poker
            </Button>
                <Button variant={blackjack ? 'primary' : 'light'} className="mt-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: false, limbo: false, hilo: false, videoPoker: false, blackjack: true,
                    result: 0, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Blackjack
            </Button>
              </Row>
              <Form className="mt-5" noValidate validated={validated} >
                <Form.Group controlId="formBasicServerSeed">
                  <Form.Label>{!blackjack ? 'Server Seed' : 'Signature'}</Form.Label>
                  <Form.Control type="text" required placeholder={!blackjack ? 'Enter Server Seed' : 'Enter Signature'} value={ServerSeed} onChange={(e) => {
                    this.setState({ ServerSeed: e.target.value })
                  }} />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid {!blackjack ? 'Server Seed' : 'Signature'}.
          </Form.Control.Feedback>
                </Form.Group>

                {!blackjack && < Form.Group controlId="formBasicClientSeed">
                  <Form.Label>Client Seed</Form.Label>
                  <Form.Control type="text" required placeholder="Enter Client Seed" value={ClientSeed} onChange={(e) => {
                    this.setState({ ClientSeed: e.target.value })
                  }} />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Client Seed.
          </Form.Control.Feedback>
                </Form.Group>}

                {!blackjack && <Form.Group controlId="formBasicNonce">
                  <Form.Label>Nonce</Form.Label>
                  <Form.Control type="number" required placeholder="Nonce" value={Nonce} onChange={(e) => {
                    this.setState({ Nonce: e.target.value })
                  }} />
                </Form.Group>}
                <Button variant="primary" type="button" onClick={this.handleSubmit}>
                  Submit
        </Button>
                {showResult && validated && !hilo && !videoPoker && !blackjack && <Alert className="mt-3" variant="success">
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
          <br></br>
          <br></br>
          <br></br>
          <Row>
            {result && blackjack ? <h5 className="text-center">Player Cards</h5> : ''}
          </Row>
          <br></br>
          <Row>
            {result && blackjack ? result.map((card, i) => {
              return <div className="mt-2">
                <div className="ml-3">{i}</div>
                <img width="25%" key={i} src={require('./cards-png/' + card + '.png')} alt={result} />
              </div>
            })
              : ''}
          </Row>
        </div>
      </div >
    );
  }
}

export default App;
