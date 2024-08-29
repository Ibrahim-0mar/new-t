import dayjs from 'dayjs';

//This an example of a date helper function that can be used in the app
export const getToday = () => dayjs().format();

// Departure Time, Arrival Time in flights filter
export const formatTime = (value: number) => {
  // Convert value to a string with leading zero if necessary
  const stringValue = value.toString().padStart(4, '0');
  // Use Day.js to parse the time and format it
  return dayjs(`2023-01-01T${stringValue.slice(0, 2)}:${stringValue.slice(2, 4)}`).format('HH:mm');
};

export const formatDuration = (value: number, lang: string) => {
  // Converts minutes into "Xd Yh Zm" format
  const days = Math.floor(value / (24 * 60));
  const hours = Math.floor((value % (24 * 60)) / 60);
  const minutes = value % 60;

  switch (lang) {
    case 'ar':
      return `${days ? days + 'ي ' : ''}${hours ? hours + 'س ' : ''} ${
        minutes ? minutes + 'د' : ''
      }`;
    case 'en':
      return `${days ? days + 'd ' : ''}${hours ? hours + 'h ' : ''} ${
        minutes ? minutes + 'm' : ''
      }`;
    case 'fr':
      return `${days ? days + 'j ' : ''}${hours ? hours + 'h ' : ''} ${
        minutes ? minutes + 'min' : ''
      }`;
    default:
      return `${days ? days + 'd ' : ''}${hours ? hours + 'h ' : ''} ${
        minutes ? minutes + 'm' : ''
      }`;
  }
};

export const addDays = (date: Date, days: number) => dayjs(date).add(days, 'days').toDate();

export const substractDays = (date: Date, days: number) =>
  dayjs(date).subtract(days, 'days').toDate();

export const formatDate = (value: string) => {
  // Converts date (000000000000) into: "day"(num) "DAY"(string), "MONTH"(string) format.
  return dayjs(value, { format: 'YYYYMMDDHHmm' }).format('ddd, D MMM');
};
export const formatMonth = (value: string) => {
  // Converts date (000000000000) into: "MONTH"(string) format.
  return dayjs(value, { format: 'YYYYMMDDHHmm' }).format('MMM');
};

export const formatDay = (value: string) => {
  // Converts date (000000000000) into: "MONTH"(string) format.
  return dayjs(value, { format: 'YYYYMMDDHHmm' }).format('dddd');
};

export const diffBetweenTwoDates = (
  date1: Date,
  date2: Date,
  format:
    | 'day'
    | 'week'
    | 'quarter'
    | 'month'
    | 'year'
    | 'hour'
    | 'minute'
    | 'second'
    | 'millisecond',
) => {
  // Returns the difference in days between two dates
  //IMPORTANT NOTE 
  // dayjs return 1 days if the diffrrent between the two dates is 24 hours (a whole day)
  // but at most of our case we need to know if days is differents. ex: 22-8-2024 at 11 pm and 23-8-2024 at 1 am is diffrent days
  // so Math.ceil condition handle this 
    return Math.ceil(dayjs(date1).diff(date2, format || "day",true));
};
