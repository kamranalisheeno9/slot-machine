import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Row,Col } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiPlusMedical } from 'react-icons/bi';
import { ImMinus } from 'react-icons/im';
import './App.css'
const { useRef, useState} = React;

function Slots(){
  const [slot1,setslot1] = useState("🍒");
  const [slot2,setslot2] = useState("🍒");
  const [slot3,setslot3] = useState("🍒");
  const [winningAmount , setWinningAmount]=useState(0);
  const [hasamount,setHasamount]=useState(0)
  const [bet , setBet]=useState(0);

  const [rolling,setRolling] = useState(false);
  let slotRef = [useRef(null), useRef(null), useRef(null)];
  const symbols = ["🍒", "🍉", "🍊", "🍓", "🍇", "🥝"]
  
  // Setting Bet Function With Conditions

  useEffect(()=>{
    
    setAmountFunc()

  },)
  
  
  
  const setAmountFunc =()=>{
    slot1==symbols[0]|| slot2==symbols[0] || slot3==symbols[0] ?  setWinningAmount(20 * bet)  
    : slot1==symbols[1] && slot2==symbols[1] && slot3==symbols[1] ? setWinningAmount(16  * bet) 
    : slot1==symbols[2] && slot2==symbols[2] && slot3==symbols[2] ? setWinningAmount(16  * bet) 
    : slot1==symbols[3] && slot2==symbols[3] && slot3==symbols[3] ? setWinningAmount(12  * bet) 
    : slot1==symbols[4] && slot2==symbols[4] && slot3==symbols[4] ? setWinningAmount(12  * bet) 
    : slot1==symbols[5] && slot2==symbols[5] && slot3==symbols[5] ? setWinningAmount(8  * bet)
    : slot1==symbols[2] && slot2==symbols[2] && slot3==symbols[4] ? setWinningAmount(8  * bet)
    : slot1==symbols[2] && slot2==symbols[2] && slot3==symbols[1] ? setWinningAmount(4  * bet)
    : slot1==symbols[2] && slot2==symbols[2] && slot3==symbols[3] ? setWinningAmount(4  * bet)
    : slot1==symbols[2] && slot2==symbols[2] && slot3==symbols[5] ? setWinningAmount(2  * bet)
    : slot1==symbols[2] && slot2==symbols[2] && slot3==symbols[1] ? setWinningAmount(2  * bet)
     : setWinningAmount(0)
  }
  const finalAmountFunc=()=>{
    const final = hasamount + winningAmount;
    setHasamount(final)
  }

  // Setting Bet

    const DecreaseBet=()=>{
      
      {bet <=0  ? setBet(0) : setBet(bet - 1) }
    }
    const IncreaseBet=()=>{
      setBet(bet + 1)

    }
  const betFunc=()=>{
    const AddBet = prompt('Please add bet')
    setBet(AddBet)

  }
  // to trigger roolling and maintain state
  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
    }, 700);


  
    // looping through all 3 slots to start rolling
    slotRef.forEach((slot, i) => {
      // this will trigger rolling effect
      const selected = triggerSlotRotation(slot.current);
      if(i+1 == 1)
        setslot1(selected);
      else if(i+1 == 2)
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
          <Row className="justify-content-around" >
            <Col xs={3} >
              <div className="has-amount-box">
                {hasamount}
              </div>
              </Col>
            <Col xs={3} className="casino-title" >Our Casino</Col>
            <Col xs={3} >
            <div className="profile-box">
                {/* <BsFillPersonFill /> */}
              </div>
            </Col>
          </Row>
          
        <Row>
            <Col md={12} >
              <div className="slots-screen" >
              <div className="slots-screen-inner" >
                <Row className="each-slot">
                  <Col xl={3} md={4}>

              <div className="slot">
          <section>
            <div className="container" ref={slotRef[0]}>
              {symbols.map((fruit, i) => (
                <div key={i}>
                  <span>{fruit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
                  </Col>
                  <Col xl={3} md={4}>

        <div className="slot">
          <section>
            <div className="container" ref={slotRef[1]}>
              {symbols.map(fruit => (
                <div>
                  <span>{fruit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
                  </Col>
                  <Col xl={3} md={4}>
        <div className="slot">
          <section>
            <div className="container" ref={slotRef[2]}>
              {symbols.map(fruit => (
                <div>
                  <span>{fruit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

                  </Col>
                </Row>
              </div>
              </div>
            </Col>
            <Row className="justify-content-around spin-btn-container" >
            <Col xs={3} >
              <div className="setting-bet">
            <div className="increase-decrease" onClick={()=>DecreaseBet()}>
                <ImMinus />
              </div>
              <div className="has-amount-box">
                $ {bet}
                
              </div>
              <div className="increase-decrease" onClick={()=>IncreaseBet()}>
                <BiPlusMedical />
              </div>
              </div>
              </Col>
              <Col xs={2} >
            <div className="winning-box">
                $ {winningAmount}
                
              </div>
            </Col>
            <Col xs={2} className="spin-btn" >
              
        <div
          className={!rolling ? "roll rolling" : "roll"}
          onClick={!rolling && roll}
          disabled={rolling}>
          {rolling ? "Spinning..." : "Spin"}
        </div>
            </Col>
           
          </Row>

          </Row>
        </Container>
        
      </div>
    ); 
};


export default Slots
