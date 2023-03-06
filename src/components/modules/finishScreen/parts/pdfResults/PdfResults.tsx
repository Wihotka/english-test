import React from 'react';
import {Page, Text, View, Document} from '@react-pdf/renderer';
import {pdfStyles} from './styles';

export const PdfResults = () => <Document>
    <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.section}>
            <Text>Section #1</Text>
        </View>
        <View style={pdfStyles.section}>
            <Text>Section #2</Text>
        </View>
    </Page>
</Document>;