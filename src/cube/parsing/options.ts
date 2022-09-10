import { ICubeOptions } from '../options';
import { parseRotationSequence } from './rotation';
import { parseFaceletColors } from './faceletColors';
import { parseColorScheme } from './colorScheme';
import { parseFaceletDefinitions } from './faceletDefinitions';

/**
 * Utility methods for parsing the old query param style options
 */

const parseQuery = (url: string) => {
  const queryString = url.indexOf('?') > -1 ? url.substr(url.indexOf('?') + 1) : url;
  const query = {};
  const pairs = queryString.split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
};

const parseOptions = (rawOptions: string): ICubeOptions => {
  const options: ICubeOptions = {} as any;
  const params = parseQuery(rawOptions);

  Object.keys(params).forEach((key) => {
    const paramValue = params[key];
    switch (key) {
      case 'pzl':
        options.cubeSize = parseInt(paramValue, 10) || 3;
        break;
      case 'size':
        const size = parseInt(paramValue, 10) || 250;
        options.width = size;
        options.height = size;
        break;
      case 'view':
        options.view = paramValue;
        break;
      case 'stage':
        options.mask = paramValue;
        break;
      case 'r':
        options.viewportRotations = parseRotationSequence(paramValue);
        break;
      case 'alg':
        options.algorithm = paramValue;
        break;
      case 'case':
        options.case = paramValue;
        break;
      case 'fc':
        options.stickerColors = parseFaceletColors(paramValue);
        break;
      case 'sch':
        options.colorScheme = parseColorScheme(paramValue);
        break;
      case 'bg':
        options.backgroundColor = paramValue;
        break;
      case 'cc':
        options.cubeColor = paramValue;
        break;
      case 'co':
        options.cubeOpacity = parseInt(paramValue, 10) || 100;
        break;
      case 'fo':
        options.stickerOpacity = parseInt(paramValue, 10) || 100;
        break;
      case 'dist':
        options.dist = parseInt(paramValue, 10) || 5;
        break;
      case 'arw':
        options.arrows = paramValue;
        break;
      case 'fd':
        options.facelets = parseFaceletDefinitions(paramValue);
        break;
      case 'ac':
        // TODO: Support default arrow color
        console.warn("Currently param 'ac' is unsupported");
        break;
    }
  });
  return options;
};

export default parseOptions;
