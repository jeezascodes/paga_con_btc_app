import RaygunClient from 'raygun4reactnative';

class Log {
  // Persisting data:
  Error = (message, stacktrace, statuscode) => {
    console.log('error', message, stacktrace, statuscode);
    RaygunClient.sendError(message);
  };

  // Fetching data:
  Info = message => {
    console.log('error', message);
    RaygunClient.sendError(message);
  };
}

export default new Log();
