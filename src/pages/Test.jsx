import { useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState('');

  const submit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append('name', filename);
    data.append('image', file);
    // formData.append('caption', caption);
    await axios.post(`${process.env.REACT_APP_API_ROOT}/api/upload`, data);
  };
  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <form
            onSubmit={submit}
            style={{ width: 650 }}
            className="flex flex-col space-y-5 px-5 py-14"
          >
            <input onChange={fileSelected} type="file" accept="image/*"></input>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              type="text"
              placeholder="Caption"
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Test;
