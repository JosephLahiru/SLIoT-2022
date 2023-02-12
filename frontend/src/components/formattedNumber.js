import React from 'react';

const FormattedNumber = ({ value }) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
  });

  return <>{formatter.format(value)}</>;
};

export default FormattedNumber;