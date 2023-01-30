import { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';

const Test = () => {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState('');
  const [pic, setPic] = useState();

  const submit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append('name', filename);
    data.append('image', file);
    // formData.append('caption', caption);
    await axios.post(`${process.env.REACT_APP_API_ROOT}/api/imageupload`, data);
  };
  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const [imageSelected, setImageSelected] = useState('');
  const uploadImage = () => {
    const formData = new FormData();

    formData.append('file', imageSelected);
    formData.append(
      'upload_preset',
      `${process.env.REACT_APP_CLOUDINARY_PRESET}`
    );

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
        formData
      )
      .then((res) => {
        console.log(res);
      });
    // console.log(res);
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
      <div>cloudinary</div>
      <div>
        <input
          type="file"
          onChange={(event) => {
            setImageSelected(event.target.files[0]);
          }}
        />
        <button onClick={uploadImage}>upload image</button>
      </div>
      <div>dddd</div>
    </div>
  );
};

export default Test;
