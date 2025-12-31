import { memo } from 'react';

const ErrorForm: React.FC<{ errors?: string }> = ({ errors }) => {
  if (errors) return <p className="text-sm text-red-500 capitalize">{errors}</p>;
};

export default memo(ErrorForm);
