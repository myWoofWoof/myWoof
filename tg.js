const btn = document.getElementById('submitBtn')
const chatid = "-4080224828";
const token = "6658651296:AAFJgmIIGomeCV222JsdghWSJLugHmRiTp4";
const sep = "\n"


const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatid}&`

const request = new Request(url);
btn.addEventListener('click', function (e) {
    
    let text = "Новый заказ!"+
             sep+
             selectedInfo.title+
             sep+
             "Цвет: "+selectedInfo.color+
             sep+
             "Размер: "+selectedInfo.size+
             sep+
             sep+
             "Номер: "+selectedInfo.phone+
             sep+
             "Имя: "+selectedInfo.name;
    fetch(url + new URLSearchParams({
        text: text,
    }))
        .then((response) => {
        // console.log(selectedInfo,text)

            if (!response.ok) {
                throw new Error('Что-то опошло не так при отправке данных!')
            }

            return response.json()
        })
        .catch((err) => {
            console.log(err)
        })
})