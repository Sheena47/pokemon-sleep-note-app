import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Image from 'next/image';
import TextArea from './TextArea';

const pokemons = ['/pokemon/001.png', '/pokemon/002.png', '/pokemon/003.png', '/pokemon/004.png', '/pokemon/005.png', '/pokemon/006.png', '/pokemon/007.png', '/pokemon/008.png', '/pokemon/009.png',];
const ingredients = ['/Ingredients/beansausage.png', '/Ingredients/fancyapple.png', '/Ingredients/fancyegg.png', '/Ingredients/fieryherb.png', '/Ingredients/greengrasssoybeans.png', '/ingredients/honey.png', '/Ingredients/largeleek.png', '/Ingredients/moomoomilk.png', '/Ingredients/pureoil.png', '/Ingredients/slowpoketail.png', '/ingredients/snoozytomato.png', '/ingredients/softpotato.png', '/Ingredients/soothingcacao.png', '/Ingredients/tastymushroom.png', '/Ingredients/warmingginger.png',];
const berries = ['/berries/belueberry.png' , '/berries/blukberry.png' , '/berries/cheriberry.png' , '/berries/chestoberry.png' , '/berries/durinberry.png' , '/berries/figyberry.png' , '/berries/grepaberry.png' , '/berries/leppaberry.png' , '/berries/lumberry.png' , '/berries/magoberry.png' , '/berries/oranberry.png' , '/berries/pamtreberry.png' , '/berries/pechaberry.png' , '/berries/persimberry.png' , '/berries/sitrusberry.png' , '/berries/wikiberry.png' , '/berries/yacheberry.png'];
const defaultPokemon = '/pokemon/001.png';
const defaultIngredient = '/Ingredients/fancyapple.png'
const defaultBerry = '/berries/leppaberry.png'
const options = ['エナジーチャージS', 'エナジーチャージM', 'ゆめのかけらゲットS', 'げんきエールS', 'げんきチャージS', 'げんきオールS', 'おてつだいサポートS', '食材ゲットS', '料理パワーアップS', 'ゆびをふる'];

