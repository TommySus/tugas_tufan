// const wa = require('@open-wa/wa-automate');
// const cron = require('node-cron');
// let clientWA 
// let timeOutIDs=[]

// let date = new Date () 
// date.setDate(date.getDate() + 2);
// console.log(date)

// let today = new Date()
// today = today.toString().slice(0,9)
// today = new Date(today)
// today.setDate(today.getDate() + 3)

// let tommorow = new Date()
// tommorow = tommorow.toString().slice(0,9)
// tommorow = new Date(tommorow)
// tommorow.setDate(tommorow.getDate() + 4)

// console.log(today, tommorow)

// // cron.schedule('0 */12 * * *', function() {
    
// // });
// // wa.create({
// //     useChrome: true,
// //     maxMessages: 2
// // })
// // .then(client => {
// //     for (let i = 0; i < 2; i++) {
// //         start(client, i)
// //     }
// // });


// // function start(client, i) {
// //   client.onMessage(async message => {
// //       return await client.sendText("6285155091559@c.us", `👋 Hello! index ke - ${i}`);
// //   });
// // }

// let tommorow = new Date()
// tommorow = tommorow.toString().slice(0,9)
// tommorow = new Date(tommorow)
// tommorow.setDate(tommorow.getDate())
// let number;
// console.log(tommorow,'<tommorow')
// const TODAY_START = new Date().setHours(0, 0, 0, 0);
let today2 = '2021-10-05'
let tomorrow2 = new Date(today2)
tomorrow2.setDate(tomorrow2.getDate() + 1)

function appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
}
let current_datetime = new Date()

let formatted_date = current_datetime.getFullYear() + "-" + appendLeadingZeroes(current_datetime.getMonth() + 1) + "-" + appendLeadingZeroes(current_datetime.getDate())
let tomorrow = new Date(formatted_date)
tomorrow.setDate(tomorrow.getDate() + 1)
// let today3 = new Date()
// var day = today3.getDay()
// var month = today3.getMonth() + 1; // month (in integer 0-11)
// var year = today3.getFullYear()
// today3 = `${year}-${month}-${day}`


let today = new Date()
let tommorow_START = new Date(today)
tommorow_START.setDate(tommorow_START.getDate())
tommorow_START.setHours(23)
// let oke = '' + tomorrow
console.log(tomorrow, tommorow_START, tomorrow2)