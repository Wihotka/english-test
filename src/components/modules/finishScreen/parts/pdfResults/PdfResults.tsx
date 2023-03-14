import React from 'react';
import {Page, Text, View, Image, Document} from '@react-pdf/renderer';
import {pdfStyles} from './styles';

interface IPdfResults {
    finalScore:number;
}

export const PdfResults = ({
    finalScore
}:IPdfResults) => {
    return <Document >
        <Page size="A4" style={pdfStyles.page}>
            <Text render={({pageNumber, totalPages}) => (
                `${pageNumber} / ${totalPages}`
            )} fixed style={pdfStyles.numeration}/>
            <View style={pdfStyles.header}>
                <View style={pdfStyles.headerTextBlock}>
                    <Text style={pdfStyles.headerTitle}>Тест на знание английского языка</Text>
                    <Text style={pdfStyles.headerSubtitle}>{finalScore} баллов</Text>
                </View>
                <Image src={require('_assets/img/logo.png')} style={pdfStyles.logo}/>
            </View>
        </Page>
    </Document>;
};