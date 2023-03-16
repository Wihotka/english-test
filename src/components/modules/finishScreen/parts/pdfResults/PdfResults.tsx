import React from 'react';
import {Page, Text, View, Image, Document} from '@react-pdf/renderer';
import {pdfStyles} from './styles';

interface IPdfResults {
    finalScore:number;
    tasks:any;
    progress:any;
    subject:string;
    option:string;
}

enum Themes {
    LookAndChoose = 'LookAndChoose',
    DragAndDropWord = 'DragAndDropWord',
    ChooseOne = 'ChooseOne',
    InputSentence = 'InputSentence',
    TrueOrFalse = 'TrueOrFalse',
    ReadText = 'ReadText',
    ListenAndChoose = 'ListenAndChoose'
}

export const PdfResults = ({
    finalScore,
    tasks,
    progress,
    subject,
    option
}:IPdfResults) => {
    console.log(tasks);
    return <Document >
        <Page size='A4' style={pdfStyles.page}>
            {/* Numeration */}
            <Text render={({pageNumber, totalPages}) => (
                `${pageNumber} / ${totalPages}`
            )} fixed style={pdfStyles.numeration}/>
            {/* Header */}
            <View style={pdfStyles.header}>
                <View style={pdfStyles.headerTextBlock}>
                    <Text style={pdfStyles.headerTitle}>Тест на знание английского языка</Text>
                    <Text style={pdfStyles.headerSubtitle}>Колличество баллов: {finalScore}</Text>
                </View>
                <Image src={require('_assets/img/logo.png')} style={pdfStyles.logo}/>
            </View>
            {/* Questions */}
            <View style={pdfStyles.sections}>
                {Object.values(tasks).map((section:any) => <View key={section.id}>
                    {Themes.LookAndChoose === section.theme && <View style={pdfStyles.sectionBlock}>
                        <Text style={pdfStyles.question}>{section.question}</Text>
                        {section.tasks.map((task:any) => <View key={task.id} style={pdfStyles.taskBlock}>
                            <View style={pdfStyles.task}>
                                <Text style={pdfStyles.taskNumber}>{task.id}.</Text>
                                <Image
                                    src={require(`_assets/img/tasks/${subject}/${task.option[option].img}`)}
                                    style={pdfStyles.singleImg}
                                />
                                <View style={pdfStyles.answerBlock}>
                                    {task.option[option].labels.map((label:any, index) => <View key={index} style={pdfStyles.answer}>
                                        <View style={[
                                            pdfStyles.checkbox,
                                            task.option[option].correctAnswer === label.label && {borderColor: 'green'},
                                            progress[+task.id - 1].done && !progress[+task.id - 1].status &&  progress[+task.id - 1].currentAnswer[0] === label.label && {borderColor: 'red'}
                                        ]}>
                                            {/* Correct answer */}
                                            {
                                                progress[+task.id - 1].done &&
                                                progress[+task.id - 1].status &&
                                                progress[+task.id - 1].currentAnswer[0] === label.label &&
                                                    <Text style={[pdfStyles.checked, {backgroundColor: 'green'}]}></Text>
                                            }
                                            {/* Wrong answer */}
                                            {
                                                progress[+task.id - 1].done &&
                                                !progress[+task.id - 1].status &&
                                                progress[+task.id - 1].currentAnswer[0] === label.label &&
                                                    <Text style={[pdfStyles.checked, {backgroundColor: 'red'}]}></Text>
                                            }
                                        </View>
                                        <Text style={[
                                            task.option[option].correctAnswer === label.label && {color: 'green', fontWeight: 'bold'},
                                            progress[+task.id - 1].done && !progress[+task.id - 1].status &&  progress[+task.id - 1].currentAnswer[0] === label.label && {color: 'red', fontWeight: 'bold'}
                                        ]}>
                                            {label.label}
                                        </Text>
                                    </View>)}
                                </View>
                            </View>
                            <View style={pdfStyles.taskScore}>
                                <Text>Колличество баллов: </Text>
                                <Text style={pdfStyles.score}>{progress[+task.id - 1].score}</Text>
                            </View>
                        </View>)}
                    </View>}
                    {Themes.DragAndDropWord === section.theme && <Text>{section.theme}</Text>}
                </View>)}
            </View>
        </Page>
    </Document>;
};