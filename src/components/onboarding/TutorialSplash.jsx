import { TutorialProfileEdit } from './TutorialProfileEdit';
import { TutorialSmile } from './TutorialSmile';
import { useState } from 'react';
import { useEffect } from 'react';
import { TutorialEnd } from './TutorialEnd';

export const TutorialSplash = ({ file, question }) => {
  const [showProfileEdit, setShowProfileEdit] = useState(true);
  const [showSmile, setShowSmile] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  useEffect(() => {
    if (question === 'five') {
      const profileEditTimer = setTimeout(() => {
        setShowProfileEdit(false);
        setShowSmile(true);
      }, 2000);

      return () => clearTimeout(profileEditTimer);
    }
  }, [question]);

  useEffect(() => {
    if (showSmile) {
      const smileTimer = setTimeout(() => {
        setShowSmile(false);
        setShowEnd(true);
      }, 2000);

      return () => clearTimeout(smileTimer);
    }
  }, [showSmile]);

  return (
    <div>
      {showProfileEdit && (
        <div
          className={`opacity-0 transition-all duration-500 ease-in-out ${
            showProfileEdit ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <TutorialProfileEdit file={file} />
        </div>
      )}
      {showSmile && (
        <div
          className={`opacity-0 transition-all duration-500 ease-in-out ${
            showSmile ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <TutorialSmile file={file} />
        </div>
      )}
      {showEnd && (
        <div
          className={`opacity-0 transition-all duration-500 ease-in-out ${
            showEnd ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <TutorialEnd file={file} />
        </div>
      )}
    </div>
  );
};
