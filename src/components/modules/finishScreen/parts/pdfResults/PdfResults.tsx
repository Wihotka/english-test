import React from 'react';
import {Page, Text, View, Document} from '@react-pdf/renderer';
import {pdfStyles} from './styles';

export const PdfResults = () => <Document>
    <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.section}>
            <Text>Жаренные гвозди</Text>
        </View>
        <View style={pdfStyles.section}>
            <Text>Вареные табуретки</Text>
        </View>
    </Page>
</Document>;