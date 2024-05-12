import { useContext, useState } from 'react'
import { ActiveNoteContext, ControllersContext } from '../App';
import useInterval from '../helpers/useInterval';
import NoteModel from '../models/NoteModel';
import NotesSelector from './NotesSelector';


function SearchBar(props) {

    let [barText, setBarText] = useState("");
    let [currentTick, setCurrentTick] = useState(0);
    let [searchTick, setSearchTick] = useState(0);
    let [showSearchResult, setShowSearchResult] = useState(false);
    let [titleResult, setTitleResult] = useState(null);
    let [contentResult, setContentResult] = useState(null);
    const { setShowAllNotes } = props;
    let controllerContext = useContext(ControllersContext);

    function updateText(event) {
        setBarText(event.target.value);
        if (event.target.value !== "") {
            setSearchTick(currentTick + 1);
            setShowAllNotes(false);
        }
        else {
            setTitleResult(null);
            setContentResult(null);
            setSearchTick(0);
            setShowAllNotes(true);
        }
    }
    function searchNote() {
        controllerContext.controllerContext._noteController.searchNoteTitleByText(barText).then((result: NoteModel[]) => {
            setTitleResult(result);
        });
        controllerContext.controllerContext._noteController.searchNoteContentByText(barText).then((result: NoteModel[]) => {
            let processedResult: NoteModel[] = [];
            for (let noteModel of result) {
                let noteIndex = noteModel.noteContent.toLowerCase().indexOf(barText.toLowerCase());
                let auxContent = noteModel.noteContent;
                while (noteIndex !== -1) {
                    let partialContentNote = new NoteModel();
                    partialContentNote.noteId = noteModel.noteId;
                    partialContentNote.noteTitle = noteModel.noteTitle;
                    partialContentNote.noteContent = auxContent.substring(0, noteIndex + barText.length);
                    partialContentNote.userId = noteModel.userId;
                    processedResult.push(partialContentNote);
                    auxContent = auxContent.substring(noteIndex + barText.length);
                    if (auxContent != null || auxContent !== "") {
                        noteIndex = auxContent.indexOf(barText);
                    }
                    else {
                        noteIndex = -1;
                    }
                }
            }
            setContentResult(processedResult);
        });
    }
    function clearState() {
        setTitleResult(null);
        setContentResult(null);
        setBarText("");
        setSearchTick(0);
    }
    useInterval(() => {
        if (currentTick === searchTick && currentTick !== 0) {
            searchNote();
        }
        setCurrentTick(currentTick + 1);
    }, 500);
    return (
        <div>
            <input type="text" onChange={updateText}>
            </input>
            {
                titleResult != null &&
                <div className="titleResult">
                    <p>Title result</p>
                    {
                        titleResult.length > 0 ?
                            <ul>
                                {
                                    titleResult.map((value: NoteModel, index) => {
                                        return (
                                            <li className="noteSelector" key={index} onClick={clearState}>
                                                <NotesSelector key={value.noteId} noteId={value.noteId} title={value.noteTitle}></NotesSelector>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                            :
                            <p>
                                No results found!
                            </p>
                    }
                </div>
            }
            {
                contentResult != null &&
                <div className="contentResult">
                    <p>Content result</p>
                    {
                        contentResult.length > 0 ?
                        <ul>
                            {
                                contentResult.map((value: NoteModel, index) => {
                                    return (
                                        <li className="noteSelector" key={index} onClick={clearState}>
                                            <NotesSelector key={value.noteId} noteId={value.noteId} title={value.noteContent}></NotesSelector>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        :
                        <p>
                            No results found!
                        </p>
                    }
                </div>
            }
        </div>
    )
}

export default SearchBar;

