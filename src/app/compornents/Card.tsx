import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import Image from 'next/image';
import TextArea from './TextArea';

const defaultPokemon = '/pokemon/001.png';
const defaultIngredient = '/ingredients/honey.png'
const defaultBerry = '/berries/durinberry.png'
const options = ['エナジーチャージS', 'エナジーチャージM', 'ゆめのかけらゲットS', 'げんきエールS', 'げんきチャージS', 'げんきオールS', 'おてつだいサポートS', '食材ゲットS', '料理パワーアップS', 'ゆびをふる'];

const Card = () => {
    const [pokemonImages, setPokemonImages] = useState<string[]>([]);
    const [ingredientImages, setIngredientImages] = useState<string[]>([]);
    const [berryImages, setBerryImages] = useState<string[]>([]);
    
    useEffect(() => {
        const fetchPokemonImages = async () => {
            const response = await fetch('http://localhost:3000/api/getPokemonImages');
            const data = await response.json();
            setPokemonImages(data.pokemonImages);
            // 取得した画像パスの配列を使って必要な処理を行う
        };
        fetchPokemonImages();
    }, []);
    
    useEffect(() => {
        const fetchIngredientImages = async () => {
            const response = await fetch('http://localhost:3000/api/getIngredientImages');
            const data = await response.json();
            setIngredientImages(data.ingredientImages);
            // 取得した画像パスの配列を使って必要な処理を行う
        };
        fetchIngredientImages();
    }, []);
    
    useEffect(() => {
        const fetchBerryImages = async () => {
            const response = await fetch('http://localhost:3000/api/getBerryImages');
            const data = await response.json();
            setBerryImages(data.berryImages);
            // 取得した画像パスの配列を使って必要な処理を行う
        };
        fetchBerryImages();
    }, []);
    
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
        if (type === 'pokemon') {
            const berryMap: { [key: string]: string } = {
                '/pokemon/001.png': '/berries/durinberry.png',
                '/pokemon/002.png': '/berries/durinberry.png',
                '/pokemon/003.png': '/berries/durinberry.png',
                '/pokemon/004.png': '/berries/leppaberry.png',
                '/pokemon/005.png': '/berries/leppaberry.png',
                '/pokemon/006.png': '/berries/leppaberry.png',
                '/pokemon/007.png': '/berries/oranberry.png',
                '/pokemon/008.png': '/berries/oranberry.png',
                '/pokemon/009.png': '/berries/oranberry.png',
            };
            const ingredientMap: { [key: string]: string } = {
                '/pokemon/001.png': '/ingredients/honey.png',
                '/pokemon/002.png': '/ingredients/honey.png',
                '/pokemon/003.png': '/ingredients/honey.png',
                '/pokemon/004.png': '/Ingredients/beansausage.png',
                '/pokemon/005.png': '/Ingredients/beansausage.png',
                '/pokemon/006.png': '/Ingredients/beansausage.png',
                '/pokemon/007.png': '/Ingredients/moomoomilk.png',
                '/pokemon/008.png': '/Ingredients/moomoomilk.png',
                '/pokemon/009.png': '/Ingredients/moomoomilk.png',
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
                                            (selectedItems.pokemon === '/pokemon/001.png' || 
                                            selectedItems.pokemon === '/pokemon/002.png' || 
                                            selectedItems.pokemon === '/pokemon/003.png') && 
                                            (image !== '/ingredients/honey.png') 
                                            ? 'filter brightness-50' 
                                            : (selectedItems.pokemon === '/pokemon/004.png' || 
                                            selectedItems.pokemon === '/pokemon/005.png' || 
                                            selectedItems.pokemon === '/pokemon/006.png') && 
                                            (image !== '/Ingredients/beansausage.png') 
                                            ? 'filter brightness-50' 
                                            : (selectedItems.pokemon === '/pokemon/007.png' || 
                                            selectedItems.pokemon === '/pokemon/008.png' || 
                                            selectedItems.pokemon === '/pokemon/009.png') && 
                                            (image !== '/Ingredients/moomoomilk.png') 
                                            ? 'filter brightness-50' 
                                            : ''
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
                                        (selectedItems.pokemon === '/pokemon/001.png' || 
                                        selectedItems.pokemon === '/pokemon/002.png' || 
                                        selectedItems.pokemon === '/pokemon/003.png') && 
                                        (image !== '/ingredients/honey.png' && image !== '/ingredients/snoozytomato.png') 
                                        ? 'filter brightness-50' 
                                        : (selectedItems.pokemon === '/pokemon/004.png' || 
                                        selectedItems.pokemon === '/pokemon/005.png' || 
                                        selectedItems.pokemon === '/pokemon/006.png') && 
                                        (image !== '/Ingredients/beansausage.png' && image !== '/Ingredients/warmingginger.png') 
                                        ? 'filter brightness-50' 
                                        : (selectedItems.pokemon === '/pokemon/007.png' || 
                                        selectedItems.pokemon === '/pokemon/008.png' || 
                                        selectedItems.pokemon === '/pokemon/009.png') && 
                                        (image !== '/Ingredients/moomoomilk.png' && image !== '/Ingredients/soothingcacao.png') 
                                        ? 'filter brightness-50' 
                                        : ''
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
                                            (selectedItems.pokemon === '/pokemon/001.png' || 
                                            selectedItems.pokemon === '/pokemon/002.png' || 
                                            selectedItems.pokemon === '/pokemon/003.png') && 
                                            (image !== '/ingredients/honey.png' && image !== '/ingredients/snoozytomato.png' && image !== '/ingredients/softpotato.png') 
                                            ? 'filter brightness-50' 
                                            : (selectedItems.pokemon === '/pokemon/004.png' || 
                                            selectedItems.pokemon === '/pokemon/005.png' || 
                                            selectedItems.pokemon === '/pokemon/006.png') && 
                                            (image !== '/Ingredients/beansausage.png' && image !== '/Ingredients/warmingginger.png' && image !== '/Ingredients/fieryherb.png') 
                                            ? 'filter brightness-50' 
                                            : (selectedItems.pokemon === '/pokemon/007.png' || 
                                            selectedItems.pokemon === '/pokemon/008.png' || 
                                            selectedItems.pokemon === '/pokemon/009.png') && 
                                            (image !== '/Ingredients/moomoomilk.png' && image !== '/Ingredients/soothingcacao.png' && image !== '/Ingredients/beansausage.png') 
                                            ? 'filter brightness-50' 
                                            : ''
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