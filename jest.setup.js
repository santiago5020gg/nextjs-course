import '@testing-library/jest-dom/extend-expect';
const fetchPolyfill = require("whatwg-fetch");
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
//fetch
global.fetch = fetchPolyfill.fetch;
global.Request = fetchPolyfill.Request;
global.Headers = fetchPolyfill.Headers;
global.Response = fetchPolyfill.Response;