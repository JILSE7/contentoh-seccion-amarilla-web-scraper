import { chromium } from 'playwright'
import { Restaurant } from '../models/Restaurant.model';
import { CustomError } from '../utilities/customError.utilities';

const SA_URL = 'https://www.seccionamarilla.com.mx'

export const SearchRestaurantService = async(location: string) => {
  if(location.length === 0) throw new CustomError(`Ciudad invalida, porfavor ingrese una ciudad`, 404)

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(SA_URL);
  const div = await page.$(".main-search")
  div?.click()
  const searchInput = await page.$("#typefield")

  await searchInput?.fill(`Restaurantes en ${location}`);
  await page.screenshot({path: 'taf2.png'})
  const searchButton = await page.$(".search-btn");
  searchButton?.click();
  await page.waitForSelector(".list li");
  const productsHTML = await page.$$(".list li")
  
  const bestRestaurants: Restaurant[] = [];

  if(productsHTML.length === 0) throw new CustomError(`No se obtuvieron resultados con '${location}'`, 404)

    for (const product of productsHTML) { 
        const dataProduct = await product.$('.l-datos')
        if (!dataProduct) break;
        const name        = await (await dataProduct.$('a h2 span'))?.innerText();
        const direction   = await (await dataProduct.$('.l-address'))?.innerText();
        const phoneNumber = await (await dataProduct.$('.l-tel'))?.innerText();
        const img         = await (await product.$('.logo-link img'))?.getAttribute("src")
        let url           = await (await dataProduct.$('a'))?.getAttribute('href');
        url = url?.startsWith("http") ? url : `${SA_URL}${url}`
        
        const urlDirection = direction !== '' ? `https://www.google.com/maps/search/${direction!.replace(/ /g,'%20')}` : undefined
        // console.log({urlDirection});
        bestRestaurants.push({
          name: name !== '' ? name! : "Sin nombre",
          direction: direction === '' ? "Ubicación desconocida" : direction!,
          phoneNumber: phoneNumber === '' ? "Sin numero telefonico" : phoneNumber!,
          img,
          url,
          urlDirection
        }); 
      }
      
      // console.log({bestRestaurants});
      return bestRestaurants;
}

export const RestaurantServices = {
  SearchRestaurantService
}