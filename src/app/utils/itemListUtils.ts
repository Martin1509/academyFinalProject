import {Attendee} from 'app/models/App/Attendee';

const getOrderId = (attendees: Attendee[], movedAttId: string): number => {
  const elementId = attendees.findIndex(x => x.id === movedAttId);
  const orderIdAbove = elementId === attendees.length-1 ? undefined : attendees[elementId+1].orderIndex;
  const orderIdUnder = elementId-1 < 0 ? undefined : attendees[elementId-1].orderIndex;

  if (orderIdAbove === undefined){
    return Math.round(attendees[elementId - 1].orderIndex) + 1;
  } else if (orderIdUnder === undefined){
    return Math.floor(attendees[elementId + 1].orderIndex) - 1;
  }
  return ((orderIdAbove - orderIdUnder)/2) + orderIdUnder;
};

export {getOrderId};
