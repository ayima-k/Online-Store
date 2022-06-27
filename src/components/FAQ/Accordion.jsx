import React from 'react'
import { ImCross } from 'react-icons/im'
import './Accordion.css'

const Accordion = ({title, desc}) => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div className='accordion-block'>
          <div className='title-acc'>{title}</div>
          <div><h3>{isActive ? <p><ImCross/></p> : '+'}</h3></div>
        </div>
      </div>
      {isActive && <div className="accordion-content">{desc}</div>}
    </div>
  );
}

export default Accordion;