import {Attendee} from 'app/models/App/Attendee';
import axios, {AxiosError, AxiosResponse} from 'axios';

const axiosApiInstance = createAxiosInstance();

function createAxiosInstance() {
  const instance = axios.create();
  instance.interceptors.request.use(
    (config) => {
      config.baseURL = 'http://localhost:8081/attendees';

      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
}

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) =>
    axiosApiInstance
      .get(url)
      .then(responseBody)
      .catch(async (error: AxiosError | Error) => {
        if (axios.isAxiosError(error)) {
          return error;
        }
      }),
  post: (url: string, body: any) =>
    axiosApiInstance
      .post(url, body)
      .then(responseBody)
      .catch(async (error: AxiosError | Error) => {
        if (axios.isAxiosError(error)) {
          return error;
        }
      }),
  patch: (url: string, body: any) =>
    axiosApiInstance
      .patch(url, body)
      .then(responseBody)
      .catch(async (error: AxiosError | Error) => {
        if (axios.isAxiosError(error)) {
          return error;
        }
      }),
  delete: (url: string) =>
    axiosApiInstance
      .delete(url)
      .then(responseBody)
      .catch(async (error: AxiosError | Error) => {
        if (axios.isAxiosError(error)) {
          return error;
        }
      })
};

const  createAttendee = (attendee: Attendee): Promise<Attendee> => {
  return requests.post('', attendee);
};

const getAllAttendees = (): Promise<Attendee[]> =>{
  return requests.get('');
};

const deleteAttendee = (attendeeId: string): Promise<void> => {
  return requests.delete(`/${attendeeId}`);
};

const updateAttendee = (attendeeId: string, attendee: any): Promise<Attendee> => {
  return requests.patch(`/${attendeeId}`, attendee);
};

export {createAttendee, getAllAttendees, deleteAttendee, updateAttendee};
