export const applicationErrorTracking = async (
    errorMessage:string
  ) => {

    window?.dataLayer?.push({
      event: 'applicationError',
      data:{errorMessage} ,
    });
  };