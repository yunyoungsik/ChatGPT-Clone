import { useRef, useEffect, useState } from 'react';
import './newPrompt.css';
import Upload from '../../upload/Upload';
import { IKImage } from 'imagekitio-react';

const NewPrompt = () => {
  const [img, setImg] = useState({
    isLoading: false,
    error: '',
    dbData: {},
  });

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* add new chat */}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
        />
      )}
      <div className="endChat" ref={endRef} />
      <form className="newForm">
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="arrow" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
