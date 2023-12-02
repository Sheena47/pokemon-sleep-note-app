import React, { useState } from 'react';

type Props = {
  images: string[];
  defaultImage: string;
  IconStyle: string;
};

const ModalItem: React.FC<Props> = ({ images , defaultImage , IconStyle}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const [switchModal, setswitchModal] = useState(false);
  const handleOpenModal = () => {
    setswitchModal(true);
  };

  const handleCloseModal = () => {
    setswitchModal(false);
  };

  return (
    <div className="flex items-center justify-center bg-black bg-opacity-75 min-w-12">
      {switchModal ? (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <img
              key={image}
              src={image}
              alt="サムネイル"
              className="rounded-full cursor-pointer"
              onClick={() => {
                handleImageClick(image);
                handleCloseModal();
              }}
            />
          ))}
          <button
            onClick={handleCloseModal}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            閉じる
          </button>
        </div>
      ) : selectedImage ? (
        <img
          src={selectedImage}
          alt="選択した画像"
          onClick={() => handleOpenModal()}
          className={IconStyle}
        />
      ) : (
        <img
          src={defaultImage}
          alt="デフォルトの画像"
          onClick={() => handleOpenModal()}
          className={IconStyle}
        />
      )}
    </div>
  );
};

export default ModalItem;