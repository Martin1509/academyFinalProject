import {Attendee} from 'app/models/App/Attendee';

const getHigherOrderNumber = (attendees: Attendee[]): number => {
  return Math.max(...attendees.map(o => o.orderIndex));
};

export {getHigherOrderNumber};
