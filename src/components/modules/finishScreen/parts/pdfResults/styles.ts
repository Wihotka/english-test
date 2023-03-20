import {StyleSheet, Font} from '@react-pdf/renderer';

Font.register({
  family: 'Montserrat',
  fonts: [
    {
      src: require('_assets/fonts/Montserrat/Regular.ttf'),
      fontWeight: 'normal'
    },
    {
      src: require('_assets/fonts/Montserrat/Bold.ttf'),
      fontWeight: 'bold'
    }
  ]
});

export const pdfStyles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Montserrat',
      fontWeight: 'normal'
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
      fontWeight: 'bold',
      fontSize: 20
    },
    headerSubtitle: {
      fontWeight: 'bold',
      fontSize: 16
    },
    logo: {
      width: 160,
      height: 80
    },
    checkbox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 16,
      height: 16,
      marginRight: 4,
      border: '1px solid #333',
      borderRadius: '4px',
    },
    checked: {
      width: '75%',
      height: '75%',
      borderRadius: '2px'
    },
    sections: {
      flexDirection: 'column',
      padding: '0 16px'
    },
    sectionBlock: {
      marginBottom: 16
    },
    question: {
      marginBottom: 16,
      fontWeight: 'bold'
    },
    taskBlock: {
      flexDirection: 'column',
      marginBottom: 24
    },
    task: {
      flexDirection: 'row',
      marginBottom: 8
    },
    taskScore: {
      flexDirection: 'row',
      fontSize: 14
    },
    score: {
      fontWeight: 'bold'
    },
    taskNumber: {
      marginRight: 16,
      fontWeight: 'bold'
    }
});