
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Main from './Components/Main';



//below is the theme for the app. some of the defualt colors are changed and some are added. the theme is used in the components
//The theme has been pass as parameter in Main compononent which containts other components
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#666262',
    accent: '#F8FAFA  ',
    primaryContainer: '#9b51db',
    secondaryContainer: '#428057',
    tertiary:'#050E13',
  },
};

export default function App() {
  return (
   
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
      
    

  );
}

