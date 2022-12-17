import osmosis from "osmosis";

export class Breed {
    private HOST_DOGS = "https://lapkins.ru/dog/";

    constructor() {
    }

    public async getDogs(): Promise<any> {
        return new Promise((resolve, reject) => {
            let response = [];
            osmosis
                .get(encodeURI(this.HOST_DOGS))
                .headers({
                    "Host": "lapkins.ru",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0"})
                .find(".poroda-element")
                .set({
                    name: "span",
                    image: "img@src"
                })
                .data(data => {
                    response.push({
                        name: data.name,
                        image: "https://lapkins.ru" + data.image
                    })
                })
                .done(() => resolve(response))
                .error(() => reject("Ошибка при парсинге пород"))
        })
    }
}