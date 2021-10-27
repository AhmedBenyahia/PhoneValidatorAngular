/** fake HttpClient class */
export class HttpClientStub {
    /** simulate the HTTP get method */
    get(url: string) {
        return url;
    }

    /** simulate the HTTP post method */
    post(url: string, param: any) {
        return {url, param};
    }
}
