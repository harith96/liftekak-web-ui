import { useState } from 'react';

const useModalToggle = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const onClick = () => setModalVisible((visible) => !visible);
  return [isModalVisible, onClick];
};

export default useModalToggle;
