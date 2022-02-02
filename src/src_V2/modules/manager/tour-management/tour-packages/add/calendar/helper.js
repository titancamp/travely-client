import { useState } from 'react';
import { SchedulerData, ViewTypes } from 'react-big-scheduler';

import { SchedulerInitialData, ViewsConfig } from './constants';

export function getSchedulerSingleInstance() {
  if (!getSchedulerSingleInstance.scheduler) {
    let scheduler = new SchedulerData(
      new Date(),
      ViewTypes.Day,
      false,
      false,
      ViewsConfig
    );
    scheduler.localeMoment.locale('en');
    scheduler.setEvents(SchedulerInitialData.events);
    scheduler.setResources(SchedulerInitialData.resources);

    getSchedulerSingleInstance.scheduler = scheduler;
  }

  return getSchedulerSingleInstance.scheduler;
}

export function useSchedulerHandlers(scheduler) {
  const [error, setError] = useState();
  const [viewModel, setViewModel] = useState({ schedulerData: scheduler, toggle: false });

  function newEvent(schedulerData, slotId, slotName, start, end) {
    let eventsCountByResource = viewModel.schedulerData.events.reduce(
      (prev, event) => prev + Number(event.resourceId === slotId),
      0
    );

    if (eventsCountByResource === 10) {
      setError('The events count is up to 10');
      window.scrollTo(0, document.body.scrollHeight);
      return setTimeout(() => setError(''), 4000);
    }

    let newFreshId = 0;
    schedulerData.events.forEach((item) => {
      if (item.id >= newFreshId) newFreshId = item.id + 1;
    });

    let newEvent = {
      end,
      start,
      id: newFreshId,
      resourceId: slotId,
      title: 'Mariot/ r(5)',
    };

    schedulerData.addEvent(newEvent);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function eventItemTemplateResolver(schedulerData, event) {
    let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);

    return (
      <div key={event.id} className={`eventItemContainer ${event.resourceId}`}>
        <p className='eventItemContent'>{titleText}</p>
      </div>
    );
  }

  function onViewChange(schedulerData, view) {
    const existingEvents = schedulerData.events.map((event) => event);
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(existingEvents);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function onSelectDate(schedulerData, date) {
    schedulerData.setDate(date);
    schedulerData.setEvents(schedulerData.events);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function updateEventStart(schedulerData, event, newStart) {
    schedulerData.updateEventStart(event, newStart);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function updateEventEnd(schedulerData, event, newEnd) {
    schedulerData.updateEventEnd(event, newEnd);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function moveEvent(schedulerData, event, slotId, slotName, start, end) {
    if (event.resourceId === slotId) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      setViewModel({ schedulerData, toggle: !viewModel.toggle });
    }
  }

  function prevClick(schedulerData) {
    const existingEvents = schedulerData.events.map((event) => event);
    schedulerData.prev();
    schedulerData.setEvents(existingEvents);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function nextClick(schedulerData) {
    const existingEvents = schedulerData.events.map((event) => event);
    schedulerData.next();
    schedulerData.setEvents(existingEvents);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function conflictOccurred() {}

  return {
    error,
    newEvent,
    moveEvent,
    prevClick,
    nextClick,
    onViewChange,
    onSelectDate,
    updateEventEnd,
    updateEventStart,
    conflictOccurred,
    eventItemTemplateResolver,
    schedulerData: viewModel.schedulerData,
  };
}
