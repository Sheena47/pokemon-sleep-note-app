'use client'
import React from 'react'
import ModalItem from './ModalItem';

const pokemons = ['/pokemon/001.png', '/pokemon/002.png', '/pokemon/003.png', '/pokemon/004.png', '/pokemon/005.png', '/pokemon/006.png', '/pokemon/007.png', '/pokemon/008.png', '/pokemon/009.png',];
const ingredients = ['/Ingredients/beansausage.png', 'Ingredients/fancyapple.png', 'Ingredients/fancyegg.png', '/Ingredients/fieryherb.png', '/Ingredients/greengrasssoybeans.png', '/ingredients/honey.png', '/Ingredients/largeleek.png', '/Ingredients/moomoomilk.png', '/Ingredients/pureoil.png', '/Ingredients/slowpoketail.png', '/ingredients/snoozytomato.png', '/ingredients/softpotato.png', '/Ingredients/soothingcacao.png', '/Ingredients/tastymushroom.png', '/Ingredients/warmingginger.png',];
const berries = ['/berries/belueberry.png' , '/berries/blukberry.png' , '/berries/cheriberry.png' , '/berries/chestoberry.png' , '/berries/durinberry.png' , '/berries/figyberry.png' , '/berries/grepaberry.png' , '/berries/leppaberry.png' , '/berries/lumberry.png' , '/berries/magoberry.png' , '/berries/oranberry.png' , '/berries/pamtreberry.png' , '/berries/pechaberry.png' , '/berries/persimberry.png' , '/berries/sitrusberry.png' , '/berries/wikiberry.png' , '/berries/yacheberry.png'];
const defaultPokemon = '/pokemon/001.png';
const defaultIngredient = '/Ingredients/fancyapple.png'
const defaultBerry = '/berries/leppaberry.png'
const pokemonsIconStyle = 'rounded-full';
const ingredientsIconStyle = 'rounded-full';
const berriesIconStyle = 'rounded-full'


const ModalMain = () => {
  return (
    <div className='flex justify-center '>
        <ModalItem images={pokemons} defaultImage={defaultPokemon} IconStyle={pokemonsIconStyle}/>
        <ModalItem images={berries} defaultImage={defaultBerry} IconStyle={berriesIconStyle}/>
        <ModalItem images={ingredients} defaultImage={defaultIngredient} IconStyle={ingredientsIconStyle}/> 
        <ModalItem images={ingredients} defaultImage={defaultIngredient} IconStyle={ingredientsIconStyle}/> 
        <ModalItem images={ingredients} defaultImage={defaultIngredient} IconStyle={ingredientsIconStyle}/> 
    </div>
    )
}

export default ModalMain