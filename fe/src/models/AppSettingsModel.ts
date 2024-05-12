class AppSettingsModel {
    _isLocalStorage: boolean;
    _setIsLocalStorage: Function;
    _isUserLoggedIn: boolean;
    _setIsUserLoggedIn: Function;
    _isDarkMode: boolean;
    _setIsDarkMode: Function;

    constructor(isLocalStorage: boolean, setIsLocalStorage: Function, isUserLoggedIn: boolean, setIsUserLoggedIn: Function, isDarkMode: boolean, setIsDarkMode: Function) {
        this._isLocalStorage = isLocalStorage;
        this._setIsLocalStorage = setIsLocalStorage;
        this._isUserLoggedIn = isUserLoggedIn;
        this._setIsUserLoggedIn = setIsUserLoggedIn;
        this._isDarkMode = isDarkMode;
        this._setIsDarkMode = setIsDarkMode;
    }
}

export default AppSettingsModel;