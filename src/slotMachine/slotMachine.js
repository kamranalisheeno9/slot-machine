import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BiPlusMedical } from 'react-icons/bi';
import { ImMinus } from 'react-icons/im';
import seven from '../assets/icons/seven.png'
import usd from '../assets/icons/usd.png'
import star from '../assets/icons/star.png'
import pinktoken from '../assets/icons/pinktoken.png'
import goldtoken from '../assets/icons/goldtoken.png'
import './slotmachine.css'
const { useRef, useState } = React;

const Slots = () => {
  const [slot1, setslot1] = useState(" ");
  const [slot2, setslot2] = useState(" ");
  const [slot3, setslot3] = useState(" ");
  const [winningAmount, setWinningAmount] = useState(0);
  const [bet, setBet] = useState(3000);
  const [multiplier, setMultiplier] = useState(10)
  const [totalAmount, setTotalAmount] = useState(30000)
  const [noAmount, setNoAmount] = useState(false)
  const [rolling, setRolling] = useState(false);
  const [Roll, setRoll] = useState(false);
  let slotRef = [useRef(null), useRef(null), useRef(null)];
  const symbols = [seven, usd, star, pinktoken, goldtoken]

  // Setting Bet Function With Conditions

  useEffect(() => {

    setAmountFunc()
    finalamount()

  })



  const setAmountFunc = () => {
    slot1 === symbols[0] && slot2 === symbols[0] && slot3 === symbols[0] ? setWinningAmount(20 * bet)
      : slot1 === symbols[1] && slot2 === symbols[1] && slot3 === symbols[1] ? setWinningAmount(16 * bet)
      : slot1 === symbols[2] && slot2 === symbols[2] && slot3 === symbols[2] ? setWinningAmount(16 * bet)
      : slot1 === symbols[3] && slot2 === symbols[3] && slot3 === symbols[3] ? setWinningAmount(12 * bet)
      : slot1 === symbols[4] && slot2 === symbols[4] && slot3 === symbols[4] ? setWinningAmount(12 * bet)
      : slot1 === symbols[2] && slot2 === symbols[2] && slot3 === symbols[4] ? setWinningAmount(8 * bet)
      : slot1 === symbols[2] && slot2 === symbols[2] && slot3 === symbols[1] ? setWinningAmount(4 * bet)
      : slot1 === symbols[2] && slot2 === symbols[2] && slot3 === symbols[3] ? setWinningAmount(4 * bet)
      : slot1 === symbols[2] && slot2 === symbols[2] && slot3 === symbols[5] ? setWinningAmount(2 * bet)
      : slot1 === symbols[2] && slot2 === symbols[2] && slot3 === symbols[1] ? setWinningAmount(2 * bet)
      : setWinningAmount(0)
  }
  const finalamount = () => {
    {totalAmount <=0 || totalAmount == -1 || totalAmount < bet ?  setNoAmount(true) :setNoAmount(false)}
    {bet <= 3000 ? setBet(3000) : <></>}
    console.log(winningAmount)
  }


  // Setting Bet

  const DecreaseBet = () => {

    { bet <= 3000 ? setBet(3000) : setBet(bet / multiplier) }
  }
  const IncreaseBet = () => {
    setBet(bet * multiplier)

  }

  // Setting Multiplier

  const Setfor10 = () => {
    setBet(3000)
    setMultiplier(10)
  }
  const Setfor20 = () => {
    setBet(6000)
    setMultiplier(20)
  }
  // to trigger roolling and maintain state
  const roll = () => {
    {totalAmount <=0 || totalAmount == -1 || totalAmount < bet ? setTotalAmount(totalAmount) :setTotalAmount(winningAmount + totalAmount - bet);}
    setRolling(true)
    setTimeout(() => {
      setRolling(false);
    }, 700);


    // For looping through all 3 slots to start rolling

    slotRef.forEach((slot, i) => {

      // this will trigger rolling effect

      const selected = triggerSlotRotation(slot.current);
      if (i + 1 == 1)
        setslot1(selected);
      else if (i + 1 == 2)
        setslot2(selected);
      else
        setslot3(selected);
    });
  };
 


  // this will create a rolling effect and return random selected option
  const triggerSlotRotation = ref => {
    function setTop(top) {
      ref.style.top = `${top}px`;
    }
    let options = ref.children;
    let randomOption = Math.floor(
      Math.random() * symbols.length
    );
    let choosenOption = options[randomOption];
    setTop(-choosenOption.offsetTop + 2);
    return symbols[randomOption];
  };

  return (
    <div className="SlotMachine">
      <Container fluid className="main-machine-body">
        <Row className=" header " >
          <Col sm={6} xs={10} className="casino-title" >Our Casino</Col>

          <Col lg={3} sm={5} xs={10}  >
            <div className="has-amount-box addition-to">
              <ul>
                <li>

                  $
                </li>
                <li>
                  {totalAmount}
                </li>
              </ul>

            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} >
            <div className="slots-screen" >
              <div className="slots-screen-inner" >
                <Row className="each-slot">
                  <Col xl={3} md={4} xs={4}>

                    <div className="slot">
                      <section>
                        <div className="container" ref={slotRef[0]}>
                          {symbols.map((fruit, i) => (
                            <div key={i}>
                              <img className="slot-image" src={fruit} alt="slot 1" />
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </Col>
                  <Col xl={3} md={4} xs={4}>

                    <div className="slot">
                      <section>
                        <div className="container" ref={slotRef[1]}>
                          {symbols.map(fruit => (
                            <div>
                              <img className="slot-image" src={fruit} alt="slot 2" />
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </Col>
                  <Col xl={3} md={4} xs={4}>
                    <div className="slot">
                      <section>
                        <div className="container" ref={slotRef[2]}>
                          {symbols.map(fruit => (
                            <div>
                              <img className="slot-image" src={fruit} alt="slot 3" />
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                  </Col>
                </Row>
                
              </div>
            
            </div>
             {noAmount ?  <h6 className="winning-amount">You Have Low Amount Update Amount Or Reduce Bet </h6>  :  <h6 className="winning-amount">You Have Won <span> $ {winningAmount} </span> </h6> } 
                            
          </Col>
          <Row className="justify-content-between spin-btn-container" >
            <Col lg={3} md={4} sm={6} xs={12} >
              <div className="setting-bet">
                <div className="increase-decrease" onClick={() => DecreaseBet()}>
                  <ImMinus />
                </div>
                <div className="has-amount-box">
                  <ul>
                    <li>

                      $
                    </li>
                    <li>
                      {bet}
                    </li>
                  </ul>

                </div>
                <div className="increase-decrease" onClick={() => IncreaseBet()}>
                  <BiPlusMedical />
                </div>
              </div>
            </Col>
            <Col md={4} sm={6} xs={12} >
              <div className="setting-bet setting-multiplier">
                <div className={multiplier == 10 ? "set10x increase-decrease" : "increase-decrease "} onClick={() => Setfor10()}>
                  10x
                </div>

                <div className={multiplier == 20 ? "set20x increase-decrease" : "increase-decrease "} onClick={() => Setfor20()}>
                  20x
                </div>
              </div>
            </Col>
            <Col lg={3} md={4} sm={12} className="spin-btn" >

              <div
                className={!rolling ? "roll rolling" : "roll"}
                onClick={ totalAmount <=0 || totalAmount< bet ?  Roll && roll : !rolling && roll}
                disabled={rolling}>
                {rolling ? "Spinning" : "Spin"}
              </div>
            </Col>

          </Row>

        </Row>
      </Container>

    </div>
  );
};


export default Slots
