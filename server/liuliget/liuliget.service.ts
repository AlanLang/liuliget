import { Injectable } from '@nestjs/common';
import superagent from 'superagent';
import cheerio from 'cheerio';
import {SearchType, PageData} from '../../core/net/http.service';
import {returnSuccess, returnError} from '../../core/net/http';

const liuliType = {
  all: 'http://www.llss.pl/wp/page/',
  anime: 'http://www.llss.life/wp/category/all/anime/',
  comic: 'http://www.llss.life/wp/category/all/comic/',
  game: 'http://www.llss.life/wp/category/all/game/',
  music: 'http://www.llss.life/wp/category/all/op/',
  book: 'http://www.llss.life/wp/category/all/%e8%bd%bb%e5%b0%8f%e8%af%b4/',
};

@Injectable()
export class LiuliService {

  async getNewsPage(index = 1, type: SearchType = 'all') {
    const html = await this.getHtml(liuliType[type] + index);
    const $ = cheerio.load(html, {decodeEntities: false});
    return returnSuccess({
        current: parseInt($('.wp-pagenavi').find('.current').text(), 0),
        total: this.getTotal($('.wp-pagenavi').find('.pages').text()),
        data: this.getLiulis(html),
    });
  }

  async getDownloadUrl(url: string) {
    const html = await this.getHtml(url);
    const $ = cheerio.load(html, {decodeEntities: false});
    const res = $('.entry-content').text().split('\n');
    for (const item of res) {
      const result = item.replace(/^\s+|\s+$/g, '').split('.').join('');
      const reg = /^[0-9a-zA-Z]*$/g;
      if (reg.test(result) && result.length === 40) {
        return returnSuccess('magnet:?xt=urn:btih:' + result);
      }
    }
    return returnError(1, '获取下载地址失败');
  }

  private getHtml(url: string): Promise<string> {
    return new Promise((resove, reject) => {
      superagent.get(url).end((err, res) => {
          if (err) {
              reject(err);
          } else {
              resove(res.text);
          }
      });
    });
  }

  private getTotal(totleText: string): number {
    const messages = totleText.split(' ');
    return messages.length > 3 ? parseInt(messages[3], 0) : 0;
  }

  private getLiulis(text: string): PageData[] {
    const liulis = [];
    const $ = cheerio.load(text, {decodeEntities: false});
    $('.status-publish').each((idx, ele) => {
      const title = $(ele).find('.entry-title').find('a').html();
      const time = $(ele).find('.entry-date').html();
      const img = $(ele).find('.entry-content').find('img').attr('src');
      const description = $(ele).find('.entry-content').find('p').contents().filter(function() {
        return this.nodeType === 3;
      }).text();
      const moreLink = $(ele).find('.more-link').attr('href');
      const type = $(ele).find('.cat-links').text().replace(/[\n]/g, '').replace(/[\t]/g, '').replace('发表在 ', '').split('、');
      liulis.push({title, time, img, description, moreLink, type});
    });
    return liulis;
  }
}
