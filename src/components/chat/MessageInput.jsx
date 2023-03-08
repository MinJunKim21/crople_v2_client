import React from 'react';
import tw from 'twin.macro';

export const MessageInput = ({ handleSubmit, setNewMessage, newMessage }) => {
  return (
    <form onSubmit={handleSubmit} className=" px-2 pb-4 pt-4">
      <NextBtnGraBorder>
        <NextBtnGraBg>
          <textarea
            className="border-none w-full  resize-none outline-none py-3 px-2"
            name=""
            id=""
            cols="30"
            rows="1"
            placeholder="메세지 보내기..."
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            value={newMessage}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          ></textarea>
          <button type="submit" onClick={handleSubmit} className="w-7 h-7">
            <img src="/assets/BTN/Btn_SendMessage.png" alt="" />
          </button>
        </NextBtnGraBg>
      </NextBtnGraBorder>
    </form>
  );
};

const NextBtnGraBorder = tw.div`w-full h-[5.25rem] rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286]`;
const NextBtnGraBg = tw.div`w-full h-full rounded-full bg-white  border-2 border-transparent [background-clip: padding-box]  text-center flex justify-center items-center px-4`;
