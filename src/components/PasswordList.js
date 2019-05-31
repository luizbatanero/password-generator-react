import React from 'react';
import Password from './Password';

const PasswordList = ({ passwords }) => {
  return (
    <div>
      {passwords.map((password, index) => (
        <Password password={password} key={index} />
      ))}
    </div>
  );
};

export default PasswordList;
