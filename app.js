require('dotenv').config();
const server = require('./server.js');
server();

const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Обработка команды /start
bot.start(async (ctx) => {
    // Проверяем подписку пользователя на канал @AF_POIZON
    const chatMember = await ctx.telegram.getChatMember('@AF_POIZON', ctx.from.id);

    if (chatMember.status === 'left') {
        // Если пользователь не подписан на канал, отправляем сообщение и кнопки
        ctx.replyWithPhoto({ source: '22956d1a-f36e-47e7-9577-cbafaba67ce2.jpg' }, // Замените на путь к вашей картинке
            {
                caption: 'Привет!\n\nМы команда - мультибрендового магазина одежды, обуви и аксессуаров - ATHLETIC FLOW\n\nВ нашей группе, ты можешь выбрать товар из представленных или прислать нам свою для заказа.\n\nА также, я выдам тебе купон на скидку за подписку на нашу группу @AF_POIZON', 
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Забрать купон', callback_data: 'subscribed' }
                        ]
                    ]
                }
        });
    } else {
        // Если пользователь уже подписан на канал, отправляем сообщение о том, что всё в порядке
        ctx.reply('Вы уже подписаны на наш канал. Воспользуйтесь кнопками для оформления заказа или получения информации о нас.', {
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
    ctx.replyWithPhoto({ source: '22956d1a-f36e-47e7-9577-cbafaba67ce2.jpg' }, // Замените на путь к картинке для "О компании"
        {
            caption: 'Вы можете прийти к нам в офис на примерку по предварительной записи. Записаться можете по телефону, который указан ниже.\n\nАдрес г. Москва, ул. Пудовкина 4, офис 125\n\nКонтактный номер: +79651139686 \n\nСайт: https://athletic-flow.ru \n\nVK: https://vk.com/athleticflown \n\nTg: @ATHLETIC_FLOW'
        });
});

// Обработка нажатия кнопок "Подписался" и "Не подписался"
bot.action('subscribed', async (ctx) => {
    // Проверяем подписку пользователя на канал после нажатия кнопки
    const chatMember = await ctx.telegram.getChatMember('@AF_POIZON', ctx.from.id);

    if (chatMember.status === 'member') {
        // Если пользователь подписан на канал, отправляем купон на скидку
        ctx.reply('Спасибо за подписку! Вот ваш купон на скидку: AFD1000', {
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
        ctx.reply('Пожалуйста, подпишитесь на наш канал @AF_POIZON, чтобы получить купон.');
    }
});

bot.action('not_subscribed', (ctx) => {
    ctx.reply('Пожалуйста, подпишитесь на наш канал @AF_POIZON, чтобы получить купон.');
});

// Обработка нажатия кнопок "Как сделать заказ" и "О компании"
bot.action('how_to_order', (ctx) => {
    ctx.replyWithPhoto({ source: '22956d1a-f36e-47e7-9577-cbafaba67ce2.jpg' }, // Замените на путь к картинке для "Как сделать заказ"
        {
            caption: 'В нашей группе, вы можете выбрать товар из представленных или прислать нам свою для заказа.\n\nКак сделать заказ?\n\nШаг №1 - Выбираем модель.\nШаг №2 - Отправляем модель/артикул/фотку и конечно ваш размер нашему менеджеру @AfManager1 \nШаг №3 - Наш менеджер расскажет о условиях, цене и доставке товара до вас.\nШаг №4 - И все ждем доставку.\n\nМы отправляем заказы с помощью сервисов CDEK и Яндекс.Доставка'
        });
});

bot.action('about_us', (ctx) => {
    ctx.replyWithPhoto({ source: '22956d1a-f36e-47e7-9577-cbafaba67ce2.jpg' }, // Замените на путь к картинке для "О компании"
        {
            caption: 'Вы можете прийти к нам в офис на примерку по предварительной записи. Записаться можете по телефону, который указан ниже.\n\nАдрес г. Москва, ул. Пудовкина 4, офис 125 \n\nКонтактный номер: +79651139686\n\nСайт: https://athletic-flow.ru\n\nVK: https://vk.com/athleticflown\n\nTg: @ATHLETIC_FLOW   '
        });
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
