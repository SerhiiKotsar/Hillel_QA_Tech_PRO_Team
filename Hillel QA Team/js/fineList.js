"use strict";
window.fineList = {
    searchFines : searchFines
}

//У цій змінній містяться всі дані які в нас зберігаються у файлі data.js
let DB = data.finesData;

function searchFines() {

    /*
     Напишіть свій код тут!
     Як ви бачите функція повертає статичні дані.
     Замість масиву який прописаний хардкодом, вам необхідно реалізувати цю функцію
     так, щоб вона повертала масив відповідно переданому значенню в функцію.
     Саме значення - це "Пошук за номером" або "Пошук за типом штрафу"
     Тип штрафу може бути тільки
     - Перевищення швидкості
     - Невірне паркування
     - Їзда у не тверезому стані
     */

    //У змінній fineNumber оголошуємо значення, яке користувач ввів в поле "Пошук по номеру"
    let fineNumber = document.getElementById("searchInput2").value;
    //У змінній fineType оголошуємо значення, яке користувач ввів в поле "Пошук по типу штрафу"
    let fineType = document.getElementById("searchInput").value;
    //Створюємо змінну, в якій зазначаємо можливі значення типу штрафу
    let availbleTypesEnum = {
        value1: 'Перевищення швидкості',
        value2: 'Невірне паркування',
        value3: 'Їзда у не тверезому стані'
    };

    //Якщо користувач шукає інформацію виключно по номеру штрафу
    if (fineNumber) {
        //Знайдене значення поміщаємо у змінну foundFineNumber
        let foundFineNumber = DB.filter(штраф => штраф.номер === fineNumber);
        //Якщо знайдено хоча б одне значення, яке підходить
        if (foundFineNumber.length > 0) {
            //Повертаємо знайдене значення
            return foundFineNumber;
        } else {
            alert('Штрафів з таким номером не знайдено! Перевірте введене значення');
            return null;
        }
    }

    //Якщо користувач шукає інформацію виключно по типу штрафу
    if (fineType) {
        //Якщо користувач ввів одне з допустимих значень типу штрафу (оголошене в змінній availbleTypesEnum)
        if (Object.values(availbleTypesEnum).includes(fineType)) {
            //Знайдене/підходяще значення фіксуємо у змінній
            let foundFineType = DB.filter(штраф => штраф.тип === fineType);
            //Повертаємо знайдені/підходящі значення
            return foundFineType;
        } else {
            alert('Штрафів такого типу не знайдено! Перевірте введене значення');
            return null;
        }
    }

    //Якщо користувач шукає інформацію і по номеру штрафу, і по його типу одночасно (якщо введено значення в обидва поля)
    if (fineNumber && fineType) {
        //Значення номеру штрафу оголошуємо у змінній foundFineNumber
        let foundFineNumber = DB.filter(штраф => штраф.номер === fineNumber);
        let foundFineType;

        //Значення номеру штрафу оголошуємо у змінній foundFineType
        if (Object.values(availbleTypesEnum).includes(fineType)) {
            //Знайдений тип штрафу оголошуємо у змінній foundFineType
            foundFineType = DB.filter(штраф => штраф.тип === fineType);
        }
        //Якщо знайдено штраф, який відповідає обом критеріям - номеру і типу штрафу
        if (foundFineNumber && foundFineType) {
            return [foundFineNumber, foundFineType]
        }
    }

    //Якщо користувач не ввів значення у поля пошуку і клікнув "Пошук" - повертати всі штрафи, які зберігаються в БД
    if (fineNumber == false && fineType == false) {
        return DB;
    }
}

