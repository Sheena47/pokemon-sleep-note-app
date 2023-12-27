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
    const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
    const [selectedBerry, setSelectedBerry] = useState<string | null>(null);
    const [selectedIngredient1, setSelectedIngredient1] = useState<string | null>(null);
    const [selectedIngredient2, setSelectedIngredient2] = useState<string | null>(null);
    const [selectedIngredient3, setSelectedIngredient3] = useState<string | null>(null);

    const [isPokemonModalOpen, setIsPokemonModalOpen] = useState(false);
    const [isBerryModalOpen, setIsBerryModalOpen] = useState(false);
    const [isIngredient1ModalOpen, setIsIngredient1ModalOpen] = useState(false);
    const [isIngredient2ModalOpen, setIsIngredient2ModalOpen] = useState(false);
    const [isIngredient3ModalOpen, setIsIngredient3ModalOpen] = useState(false);
    const [isTextAreaModalOpen, setIsTextAreaModalOpen] = useState(false);

    const handlePokemonClick = (image: string) => {
        setSelectedPokemon(image);
        setIsPokemonModalOpen(true);
    };
    const handlePokemonCloseModal = () => {
        setIsPokemonModalOpen(false);
    };

    const handleBerryClick = (image: string) => {
        setSelectedBerry(image);
        setIsBerryModalOpen(true);
    };
    const handleBerryCloseModal = () => {
        setIsBerryModalOpen(false);
    };
    
    const handleIngredient1Click = (image: string) => {
        setSelectedIngredient1(image);
        setIsIngredient1ModalOpen(true);
    };
    const handleIngredient1CloseModal = () => {
        setIsIngredient1ModalOpen(false);
    };

    const handleIngredient2Click = (image: string) => {
        setSelectedIngredient2(image);
        setIsIngredient2ModalOpen(true);
    };
    const handleIngredient2CloseModal = () => {
        setIsIngredient2ModalOpen(false);
    };

    const handleIngredient3Click = (image: string) => {
        setSelectedIngredient3(image);
        setIsIngredient3ModalOpen(true);
    };
    const handleIngredient3CloseModal = () => {
        setIsIngredient3ModalOpen(false)
    };

    const handleTextAreaToggleModal = () => {
        setIsTextAreaModalOpen(!isTextAreaModalOpen);
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
            {isTextAreaModalOpen && (
                <div className='flex flex-col justify-center fixed inset-0 bg-slate-900/90'>
                    <button
                        className='absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-4xl'
                        onClick={handleTextAreaToggleModal}
                        >
                        &#x2715;
                    </button>
                    <div className='flex'>
                        <Image
                            src={selectedPokemon || defaultPokemon}
                            alt={selectedPokemon ? "選択した画像" : "デフォルトの画像"}
                            className="rounded-full max-h-[80px]"
                            width={80}
                            height={80}
                            onClick={() => handlePokemonClick(selectedPokemon || defaultPokemon)}
                        />
                        <Image
                                src={selectedBerry || defaultBerry}
                                alt={selectedBerry ? "選択した画像" : "デフォルトの画像"}
                                width={40}
                                height={40}
                                className="rounded-full max-h-[40px]"
                                onClick={() => handleBerryClick(selectedBerry || defaultBerry)}
                            />
                        <Image
                            src={selectedIngredient1 || defaultIngredient}
                            alt={selectedIngredient1 ? "選択した画像" : "デフォルトの画像"}
                            width={40}
                            height={40}
                            onClick={() => handleIngredient1Click(selectedIngredient1 || defaultIngredient)}
                            className="rounded-full max-h-[40px]"
                        />
                        <Image
                            src={selectedIngredient2 || defaultIngredient}
                            alt={selectedIngredient2 ? "選択した画像" : "デフォルトの画像"}
                            width={40}
                            height={40}
                            onClick={() => handleIngredient2Click(selectedIngredient2 || defaultIngredient)}
                            className="rounded-full max-h-[40px]"
                        />
                        <Image
                            src={selectedIngredient3 || defaultIngredient}
                            alt={selectedIngredient3 ? "選択した画像" : "デフォルトの画像"}
                            width={40}
                            height={40}
                            onClick={() => handleIngredient3Click(selectedIngredient3 || defaultIngredient)}
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
            {isPokemonModalOpen && (
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
                                setSelectedPokemon(image);
                                handlePokemonCloseModal();
                                }}
                            />
                        ))}
                        <button
                        onClick={handlePokemonCloseModal}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md h-12"
                        >
                        閉じる
                        </button>
                    </div>
                </div>
            )}
            <Image
                src={selectedPokemon || defaultPokemon}
                alt={selectedPokemon ? "選択した画像" : "デフォルトの画像"}
                className="rounded-full max-h-[80px]"
                width={80}
                height={80}
                onClick={() => handlePokemonClick(selectedPokemon || defaultPokemon)}
            />
        </div>
        <div className='flex justify-between'>
            <div>
                <Dropdown options={options} />
            </div>
            <div className='flex'>
                {/* berry */}
                <div className="flex items-center justify-center bg-opacity-75">
                    {isBerryModalOpen && (
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
                                            setSelectedBerry(image);
                                            handleBerryCloseModal();
                                        }}
                                    />
                                ))}
                                <button
                                onClick={handleBerryCloseModal}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md h-12"
                                >
                                閉じる
                                </button>
                            </div>
                        </div>
                    )}
                    <Image
                        src={selectedBerry || defaultBerry}
                        alt={selectedBerry ? "選択した画像" : "デフォルトの画像"}
                        width={40}
                        height={40}
                        className="rounded-full max-h-[40px]"
                        onClick={() => handleBerryClick(selectedBerry || defaultBerry)}
                    />
                </div>
                {/* Ingredient */}
                <div className="flex items-center justify-center bg-opacity-75">
                    {isIngredient1ModalOpen && (
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
                                            setSelectedIngredient1(image);
                                            handleIngredient1CloseModal();
                                        }}
                                    />
                                ))}
                                <button
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md h-12"
                                onClick={handleIngredient1CloseModal}
                                >
                                閉じる
                                </button>
                            </div>
                        </div>
                    )}
                    <Image
                        src={selectedIngredient1 || defaultIngredient}
                        alt={selectedIngredient1 ? "選択した画像" : "デフォルトの画像"}
                        width={40}
                        height={40}
                        onClick={() => handleIngredient1Click(selectedIngredient1 || defaultIngredient)}
                        className="rounded-full max-h-[40px]"
                    />
                </div>
                <div className="flex items-center justify-center bg-opacity-75">
                    {isIngredient2ModalOpen && (
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
                                            setSelectedIngredient2(image);
                                            handleIngredient2CloseModal();
                                        }}
                                    />
                                ))}
                                <button
                                onClick={handleIngredient2CloseModal}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md h-12"
                                >
                                閉じる
                                </button>
                            </div>
                        </div>
                    )}
                    <Image
                        src={selectedIngredient2 || defaultIngredient}
                        alt={selectedIngredient2 ? "選択した画像" : "デフォルトの画像"}
                        width={40}
                        height={40}
                        onClick={() => handleIngredient2Click(selectedIngredient2 || defaultIngredient)}
                        className="rounded-full max-h-[40px]"
                    />
                </div>
                <div className="flex items-center justify-center bg-opacity-75">
                    {isIngredient3ModalOpen && (
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
                                            setSelectedIngredient3(image);
                                            handleIngredient3CloseModal();
                                        }}
                                    />
                                ))}
                                <button
                                onClick={handleIngredient3CloseModal}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md h-12"
                                >
                                閉じる
                                </button>
                            </div>
                        </div>
                    )}
                    <Image
                        src={selectedIngredient3 || defaultIngredient}
                        alt={selectedIngredient3 ? "選択した画像" : "デフォルトの画像"}
                        width={40}
                        height={40}
                        onClick={() => handleIngredient3Click(selectedIngredient3 || defaultIngredient)}
                        className="rounded-full max-h-[40px]"
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card