const Card = () => {
    const [selectedItems, setSelectedItems] = useState<{ [key: string]: string | null }>({
        pokemon: null,
        berry: null,
        ingredient1: null,
        ingredient2: null,
        ingredient3: null,
    });
    const [modalOpen, setModalOpen] = useState<{ [key: string]: boolean }>({
        pokemon: false,
        berry: false,
        ingredient1: false,
        ingredient2: false,
        ingredient3: false,
        textArea: false,
    });

    const handleItemClick = (type: string, image: string) => {
        setSelectedItems(prev => ({ ...prev, [type]: image }));
    };
    
    const handleOpenModal = (type: string) => {
        setModalOpen(prev => ({ ...prev, [type]: true }));
    };

    const handleCloseModal = (item: string) => {
        setModalOpen(prevState => ({ ...prevState, [item]: false }));
    };

    const handleTextAreaToggleModal = () => {
        setModalOpen(prevState => ({ ...prevState, textArea: !prevState.textArea }));
    };

  return (
    <div className='flex justify-center flex-col mb-2  w-screen max-w-[650px] rounded bg-slate-200 dark:bg-slate-800'>
        <div className='flex justify-end'>
            <Image
                src='/gadget24-removebg-preview.png'
                alt='Modal Icon'
                width={40}
                height={40}
                onClick={handleTextAreaToggleModal}
            />
            {modalOpen.textArea && (
                <div className='flex flex-col justify-center fixed inset-0 bg-slate-900/90'>
                    <button
                        className='absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-4xl'
                        onClick={handleTextAreaToggleModal}
                        >
                        &#x2715;
                    </button>
                    <div className='flex'>
                        <Image
                            src={selectedItems.pokemon || defaultPokemon}
                            alt={selectedItems.pokemon ? "選択した画像" : "デフォルトの画像"}
                            className="rounded-full max-h-[80px]"
                            width={80}
                            height={80}
                            onClick={() => handleItemClick('pokemon', selectedItems.pokemon || defaultPokemon)}
                        />
                        <Image
                                src={selectedItems.berry || defaultBerry}
                                alt={selectedItems.berry ? "選択した画像" : "デフォルトの画像"}
                                width={40}
                                height={40}
                                className="rounded-full max-h-[40px]"
                                onClick={() => handleItemClick('berry', selectedItems.berry || defaultBerry)}
                            />
                        <Image
                            src={selectedItems.ingredient1 || defaultIngredient}
                            alt={selectedItems.ingredient1 ? "選択した画像" : "デフォルトの画像"}
                            width={40}
                            height={40}
                            onClick={() => handleItemClick('ingredient1', selectedItems.ingredient1 || defaultIngredient)}
                            className="rounded-full max-h-[40px]"
                        />
                        <Image
                            src={selectedItems.ingredient2 || defaultIngredient}
                            alt={selectedItems.ingredient2 ? "選択した画像" : "デフォルトの画像"}
                            width={40}
                            height={40}
                            onClick={() => handleItemClick('ingredient2', selectedItems.ingredient2 || defaultIngredient)}
                            className="rounded-full max-h-[40px]"
                        />
                        <Image
                            src={selectedItems.ingredient3 || defaultIngredient}
                            alt={selectedItems.ingredient3 ? "選択した画像" : "デフォルトの画像"}
                            width={40}
                            height={40}
                            onClick={() => handleItemClick('ingredient3', selectedItems.ingredient3 || defaultIngredient)}
                            className="rounded-full max-h-[40px]"
                        />
                    </div>
                    <TextArea
                        label="Your Label"
                        placeholder="Type something here..."
                        rows={5}
                        maxLength={140}
                        className='text-white'
                    />
                </div>
            )}
        </div>
        {/* pokemons */}
        <div className="flex items-center justify-center bg-opacity-75">
            {modalOpen.pokemon && (
                <div className="flex items-center justify-center fixed inset-0 bg-slate-900/90">
                    <div className="grid grid-cols-3 gap-4">
                        {pokemons.map((image) => (
                            <Image
                                key={image}
                                src={image}
                                alt="サムネイル"
                                width={80}
                                height={80}
                                className="rounded-full cursor-pointer"
                                onClick={() => {
                                handleItemClick('pokemon', image);
                                handleCloseModal('pokemon');
                                }}
                            />
                        ))}
                        <button
                        onClick={() => handleCloseModal('pokemon')}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md h-12"
                        >
                        閉じる
                        </button>
                    </div>
                </div>
            )}
            <Image
                src={selectedItems.pokemon || defaultPokemon}
                alt={selectedItems.pokemon ? "選択した画像" : "デフォルトの画像"}
                className="rounded-full max-h-[80px]"
                width={80}
                height={80}
                onClick={() =>handleOpenModal('pokemon')}
            />
        </div>
        <div className='flex justify-between'>
            <div>
                <Dropdown options={options} />
            </div>
            <div className='flex'>
                {/* berry */}
                <div className="flex items-center justify-center bg-opacity-75">
                    {modalOpen.berry && (
                        <div className="flex items-center justify-center fixed inset-0 bg-slate-900/90">
                            <div className="grid grid-cols-3 gap-4">
                                {berries.map((image) => (
                                    <Image
                                        key={image}
                                        src={image}
                                        alt="サムネイル"
                                        width={80}
                                        height={80}
                                        className="rounded-full cursor-pointer"
                                        onClick={() => {
                                            handleItemClick('berry', image);
                                            handleCloseModal('berry');
                                        }}
                                    />
                                ))}
                                <button
                                onClick={() => handleCloseModal('berry')}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md h-12"
                                >
                                閉じる
                                </button>
                            </div>
                        </div>
                    )}
                    <Image
                        src={selectedItems.berry || defaultBerry}
                        alt={selectedItems.berry ? "選択した画像" : "デフォルトの画像"}
                        width={40}
                        height={40}
                        className="rounded-full max-h-[40px]"
                        onClick={() => handleOpenModal('berry')}
                    />
                </div>
                {/* Ingredient */}
                <div className="flex items-center justify-center bg-opacity-75">
                    {modalOpen.ingredient1 && (
                        <div className="flex items-center justify-center fixed inset-0 bg-slate-900/90">
                            <div className="grid grid-cols-3 gap-4">
                                {ingredients.map((image) => (
                                    <Image
                                        key={image}
                                        src={image}
                                        alt="サムネイル"
                                        width={80}
                                        height={80}
                                        className="rounded-full cursor-pointer"
                                        onClick={() => {
                                            handleItemClick('ingredient1', image);
                                            handleCloseModal('ingredient1');
                                        }}
                                    />
                                ))}
                                <button
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md h-12"
                                onClick={() => handleCloseModal('ingredient1')}
                                >
                                閉じる
                                </button>
                            </div>
                        </div>
                    )}
                    <Image
                        src={selectedItems.ingredient1 || defaultIngredient}
                        alt={selectedItems.ingredient1 ? "選択した画像" : "デフォルトの画像"}
                        width={40}
                        height={40}
                        onClick={() => handleOpenModal('ingredient1')}
                        className="rounded-full max-h-[40px]"
                    />
                </div>
                <div className="flex items-center justify-center bg-opacity-75">
                    {modalOpen.ingredient2 && (
                        <div className="flex items-center justify-center fixed inset-0 bg-slate-900/90">
                            <div className="grid grid-cols-3 gap-4">
                                {ingredients.map((image) => (
                                    <Image
                                        key={image}
                                        src={image}
                                        alt="サムネイル"
                                        className="rounded-full cursor-pointer"
                                        width={80}
                                        height={80}
                                        onClick={() => {
                                            handleItemClick('ingredient2', image);
                                            handleCloseModal('ingredient2');
                                        }}
                                    />
                                ))}
                                <button
                                onClick={() => handleCloseModal('ingredient2')}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md h-12"
                                >
                                閉じる
                                </button>
                            </div>
                        </div>
                    )}
                    <Image
                        src={selectedItems.ingredient2 || defaultIngredient}
                        alt={selectedItems.ingredient2 ? "選択した画像" : "デフォルトの画像"}
                        width={40}
                        height={40}
                        onClick={() => handleOpenModal('ingredient2')}
                        className="rounded-full max-h-[40px]"
                    />
                </div>
                <div className="flex items-center justify-center bg-opacity-75">
                    {modalOpen.ingredient3 && (
                        <div className="flex items-center justify-center fixed inset-0 bg-slate-900/90">
                            <div className="grid grid-cols-3 gap-4">
                                {ingredients.map((image) => (
                                    <Image
                                        key={image}
                                        src={image}
                                        alt="サムネイル"
                                        className="rounded-full cursor-pointer"
                                        width={80}
                                        height={80}
                                        onClick={() => {
                                            handleItemClick('ingredient3', image);
                                            handleCloseModal('ingredient3');
                                        }}
                                    />
                                ))}
                                <button
                                onClick={() => handleCloseModal('ingredient3')}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md h-12"
                                >
                                閉じる
                                </button>
                            </div>
                        </div>
                    )}
                    <Image
                        src={selectedItems.ingredient3 || defaultIngredient}
                        alt={selectedItems.ingredient3 ? "選択した画像" : "デフォルトの画像"}
                        width={40}
                        height={40}
                        onClick={() => handleOpenModal('ingredient3')}
                        className="rounded-full max-h-[40px]"
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card