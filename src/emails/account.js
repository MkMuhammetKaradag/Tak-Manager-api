import mailgun from 'mailgun-js'
import dotenv from 'dotenv'

dotenv.config()

const apiKey=process.env.API_KEY
const domain=process.env.DOMAIN

const mg=mailgun({apiKey,domain})

export const sendWelcomeEmail=(email,name)=>{
    const data = {
	from: 'mami@mead.io',
	to: email,
	subject: 'Hello',
	text: `Welcoem to  the app  ${name}  let me  know  you get   along  with the  app`
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
}

export const sendCancelationEmail=(email,name)=>{
    const data = {
        from: 'mami@mead.io',
        to: email,
        subject: 'sorry  to see you go! ',
        text: `Goodby  ${name} I hope  to see  back sometime  soon `
        };
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });
}


