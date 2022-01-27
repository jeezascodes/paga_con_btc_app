class Log {
  // Persisting data:
  Error = (message, stacktrace, statuscode) => {
    console.log('error', message, stacktrace, statuscode);
  };

  // Fetching data:
  Info = message => {
    console.log('error', message);
  };
}

export default new Log();
