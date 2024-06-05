import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import AutoComplete from './Components/AutoComplete';

let allCharacters;
export async function loadAllCharacters() {
  try {
		allCharacters = [];
		let url = 'http://rickandmortyapi.com/api/character';

			let res = await fetch(url);
			let { results } = await res.json();
      console.log( results);
			allCharacters = [...allCharacters, ...results];

	
	
		return allCharacters;
	} catch (error) {
		console.error(error);
	}
}

function App() {
  


//if (loading) {
//   return <main aria-busy="true" role="progressbar">
//     <div className="loading" aria-label="Loading content, please wait..."></div>
//   </main>;
// }

  return (
  
    <main>
      <AutoComplete/>
    </main>
   
  )
}

export default App;
