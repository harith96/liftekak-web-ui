import { notification } from 'antd';

notification.config({
  placement: 'bottomRight',
});

const openNotification = (payload) => {
  const { message, description, className } = payload;
  const key = `open${Date.now()}`;

  notification[className]({
    message,
    description,
    key,
    className,
  });
};

export default openNotification;
