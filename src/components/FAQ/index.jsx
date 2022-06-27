import React from 'react'
import { DropdownList } from '../../utils/List/DropdownList'
import Accordion from './Accordion'
import cls from './FAQ.module.scss'

const FAQ = () => {
  return (
    <div className={cls.block}>
      <h1>Часто задаваемые вопросы</h1>
      <span>FAQ</span>
      <div className={cls.accordion}>
        <div>
          {DropdownList.map(({ id, title, desc }) => (
            <Accordion key={id} title={title} desc={desc} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