"use client";
import React from 'react';
import Modal from './compornents/Modal';

const pokemons = ['/pokemon/001.png', '/pokemon/002.png', '/pokemon/003.png', '/pokemon/004.png', '/pokemon/005.png', '/pokemon/006.png', '/pokemon/007.png', '/pokemon/008.png', '/pokemon/009.png',];
const ingredients = ['/Ingredients/beansausage.png', 'Ingredients/fancyapple.png', 'Ingredients/fancyegg.png', '/Ingredients/fieryherb.png', '/Ingredients/greengrasssoybeans.png', '/ingredients/honey.png', '/Ingredients/largeleek.png', '/Ingredients/moomoomilk.png', '/Ingredients/pureoil.png', '/Ingredients/slowpoketail.png', '/ingredients/snoozytomato.png', '/ingredients/softpotato.png', '/Ingredients/soothingcacao.png', '/Ingredients/tastymushroom.png', '/Ingredients/warmingginger.png',];
const defaultPokemon = '/pokemon/001.png';
const defaultIngredients='Ingredients/fancyapple.png'
const PokemonsIconStyle = 'rounded-full';
const IngredientsIconStyle = 'rounded-full';

const Page: React.FC = () => {
  // 他のコードやコンポーネントをここに追加

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center">
        {/* 他のコンテンツ */}
        <Modal images={pokemons} defaultImage={defaultPokemon} IconStyle={PokemonsIconStyle}/>
        <Modal images={ingredients} defaultImage={defaultIngredients} IconStyle={IngredientsIconStyle}/> 
        <Modal images={ingredients} defaultImage={defaultIngredients} IconStyle={IngredientsIconStyle}/> 
        <Modal images={ingredients} defaultImage={defaultIngredients} IconStyle={IngredientsIconStyle}/> 
      </div>
    </div>
  );
};

export default Page;