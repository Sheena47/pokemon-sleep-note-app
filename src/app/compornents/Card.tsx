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

const useFetchData = (url: string, setter: React.Dispatch<React.SetStateAction<string[]>>, key: string) => {
    useEffect(() => {
        fetchData(url, setter, key);
    }, [url, setter, key]);
}

enum ItemTypes {
    Pokemon = 'pokemon',
    Berry = 'berry',
    Ingredient1 = 'ingredient1',
    Ingredient2 = 'ingredient2',
    Ingredient3 = 'ingredient3',
}

enum ItemNumTypes {
    Pokemon = 'pokemon',
    Berry = 'berry',
    Ingredient1 = 'ingredient1',
    Ingredient2 = 'ingredient2',
    Ingredient3 = 'ingredient3',
}

const Card = () => {
    const [pokemonImages, setPokemonImages] = useState<string[]>([]);
    const [ingredientImages, setIngredientImages] = useState<string[]>([]);
    const [berryImages, setBerryImages] = useState<string[]>([]);


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

    const defaultImages = {
        pokemon: '/pokemons/001.png',
        berry: '/berries/durinberry.png',
        ingredient1: '/ingredients/honey.png',
        ingredient2: '/ingredients/honey.png',
        ingredient3: '/ingredients/honey.png',
    };   

    const [itemNums, setItemNums] = useState<{ [key: string]: any }>({
        berry: 0,
        ingredient1: 0,
        ingredient2: 0,
        ingredient3: 0,
    });

    const handleItemClick = (itemType: string, image: string) => {
        setSelectedItems(prevItems => {
            let newItems = { ...prevItems, [itemType]: image };
    
            if (itemType === ItemTypes.Pokemon) {
                if (['/pokemons/001.png', '/pokemons/002.png', '/pokemons/003.png'].includes(image)) {
                    newItems = { ...newItems, 'berry': '/berries/durinberry.png', 'ingredient1': '/ingredients/honey.png', 'ingredient2': '/ingredients/snoozytomato.png', 'ingredient3': '/ingredients/softpotato.png' };
                    setItemNums({ berry: 1, ingredient1: 2, ingredient2: 4, ingredient3: 6 });
                } else if (['/pokemons/004.png', '/pokemons/005.png', '/pokemons/006.png'].includes(image)) {
                    newItems = { ...newItems, 'berry': '/berries/leppaberry.png', 'ingredient1': '/ingredients/beansausage.png', 'ingredient2': '/ingredients/warmingginger.png', 'ingredient3': '/ingredients/fieryherb.png' };
                    setItemNums({ berry: 1, ingredient1: 2, ingredient2: 4, ingredient3: 6 });
                } else if (['/pokemons/007.png', '/pokemons/008.png', '/pokemons/009.png'].includes(image)) {
                    newItems = { ...newItems, 'berry': '/berries/oranberry.png', 'ingredient1': '/ingredients/moomoomilk.png', 'ingredient2': '/ingredients/soothingcacao.png', 'ingredient3': '/ingredients/beansausage.png' };
                    setItemNums({ berry: 1, ingredient1: 2, ingredient2: 3, ingredient3: 7 });
                }
            }
    
            return newItems;
        });
    };
    
    const handleOpenModal = (itemType: ItemTypes) => {
        setModalOpen(prevState => ({ ...prevState, [itemType]: true }));
    };
    
    const handleCloseModal = (itemType: ItemTypes) => {
        setModalOpen(prevState => ({ ...prevState, [itemType]: false }));
    };

    const handleTextAreaToggleModal = () => {
        setModalOpen(prevState => ({ ...prevState, textArea: !prevState.textArea }));
    };

    type TextAreaModalIconProps = {
        itemType: ItemTypes, 
        itemNum: ItemNumTypes,
        selectedItem: string,
        defaultImage: string, 
        onClick: (type: ItemTypes, image: string) => void,
    }; 

    const TextAreaModalIcon = ({ itemType, itemNum, selectedItem, defaultImage, onClick }: TextAreaModalIconProps) => {
        return (
            <div className='flex items-center'>
                <Image
                    src={selectedItem || defaultImage}
                    alt={selectedItem ? "選択した画像" : "デフォルトの画像"}
                    width={40}
                    height={40}
                    onClick={() => onClick(itemType, selectedItem || defaultImage)}
                    className="rounded-full max-h-[40px]"
                />
                {itemType !== ItemTypes.Pokemon && <span className="ml-2">{itemNums[itemNum]}</span>}
            </div>
        );
    };
    
    const TextAreaModal = ({ selectedItems, onClose }: { selectedItems: any, onClose: () => void }) => {
        return (
            <div onClick={onClose} className='flex flex-col items-center justify-center fixed inset-0 bg-slate-900/90'>
                <div className='w-full max-w-[650px]'>
                    <button
                        className='absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-4xl'
                        >
                        &#x2715;
                    </button>
                    <div className='flex'>
                        <TextAreaModalIcon itemType={ItemTypes.Pokemon} itemNum={ItemNumTypes.Pokemon} selectedItem={selectedItems.pokemon} defaultImage='/pokemons/001.png' onClick={handleItemClick} />
                        <TextAreaModalIcon itemType={ItemTypes.Berry} itemNum={ItemNumTypes.Berry} selectedItem={selectedItems.berry} defaultImage='/berries/durinberry.png' onClick={handleItemClick} />
                        <TextAreaModalIcon itemType={ItemTypes.Ingredient1} itemNum={ItemNumTypes.Ingredient1} selectedItem={selectedItems.ingredient1} defaultImage='/ingredients/honey.png' onClick={handleItemClick} />
                        <TextAreaModalIcon itemType={ItemTypes.Ingredient2} itemNum={ItemNumTypes.Ingredient2} selectedItem={selectedItems.ingredient2}  defaultImage='/ingredients/honey.png' onClick={handleItemClick} />
                        <TextAreaModalIcon itemType={ItemTypes.Ingredient3} itemNum={ItemNumTypes.Ingredient3} selectedItem={selectedItems.ingredient3}  defaultImage='/ingredients/honey.png' onClick={handleItemClick} />
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

    type ItemModalProps = {
        itemType: ItemTypes;
        itemNum: ItemNumTypes;
        images: string[];
        selectedItems: any;
        modalOpen: any;
        handleCloseModal: any;
        handleItemClick: any;
    }; 

    const ItemModal = ({ itemType, itemNum, images, selectedItems, modalOpen, handleCloseModal, handleItemClick }: ItemModalProps) => {
        return (
            <div className="flex items-center justify-center bg-opacity-75">
                {modalOpen[itemType] && (
                    <div onClick={() => handleCloseModal(itemType)} className={itemType === ItemTypes.Pokemon ? "flex justify-center fixed top-0 left-0 pt-12 w-full h-full overflow-y-scroll bg-slate-900/90" : "flex items-center justify-center fixed inset-0 bg-slate-900/90"}>
                        <div className={`grid ${itemType === ItemTypes.Pokemon ? 'grid-cols-5' : 'grid-cols-3'}`}>
                            <button
                                className='absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-4xl'
                                >
                                &#x2715;
                            </button>   
                            {images.map((image, index) => (
                                <Image
                                    key={image}
                                    src={image}
                                    alt="サムネイル"
                                    width={80}
                                    height={80}
                                    priority={index === 0} 
                                    className='rounded-full cursor-pointer'
                                    onClick={() => {
                                        handleItemClick(itemType, image);
                                        handleCloseModal(itemType);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <Image
                    src={selectedItems[itemType] || defaultImages[itemType]}
                    alt={selectedItems[itemType] ? "選択した画像" : "デフォルトの画像"}
                    width={itemType === ItemTypes.Pokemon ? 80 : 40}
                    height={itemType === ItemTypes.Pokemon ? 80 : 40}
                    onClick={() => handleOpenModal(itemType)}
                    className={'rounded-full'}
                />
                {itemType !== ItemTypes.Pokemon && <span className="ml-2">{itemNums[itemNum]}</span>}
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
                <ItemModal itemType={ItemTypes.Pokemon} itemNum={ItemNumTypes.Pokemon} images={pokemonImages} selectedItems={selectedItems} modalOpen={modalOpen} handleCloseModal={handleCloseModal} handleItemClick={handleItemClick} />
            <div className='flex justify-between'>
                <div>
                    <Dropdown options={options} />
                </div>
                <div className='flex'>
                    <ItemModal itemType={ItemTypes.Berry} itemNum={ItemNumTypes.Berry} images={berryImages} selectedItems={selectedItems} modalOpen={modalOpen} handleCloseModal={handleCloseModal} handleItemClick={handleItemClick} />
                    <ItemModal itemType={ItemTypes.Ingredient1} itemNum={ItemNumTypes.Ingredient1} images={ingredientImages} selectedItems={selectedItems} modalOpen={modalOpen} handleCloseModal={handleCloseModal} handleItemClick={handleItemClick} />
                    <ItemModal itemType={ItemTypes.Ingredient2} itemNum={ItemNumTypes.Ingredient2} images={ingredientImages} selectedItems={selectedItems} modalOpen={modalOpen} handleCloseModal={handleCloseModal} handleItemClick={handleItemClick} />
                    <ItemModal itemType={ItemTypes.Ingredient3} itemNum={ItemNumTypes.Ingredient3} images={ingredientImages} selectedItems={selectedItems} modalOpen={modalOpen} handleCloseModal={handleCloseModal} handleItemClick={handleItemClick} />
                </div>
            </div>
        </div>
    )
}

export default Card;