import { successNotification, errorNotification } from '../component/common/Notification';

const useNotification = () => {
  const showSuccess = (description) => {
    successNotification(description);
  };

  const showError = (description) => {
    errorNotification(description);
  };

  return {
    showSuccess,
    showError
  };
};

export default useNotification;
