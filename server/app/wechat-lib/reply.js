'use strict';


const tip = '欢迎关注山楂的小小屋';

const welcome = '这里是山楂的小小屋公众号';


module.exports = async ctx => {

  const message = ctx.weixin;
  // const mp = require('../wechat');
  // const client = mp.getWechat();
  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      ctx.body = tip;
    } else if (message.Event === 'unsubscribe') {
      console.log('取关了');
    } else if (message.Event === 'LOCATION') {
      ctx.body = message.Latitude + ' : ' + message.Longitude;
    } else if (message.Event === 'view') {
      ctx.body = message.EventKey + message.MenuId;
    } else if (message.Event === 'pic_sysphoto') {
      ctx.body = message.Count + ' photos sent';
    } else if (message.Event === 'CLICK') {
      if (message.EventKey === 'bt') {
        console.log(1);
        ctx.body = welcome;
        console.log(2);
      }
    } else {
      ctx.body = tip;
    }
  } else if (message.MsgType === 'text') {
    if (message.Content === '更新按钮吧') {
      // const menu = require('./menu').default;
      // let menuMsg = '创建成功';

      // try {
      //   await client.handle('delMenu');
      // } catch (e) {
      //   console.log('删除菜单失败');
      //   console.log(e);

      //   menuMsg = '删除失败';
      // }

      // try {
      //   await client.handle('createMenu', menu);
      // } catch (err) {
      //   console.log('创建菜单失败');
      //   console.log(err);
      //   menuMsg += menuMsg;
      // }

      // ctx.body = menuMsg;
    } else if (message.Content === '你好' || message.Content === '3') {
      ctx.body = welcome;
    } else if (message.Content === '2') {
      const menu = require('./menu');
      const client = await ctx.service.wechat.getWechatClient();
      await client.handle('delMenu');
      await client.handle('createMenu', menu);
      // console.log(JSON.stringify(data));
    }

  } else if (message.MsgType === 'image') {
    ctx.body = {
      type: 'image',
      mediaId: message.MediaId,
    };
  } else if (message.MsgType === 'voice') {
    ctx.body = {
      type: 'voice',
      mediaId: message.MediaId,
    };
  } else if (message.MsgType === 'video') {
    ctx.body = {
      type: 'video',
      mediaId: message.MediaId,
    };
  } else if (message.MsgType === 'location') {
    ctx.body = message.Location_X + ' : ' + message.Location_Y + ' : ' + message.Label;
  } else if (message.MsgType === 'link') {
    ctx.body = [{
      title: message.Title,
      description: message.Description,
      picUrl: message.picUrl,
      url: message.Url,
    }];
  }
};
