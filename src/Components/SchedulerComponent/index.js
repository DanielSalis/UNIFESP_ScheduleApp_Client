import React from 'react'
import style from './_style.module.scss'

import Scheduler from 'legit-scheduler'
// import RangeDate from 'legit-scheduler';
// import DateRange from '../src/date_range';
// import { whyDidYouUpdate } from 'why-did-you-update';

const SchedulerComponent = () => {

  var resources = ['Daniel', 'Gomes', 'Zanin', 'André', 'Daniel', 'Gomes', 'Zanin', 'André',],
  today = null,
  events = [
    {
      id: 'foobar',
      title: 'Do this',
      startDate: null,
      duration: 5,
      resource: 'One'
    },
    {
      id: 'barfoo',
      title: 'Do that',
      startDate: null,
      duration: 4,
      resource: 'Two'
    },
    {
      id: 'barfoobaz',
      title: 'I am disabled',
      startDate: null,
      duration: 7,
      resource: 'Three',
      disabled: true
    },
    {
      id: 'foobah',
      title: 'Do another thing',
      startDate: null,
      duration: 14,
      resource: 'Seven'
    },
    {
      id: 'foobaz',
      title: 'Do another thing next month',
      startDate: null,
      duration: 14,
      resource: 'Seven'
    }
  ]

  return <div className={style.schedulerContainer}>
    <Scheduler
          resources={resources}
          events={events}
          width={1000}
        />
  </div>
}

export default SchedulerComponent
