import React, { useState } from 'react';

type Props = {
  images: string[];
  defaultImage: string;
  IconStyle: string;
};

const ModalItem: React.FC<Props> = ({ images, defaultImage, IconStyle }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center bg-black bg-opacity-75 min-w-12">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="grid grid-cols-3 gap-4">
            {images.map((image) => (
              <img
                key={image}
                src={image}
                alt="サムネイル"
                className="rounded-full cursor-pointer"
                onClick={() => {
                  setSelectedImage(image);
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
        </div>
      )}
      <img
        src={selectedImage || defaultImage}
        alt={selectedImage ? "選択した画像" : "デフォルトの画像"}
        onClick={() => handleImageClick(selectedImage || defaultImage)}
        className={IconStyle}
      />
    </div>
  );
};

export default ModalItem;
