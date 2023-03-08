import tw from 'twin.macro';

export const ProfilePicOne = ({ file, userObject, setFile, fileChange }) => {
  return (
    <div className="inline-block">
      <div className="relative inline-block ">
        <div className="bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] w-[6.75rem] h-[6.75rem] relative p-[2px] rounded-full">
          {file ? (
            <img
              src={file ? URL.createObjectURL(file) : null}
              alt=""
              className="w-[6.75rem] h-[6.75rem] object-cover rounded-full absolute left-0 top-0"
            />
          ) : (
            <div className="bg-white w-full h-full  rounded-full"></div>
          )}
        </div>
        <label
          htmlFor="fileInputA"
          className={`absolute cursor-pointer  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs w-full h-full text-center ${
            file ? 'text-transparent' : 'text-[#C1C1C1]'
          }`}
        >
          {userObject.profilePicture[0] && !file ? (
            <img
              className="object-cover rounded-full w-full h-full"
              src={userObject.profilePicture[0]}
              alt=""
            />
          ) : (
            '프로필 사진'
          )}
        </label>
      </div>
      <SmGraText>필수</SmGraText>
      <input
        type="file"
        accept="image/*"
        id="fileInputA"
        onChange={(e) => {
          setFile(e.target.files[0]);
          fileChange(e, 0);
        }}
        className="opacity-0 w-[1px] peer"
      />
    </div>
  );
};

const SmGraText = tw.div`text-xs text-center text-[#F79D00] font-bold`;
