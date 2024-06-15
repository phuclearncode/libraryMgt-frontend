import { successNotification, errorNotification } from '../component/common/Notification';

const useNotification = () => {
  const showSuccess = (title, description) => {
    successNotification(title, description);
  };

  const showError = (title, description) => {
    errorNotification(title, description);
  };

  return {
    showSuccess,
    showError
  };
};

export default useNotification;
