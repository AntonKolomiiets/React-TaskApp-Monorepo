// import { createContext, useState, useContext, ReactNode } from "react";

// // BREED Context
// // struct
// interface BreedContextType {
//   selectedBreed: string;
//   setSelectedBreed: (breed: string) => void;
// }
// // defaults for struct
// const defaultStateBreed: BreedContextType = {
//   selectedBreed: "",
//   setSelectedBreed: () => {},
// };

// const BreedContext = createContext<BreedContextType>(defaultStateBreed);

// export const useBreed = () => useContext(BreedContext);


// export const BreedProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   // init
//   const [selectedBreed, setSelectedBreed] = useState<string>("");

//   return (
//     <BreedContext.Provider value={{ selectedBreed, setSelectedBreed }}>
//       {children}
//     </BreedContext.Provider>
//   );
// };

// // NUBER Context
// // struct
// interface NumberContextType {
//   selectedNumber: number;
//   setSelectedNumber: (breed: number) => void;
// }

// // defaults for struct
// const defaultStateNumber: NumberContextType = {
//   selectedNumber: 1,
//   setSelectedNumber: () => {},
// };

// const NumberContext = createContext<NumberContextType>(defaultStateNumber);

// export const useNumber = () => useContext(NumberContext);

// export const NumberProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [selectedNumber, setSelectedNumber] = useState<number>(1);

//   return (
//     <NumberContext.Provider value={{ selectedNumber, setSelectedNumber }}>
//       {children}
//     </NumberContext.Provider>
//   );
// };



