import { useState } from 'react';
import { SchedulerData, ViewTypes } from 'react-big-scheduler';

import { SchedulerInitialData, ViewsConfig, eventColorStyles } from './constants';

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

  function newEvent(schedulerData, slotId, slotName, start, end, type, item) {
    let eventsCountByResource = viewModel.schedulerData.events.reduce(
      (prev, event) => prev + Number(event.resourceId === slotId),
      0
    );

    if (eventsCountByResource === 10) {
      setError('The events count is up to 10');

      return setTimeout(() => setError(''), 4000);
    }

    let newFreshId = 0;
    schedulerData.events.forEach((item) => {
      if (item.id >= newFreshId) newFreshId = item.id + 1;
    });

    let newEvent = {
      id: newFreshId,
      title: 'New event you just created',
      start: start,
      end: end,
      resourceId: slotId,
    };

    schedulerData.addEvent(newEvent);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function eventItemTemplateResolver(schedulerData, event, mustAddCssClass, a, b) {
    let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);
    const { border, background } = eventColorStyles[event.resourceId];

    return (
      <div
        key={event.id}
        style={{
          cursor: 'default',
          borderRadius: '3px',
          marginBottom: '3px',
          backgroundColor: background,
          border: `1px solid ${border}`,
          boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <span style={{ color: '#FFFFFF', margin: '4px 0 0 2px', borderRadius: 1 }}>
          1{/*{titleText}*/}
        </span>
      </div>
    );
  }

  function onViewChange(schedulerData, view) {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(schedulerData.events);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function onSelectDate(schedulerData, date) {
    schedulerData.setDate(date);
    schedulerData.setEvents(schedulerData.events);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function updateEventStart(schedulerData, event, newStart, a, b) {
    schedulerData.updateEventStart(event, newStart);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function updateEventEnd(schedulerData, event, newEnd) {
    schedulerData.updateEventEnd(event, newEnd);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function moveEvent(schedulerData, event, slotId, slotName, start, end) {
    schedulerData.moveEvent(event, slotId, slotName, start, end);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function conflictOccurred() {}

  return {
    error,
    newEvent,
    moveEvent,
    onViewChange,
    onSelectDate,
    updateEventEnd,
    updateEventStart,
    conflictOccurred,
    eventItemTemplateResolver,
    schedulerData: viewModel.schedulerData,
  };
}
