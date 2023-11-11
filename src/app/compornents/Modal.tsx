import React, { useState } from 'react';

const images = ['/pokemon/001.png', '/pokemon/002.png']; 

const Modal: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const [switchModal, setswitchModal] = useState(false); 
  const handleOpenModal = () => {
    setswitchModal(true)
  };
  
  const handleCloseModal = () => {
    setswitchModal(false); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {
        switchModal ? (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image) => (
              <img
                key={image}
                src={image}
                alt="サムネイル"
                className="rounded-full cursor-pointer"
                onClick={() => {handleImageClick(image); handleCloseModal();}} 
              />
            ))}
            <button
              onClick={handleCloseModal}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              閉じる
            </button>
          </div>
        )
        : (selectedImage ? (<img src={selectedImage} alt="デフォルトの画像" onClick={() => handleOpenModal()} className="rounded-full , selectedImage"/>)
        : <img src="/pokemon/001.png" alt="デフォルトの画像" onClick={() => handleOpenModal()} className="rounded-full" />
        )
      }
    </div>
  );
};

export default Modal;

