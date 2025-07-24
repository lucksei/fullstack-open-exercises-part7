import React, { useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Toggleable = React.forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(true);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => ({
    toggleVisibility,
  }));

  return (
    <div className="flex flex-col border border-gray-300 rounded-md shadow-lg w-auto">
      {/* Header */}
      <div className="flex flex-column p-2 bg-gray-100">
        <div>
          <button onClick={toggleVisibility}>
            {visible ? 'Cancel' : buttonLabel}
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="pb-4 ps-4 pe-12 ">
        <div
          className={`pt-4 transition-all duration-300 ease-in-out ${visible ? 'opacity-100 max-h-[1000px] scale-100' : 'opacity-0 max-h-0 scale-95 overflow-hidden '}`}>
          {children}
        </div>
        <div
          className={
            visible
              ? 'hidden'
              : 'font-bold text-slate-500 text-lg tracking-widest after:content-["..."]'
          }></div>
      </div>
    </div>
  );
});

Toggleable.displayName = 'Toggleable';
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;
