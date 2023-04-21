"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantServices = exports.SearchRestaurantService = void 0;
const playwright_1 = require("playwright");
const customError_utilities_1 = require("../utilities/customError.utilities");
const SA_URL = 'https://www.seccionamarilla.com.mx';
const SearchRestaurantService = (location) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    if (location.length === 0)
        throw new customError_utilities_1.CustomError(`Ciudad invalida, porfavor ingrese una ciudad`, 404);
    const browser = yield playwright_1.chromium.launch();
    const page = yield browser.newPage();
    yield page.goto(SA_URL);
    const div = yield page.$(".main-search");
    div === null || div === void 0 ? void 0 : div.click();
    const searchInput = yield page.$("#typefield");
    yield (searchInput === null || searchInput === void 0 ? void 0 : searchInput.fill(`Restaurantes en ${location}`));
    yield page.screenshot({ path: 'taf2.png' });
    const searchButton = yield page.$(".search-btn");
    searchButton === null || searchButton === void 0 ? void 0 : searchButton.click();
    yield page.waitForSelector(".list li");
    const productsHTML = yield page.$$(".list li");
    const bestRestaurants = [];
    if (productsHTML.length === 0)
        throw new customError_utilities_1.CustomError(`No se obtuvieron resultados con '${location}'`, 404);
    for (const product of productsHTML) {
        const dataProduct = yield product.$('.l-datos');
        if (!dataProduct)
            break;
        const name = yield ((_a = (yield dataProduct.$('a h2 span'))) === null || _a === void 0 ? void 0 : _a.innerText());
        const direction = yield ((_b = (yield dataProduct.$('.l-address'))) === null || _b === void 0 ? void 0 : _b.innerText());
        const phoneNumber = yield ((_c = (yield dataProduct.$('.l-tel'))) === null || _c === void 0 ? void 0 : _c.innerText());
        const img = yield ((_d = (yield product.$('.logo-link img'))) === null || _d === void 0 ? void 0 : _d.getAttribute("src"));
        let url = yield ((_e = (yield dataProduct.$('a'))) === null || _e === void 0 ? void 0 : _e.getAttribute('href'));
        url = (url === null || url === void 0 ? void 0 : url.startsWith("http")) ? url : `${SA_URL}${url}`;
        const urlDirection = direction !== '' ? `https://www.google.com/maps/search/${direction.replace(/ /g, '%20')}` : undefined;
        // console.log({urlDirection});
        bestRestaurants.push({
            name: name !== '' ? name : "Sin nombre",
            direction: direction === '' ? "Ubicación desconocida" : direction,
            phoneNumber: phoneNumber === '' ? "Sin numero telefonico" : phoneNumber,
            img,
            url,
            urlDirection
        });
    }
    // console.log({bestRestaurants});
    return bestRestaurants;
});
exports.SearchRestaurantService = SearchRestaurantService;
exports.RestaurantServices = {
    SearchRestaurantService: exports.SearchRestaurantService
};
