const account = load()
const walletsList = document.getElementById("wallets-list")
const notificationList = document.getElementById("notification-list")
const cardCreate = document.getElementById("form-new-wallet")
const cardClose = document.getElementById("card-close")
const clearNotifications = document.getElementById("clear-notifications")
outputWallets(account.wallets)
outputNotifications(account.notifications)

cardCreate.addEventListener('submit', (event) => {
    event.preventDefault()
    const nameWallet = document.getElementById('name-wallet').value
    const typeWallet = document.getElementById('type-wallet').value
    createWallet(nameWallet, typeWallet)
})

clearNotifications.addEventListener('click', () => {
    account.notifications = []
    save()
    outputNotifications(account.notifications)
})

cardClose.addEventListener('click', () => {
    const nameWallet = document.getElementById('name-wallet').value
    const wallet = account.wallets.find(wallet => wallet.name === nameWallet)
    if (!wallet) return alert('Такого счета не существует')
    if (confirm(`Вы действительно хотите закрыть счет ${wallet.name}?`)) {
        account.wallets.splice(account.wallets.indexOf(wallet), 1)
        outputWallets(account.wallets)
        save()
        sendNotification('Счет успешно закрыт', `Вы закрыли счет под названием: ${nameWallet}`)
    }
})

function load() {
    let user = JSON.parse(localStorage.getItem(`account`))
    if (!user) {
        user = {
            firstName: "Mary",
            lastName: "Benson",
            photo: "main-user.png",
            dateOfBirth: new Date(1970, 1, 1),
            wallets: [],
            notifications: [],
            gender: "female",
        }
    }
    const userData = document.getElementById("user-data")
    userData.innerHTML = `
        <img src="images/users/${user.photo}" alt="user">
        <p>Имя: ${user.firstName}</p>
        <p>Фамилия: ${user.lastName}</p>
        <p>Пол: ${user.gender === "male" ? "Мужской" : "Женский"}</p>
`
    return user
}

function save() {
    localStorage.setItem(`account`, JSON.stringify(account))
}

function createSections(arr, name) {
    if (!arr[name]) arr[name] = []
}


function createWallet(name, type) {
    createSections(account, "wallets")
    if (checkWallet(name)) {
        alert('Такой счет уже существует')
    } else {
        account.wallets.push({
            name: name,
            money: 0,
            transactions: [],
            id: random(1000000000000000, 9999999999999999),
            type: type
        })
        sendNotification('Счет успешно создан', `Вы открыли новый счет под названием: ${name}`)
        randomTransaction(getWallet(name))
    }
    save()
    outputWallets(account.wallets)
}

function checkWallet(name) {
    for (const wallet of account.wallets) {
        if (wallet.name === name) {
            return true
        }
    }
    return false
}

function getWallet(name) {
    return account.wallets.find(wallet => wallet.name === name)
}

function outputWallets(wallets) {
    walletsList.innerHTML = '';
    for (const wallet of wallets) {
        let transactions = ``
        for (const transaction of wallet.transactions) {
            transactions += `
            <div class="transaction">
                <p>Тип транзакции: ${transaction.type === "get" ? "Пополнение" : "Списание"}</p>
                <p>Сумма: ${transaction.money} $</p> 
                <p>Дата перевода: ${transaction.date}</p>
                <p>${transaction.type === "get" ? "Отправитель" : "Получатель"}: ${transaction.name}</p>
                <p>Комментарий: ${transaction.comment}</p>
            </div>
            `
        }
        walletsList.innerHTML += `
<div class="card"">
    <div class="card-header">
        <h4>${wallet.name}</h4>
        <h6>id: ${wallet.id}</h6>
        <h6 class="${wallet.type}-card-text">Тип карты: ${wallet.type}</h6>
    </div>
    
    <div class="card-text">
        <p>Баланс: ${wallet.money} $</p>
    </div>
    
    <div class="card-transactions">
        <h5>Последние транзакции:</h5>
       
        ${transactions}
        
    </div>
</div>
        `;
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function outputNotifications(notifications) {
    notificationList.innerHTML = '';
    for (const notification of notifications) {
        notificationList.innerHTML += `
<div class="notification-card"">
    <div class="card-header">
        <h4>${notification.name}</h4>
    </div>
    
    <div class="card-text">
        <p>${notification.text}</p>
    </div>
    
    <div class="card-footer">
        <p>${notification.date}</p>
    </div>
</div>
        `;
    }
}

function sendNotification(name, text) {
    createSections(account, "notifications")
    account.notifications.push({
        name: name,
        text: text,
        date: new Date()
    })
    save()
    outputNotifications(account.notifications)
}

function transaction(type, name, user, money, comment) {
    sendNotification(`${type === "get" ? "Входящий" : "Исходящий"} перевод`, `
Пользователь: ${user}
<br> Перевел вам: ${money}$ 
<br> На счет: ${name} 
<br> Комментарии при переводе: "${comment}".`
    )
    for (const wallet of account.wallets) {
        if (wallet.name === name) {
            type === "get" ? wallet.money += money : wallet.money -= money
            wallet.transactions.push({
                type: type,
                date: new Date(),
                name: user,
                comment: comment,
                money: money
            })
            break
        }
    }
    save()
    outputWallets(account.wallets)
}

function randomTransaction(wallet) {
    if (wallet.type === "premium") {
        const event = random(1, 100)
        if (event <= 10) transaction("get", wallet.name, "Скрудж МакДак", 1000000, "Привет я обещал миллиард долларов но думаю тебе хватит:)")
        else if (event <= 35) transaction("get", wallet.name, "Andrey Starinin", 1180, "Еще раз будешь в такой ситуации, я тебя убью")
        else if (event <= 40) transaction("get", wallet.name, "Microsoft", 2000000000, "Спасибо за то что продали нам Minecraft")
    }
    else if (wallet.type === "credit") {
        transaction("get", wallet.name, "American Government", 10000000, "Вам одобрен кредит на 10 миллионов долларов")
    }
}