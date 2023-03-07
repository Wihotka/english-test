import {StyleSheet, Font} from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf'
});

export const pdfStyles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
      fontFamily: 'Roboto'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
});