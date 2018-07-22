'use strict';

const request = require('request-promise');
const fs = require('fs');
const _ = require('lodash');
const { sign } = require('./util');

const base = 'https://api.weixin.qq.com/cgi-bin/';
const api = {
  accessToken: base + 'token?grant_type=client_credential',
  temporary: { // 临时素材
    upload: base + 'media/upload?',
    fetch: base + 'media/get?',
  },
  permanent: { // 永久素材
    upload: base + 'material/add_material?',
    uploadNews: base + 'material/add_news?', // 图文
    uploadNewsPic: base + 'media/uploadimg?', // 图文图片
    fetch: base + 'material/get_material?',
    del: base + 'material/del_material?',
    update: base + 'material/update_news?',
    count: base + 'material/get_materialcount?',
    batch: base + 'material/batchget_material?',
  },
  tag: {
    create: base + 'tags/create?',
    fetch: base + 'tags/get?',
    update: base + 'tags/update?',
    del: base + 'tags/delete?',
    fetchUsers: base + 'user/tag/get?',
    batchTag: base + 'tags/members/batchtagging?',
    batchUnTag: base + 'tags/members/batchuntagging?',
    getTagList: base + 'tags/getidlist?',
  },
  user: {
    remark: base + 'user/info/updateremark?',
    info: base + 'user/info?',
    batchInfo: base + 'user/info/batchget?',
    fetchUserList: base + 'user/get?',
    getBlackList: base + 'tags/members/getblacklist?',
    batchBlackUsers: base + 'tags/members/batchblacklist?',
    batchUnblackUsers: base + 'tags/members/batchunblacklist?',
  },
  menu: {
    create: base + 'menu/create?',
    get: base + 'menu/get?',
    del: base + 'menu/delete?',
    addCondition: base + 'menu/addconditional?',
    delCondition: base + 'menu/delconditional?',
    getInfo: base + 'get_current_selfmenu_info?',
  },
  ticket: {
    get: base + 'ticket/getticket?',
  },
};

