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
    return <Document >
        <Page size='A4' wrap style={pdfStyles.page}>
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
                    {Themes.LookAndChoose === section.theme && <View break style={pdfStyles.sectionBlock}>
                        <Text style={pdfStyles.question}>{section.question}</Text>
                        {section.tasks.map((task:any) => <View key={task.id} style={pdfStyles.taskBlock}>
                            <View style={pdfStyles.task}>
                                <Text style={pdfStyles.taskNumber}>{task.id}.</Text>
                                <Image
                                    src={require(`_assets/img/tasks/${subject}/${task.option[option].img}`)}
                                    style={{width: 'auto', height: 100, marginRight: 24}}
                                />
                                <View style={{flexDirection: 'column', justifyContent: 'center', fontSize: 14}}>
                                    {task.option[option].labels.map((label:any, index) => <View key={index} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
                                        <View style={[
                                            pdfStyles.checkbox,
                                            task.option[option].correctAnswer === label.label && {borderColor: 'green'},
                                            progress[+task.id - 1].done && !progress[+task.id - 1].status && progress[+task.id - 1].currentAnswer[0] === label.label && {borderColor: 'red'}
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
                    {Themes.DragAndDropWord === section.theme && <View break style={pdfStyles.sectionBlock}>
                        <Text style={pdfStyles.question}>{section.question}</Text>
                        {section.tasks.map((task:any) => <View key={task.id} style={pdfStyles.taskBlock}>
                            <View style={pdfStyles.task}>
                                <Text style={pdfStyles.taskNumber}>{task.id}.</Text>
                                {task.option[option].words.map((word:any, index) => <View key={index} style={{flexDirection: 'column', width: 100, marginRight: 8}}>
                                    <Image
                                        src={require(`_assets/img/tasks/${subject}/${word.img}`)}
                                        style={{width: 'auto', height: 80, marginBottom: 16}}
                                    />
                                    <Text style={[{marginBottom: 8, fontSize: 14, textAlign: 'center'},
                                        progress[+task.id - 1].currentAnswer[index] === task.option[option].correctAnswer[index] && {color: 'green', fontWeight: 'bold'},
                                        progress[+task.id - 1].currentAnswer[index] && progress[+task.id - 1].currentAnswer[index] !== task.option[option].correctAnswer[index] && {color: 'red', fontWeight: 'bold'},
                                    ]}>
                                        {task.option[option].correctAnswer[index]}
                                    </Text>
                                </View>)}
                            </View>
                            <View style={pdfStyles.taskScore}>
                                <Text>Колличество баллов: </Text>
                                <Text style={pdfStyles.score}>{progress[+task.id - 1].score}</Text>
                            </View>
                        </View>)}
                    </View>}
                    {Themes.ChooseOne === section.theme && <View break style={pdfStyles.sectionBlock}>
                        <Text style={pdfStyles.question}>{section.question}</Text>
                        {section.tasks.map((task:any) => <View key={task.id} style={pdfStyles.taskBlock}>
                            <View style={pdfStyles.task}>
                                <Text style={pdfStyles.taskNumber}>{task.id}.</Text>
                                <View style={{flexDirection: 'column'}}>
                                    {task.option[option].questions.map((question:any, questionIndex) => <View key={questionIndex} style={{marginBottom: 12}}>
                                        <Text style={{marginTop: 4, marginBottom: 8, fontWeight: 'bold', fontSize: 16}}>{question.text}</Text>
                                        {question.labels.map((label:any, labelIndex) => <View key={labelIndex} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
                                            <View style={[
                                                pdfStyles.checkbox,
                                                question.correctAnswer === label.label && {borderColor: 'green'},
                                                progress[+task.id - 1].currentAnswer[questionIndex] === label.label &&
                                                progress[+task.id - 1].currentAnswer[questionIndex] !== question.correctAnswer && {borderColor: 'red'}
                                            ]}>
                                                {/* Correct answer */}
                                                {
                                                    progress[+task.id - 1].currentAnswer[questionIndex] === label.label &&
                                                    progress[+task.id - 1].currentAnswer[questionIndex] === question.correctAnswer &&
                                                        <Text style={[pdfStyles.checked, {backgroundColor: 'green'}]}></Text>
                                                }
                                                {/* Wrong answer */}
                                                {
                                                    progress[+task.id - 1].currentAnswer[questionIndex] === label.label &&
                                                    progress[+task.id - 1].currentAnswer[questionIndex] !== question.correctAnswer &&
                                                        <Text style={[pdfStyles.checked, {backgroundColor: 'red'}]}></Text>
                                                }
                                            </View>
                                            <Text style={[
                                                question.correctAnswer === label.label && {color: 'green', fontWeight: 'bold'},
                                                progress[+task.id - 1].currentAnswer[questionIndex] === label.label &&
                                                progress[+task.id - 1].currentAnswer[questionIndex] !== question.correctAnswer && {color: 'red', fontWeight: 'bold'}
                                            ]}>
                                                {label.label}
                                            </Text>
                                        </View>)}
                                    </View>)}
                                </View>
                            </View>
                            <View style={pdfStyles.taskScore}>
                                <Text>Колличество баллов: </Text>
                                <Text style={pdfStyles.score}>{progress[+task.id - 1].score}</Text>
                            </View>
                        </View>)}
                    </View>}
                    {Themes.InputSentence === section.theme && <View break style={pdfStyles.sectionBlock}>
                        <Text style={pdfStyles.question}>{section.question}</Text>
                        {section.tasks.map((task:any) => <View key={task.id} style={pdfStyles.taskBlock}>
                            <View style={pdfStyles.task}>
                                <Text style={pdfStyles.taskNumber}>{task.id}.</Text>
                                <View style={{flexDirection: 'column'}}>
                                    {task.option[option].questions.map((question:any, questionIndex) => <View key={questionIndex} style={{marginBottom: 12}}>
                                        <Text style={{marginTop: 4, marginBottom: 8, fontWeight: 'bold', fontSize: 14}}>{question.text}</Text>
                                        <Text style={{marginBottom: 8, color: 'green', fontSize: 14}}>{question.correctAnswer.split(' /').join('')}</Text>
                                        {progress[+task.id - 1].currentAnswer[questionIndex] &&
                                            <Text style={[{marginBottom: 8, fontWeight: 'bold', fontSize: 14},
                                                question.correctAnswer === progress[+task.id - 1].currentAnswer[questionIndex] ? {color: 'green'} : {color: 'red'}
                                            ]}>
                                                {progress[+task.id - 1].currentAnswer[questionIndex].split(' /').join('')}
                                            </Text>
                                        }
                                    </View>)}
                                </View>
                            </View>
                            <View style={pdfStyles.taskScore}>
                                <Text>Колличество баллов: </Text>
                                <Text style={pdfStyles.score}>{progress[+task.id - 1].score}</Text>
                            </View>
                        </View>)}
                    </View>}
                    {Themes.TrueOrFalse === section.theme && <View break style={pdfStyles.sectionBlock}>
                        <Text style={pdfStyles.question}>{section.question}</Text>
                        {section.tasks.map((task:any) => <View key={task.id} style={pdfStyles.taskBlock}>
                            <View style={pdfStyles.task}>
                                <Text style={pdfStyles.taskNumber}>{task.id}.</Text>
                                <View style={{flexDirection: 'column'}}>
                                    <Image
                                        src={require(`_assets/img/tasks/${subject}/${task.option[option].img}`)}
                                        style={{width: 'auto', height: 56, marginBottom: 16}}
                                    />
                                    {task.option[option].questions.map((question:any, questionIndex) => <View key={questionIndex} style={{marginBottom: 12}}>
                                        <Text style={{marginTop: 4, marginBottom: 8, fontWeight: 'bold', fontSize: 16}}>{question.text}</Text>
                                        {question.labels.map((label:any, labelIndex) => <View key={labelIndex} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
                                            <View style={[
                                                pdfStyles.checkbox,
                                                question.correctAnswer === label.label && {borderColor: 'green'},
                                                progress[+task.id - 1].currentAnswer[questionIndex] === label.label &&
                                                progress[+task.id - 1].currentAnswer[questionIndex] !== question.correctAnswer && {borderColor: 'red'}
                                            ]}>
                                                {/* Correct answer */}
                                                {
                                                    progress[+task.id - 1].currentAnswer[questionIndex] === label.label &&
                                                    progress[+task.id - 1].currentAnswer[questionIndex] === question.correctAnswer &&
                                                        <Text style={[pdfStyles.checked, {backgroundColor: 'green'}]}></Text>
                                                }
                                                {/* Wrong answer */}
                                                {
                                                    progress[+task.id - 1].currentAnswer[questionIndex] === label.label &&
                                                    progress[+task.id - 1].currentAnswer[questionIndex] !== question.correctAnswer &&
                                                        <Text style={[pdfStyles.checked, {backgroundColor: 'red'}]}></Text>
                                                }
                                            </View>
                                            <Text style={[
                                                question.correctAnswer === label.label && {color: 'green', fontWeight: 'bold'},
                                                progress[+task.id - 1].currentAnswer[questionIndex] === label.label &&
                                                progress[+task.id - 1].currentAnswer[questionIndex] !== question.correctAnswer && {color: 'red', fontWeight: 'bold'}
                                            ]}>
                                                {label.label}
                                            </Text>
                                        </View>)}
                                    </View>)}
                                </View>
                            </View>
                            <View style={pdfStyles.taskScore}>
                                <Text>Колличество баллов: </Text>
                                <Text style={pdfStyles.score}>{progress[+task.id - 1].score}</Text>
                            </View>
                        </View>)}
                    </View>}
                    {Themes.ReadText === section.theme && <View break style={pdfStyles.sectionBlock}>
                        <Text style={pdfStyles.question}>{section.question}</Text>
                        {section.tasks.map((task:any) => <View key={task.id} style={pdfStyles.taskBlock}>
                            <View style={pdfStyles.task}>
                                <Text style={pdfStyles.taskNumber}>{task.id}.</Text>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{maxWidth: '90%', marginBottom: 16, fontSize: 14}}>{task.option[option].text}</Text>
                                    {task.option[option].questions.map((question:any, questionIndex) => <View key={questionIndex} style={{marginBottom: 12}}>
                                        <Text style={{marginTop: 4, marginBottom: 8, fontWeight: 'bold', fontSize: 16}}>{question.text}</Text>
                                        {question.labels.map((label:any, labelIndex) => <View key={labelIndex} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
                                            <View style={[
                                                pdfStyles.checkbox,
                                                question.correctAnswer === label.label && {borderColor: 'green'},
                                                progress[+task.id - 1].currentAnswer[questionIndex] === label.label &&
                                                progress[+task.id - 1].currentAnswer[questionIndex] !== question.correctAnswer && {borderColor: 'red'}
                                            ]}>
                                                {/* Correct answer */}
                                                {
                                                    progress[+task.id - 1].currentAnswer[questionIndex] === label.label &&
                                                    progress[+task.id - 1].currentAnswer[questionIndex] === question.correctAnswer &&
                                                        <Text style={[pdfStyles.checked, {backgroundColor: 'green'}]}></Text>
                                                }
                                                {/* Wrong answer */}
                                                {
                                                    progress[+task.id - 1].currentAnswer[questionIndex] === label.label &&
                                                    progress[+task.id - 1].currentAnswer[questionIndex] !== question.correctAnswer &&
                                                        <Text style={[pdfStyles.checked, {backgroundColor: 'red'}]}></Text>
                                                }
                                            </View>
                                            <Text style={[
                                                question.correctAnswer === label.label && {color: 'green', fontWeight: 'bold'},
                                                progress[+task.id - 1].currentAnswer[questionIndex] === label.label &&
                                                progress[+task.id - 1].currentAnswer[questionIndex] !== question.correctAnswer && {color: 'red', fontWeight: 'bold'}
                                            ]}>
                                                {label.label}
                                            </Text>
                                        </View>)}
                                    </View>)}
                                </View>
                            </View>
                            <View style={pdfStyles.taskScore}>
                                <Text>Колличество баллов: </Text>
                                <Text style={pdfStyles.score}>{progress[+task.id - 1].score}</Text>
                            </View>
                        </View>)}
                    </View>}
                    {Themes.ListenAndChoose === section.theme && <View break style={pdfStyles.sectionBlock}>
                        <Text style={pdfStyles.question}>{section.question}</Text>
                        {section.tasks.map((task:any) => <View key={task.id} style={pdfStyles.taskBlock}>
                            <View style={pdfStyles.task}>
                                <Text style={pdfStyles.taskNumber}>{task.id}.</Text>
                                {task.option[option].question
                                    ? <View>
                                        <Text style={{width: '90%', marginTop: 4, marginBottom: 8, fontWeight: 'bold', fontSize: 16}}>{task.option[option].question}</Text>
                                        {task.option[option].labels.map((label:any, index) => <View key={index} style={{flexDirection: 'row', alignItems: 'center', marginRight: 16}}>
                                            <View style={[
                                                pdfStyles.checkbox,
                                                task.option[option].correctAnswer === label.label && {borderColor: 'green'},
                                                progress[+task.id - 1].currentAnswer[0] === label.label &&
                                                progress[+task.id - 1].currentAnswer[0] !== task.option[option].correctAnswer && {borderColor: 'red'}
                                            ]}>
                                                {/* Correct answer */}
                                                {
                                                    progress[+task.id - 1].currentAnswer[0] === label.label &&
                                                    progress[+task.id - 1].currentAnswer[0] === task.option[option].correctAnswer &&
                                                        <Text style={[pdfStyles.checked, {backgroundColor: 'green'}]}></Text>
                                                }
                                                {/* Wrong answer */}
                                                {
                                                    progress[+task.id - 1].currentAnswer[0] === label.label &&
                                                    progress[+task.id - 1].currentAnswer[0] !== task.option[option].correctAnswer &&
                                                        <Text style={[pdfStyles.checked, {backgroundColor: 'red'}]}></Text>
                                                }
                                            </View>
                                            <Text style={[
                                                task.option[option].correctAnswer === label.label && {color: 'green', fontWeight: 'bold'},
                                                progress[+task.id - 1].currentAnswer[0] === label.label &&
                                                progress[+task.id - 1].currentAnswer[0] !== task.option[option].correctAnswer && {color: 'red', fontWeight: 'bold'}
                                            ]}>
                                                {label.label}
                                            </Text>
                                        </View>)}
                                    </View>
                                    : task.option[option].labels.map((label:any, index) => <View key={index} style={{flexDirection: 'column', alignItems: 'center', width: 100, marginRight: 16}}>
                                        <Image
                                            src={require(`_assets/img/tasks/${subject}/${option}/${label.img}`)}
                                            style={{width: 'auto', height: 90, marginBottom: 16}}
                                        />
                                        <View style={[
                                            pdfStyles.checkbox,
                                            task.option[option].correctAnswer === label.label && {borderWidth: 2, borderColor: 'green'},
                                            progress[+task.id - 1].currentAnswer[0] === label.label &&
                                            progress[+task.id - 1].currentAnswer[0] !== task.option[option].correctAnswer && {borderWidth: 2, borderColor: 'red'}
                                        ]}>
                                            {/* Correct answer */}
                                            {
                                                progress[+task.id - 1].currentAnswer[0] === label.label &&
                                                progress[+task.id - 1].currentAnswer[0] === task.option[option].correctAnswer &&
                                                    <Text style={[pdfStyles.checked, {backgroundColor: 'green'}]}></Text>
                                            }
                                            {/* Wrong answer */}
                                            {
                                                progress[+task.id - 1].currentAnswer[0] === label.label &&
                                                progress[+task.id - 1].currentAnswer[0] !== task.option[option].correctAnswer &&
                                                    <Text style={[pdfStyles.checked, {backgroundColor: 'red'}]}></Text>
                                            }
                                        </View>
                                    </View>)
                                }
                            </View>
                            <View style={pdfStyles.taskScore}>
                                <Text>Колличество баллов: </Text>
                                <Text style={pdfStyles.score}>{progress[+task.id - 1].score}</Text>
                            </View>
                        </View>)}
                    </View>}
                </View>)}
            </View>
        </Page>
    </Document>;
};