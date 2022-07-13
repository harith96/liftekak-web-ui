import { useState } from 'react';

const useModalToggle = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const onClick = () => {
    setModalVisible(!isModalVisible);
  };

  return [isModalVisible, onClick];
};

export default useModalToggle;
