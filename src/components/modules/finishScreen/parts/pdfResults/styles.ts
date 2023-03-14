import {StyleSheet, Font} from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf'
});

export const pdfStyles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Roboto'
    },
    numeration: {
      margin: '8px auto 8px 8px',
      padding: '4px 8px',
      borderRadius: 8,
      color: '#FFFFFF',
      backgroundColor: '#E40489'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      padding: '4px 16px',
      borderBottom: '1 solid #E40489'
    },
    headerTextBlock: {
      flexDirection: 'column'
    },
    headerTitle: {
      color: '#E40489',
      fontWeight: 700,
      fontSize: 20
    },
    headerSubtitle: {
      fontWeight: 700,
      fontSize: 16
    },
    logo: {
      width: 160,
      height: 80
    }
});