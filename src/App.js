import React from 'react';
import { Form, Media, Button, Alert, Row, Col } from 'react-bootstrap';
import { roll } from './Games/dice.js';
import { getRoll } from './Games/hashdice.js';
import { handlePlinko } from './Games/plinko.js';
import { handleLimbo } from './Games/limbo.js';
import { handleHilo } from './Games/hilo.js';
import { handleVideoPoker } from './Games/videopoker.js';
import { handleBlackjack } from './Games/blackjack.js';
import { handleRoulette } from './Games/roulette.js';
import { handleSlots } from './Games/slots.js';
import { handleWheel, final_result } from './Games/wheel.js';
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
      roulette: false,
      slots: false,
      round: 0,
      wheel: false,
      risk: 'Low',
      segments: 10,
      payout: [
        { segment: 10, risk: 'Low', payouts: [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0] },
        { segment: 20, risk: 'Low', payouts: [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0] },
        { segment: 30, risk: 'Low', payouts: [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0] },
        { segment: 40, risk: 'Low', payouts: [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0] },
        { segment: 50, risk: 'Low', payouts: [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0] },
        { segment: 10, risk: 'Medium', payouts: [0, 1.9, 0, 1.5, 0, 2, 0, 1.5, 0, 3] },
        { segment: 20, risk: 'Medium', payouts: [1.5, 0, 2, 0, 2, 0, 2, 0, 1.5, 0, 3, 0, 1.8, 0, 2, 0, 2, 0, 2, 0] },
        { segment: 30, risk: 'Medium', payouts: [1.5, 0, 1.5, 0, 2, 0, 1.5, 0, 2, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 2, 0, 1.7, 0, 4, 0, 1.5, 0, 2, 0] },
        { segment: 40, risk: 'Medium', payouts: [2, 0, 3, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 1.5, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 2, 0, 1.6, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 1.5, 0] },
        { segment: 50, risk: 'Medium', payouts: [2, 0, 1.5, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 1.5, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 1.5, 0, 2, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 1.5, 0, 1.5, 0, 5, 0, 1.5, 0, 2, 0, 1.5, 0] },
        { segment: 10, risk: 'High', payouts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 9.9] },
        { segment: 20, risk: 'High', payouts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19.8] },
        { segment: 30, risk: 'High', payouts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29.7] },
        { segment: 40, risk: 'High', payouts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39.6] },
        { segment: 50, risk: 'High', payouts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49.5] }
      ]
    }
  }

  handleSubmit = (event) => {

    const { ServerSeed, ClientSeed, Nonce, classicDice, hashDice, plinko, limbo, hilo, videoPoker, blackjack, roulette, slots,
      round, wheel, risk, segments } = this.state;

    const form = event.currentTarget;
    if (form.checkValidity() === false || ServerSeed === '' || (!blackjack && !roulette && ClientSeed === '')) {
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
                      : roulette ? handleRoulette(ServerSeed)
                        : slots ? handleSlots(ServerSeed, ClientSeed, Nonce)
                          : wheel ? handleWheel(ServerSeed, ClientSeed, Nonce, risk, segments)
                            : 0,
        showResult: true,
        validated: true
      })
  }

  render() {
    const { ServerSeed, ClientSeed, Nonce, result, showResult, classicDice, hashDice, plinko, limbo, hilo, videoPoker, blackjack,
      roulette, slots, wheel, risk, segments, validated } = this.state;
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
              <Row className="mt-3 ml-1">
                <Button variant={classicDice ? 'primary' : 'light'} onClick={() => {
                  this.setState({
                    classicDice: true, hashDice: false, plinko: false, limbo: false, hilo: false, videoPoker: false, blackjack: false,
                    roulette: false, slots: false, wheel: false, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Classic Dice
            </Button>
                <Button variant={hashDice ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: true, classicDice: false, plinko: false, limbo: false, hilo: false, videoPoker: false, blackjack: false,
                    roulette: false, slots: false, wheel: false, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Hash Dice
            </Button>
                <Button variant={plinko ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: true, limbo: false, hilo: false, videoPoker: false, blackjack: false,
                    roulette: false, slots: false, wheel: false, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Plinko
            </Button>
                <Button variant={limbo ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: false, limbo: true, hilo: false, videoPoker: false, blackjack: false,
                    roulette: false, slots: false, wheel: false, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Limbo
            </Button>
                <Button variant={hilo ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: false, limbo: false, hilo: true, videoPoker: false, blackjack: false,
                    roulette: false, slots: false, wheel: false, result: 0, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Hilo
            </Button>
                <Button variant={videoPoker ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: false, limbo: false, hilo: false, videoPoker: true, blackjack: false,
                    roulette: false, slots: false, wheel: false, result: 0, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Video Poker
            </Button>
                <Button variant={blackjack ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: false, limbo: false, hilo: false, videoPoker: false, blackjack: true,
                    roulette: false, slots: false, wheel: false, result: 0, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Blackjack
            </Button>
                <Button variant={roulette ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: false, limbo: false, hilo: false, videoPoker: false, blackjack: false,
                    roulette: true, slots: false, wheel: false, result: 0, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Roulette
            </Button>
                <Button variant={slots ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: false, limbo: false, hilo: false, videoPoker: false, blackjack: false,
                    roulette: false, slots: true, wheel: false, result: 0, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Cave of Plunder
            </Button>
                <Button variant={wheel ? 'primary' : 'light'} className="ml-2" onClick={() => {
                  this.setState({
                    hashDice: false, classicDice: false, plinko: false, limbo: false, hilo: false, videoPoker: false, blackjack: false,
                    roulette: false, slots: false, wheel: true, result: 0, showResult: false, ServerSeed: '', ClientSeed: '', Nonce: 0, validated: false
                  })
                }} >
                  Wheel
            </Button>
              </Row>
              <Form className="mt-5" noValidate validated={validated} >
                <Form.Group controlId="formBasicServerSeed">
                  <Form.Label>{blackjack ? 'Signature' : roulette ? 'Hash' : 'Server Seed'}</Form.Label>
                  <Form.Control type="text" required placeholder={blackjack ? 'Enter Signature' : roulette ? 'Enter Hash' : 'Enter Server Seed'} value={ServerSeed} onChange={(e) => {
                    this.setState({ ServerSeed: e.target.value })
                  }} />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid {blackjack ? 'Signature' : roulette ? 'Hash' : 'Server Seed'}.
          </Form.Control.Feedback>
                </Form.Group>

                {!blackjack && !roulette && < Form.Group controlId="formBasicClientSeed">
                  <Form.Label>Client Seed</Form.Label>
                  <Form.Control type="text" required placeholder="Enter Client Seed" value={ClientSeed} onChange={(e) => {
                    this.setState({ ClientSeed: e.target.value })
                  }} />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Client Seed.
          </Form.Control.Feedback>
                </Form.Group>}

                {!blackjack && !roulette && <Form.Group controlId="formBasicNonce">
                  <Form.Label>Nonce</Form.Label>
                  <Form.Control type="number" required placeholder="Nonce" value={Nonce} onChange={(e) => {
                    this.setState({ Nonce: e.target.value })
                  }} />
                </Form.Group>}

                {wheel && <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Risk</Form.Label>
                  <Form.Control as="select" onChange={(e) => {
                    this.setState({ risk: e.target.value })
                  }}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Form.Control>
                </Form.Group>}
                {wheel && <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Segments</Form.Label>
                  <Form.Control as="select" onChange={(e) => {
                    this.setState({ segments: e.target.value })
                  }}>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </Form.Control>
                </Form.Group>}

                <Button variant="primary" type="button" onClick={this.handleSubmit}>
                  Submit
        </Button>
                {showResult && validated && !hilo && !videoPoker && !blackjack && !wheel &&
                  <Alert className="mt-3 text-center" variant="success">
                    The result is :  {result} !
                  </Alert>
                }
                {wheel && showResult && validated && result <= segments ?
                  <Alert className="mt-3 text-center" variant="success">
                    The result is :{final_result(risk, segments)[result]} !
                  </Alert>
                  : (wheel && result > segments) ? <Alert className="mt-3 text-center" variant="danger">
                    Please enter valid number of segments !
                </Alert> : ''
                }
              </Form>
            </Col>
          </Row>
          {(hilo || videoPoker || blackjack) && <Row>
            <br></br>
            <br></br>
            <br></br>
            {result && (hilo || videoPoker || blackjack) ? <h5 className="text-center mt-5">Shuffled Cards</h5> : ''}
          </Row>}
          <br></br>
          {(hilo || videoPoker || blackjack) && <Row>
            {result && (hilo || videoPoker || blackjack) ? result.map((card, i) => {
              return <div className="mt-2" key={'outer_card_' + i}>
                <div className="ml-3" key={'card_' + i}>{i}</div>
                <img width="25%" key={i} src={require('./assets/cards-png/' + card + '.png')} alt={result} />
              </div>
            })
              : ''}
          </Row>}
          <Row>
            {slots && result ? <div>
              <h2>Result</h2>
              <table className="table table-bordered text-center">
                <tbody>
                  <tr>
                    <th>Left</th>
                    <th>Middle</th>
                    <th>Right</th>
                    <th>Ghost</th>
                    <th>Blank</th>
                  </tr>
                  <tr>
                    <td>[0,206250)</td>
                    <td>[206250,288750)</td>
                    <td>[288750,420750)</td>
                    <td>[420750,565562)</td>
                    <td>[565562,1000000)</td>
                  </tr>
                  <tr className="text-center">
                  <td><img width="50%" key={result} src={require('./assets/slots/book.png')} alt="Book" /></td>
                  <td><img width="50%" key={result} src={require('./assets/slots/cross.png')} alt="Book" /></td>
                  <td><img width="50%" key={result} src={require('./assets/slots/amulet.png')} alt="Book" /></td>
                  <td><img width="50%" key={result} src={require('./assets/slots/skull.png')} alt="Book" /></td>
                  <td><img width="55%" height="50%" key={result} src={require('./assets/slots/blank.png')} alt="Book" /></td>
                  </tr>
                  <tr>
                    <td className={result >= 0 && result < 206250 && "bg-success"}>{result >= 0 && result < 206250 && result}</td>
                    <td className={result >= 206250 && result < 288750 && "bg-success"}>{result >= 206250 && result < 288750 && result}</td>
                    <td className={result >= 288750 && result < 420750 && "bg-success"}>{result >= 288750 && result < 420750 && result}</td>
                    <td className={result >= 420750 && result < 565562 && "bg-success"}>{result >= 420750 && result < 565562 && result}</td>
                    <td className={result >= 565562 && result < 1000000 && "bg-success"}>{result >= 565562 && result < 1000000 && result}</td>
                  </tr>
                </tbody>
              </table>
              {result >= 0 && result < 206250 && <div key={'slot' + result}>Book <br></br><br></br> <img width="25%" key={result} src={require('./assets/slots/book.png')} alt="Book" /></div>}
              {result >= 206250 && result < 288750 && <div key={'slot' + result}>Cross <br></br><br></br>  <img width="25%" key={result} src={require('./assets/slots/cross.png')} alt="Cross" /></div>}
              {result >= 288750 && result < 420750 && <div key={'slot' + result}>Amulet <br></br><br></br>  <img width="25%" key={result} src={require('./assets/slots/amulet.png')} alt="Amulet" /></div>}
              {result >= 420750 && result < 565562 && <div key={'slot' + result}>Skull <br></br><br></br>   <img width="25%" key={result} src={require('./assets/slots/skull.png')} alt="Skull" /></div>}
              {result >= 565562 && result < 1000000 && <div key={'slot' + result}>Blank <br></br><br></br>  <img width="25%" key={result} src={require('./assets/slots/blank.png')} alt="Blank" /></div>}
            </div>
              : ''}
          </Row >
          <br></br>
        </div >
      </div >
    );
  }
}

export default App;
