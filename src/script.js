
class WBSAR {
    regexString = "gi"
    initialContent = "";
    contentElement = null;
    searchElement = null;
    searchCountElement = null;
    searchText = "";
    replaceElement = null;
    replaceCountElement = null;
    replaceText = "";
    replaceButtonElement = null
    caseElement = null;
    closeElement = null;

    constructor() {
        this.init()
        this.getContent()
        this.handleCase()
        this.handleClose()
        this.handleSearch()
        this.handleReplace()
    }

    init() {
        this.searchElement = document.getElementById("wbsar-search-input")
        this.searchCountElement = document.getElementById("wbsar-search-count")
        this.replaceElement = document.getElementById("wbsar-replace-input")
        this.replaceCountElement = document.getElementById("wbsar-replace-count")
        this.replaceButtonElement = document.getElementById("wbsar-replace-button")
        this.caseElement = document.getElementById("wbsar-case-checkbox")
        this.closeElement = document.getElementById("wbsar-search-close")
    }

    getContent() {
        this.searchElement.addEventListener("focus", () => {
            if (this.searchText === "") {
                this.contentElement = document.querySelector(".edit-post-visual-editor");
                this.initialContent = this.contentElement.innerHTML
            }
        })
    }

    handleCase() {
        this.caseElement.addEventListener("change", (e) => {
            if (e.target.checked) {
                this.regexString = "g"
            } else {
                this.regexString = "gi"
            }
            this.highlightText()
        })
    }

    handleClose() {
        this.closeElement.addEventListener("click", () => {
            this.searchText = ""
            this.searchElement.value = ""
            this.searchCountElement.style.display = "none"
            this.clearSearch()
        })
    }

    handleSearch() {
        this.searchElement.addEventListener("input", (e) => {
            this.searchText = e.target.value
            if (this.searchText.length < 3) {
                this.clearSearch()
                this.searchCountElement.style.display = "none"
            } else {
                this.highlightText()
            }
        })
    }

    highlightText() {
        let response = "";
        let regex = new RegExp(this.searchText, this.regexString);
        let highlightedContents = this.initialContent.match(regex) || [];
        this.searchCountElement.style.display = "block"
        this.searchCountElement.querySelector("strong").innerText = highlightedContents.length
        console.log(highlightedContents)
        if (highlightedContents.length == 0) {
            this.clearSearch()
            return
        }

        for (let highlightedContent of highlightedContents) {
            response = this.initialContent.replaceAll(
                highlightedContent,
                `<mark>${highlightedContent}</mark>`
            );
        }
        this.contentElement.innerHTML = response;
    }

    handleReplace() {
        this.replaceElement.addEventListener("input", (e) => {
            this.replaceText = e.target.value
        })
        this.replaceButtonElement.addEventListener("click", (e) => {
            if (this.replaceText === "") {

            } else {
                this.changeText()
            }
        })
    }

    changeText() {
        let response = "";
        let regex = new RegExp(this.searchText, this.regexString);
        response = this.initialContent.replaceAll(
            regex,
            this.replaceText
        );
        this.contentElement.innerHTML = response;
    }

    clearSearch() {
        // const regexPattern = /<span style=['"]background-color: yellow; color: black;['"]>.*?<\/span>/g;

        // const matches = this.contentElement.innerHTML.match(regexPattern);

        // if (matches) {
        //     console.log("Matches found:", matches);
        // } else {
        //     console.log("No matches found.");
        // }
        console.log(this.initialContent)
        this.contentElement.innerHTML = this.initialContent
    }
}

const wbsar = new WBSAR();



