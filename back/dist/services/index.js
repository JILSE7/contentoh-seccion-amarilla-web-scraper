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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantServices = exports.SearchRestaurantService = void 0;
var playwright_1 = require("playwright");
var customError_utilities_1 = require("../utilities/customError.utilities");
var SA_URL = 'https://www.seccionamarilla.com.mx';
var SearchRestaurantService = function (location) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, div, searchInput, searchButton, productsHTML, bestRestaurants, _i, productsHTML_1, product, dataProduct, name_1, direction, phoneNumber, img, url, urlDirection;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (location.length === 0)
                    throw new customError_utilities_1.CustomError("Ciudad invalida, porfavor ingrese una ciudad", 404);
                return [4 /*yield*/, playwright_1.chromium.launch()];
            case 1:
                browser = _f.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _f.sent();
                return [4 /*yield*/, page.goto(SA_URL)];
            case 3:
                _f.sent();
                return [4 /*yield*/, page.$(".main-search")];
            case 4:
                div = _f.sent();
                div === null || div === void 0 ? void 0 : div.click();
                return [4 /*yield*/, page.$("#typefield")];
            case 5:
                searchInput = _f.sent();
                return [4 /*yield*/, (searchInput === null || searchInput === void 0 ? void 0 : searchInput.fill("Restaurantes en ".concat(location)))];
            case 6:
                _f.sent();
                return [4 /*yield*/, page.screenshot({ path: 'taf2.png' })];
            case 7:
                _f.sent();
                return [4 /*yield*/, page.$(".search-btn")];
            case 8:
                searchButton = _f.sent();
                searchButton === null || searchButton === void 0 ? void 0 : searchButton.click();
                return [4 /*yield*/, page.waitForSelector(".list li")];
            case 9:
                _f.sent();
                return [4 /*yield*/, page.$$(".list li")];
            case 10:
                productsHTML = _f.sent();
                bestRestaurants = [];
                if (productsHTML.length === 0)
                    throw new customError_utilities_1.CustomError("No se obtuvieron resultados con '".concat(location, "'"), 404);
                _i = 0, productsHTML_1 = productsHTML;
                _f.label = 11;
            case 11:
                if (!(_i < productsHTML_1.length)) return [3 /*break*/, 24];
                product = productsHTML_1[_i];
                return [4 /*yield*/, product.$('.l-datos')];
            case 12:
                dataProduct = _f.sent();
                if (!dataProduct)
                    return [3 /*break*/, 24];
                return [4 /*yield*/, dataProduct.$('a h2 span')];
            case 13: return [4 /*yield*/, ((_a = (_f.sent())) === null || _a === void 0 ? void 0 : _a.innerText())];
            case 14:
                name_1 = _f.sent();
                return [4 /*yield*/, dataProduct.$('.l-address')];
            case 15: return [4 /*yield*/, ((_b = (_f.sent())) === null || _b === void 0 ? void 0 : _b.innerText())];
            case 16:
                direction = _f.sent();
                return [4 /*yield*/, dataProduct.$('.l-tel')];
            case 17: return [4 /*yield*/, ((_c = (_f.sent())) === null || _c === void 0 ? void 0 : _c.innerText())];
            case 18:
                phoneNumber = _f.sent();
                return [4 /*yield*/, product.$('.logo-link img')];
            case 19: return [4 /*yield*/, ((_d = (_f.sent())) === null || _d === void 0 ? void 0 : _d.getAttribute("src"))];
            case 20:
                img = _f.sent();
                return [4 /*yield*/, dataProduct.$('a')];
            case 21: return [4 /*yield*/, ((_e = (_f.sent())) === null || _e === void 0 ? void 0 : _e.getAttribute('href'))];
            case 22:
                url = _f.sent();
                url = (url === null || url === void 0 ? void 0 : url.startsWith("http")) ? url : "".concat(SA_URL).concat(url);
                urlDirection = direction !== '' ? "https://www.google.com/maps/search/".concat(direction.replace(/ /g, '%20')) : undefined;
                // console.log({urlDirection});
                bestRestaurants.push({
                    name: name_1 !== '' ? name_1 : "Sin nombre",
                    direction: direction === '' ? "Ubicación desconocida" : direction,
                    phoneNumber: phoneNumber === '' ? "Sin numero telefonico" : phoneNumber,
                    img: img,
                    url: url,
                    urlDirection: urlDirection
                });
                _f.label = 23;
            case 23:
                _i++;
                return [3 /*break*/, 11];
            case 24: 
            // console.log({bestRestaurants});
            return [2 /*return*/, bestRestaurants];
        }
    });
}); };
exports.SearchRestaurantService = SearchRestaurantService;
exports.RestaurantServices = {
    SearchRestaurantService: exports.SearchRestaurantService
};
