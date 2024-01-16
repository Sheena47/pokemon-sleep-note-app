import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Image from 'next/image';
import TextArea from './TextArea';

const options = ['エナジーチャージS', 'エナジーチャージM', 'ゆめのかけらゲットS', 'げんきエールS', 'げんきチャージS', 'げんきオールS', 'おてつだいサポートS', '食材ゲットS', '料理パワーアップS', 'ゆびをふる'];

const API_ENDPOINTS = {
    pokemon: 'http://localhost:3000/api/getPokemonImages',
    ingredient: 'http://localhost:3000/api/getIngredientImages',
    berry: 'http://localhost:3000/api/getBerryImages',
};

const Card = () => {
    const [pokemonImages, setPokemonImages] = useState<string[]>([]);
    const [ingredientImages, setIngredientImages] = useState<string[]>([]);
    const [berryImages, setBerryImages] = useState<string[]>([]);

    const useFetchData = (url: string, setter: React.Dispatch<React.SetStateAction<string[]>>, key: string) => {
        useEffect(() => {
            fetchData(url, setter, key);
        }, []);
    }

    // Fetch data from API and update state
    const fetchData = async (endpoint: string, setState: React.Dispatch<React.SetStateAction<string[]>>, key: string) => {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data && Array.isArray(data[key])) {
                setState(data[key]);
            } else {
                console.error(`Data from ${endpoint} is not an array.`);
            }
        } catch (error) {
            console.error('Failed to fetch data: ', error);
        }
    };

    useFetchData(API_ENDPOINTS.pokemon, setPokemonImages, 'pokemonImages');
    useFetchData(API_ENDPOINTS.ingredient, setIngredientImages, 'ingredientImages');
    useFetchData(API_ENDPOINTS.berry, setBerryImages, 'berryImages');
    
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

    const ingredientHighlightMap: { [key: string]: string[] } = {
        'Ingredient1': ['/ingredients/honey.png'],
        'Ingredient2': ['/ingredients/honey.png', '/ingredients/snoozytomato.png'],
        'Ingredient3': ['/ingredients/honey.png', '/ingredients/snoozytomato.png', '/ingredients/softpotato.png'],
    };

    const handleItemClick = (type: string, image: string) => {
        if (type === 'pokemon') {
            const berryMap: { [key: string]: string } = {
                '/pokemons/001.png': '/berries/durinberry.png',
                '/pokemons/002.png': '/berries/durinberry.png',
                '/pokemons/003.png': '/berries/durinberry.png',
                '/pokemons/004.png': '/berries/leppaberry.png',
                '/pokemons/005.png': '/berries/leppaberry.png',
                '/pokemons/006.png': '/berries/leppaberry.png',
                '/pokemons/007.png': '/berries/oranberry.png',
                '/pokemons/008.png': '/berries/oranberry.png',
                '/pokemons/009.png': '/berries/oranberry.png',
            };
            const ingredientMap: { [key: string]: string } = {
                '/pokemons/001.png': '/ingredients/honey.png',
                '/pokemons/002.png': '/ingredients/honey.png',
                '/pokemons/003.png': '/ingredients/honey.png',
                '/pokemons/004.png': '/Ingredients/beansausage.png',
                '/pokemons/005.png': '/Ingredients/beansausage.png',
                '/pokemons/006.png': '/Ingredients/beansausage.png',
                '/pokemons/007.png': '/Ingredients/moomoomilk.png',
                '/pokemons/008.png': '/Ingredients/moomoomilk.png',
                '/pokemons/009.png': '/Ingredients/moomoomilk.png',
            };
            const selectedBerry = berryMap[image] || '/berries/durinberry.png';
            const selectedIngredient = ingredientMap[image] || '/ingredients/honey.png';
            setSelectedItems(prev => ({
                ...prev,
                [type]: image,
                berry: selectedBerry,
                ingredient1: selectedIngredient,
                ingredient2: selectedIngredient,
                ingredient3: selectedIngredient,
            }));
        } else {
            setSelectedItems(prev => ({ ...prev, [type]: image }));
        }
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

    const TextAreaModalIcon = ({ type, selectedItem, defaultImage, onClick }: { type: string, selectedItem: string, defaultImage: string, onClick: (type: string, image: string) => void }) => {
        return (
            <Image
                src={selectedItem || defaultImage}
                alt={selectedItem ? "選択した画像" : "デフォルトの画像"}
                width={40}
                height={40}
                onClick={() => onClick(type, selectedItem || defaultImage)}
                className="rounded-full max-h-[40px]"
            />
        );
    };
    
    const TextAreaModal = ({ selectedItems, onClose }: { selectedItems: any, onClose: () => void }) => {
        return (
            <div onClick={onClose} className='flex flex-col items-center justify-center fixed inset-0 bg-slate-900/90'>
                <div className='w-full max-w-[650px]'>
                    <button
                        className='absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-4xl'
                        onClick={onClose}
                        >
                        &#x2715;
                    </button>
                    <div className='flex'>
                        <TextAreaModalIcon type='pokemon' selectedItem={selectedItems.pokemon} defaultImage='/pokemons/001.png' onClick={handleItemClick} />
                        <TextAreaModalIcon type='berry' selectedItem={selectedItems.berry} defaultImage='/berries/durinberry.png' onClick={handleItemClick} />
                        <TextAreaModalIcon type='ingredient1' selectedItem={selectedItems.ingredient1} defaultImage='/ingredients/honey.png' onClick={handleItemClick} />
                        <TextAreaModalIcon type='ingredient2' selectedItem={selectedItems.ingredient2} defaultImage='/ingredients/honey.png' onClick={handleItemClick} />
                        <TextAreaModalIcon type='ingredient3' selectedItem={selectedItems.ingredient3} defaultImage='/ingredients/honey.png' onClick={handleItemClick} />
                    </div>
                    <TextArea
                        label="Your Label"
                        placeholder="Type something here..."
                        rows={5}
                        maxLength={140}
                        className='text-white'
                    />
                </div>
            </div>
        );
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
                <TextAreaModal selectedItems={selectedItems} onClose={handleTextAreaToggleModal} />
            )}
        </div>
        {/* pokemons */}
        <div className="flex items-center justify-center bg-opacity-75">
            {modalOpen.pokemon && (
                <div onClick={() => handleCloseModal('pokemon')} className="flex justify-center fixed top-0 left-0 pt-12 w-full h-full overflow-y-scroll bg-slate-900/90">
                    <div className="grid grid-cols-5 gap-4">
                        {pokemonImages.map((image) => (
                            <Image
                                key={image}
                                src={image}
                                alt="サムネイル"
                                width={80}
                                height={80}
                                priority={true}
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
                src={selectedItems.pokemon || '/pokemons/001.png'}
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
                        <div onClick={() => handleCloseModal('berry')} className="flex items-center justify-center fixed inset-0 bg-slate-900/90">
                            <div className="grid grid-cols-3 gap-4">
                                {berryImages.map((image) => (
                                    <Image
                                        key={image}
                                        src={image}
                                        alt="サムネイル"
                                        width={80}
                                        height={80}
                                        className={`
                                            rounded-full cursor-pointer 
                                            ${
                                                selectedItems.pokemon && 
                                                (
                                                    selectedItems.pokemon === '/pokemon/001.png' || 
                                                    selectedItems.pokemon === '/pokemon/002.png' || 
                                                    selectedItems.pokemon === '/pokemon/003.png'
                                                ) && 
                                                image !== '/berries/durinberry.png' 
                                                ? 'filter brightness-50' 
                                                : 
                                                (
                                                    selectedItems.pokemon === '/pokemon/004.png' || 
                                                    selectedItems.pokemon === '/pokemon/005.png' || 
                                                    selectedItems.pokemon === '/pokemon/006.png'
                                                ) && 
                                                image !== '/berries/leppaberry.png' 
                                                ? 'filter brightness-50' 
                                                : 
                                                selectedItems.pokemon === '/pokemon/007.png' || 
                                                selectedItems.pokemon === '/pokemon/008.png' || 
                                                selectedItems.pokemon === '/pokemon/009.png' 
                                                ? image !== '/berries/oranberry.png' 
                                                ? 'filter brightness-50' 
                                                : ''
                                                : ''
                                            }
                                        `}
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
                        src={selectedItems.berry || '/berries/durinberry.png'}
                        alt={selectedItems.berry ? "選択した画像" : "デフォルトの画像"}
                        width={40}
                        height={40}
                        className="rounded-full max-h-[40px]"
                        onClick={() => handleOpenModal('berry')}
                    />
                </div>
                {/* Ingredient1 */}
                <div className="flex items-center justify-center bg-opacity-75">
                    {modalOpen.ingredient1 && (
                        <div onClick={() => handleCloseModal('ingredient1')} className="flex items-center justify-center fixed inset-0 bg-slate-900/90">
                            <div className="grid grid-cols-3 gap-4">
                                {ingredientImages.map((image) => (
                                    <Image
                                        key={image}
                                        src={image}
                                        alt="サムネイル"
                                        width={80}
                                        height={80}
                                        className={`rounded-full cursor-pointer ${
                                            selectedItems.pokemon && ['/pokemons/001.png', '/pokemons/002.png', '/pokemons/003.png'].includes(selectedItems.pokemon) && ingredientHighlightMap['Ingredient1'].includes(image)
                                            ? '' 
                                            : 'filter brightness-50'
                                        }`}
                                        onClick={() => {
                                            handleItemClick('ingredient1', image);
                                            handleCloseModal('ingredient1');
                                        }}
                                    />
                                ))}
                                <button
                                    onClick={() => handleCloseModal('ingredient1')}
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md h-12"
                                >
                                    閉じる
                                </button>
                            </div>
                        </div>
                    )}
                    <Image
                        src={selectedItems.ingredient1 || '/ingredients/honey.png'}
                        alt={selectedItems.ingredient1 ? "選択した画像" : "デフォルトの画像"}
                        width={40}
                        height={40}
                        onClick={() => handleOpenModal('ingredient1')}
                        className="rounded-full max-h-[40px]"
                    />
                </div>
                {/* Ingredient2 */}
                <div className="flex items-center justify-center bg-opacity-75">
                {modalOpen.ingredient2 && (
                    <div onClick={() => handleCloseModal('ingredient2')} className="flex items-center justify-center fixed inset-0 bg-slate-900/90">
                        <div className="grid grid-cols-3 gap-4">
                            {ingredientImages.map((image) => (
                                <Image
                                    key={image}
                                    src={image}
                                    alt="サムネイル"
                                    width={80}
                                    height={80}
                                    className={`rounded-full cursor-pointer ${
                                        selectedItems.pokemon &&['/pokemons/001.png', '/pokemons/002.png', '/pokemons/003.png'].includes(selectedItems.pokemon) && ingredientHighlightMap['Ingredient2'].includes(image)
                                        ? '' 
                                        : 'filter brightness-50'
                                    }`}
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
                        src={selectedItems.ingredient2 || '/ingredients/honey.png'}
                        alt={selectedItems.ingredient2 ? "選択した画像" : "デフォルトの画像"}
                        width={40}
                        height={40}
                        onClick={() => handleOpenModal('ingredient2')}
                        className="rounded-full max-h-[40px]"
                    />
                </div>
                {/* Ingredient3 */}
                <div className="flex items-center justify-center bg-opacity-75">
                    {modalOpen.ingredient3 && (
                        <div onClick={() => handleCloseModal('ingredient3')} className="flex items-center justify-center fixed inset-0 bg-slate-900/90">
                            <div className="grid grid-cols-3 gap-4">
                                {ingredientImages.map((image) => (
                                    <Image
                                        key={image}
                                        src={image}
                                        alt="サムネイル"
                                        width={80}
                                        height={80}
                                        className={`rounded-full cursor-pointer ${
                                            selectedItems.pokemon &&['/pokemons/001.png', '/pokemons/002.png', '/pokemons/003.png'].includes(selectedItems.pokemon) && ingredientHighlightMap['Ingredient3'].includes(image)
                                            ? '' 
                                            : 'filter brightness-50'
                                        }`}
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
                        src={selectedItems.ingredient3 || '/ingredients/honey.png'}
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