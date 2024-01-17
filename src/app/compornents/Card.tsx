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
        'ingredient1': ['/ingredients/honey.png'],
        'ingredient2': ['/ingredients/honey.png', '/ingredients/snoozytomato.png'],
        'ingredient3': ['/ingredients/honey.png', '/ingredients/snoozytomato.png', '/ingredients/softpotato.png'],
    };

    const itemMap: { [key: string]: { berry: string, ingredient: string } } = {
        '/pokemons/001.png': { berry: '/berries/durinberry.png', ingredient: '/ingredients/honey.png' },
        '/pokemons/002.png': { berry: '/berries/durinberry.png', ingredient: '/ingredients/honey.png' },
        '/pokemons/003.png': { berry: '/berries/durinberry.png', ingredient: '/ingredients/honey.png' },
        '/pokemons/004.png': { berry: '/berries/leppaberry.png', ingredient: '/Ingredients/beansausage.png' },
        '/pokemons/005.png': { berry: '/berries/leppaberry.png', ingredient: '/Ingredients/beansausage.png' },
        '/pokemons/006.png': { berry: '/berries/leppaberry.png', ingredient: '/Ingredients/beansausage.png' },
        '/pokemons/007.png': { berry: '/berries/oranberry.png', ingredient: '/Ingredients/moomoomilk.png' },
        '/pokemons/008.png': { berry: '/berries/oranberry.png', ingredient: '/Ingredients/moomoomilk.png' },
        '/pokemons/009.png': { berry: '/berries/oranberry.png', ingredient: '/Ingredients/moomoomilk.png' },
    };

    const handleItemClick = (type: string, image: string) => {
        if (type === 'pokemon') {
            const selectedItem = itemMap[image] || { berry: '/berries/durinberry.png', ingredient: '/ingredients/honey.png' };
            setSelectedItems(prev => ({
                ...prev,
                [type]: image,
                berry: selectedItem.berry,
                ingredient1: selectedItem.ingredient,
                ingredient2: selectedItem.ingredient,
                ingredient3: selectedItem.ingredient,
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

    const defaultImages = {
        pokemon: '/pokemons/001.png',
        berry: '/berries/durinberry.png',
        ingredient1: '/ingredients/honey.png',
        ingredient2: '/ingredients/honey.png',
        ingredient3: '/ingredients/honey.png',
    };   
    type ItemType = "pokemon" | "berry" | "ingredient1" | "ingredient2" | "ingredient3";
    type ItemModalProps = {
        itemType: ItemType;
        images: string[];
        selectedItems: any;
        itemMap: any;
        ingredientHighlightMap: any;
        modalOpen: any;
        handleCloseModal: any;
        handleItemClick: any;
    }; 

    const ItemModal = ({ itemType, images, selectedItems, itemMap, ingredientHighlightMap, modalOpen, handleCloseModal, handleItemClick }: ItemModalProps) => {
        return (
            <div className="flex items-center justify-center bg-opacity-75">
                {modalOpen[itemType] && (
                    <div onClick={() => handleCloseModal(itemType)} className={itemType === 'pokemon' ? "flex justify-center fixed top-0 left-0 pt-12 w-full h-full overflow-y-scroll bg-slate-900/90" : "flex items-center justify-center fixed inset-0 bg-slate-900/90"}>
                        <div className={`grid ${itemType === 'pokemon' ? 'grid-cols-5' : 'grid-cols-3'}`}>
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
                                    priority={index === 0} // 最初の画像にpriorityを設定
                                    className={`rounded-full cursor-pointer ${
                                        (itemType !== 'pokemon' && selectedItems[itemType] && ingredientHighlightMap[itemType]?.includes(image))
                                        ? '' // 選択された画像の明るさを変更しない
                                        : (itemType !== 'pokemon' && !['/pokemons/001.png', '/pokemons/002.png', '/pokemons/003.png'].includes(image)) ? 'filter brightness-50' : '' // それ以外の画像の明るさを50%に設定、ただしpokemonの場合は適用しない
                                    }`}
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
                    width={itemType === 'pokemon' ? 80 : 40}
                    height={itemType === 'pokemon' ? 80 : 40}
                    onClick={() => handleOpenModal(itemType)}
                    className={`rounded-full ${itemType === 'pokemon' ? 'max-h-[80px]' : 'max-h-[40px]'}`}
                />
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
            <ItemModal itemType="pokemon" images={pokemonImages} selectedItems={selectedItems} itemMap={itemMap} ingredientHighlightMap={ingredientHighlightMap} modalOpen={modalOpen} handleCloseModal={handleCloseModal} handleItemClick={handleItemClick} />
            <div className='flex justify-between'>
                <div>
                    <Dropdown options={options} />
                </div>
                <div className='flex'>
                    <ItemModal itemType="berry" images={berryImages} selectedItems={selectedItems} itemMap={itemMap} ingredientHighlightMap={ingredientHighlightMap} modalOpen={modalOpen} handleCloseModal={handleCloseModal} handleItemClick={handleItemClick} />
                    <ItemModal itemType="ingredient1" images={ingredientImages} selectedItems={selectedItems} itemMap={itemMap} ingredientHighlightMap={ingredientHighlightMap} modalOpen={modalOpen} handleCloseModal={handleCloseModal} handleItemClick={handleItemClick} />
                    <ItemModal itemType="ingredient2" images={ingredientImages} selectedItems={selectedItems} itemMap={itemMap} ingredientHighlightMap={ingredientHighlightMap} modalOpen={modalOpen} handleCloseModal={handleCloseModal} handleItemClick={handleItemClick} />
                    <ItemModal itemType="ingredient3" images={ingredientImages} selectedItems={selectedItems} itemMap={itemMap} ingredientHighlightMap={ingredientHighlightMap} modalOpen={modalOpen} handleCloseModal={handleCloseModal} handleItemClick={handleItemClick} />
                </div>
            </div>
        </div>
    )
}

export default Card;