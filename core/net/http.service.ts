import http from './http';
export function getLiuliList(pageIndex = 1, type: SearchType = 'all'): Promise<PageResult> {
    return http.get('api', {
        pageIndex,
        type,
    });
}

export function getDownloadUrl(url: string): Promise <string> {
    return http.get('api/url', {
        url: encodeURI(url),
    });
}

export type SearchType = 'all'|'anime'|'comic'|'game'|'op'|'book';

export interface PageResult {
    total: number;
    current: number;
    data: PageData[];
}

export interface PageData {
    title: string;
    time: string;
    img: string;
    description: string;
    moreLink: string;
    type: string[];
}
