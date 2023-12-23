'use client'
import React, { useState } from 'react';
import Image from 'next/image'
import ModalItem from './Modal/ModalItem';
import Dropdown from './Dropdown';
import { useTheme } from 'next-themes';
import MemoInput from './MemoPokemon';

const pokemons = ['/pokemon/001.png', '/pokemon/002.png', '/pokemon/003.png', '/pokemon/004.png', '/pokemon/005.png', '/pokemon/006.png', '/pokemon/007.png', '/pokemon/008.png', '/pokemon/009.png',];
const ingredients = ['/Ingredients/beansausage.png', 'Ingredients/fancyapple.png', 'Ingredients/fancyegg.png', '/Ingredients/fieryherb.png', '/Ingredients/greengrasssoybeans.png', '/ingredients/honey.png', '/Ingredients/largeleek.png', '/Ingredients/moomoomilk.png', '/Ingredients/pureoil.png', '/Ingredients/slowpoketail.png', '/ingredients/snoozytomato.png', '/ingredients/softpotato.png', '/Ingredients/soothingcacao.png', '/Ingredients/tastymushroom.png', '/Ingredients/warmingginger.png',];
const berries = ['/berries/belueberry.png' , '/berries/blukberry.png' , '/berries/cheriberry.png' , '/berries/chestoberry.png' , '/berries/durinberry.png' , '/berries/figyberry.png' , '/berries/grepaberry.png' , '/berries/leppaberry.png' , '/berries/lumberry.png' , '/berries/magoberry.png' , '/berries/oranberry.png' , '/berries/pamtreberry.png' , '/berries/pechaberry.png' , '/berries/persimberry.png' , '/berries/sitrusberry.png' , '/berries/wikiberry.png' , '/berries/yacheberry.png'];
const defaultPokemon = '/pokemon/001.png';
const defaultIngredient = '/Ingredients/fancyapple.png'
const defaultBerry = '/berries/leppaberry.png'
const pokemonsIconStyle = 'rounded-full max-h-[80px]';
const ingredientsIconStyle = 'rounded-full max-h-[40px]';
const berriesIconStyle = 'rounded-full max-h-[40px]'
const options = ['エナジーチャージS', 'エナジーチャージM', 'ゆめのかけらゲットS', 'げんきエールS', 'げんきチャージS', 'げんきオールS', 'おてつだいサポートS', '食材ゲットS', '料理パワーアップS', 'ゆびをふる'];


const Card = () => {
    const [memo, setMemo] = useState<string>('');
    const handleMemoChange = (value: string) => {
        setMemo(value);
      };

    return (
        <div className='flex justify-center flex-col mb-2  w-screen max-w-[650px] rounded bg-slate-200 dark:bg-slate-800'>
            <div className='flex justify-end'>
                {/* <Image src='/gadget24-removebg-preview.png' alt='Modal Icon' width={40} height={40} /> */}
                {/* <MemoInput memo={memo} onMemoChange={handleMemoChange} /> */}
            </div>
            <div className='flex justify-center'>
                <ModalItem images={pokemons} defaultImage={defaultPokemon} IconStyle={pokemonsIconStyle}/>
            </div>
            <div className='flex justify-between'>
                <div>
                    <Dropdown options={options} />
                </div>
                <div className='flex'>
                    <ModalItem images={berries} defaultImage={defaultBerry} IconStyle={berriesIconStyle}/>
                    <ModalItem images={ingredients} defaultImage={defaultIngredient} IconStyle={ingredientsIconStyle}/> 
                    <ModalItem images={ingredients} defaultImage={defaultIngredient} IconStyle={ingredientsIconStyle}/> 
                    <ModalItem images={ingredients} defaultImage={defaultIngredient} IconStyle={ingredientsIconStyle}/> 
                </div>
            </div>
        </div>
    )
}
export default Card