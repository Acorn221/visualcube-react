/* eslint-disable eqeqeq */
import { Masking, Face, AllFaces } from './constants';

export type FaceValues = {
  [face: number]: any[]
};

type MaskingFunctions = {
  [masking: string]: {
    [face: number]: (row: number, col: number, cubeSize: number) => boolean;
  };
};

const maskingFunctions: MaskingFunctions = {
  [Masking.FL]: {
    [Face.U]: (_row, _col, _cubeSize) => false,
    [Face.D]: (_row, _col, _cubeSize) => true,
    [Face.R]: (row, _col, cubeSize) => row == cubeSize - 1,
    [Face.L]: (row, _col, cubeSize) => row == cubeSize - 1,
    [Face.F]: (row, _col, cubeSize) => row == cubeSize - 1,
    [Face.B]: (row, _col, cubeSize) => row == cubeSize - 1,
  },
  [Masking.F2L]: {
    [Face.U]: (_row, _col, _cubeSize) => false,
    [Face.D]: (_row, _col, _cubeSize) => true,
    [Face.R]: (row, _col, _cubeSize) => row > 0,
    [Face.L]: (row, _col, _cubeSize) => row > 0,
    [Face.F]: (row, _col, _cubeSize) => row > 0,
    [Face.B]: (row, _col, _cubeSize) => row > 0,
  },
  [Masking.LL]: {
    [Face.U]: (_row, _col, _cubeSize) => true,
    [Face.D]: (_row, _col, _cubeSize) => false,
    [Face.R]: (row, _col, _cubeSize) => row == 0,
    [Face.L]: (row, _col, _cubeSize) => row == 0,
    [Face.F]: (row, _col, _cubeSize) => row == 0,
    [Face.B]: (row, _col, _cubeSize) => row == 0,
  },
  [Masking.CLL]: {
    [Face.U]: (row, col, cubeSize) => (row > 0 && col > 0 && row < cubeSize - 1 && col < cubeSize - 1) // is center
      || ((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.D]: (_row, _col, _cubeSize) => false,
    [Face.R]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
    [Face.L]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
    [Face.F]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
    [Face.B]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
  },
  [Masking.ELL]: {
    [Face.U]: (row, col, cubeSize) => !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.D]: (_row, _col, _cubeSize) => false,
    [Face.R]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
    [Face.F]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
    [Face.B]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
  },
  [Masking.OLL]: {
    [Face.U]: (_row, _col, _cubeSize) => true,
    [Face.D]: (_row, _col, _cubeSize) => false,
    [Face.R]: (_row, _col, _cubeSize) => false,
    [Face.L]: (_row, _col, _cubeSize) => false,
    [Face.F]: (_row, _col, _cubeSize) => false,
    [Face.B]: (_row, _col, _cubeSize) => false,
  },
  [Masking.OCLL]: {
    [Face.U]: (row, col, cubeSize) => (row > 0 && col > 0 && row < cubeSize - 1 && col < cubeSize - 1) // is center
      || ((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.D]: (_row, _col, _cubeSize) => false,
    [Face.R]: (_row, _col, _cubeSize) => false,
    [Face.L]: (_row, _col, _cubeSize) => false,
    [Face.F]: (_row, _col, _cubeSize) => false,
    [Face.B]: (_row, _col, _cubeSize) => false,
  },
  [Masking.OELL]: {
    [Face.U]: (row, col, cubeSize) => !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.D]: (_row, _col, _cubeSize) => false,
    [Face.R]: (_row, _col, _cubeSize) => false,
    [Face.L]: (_row, _col, _cubeSize) => false,
    [Face.F]: (_row, _col, _cubeSize) => false,
    [Face.B]: (_row, _col, _cubeSize) => false,
  },
  [Masking.COLL]: {
    [Face.U]: (_row, _col, _cubeSize) => true,
    [Face.D]: (_row, _col, _cubeSize) => false,
    [Face.R]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
    [Face.L]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
    [Face.F]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
    [Face.B]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
  },
  [Masking.OCELL]: {
    [Face.U]: (_row, _col, _cubeSize) => true,
    [Face.D]: (_row, _col, _cubeSize) => false,
    [Face.R]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
    [Face.F]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
    [Face.B]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
  },
  [Masking.WV]: {
    [Face.U]: (_row, _col, _cubeSize) => true,
    [Face.D]: (_row, _col, _cubeSize) => true,
    [Face.R]: (row, _col, _cubeSize) => row > 0,
    [Face.L]: (row, _col, _cubeSize) => row > 0,
    [Face.F]: (row, _col, _cubeSize) => row > 0,
    [Face.B]: (row, _col, _cubeSize) => row > 0,
  },
  [Masking.VH]: {
    [Face.U]: (row, col, cubeSize) => !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.D]: (_row, _col, _cubeSize) => true,
    [Face.R]: (row, _col, _cubeSize) => row > 0,
    [Face.L]: (row, _col, _cubeSize) => row > 0,
    [Face.F]: (row, _col, _cubeSize) => row > 0,
    [Face.B]: (row, _col, _cubeSize) => row > 0,
  },
  [Masking.ELS]: {
    [Face.U]: (row, col, cubeSize) => !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.D]: (row, col, cubeSize) => (row == 0 ? col < cubeSize - 1 : true),
    [Face.R]: (row, col, cubeSize) => row > 0 && (row == cubeSize - 1 ? col > 0 : true),
    [Face.L]: (row, _col, _cubeSize) => row > 0,
    [Face.F]: (row, col, cubeSize) => row > 0 && (row == cubeSize - 1 ? col < cubeSize - 1 : true),
    [Face.B]: (row, _col, _cubeSize) => row > 0,
  },
  [Masking.CLS]: {
    [Face.U]: (_row, _col, _cubeSize) => true,
    [Face.D]: (_row, _col, _cubeSize) => true,
    [Face.R]: (row, _col, _cubeSize) => row > 0,
    [Face.L]: (row, _col, _cubeSize) => row > 0,
    [Face.F]: (row, _col, _cubeSize) => row > 0,
    [Face.B]: (row, _col, _cubeSize) => row > 0,
  },
  [Masking.CMLL]: {
    [Face.U]: (row, col, cubeSize) => (row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1),
    [Face.D]: (_row, _col, _cubeSize) => true,
    [Face.R]: (row, col, cubeSize) => row > 0 || col == 0 || col == cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row > 0 || col == 0 || col == cubeSize - 1,
    [Face.F]: (_row, col, cubeSize) => col == 0 || col == cubeSize - 1,
    [Face.B]: (_row, col, cubeSize) => col == 0 || col == cubeSize - 1,
  },
  [Masking.CROSS]: {
    [Face.U]: (_row, _col, _cubeSize) => false,
    [Face.D]: (row, col, cubeSize) => !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.R]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
    [Face.F]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
    [Face.B]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
  },
  [Masking.F2L3]: {
    [Face.U]: (_row, _col, _cubeSize) => false,
    [Face.D]: (row, col, cubeSize) => (row == 0 && col == cubeSize - 1)
      || !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.R]: (row, col, cubeSize) => row > 0 && col < cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
    [Face.F]: (row, col, _cubeSize) => row > 0 && col > 0,
    [Face.B]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
  },
  [Masking.F2L2]: {
    [Face.U]: (_row, _col, _cubeSize) => false,
    [Face.D]: (row, col, cubeSize) => row > 0 || (col > 0 && col < cubeSize - 1),
    [Face.R]: (row, col, _cubeSize) => row > 0 && col > 0,
    [Face.L]: (row, col, cubeSize) => row > 0 && col < cubeSize - 1,
    [Face.F]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
    [Face.B]: (row, _col, _cubeSize) => row > 0,
  },
  [Masking.F2LSM]: {
    [Face.U]: (_row, _col, _cubeSize) => false,
    [Face.D]: (row, col, cubeSize) => !(
      (row == 0 || row == cubeSize - 1)
        && (col == 0 || col == cubeSize - 1)
    )
      || (col == 0 && row == cubeSize - 1)
      || (row == 0 && col == cubeSize - 1),
    [Face.R]: (row, col, cubeSize) => row > 0 && col < cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row > 0 && col < cubeSize - 1,
    [Face.F]: (row, col, _cubeSize) => row > 0 && col > 0,
    [Face.B]: (row, col, _cubeSize) => row > 0 && col > 0,
  },
  [Masking.F2L1]: {
    [Face.U]: (_row, _col, _cubeSize) => false,
    [Face.D]: (row, col, cubeSize) => row !== 0 || col !== cubeSize - 1,
    [Face.R]: (row, col, _cubeSize) => row > 0 && col > 0,
    [Face.L]: (row, _col, _cubeSize) => row > 0,
    [Face.F]: (row, col, cubeSize) => row > 0 && col < cubeSize - 1,
    [Face.B]: (row, _col, _cubeSize) => row > 0,
  },
  [Masking.F2B]: {
    [Face.U]: (_row, _col, _cubeSize) => false,
    [Face.D]: (_row, col, cubeSize) => col == 0 || col == cubeSize - 1,
    [Face.R]: (row, _col, _cubeSize) => row > 0,
    [Face.L]: (row, _col, _cubeSize) => row > 0,
    [Face.F]: (row, col, cubeSize) => row > 0 && (col == 0 || col == cubeSize - 1),
    [Face.B]: (row, col, cubeSize) => row > 0 && (col == 0 || col == cubeSize - 1),
  },
  [Masking.LINE]: {
    [Face.U]: (_row, _col, _cubeSize) => false,
    [Face.D]: (_row, col, cubeSize) => col > 0 && col < cubeSize - 1,
    [Face.R]: (_row, _col, _cubeSize) => false,
    [Face.L]: (_row, _col, _cubeSize) => false,
    [Face.F]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
    [Face.B]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
  },
};

export function makeMasking(masking: Masking, cubeSize: number): FaceValues {
  if (!maskingFunctions[masking]) {
    throw new Error(`invalid masking ${masking}`);
  }

  const numStickers = cubeSize * cubeSize;
  const faceValues: FaceValues = {
    [Face.U]: [],
    [Face.F]: [],
    [Face.R]: [],
    [Face.D]: [],
    [Face.L]: [],
    [Face.B]: [],
  };

  for (let i = 0; i < numStickers; i++) {
    const row = Math.floor(i / cubeSize);
    const col = i % cubeSize;

    AllFaces.forEach((face) => {
      faceValues[face].push(
        maskingFunctions[masking][face](row, col, cubeSize),
      );
    });
  }

  return faceValues;
}
