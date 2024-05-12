import { INoteController } from "../interfaces/INoteController";

class ContextModel {

    _noteController: INoteController;

    constructor(noteController: INoteController) {
        this._noteController = noteController
    }
}

export default ContextModel;