import API from "./API";

export default class CheckAdmin {
    constructor() {
        this.api = new API(`http://localhost:7070`);
        this.makeForm();
    }

    makeForm() {

        const heartOfPage = document.querySelector(".heart-of-page");

        const inptId = document.createElement("input");
        inptId.className = "input-id"; 
        inptId.setAttribute('Placeholder', 'Past here your id');
        inptId.setAttribute('required', true);
        heartOfPage.append(inptId);

        const inptPswd = document.createElement("input");
        inptPswd.className = "input-pswd";
        inptPswd.setAttribute('Placeholder', 'Past here your password');
        inptPswd.setAttribute('required', true);
        heartOfPage.append(inptPswd);
       
        const checkBtn = document.createElement("button");
        checkBtn.className = "check-button";
        checkBtn.textContent = "Log in";
        heartOfPage.append(checkBtn);

        checkBtn.addEventListener('click', async(evt)=>{
            evt.preventDefault();
            let admin = inptId.value;
            let response = await this.api.logAdmin({
                'id': inptId.value,
                'pswd': inptPswd.value
            })
            let data = await response.json();
            if(data.ok) {
                this.showTable();
            } else {
                console.log('forbidden');
                inptId.value = '';
                inptPswd.value = '';
            }

        })
    }

    showTable() {
        const heartOfPage = document.querySelector(".heart-of-page");
        heartOfPage.innerHTML = '';
        ( async () => {
            let response = await this.api.pullUsers();
            let data = await response.json();
           

            data.forEach( (item)=> {
                this.createCard(item);
            })
        })();
       
        
    }

    createCard(item) {
        const heartOfPage = document.querySelector(".heart-of-page");

        const card = document.createElement("div");
        card.className = "user-card";
        heartOfPage.append(card);
        
        const cardHeader = document.createElement("header");
        cardHeader.className = "user-card-header";
        card.append(cardHeader);

        const nameField = document.createElement("span");
        nameField.className = "name-field";
        nameField.textContent = `Name: ${item.name}`;
        cardHeader.append(nameField);

        const statusField = document.createElement("span");
        statusField.className = "status-field";
        statusField.textContent = `Status: ${item.status}`;
        cardHeader.append(statusField);

        const idField = document.createElement("span");
        idField.className = "id-field";
        idField.textContent = `ID: ${item.id}`;
        cardHeader.append(idField);

        const cardContent = document.createElement("ul");
        cardContent.className = "user-card-content";
        card.append(cardContent);

        let questionsArr = Object.values(item.questions);
        let answersArr = Object.values(item.answers);

        for( let i = 0; i < questionsArr.length; i += 1){
            let item = document.createElement("li");
            item.className = "qa-item";
            cardContent.append(item);

            let question = document.createElement("span");
            question.textContent = questionsArr[i];
            item.append(question);

            let answer = document.createElement("span");
            answer.textContent = answersArr[i];
            item.append(answer);
        }
    }

}
