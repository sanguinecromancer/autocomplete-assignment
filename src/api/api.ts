import { Character } from "../types";
import { API_URL } from '../constants';

const loadAllCharacters = async (): Promise<Character[]> => {

	try {

		let allCharacters: Character[] = [];
		let url = API_URL;

			while (url) {
				const res = await fetch(url);

				if (!res.ok) {
				if (res.status === 404) {
						throw new Error('Resource not found (404)');
				} else if (res.status >= 500) {
						throw new Error('Server error, please try again later');
				} else {
						throw new Error(`Unexpected error: ${res.status}`);
				}
			}

			const data = await res.json();
			allCharacters = [...allCharacters, ...data.results];
			url = data.info.next; // next page URL
		}
		console.log(allCharacters);
		return allCharacters;
	} catch (error) {
		console.error('Failed to load characters:', error.message);
		return [];
	}
};

  export default loadAllCharacters;