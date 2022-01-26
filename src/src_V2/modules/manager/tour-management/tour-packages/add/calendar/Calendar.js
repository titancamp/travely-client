import React, { useState } from 'react';
import Scheduler, { SchedulerData, ViewTypes } from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { SchedulerInitialData, ViewsConfig, eventColorStyles } from './constants';
import { getInitialScheduler, useSchedulerHandlers } from './helper';
import './styles.css';

function Calendar() {
  const {
    newEvent,
    viewModel,
    moveEvent,
    onViewChange,
    onSelectDate,
    updateEventEnd,
    conflictOccurred,
    updateEventStart,
    eventItemTemplateResolver,
  } = useSchedulerHandlers(getInitialScheduler());

  return (
    <div className={'calendarWrapper'}>
      <Scheduler
        newEvent={newEvent}
        moveEvent={moveEvent}
        onViewChange={onViewChange}
        onSelectDate={onSelectDate}
        updateEventEnd={updateEventEnd}
        updateEventStart={updateEventStart}
        conflictOccurred={conflictOccurred}
        schedulerData={viewModel.schedulerData}
        eventItemTemplateResolver={eventItemTemplateResolver}
      />
    </div>
  );
}

export default dragDropContext(HTML5Backend)(Calendar);

//TODO
// cursor pointer on event item
// resource column need to have 1px padding -> design