module.exports = class Wechat {
  constructor(opts) {
    this.opts = Object.assign({}, opts);
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;
    // this.getTicket = opts.getTicket;
    // this.saveTicket = opts.saveTicket;

    this.fetchAccessToken();
  }

  async request(options) {
    // 总是返回json
    options = Object.assign({}, options, { json: true });

    try {
      const response = await request(options);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchAccessToken() {
    let data = await this.getAccessToken();
    if (!this.isValidToken(data, 'access_token')) {
      data = await this.updateAccessToken();
    }

    await this.saveAccessToken(data);
    return data;
  }

  async updateAccessToken() {
    const url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret;

    const data = await this.request({ url });
    const now = (new Date().getTime());
    const expiresIn = now + (data.expires_in - 20) * 1000;

    data.expires_in = expiresIn;

    return data;
  }

  isValidToken(data, name) {
    if (!data || !data[name] || !data.expires_in) {
      return false;
    }

    const expiresIn = data.expires_in;
    const now = (new Date().getTime());

    if (now < expiresIn) {
      return true;
    }
    return false;
  }

  async handle(operation, ...args) {
    const tokenData = await this.fetchAccessToken();
    const options = this[operation](tokenData.access_token, ...args);
    const data = await this.request(options);

    return data;
  }

  uploadMaterial(token, type, material, permanent) {
    let form = {};
    let url = api.temporary.upload;

    if (permanent) {
      url = api.permanent.upload;

      _.extend(form, permanent);
    }

    if (type === 'pic') {
      url = api.permanent.uploadNewsPic;
    }

    if (type === 'news') {
      url = api.permanent.uploadNews;
      form = material;
    } else {
      form.media = fs.createReadStream(material);
    }

    let uploadUrl = url + 'access_token=' + token;

    if (!permanent) {
      uploadUrl += '&type=' + type;
    } else {
      if (type !== 'news') {
        form.access_token = token;
      }
    }

    const options = {
      method: 'POST',
      url: uploadUrl,
      json: true,
    };

    if (type === 'news') {
      options.body = form;
    } else {
      options.formData = form;
    }

    return options;
  }

  fetchMaterial(token, mediaId, type, permanent) {
    const form = {};
    let fetchUrl = api.temporary.fetch;

    if (permanent) {
      fetchUrl = api.permanent.fetch;
    }

    let url = fetchUrl + 'access_token=' + token;
    const options = { method: 'POST', url };

    if (permanent) {
      form.media_id = mediaId;
      form.access_token = token;
      options.body = form;
    } else {
      if (type === 'video') {
        url = url.replace('https://', 'http://');
      }

      url += '&media_id=' + mediaId;
    }

    return options;
  }

  deleteMaterial(token, mediaId) {
    const form = {
      media_id: mediaId,
    };
    const url = api.permanent.del + 'access_token=' + token + '&media_id' + mediaId;

    return { method: 'POST', url, body: form };
  }

  updateMaterial(token, mediaId, news) {
    const form = {
      media_id: mediaId,
    };

    _.extend(form, news);
    const url = api.permanent.update + 'access_token=' + token + '&media_id=' + mediaId;

    return { method: 'POST', url, body: form };
  }

  countMaterial(token) {
    const url = api.permanent.count + 'access_token=' + token;

    return { method: 'POST', url };
  }

  batchMaterial(token, options) {
    options.type = options.type || 'image';
    options.offset = options.offset || 0;
    options.count = options.count || 10;

    const url = api.permanent.batch + 'access_token=' + token;

    return { method: 'POST', url, body: options };
  }

  createTag(token, name) {
    const form = {
      tag: {
        name,
      },
    };
    const url = api.tag.create + 'access_token=' + token;

    return { method: 'POST', url, body: form };
  }

  fetchTags(token) {
    const url = api.tag.fetch + 'access_token=' + token;

    return { url };
  }

  updateTag(token, tagId, name) {
    const form = {
      tag: {
        id: tagId,
        name,
      },
    };

    const url = api.tag.update + 'access_token=' + token;

    return { method: 'POST', url, body: form };
  }

  delTag(token, tagId) {
    const form = {
      tag: {
        id: tagId,
      },
    };

    const url = api.tag.del + 'access_token=' + token;

    return { method: 'POST', url, body: form };
  }

  fetchTagUsers(token, tagId, openId) {
    const form = {
      tagid: tagId,
      next_openid: openId || '',
    };
    const url = api.tag.fetchUsers + 'access_token=' + token;

    return { method: 'POST', url, body: form };
  }

  // unTag true|false
  batchTag(token, openIdList, tagId, unTag) {
    const form = {
      openid_list: openIdList,
      tagid: tagId,
    };
    let url = api.tag.batchTag;

    if (unTag) {
      url = api.tag.batchUnTag;
    }

    url += 'access_token=' + token;

    return { method: 'POST', url, body: form };
  }

  getTagList(token, openId) {
    const form = {
      openid: openId,
    };
    const url = api.tag.getTagList + 'access_token=' + token;

    return { method: 'POST', url, body: form };
  }

  remarkUser(token, openId, remark) {
    const form = {
      openid: openId,
      remark,
    };
    const url = api.user.remark + 'access_token=' + token;

    return { method: 'POST', url, body: form };
  }

  getUserInfo(token, openId, lang) {
    const url = `${api.user.info}access_token=${token}&openid=${openId}&lang=${lang || 'zh_CN'}`;

    return { url };
  }

  batchUserInfo(token, userList) {
    const url = api.user.batchInfo + 'access_token=' + token;
    const form = {
      user_list: userList,
    };

    return { method: 'POST', url, body: form };
  }

  fetchUserList(token, openId) {
    const url = `${api.user.fetchUserList}access_token=${token}&next_openid=${openId || ''}`;

    return { url };
  }

  createMenu(token, menu) {
    const url = api.menu.create + 'access_token=' + token;

    return { method: 'POST', url, body: menu };
  }

  getMenu(token) {
    const url = api.menu.get + 'access_token=' + token;

    return { url };
  }

  delMenu(token) {
    const url = api.menu.del + 'access_token=' + token;

    return { url };
  }

  addConditionMenu(token, menu, rule) { // 个性化菜单
    const url = api.menu.addCondition + 'access_token=' + token;
    const form = {
      button: menu,
      matchrule: rule,
    };

    return { method: 'POST', url, body: form };
  }

  delConditionMenu(token, menuId) {
    const url = api.menu.delCondition + 'access_token=' + token;
    const form = {
      menuid: menuId,
    };

    return { method: 'POST', url, body: form };
  }

  getCurrentMenuInfo(token) {
    const url = api.menu.getInfo + 'access_token=' + token;

    return { url };
  }

  sign(ticket, url) {
    return sign(ticket, url);
  }

};
