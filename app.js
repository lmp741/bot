
require('dotenv').config();
const server = require('./server.js');
server();

const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
    const chatMember = await ctx.telegram.getChatMember('-1001867897555', ctx.from.id);

    if (chatMember.status === 'left') {
        ctx.replyWithPhoto({ source: '22956d1a-f36e-47e7-9577-cbafaba67ce2.jpg' }, 
            {
                caption: 'Привет! Мы команда - мультибрендового магазина одежды, обуви и аксессуаров - ATHLETIC FLOW В нашей группе, ты можешь выбрать товар из представленных или прислать нам свой для заказа.А также, я выдам тебе купон на скидку за подписку на нашу группу https://t.me/+Uwl-oSo8PSI3NjMy', 
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Забрать купон', callback_data: 'subscribed' }
                        ]
                    ]
                }
        });
    } else {
        ctx.reply('Спасибо, что ты с нами! Держи купон на скидку в 1000р - AFD1000. Воспользуйтесь кнопками для оформления заказа или получения информации о нас.', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Оформить заказ', url: 'https://t.me/AfManager1' }
                    ],
                    [
                        { text: 'Информация о нас', callback_data: 'about_us' }
                    ],
                    [
                        { text: 'Как оформить заказ?', callback_data: 'how_to_order' }
                    ]
                ]
            }
        });
    }
});

// Обработка нажатия кнопки "Информация о нас"
bot.action('about_us', (ctx) => {
    ctx.replyWithPhoto({ source: '22956d1a-f36e-47e7-9577-cbafaba67ce2.jpg' }, 
        {
            caption: 'Вы можете прийти к нам в офис на примерку по предварительной записи.\n\nЗаписаться можете по телефону, который указан ниже.\n\nАдрес г. Москва, ул. Пудовкина 4, офис 125\n\nКонтактный номер: +79651139686\n\nСайт: https://athletic-flow.ru \n\nVK: https://vk.com/\n\nTg: https://t.me/+Uwl-oSo8PSI3NjMy'
        });
});

// Обработка нажатия кнопок "Подписался" и "Не подписался"
bot.action('subscribed', async (ctx) => {
    // Проверяем подписку пользователя на канал после нажатия кнопки
    const chatMember = await ctx.telegram.getChatMember('-1001867897555', ctx.from.id);

    if (chatMember.status === 'member') {
        // Если пользователь подписан на канал, отправляем купон на скидку
        ctx.reply('Спасибо за подписку! Вот ваш купон на скидку: AFD1000. Отправьте этот купон нашему менеджеру, при оформлении заказа, для получения скидки @AfManager1', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Как оформить заказ', callback_data: 'how_to_order' },
                        { text: 'Контакты', callback_data: 'about_us' }
                    ]
                ]
            }
        });
    } else {
        ctx.reply('Пожалуйста, подпишитесь на наш канал, чтобы получить купон. https://t.me/+Uwl-oSo8PSI3NjMy');
    }
});

bot.action('not_subscribed', (ctx) => {
    ctx.reply('Пожалуйста, подпишитесь на наш канал, чтобы получить купон. https://t.me/+Uwl-oSo8PSI3NjMy');
});

// Обработка нажатия кнопок "Как сделать заказ" и "О компании"
bot.action('how_to_order', (ctx) => {
    ctx.replyWithPhoto({ source: '22956d1a-f36e-47e7-9577-cbafaba67ce2.jpg' }, 
        {
            caption: 'В нашей группе, вы можете выбрать товар из представленных или прислать нам свою модель для заказа.\n\nКак сделать заказ?\n\nШаг №1 - Выбираем модель\n\nШаг №2 - Отправляем модель/артикул/фотку и конечно ваш размер нашему менеджеру @AfManager1\n\nШаг №3 - Наш менеджер расскажет о условиях, цене и доставке товара до вас\n\nШаг №4 - И все ждем доставку.\n\nМы отправляем заказы с помощью сервисов CDEK и Яндекс.Доставка'
        });
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
