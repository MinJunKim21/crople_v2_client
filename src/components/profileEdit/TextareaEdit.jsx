import React from 'react';

export const TextareaEdit = ({
  selfIntroduction,
  descDB,
  userObject,
  byteCounter,
  setDescDB,
}) => {
  return (
    <div className="px-4">
      <textarea
        ref={selfIntroduction}
        type="text"
        value={descDB}
        placeholder={userObject.desc}
        className="w-full border-2 rounded-lg h-[11.75rem] px-2 py-3 resize-none outline-none"
        onChange={() => {
          if (byteCounter(selfIntroduction.current.value) > 240) {
            selfIntroduction.current.value =
              selfIntroduction.current.value.slice(0, -1);
          }
          setDescDB(selfIntroduction.current.value);
        }}
      />
      <div className="text-[#A5A5A5] text-xs text-right">
        {byteCounter(descDB)}/240 byte
      </div>
    </div>
  );
};
