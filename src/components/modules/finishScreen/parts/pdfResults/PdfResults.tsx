import React from 'react';
import {Page, Text, View, Image, Document} from '@react-pdf/renderer';
import {pdfStyles} from './styles';

interface IPdfResults {
    finalScore:number;
    tasks:any;
    subject:string;
    option:string;
}

export const PdfResults = ({
    finalScore,
    tasks,
    subject,
    option
}:IPdfResults) => {
    console.log(tasks);
    
    return <Document >
        <Page size="A4" style={pdfStyles.page}>
            {/* Numeration */}
            <Text render={({pageNumber, totalPages}) => (
                `${pageNumber} / ${totalPages}`
            )} fixed style={pdfStyles.numeration}/>
            {/* Header */}
            <View style={pdfStyles.header}>
                <View style={pdfStyles.headerTextBlock}>
                    <Text style={pdfStyles.headerTitle}>Тест на знание английского языка</Text>
                    <Text style={pdfStyles.headerSubtitle}>{finalScore} баллов</Text>
                </View>
                <Image src={require('_assets/img/logo.png')} style={pdfStyles.logo}/>
            </View>
            {/* Questions */}
            <View style={pdfStyles.sections}>
                {Object.values(tasks).map((section:any) => <View key={section.id}>
                    <View style={pdfStyles.sectionBlock}>
                        <Text style={pdfStyles.question}>{section.question}</Text>
                        {section.tasks.map((task:any) => <View key={task.id} style={pdfStyles.taskBlock}>
                            <Text style={pdfStyles.taskNumber}>{task.id}.</Text>
                            {/* View single images */}
                            {task.option[option].img && <Image
                                src={require(`_assets/img/tasks/${subject}/${task.option[option].img}`)}
                                style={pdfStyles.singleImg}
                            />}
                            {task.option[option].labels && <View style={pdfStyles.answerBlock}>
                                {task.option[option].labels.map((label:any, index) => <Text key={index}>
                                    {label.label}
                                </Text>)}
                            </View>}
                        </View>)}
                    </View>
                </View>)}
            </View>
        </Page>
    </Document>;
};