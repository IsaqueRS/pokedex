import Axios from '../axios';

export async function PokemonsImageFetch() {
    
    console.log('ProfileFetch | tokenAuthorization:', );
    const configRequest = {
      method: 'get',
      url: 'pokemon/1',
    };
  
    try {
      const response = await Axios[configRequest.method](
        configRequest.url,
      );
      console.log('ProfileFetch | response.data:', response.data);
        return {
          isSuccess: true,
          message: "deu certo",
          pokemonImage: response.data.sprites.front_default,
        };
   } catch (error) {
      console.log('ProfileFetch | error:', error.message);
  
        return {
            message: 'No momento esse recurso está indisponível, tente novamente mais tarde.',
            isSuccess: false,
        };
    }
  }